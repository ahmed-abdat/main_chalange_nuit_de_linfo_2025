'use client';

import Image from 'next/image';

// =============================================================================
// LOGO COMPONENT USING REAL SVG FILES
// =============================================================================

interface LogoProps {
  className?: string;
  size?: number;
}

// Windows Logo
export function WindowsLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/Windows_11_logo.svg"
      alt="Windows"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Linux Tux Logo (using NIRD colors since we don't have Tux)
export function LinuxLogo({ className, size = 24 }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="linux-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00997d"/>
          <stop offset="100%" stopColor="#00d9a7"/>
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#linux-grad)"/>
      <path fill="#fff" d="M8 9h2v6H8zM11 9h2l2 3v-3h2v6h-2l-2-3v3h-2z"/>
      <text x="12" y="20" textAnchor="middle" fontSize="4" fill="#fff" fontWeight="bold">NIRD</text>
    </svg>
  );
}

// Microsoft Office Logo
export function MSOffice({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/office.svg"
      alt="Microsoft Office"
      width={size}
      height={size}
      className={className}
    />
  );
}

// LibreOffice Logo
export function LibreOfficeLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/LibreOffice_logo.svg"
      alt="LibreOffice"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Chrome Logo
export function ChromeLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/chrome.svg"
      alt="Google Chrome"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Firefox Logo
export function FirefoxLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/firefox.svg"
      alt="Firefox"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Photoshop Logo
export function PhotoshopLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/photoshop.svg"
      alt="Adobe Photoshop"
      width={size}
      height={size}
      className={className}
    />
  );
}

// GIMP Logo
export function GimpLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/The_GIMP_icon_-_gnome.svg"
      alt="GIMP"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Outlook Logo
export function OutlookLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/microsoft-outlook.svg"
      alt="Microsoft Outlook"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Thunderbird Logo
export function ThunderbirdLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/Thunderbird_2023_icon.svg"
      alt="Thunderbird"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Google Drive Logo
export function GoogleDriveLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/drive.svg"
      alt="Google Drive"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Nextcloud Logo
export function NextcloudLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/Nextcloud_Logo.svg"
      alt="Nextcloud"
      width={size}
      height={size}
      className={className}
    />
  );
}

// VS Code Logo
export function VSCodeLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/vscode.svg"
      alt="Visual Studio Code"
      width={size}
      height={size}
      className={className}
    />
  );
}

// VSCodium Logo
export function VSCodiumLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/vscodium.svg"
      alt="VSCodium"
      width={size}
      height={size}
      className={className}
    />
  );
}

// WhatsApp Logo
export function WhatsAppLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/whatsapp-icon.svg"
      alt="WhatsApp"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Signal Logo
export function SignalLogo({ className, size = 24 }: LogoProps) {
  return (
    <Image
      src="/images/Signal-Logo.svg"
      alt="Signal"
      width={size}
      height={size}
      className={className}
    />
  );
}

// Card Back Logo (NIRD themed)
export function NIRDLogo({ className, size = 24 }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="nird-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00997d"/>
          <stop offset="100%" stopColor="#00d9a7"/>
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#nird-gradient)"/>
      <path fill="#fff" d="M6 8h2v8H6zM9 8h2l3 4.5V8h2v8h-2l-3-4.5V16H9z"/>
    </svg>
  );
}

// Logo mapping for card IDs
export const LOGO_MAP: Record<string, React.FC<LogoProps>> = {
  'windows': WindowsLogo,
  'linux-nird': LinuxLogo,
  'ms-office': MSOffice,
  'libreoffice': LibreOfficeLogo,
  'chrome': ChromeLogo,
  'firefox': FirefoxLogo,
  'photoshop': PhotoshopLogo,
  'gimp': GimpLogo,
  'outlook': OutlookLogo,
  'thunderbird': ThunderbirdLogo,
  'google-drive': GoogleDriveLogo,
  'nextcloud': NextcloudLogo,
  'vscode': VSCodeLogo,
  'vscodium': VSCodiumLogo,
  'whatsapp': WhatsAppLogo,
  'signal': SignalLogo
};
