/**
 * Retry utility with exponential backoff
 * For resilient data fetching in Next.js 16+
 */

export type RetryOptions = {
  maxRetries?: number
  baseDelay?: number
  maxDelay?: number
  jitter?: boolean
  retryOn?: (error: Error, response?: Response) => boolean
}

const defaultRetryOn = (_error: Error, response?: Response): boolean => {
  if (!response) return true // Network error, retry
  // Retry on rate limit, service unavailable, and server errors
  return response.status === 429 || response.status === 503 || response.status >= 500
}

/**
 * Fetch with automatic retry using exponential backoff
 *
 * @example
 * ```ts
 * const data = await fetchWithRetry(
 *   () => fetch('/api/data').then(r => r.json()),
 *   { maxRetries: 3, baseDelay: 1000 }
 * )
 * ```
 */
export async function fetchWithRetry<T>(
  fetcher: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    jitter = true,
  } = options

  let lastError: Error = new Error('Unknown error')

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetcher()
    } catch (error) {
      lastError = error as Error

      // Don't wait after last attempt
      if (attempt === maxRetries) break

      // Calculate delay with exponential backoff: 1s, 2s, 4s, 8s...
      let delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)

      // Add jitter (±50%) to prevent thundering herd
      if (jitter) {
        delay = delay * (0.5 + Math.random() * 0.5)
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Retry] Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${Math.round(delay)}ms...`)
      }

      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

/**
 * Smart fetch with retry - handles Response objects and status codes
 *
 * @example
 * ```ts
 * const data = await smartFetchWithRetry<User[]>('/api/users', {
 *   next: { revalidate: 3600 }
 * })
 * ```
 */
export async function smartFetchWithRetry<T>(
  url: string,
  init?: RequestInit,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    jitter = true,
    retryOn = defaultRetryOn,
  } = options

  let lastError: Error = new Error('Unknown error')
  let lastResponse: Response | undefined

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, init)
      lastResponse = response

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)

        // Check if we should retry this error
        if (!retryOn(error, response)) {
          throw error // Non-retryable, throw immediately
        }

        throw error // Retryable, will be caught below
      }

      return await response.json()
    } catch (error) {
      lastError = error as Error

      // Don't wait after last attempt
      if (attempt === maxRetries) break

      // Check if error is retryable
      if (!retryOn(lastError, lastResponse)) {
        throw lastError
      }

      // Calculate delay with exponential backoff
      let delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)

      // Add jitter
      if (jitter) {
        delay = delay * (0.5 + Math.random() * 0.5)
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`[SmartRetry] Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${Math.round(delay)}ms...`)
      }

      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

/**
 * Sleep utility for manual delay
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
