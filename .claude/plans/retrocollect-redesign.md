# RetroCollect Landing Page Redesign Plan

## Overview
Transform the current SaaS-style landing page into a "RetroCollect" vintage game shop showcase with a hidden Snake game (Challenge #483). Users can drag cartridges to a GameBoy to "test" them, and the secret "Prototype #483" cartridge triggers the playable Snake game.

## Design Direction
- **Style**: Hybrid shop aesthetic (showcase without e-commerce checkout)
- **Interaction**: Drag & Drop cartridges to GameBoy
- **Scope**: Full page redesign
- **Language**: French (all copy in French)

## Existing Components to Leverage
From `docs/COMPONENTS.md`:
- **DraggableCardBody/Container** - Perfect for cartridge drag & drop
- **Highlighter** - For emphasizing key text
- **CometCard** - For featured collection cards
- **PointerHighlight** - For interactive text highlights

---

## Asset Mapping

| Asset | Section | Usage |
|-------|---------|-------|
| `1.PNG` | Hero | Pastel Game Boy as visual centerpiece |
| `2.jpeg` | Reference | Real cartridge aesthetic reference |
| `3.PNG` | Trust Section | NES console demo image |
| `retro_4.png` | Trust Section | Restoration process (cleaning pins) |
| `retro_gam_3.png` | Featured Collection | Mario/Zelda/Sonic cartridges |
| `retro_game_2.png` | Community Section | Lifestyle/man playing Game Boy |

---

## New Page Structure

### 1. Header/Navbar
- Logo: "RETROCOLLECT" with RC icon (keep current implementation)
- Links: Boutique | Collections | Restauration | A Propos
- Right: Connexion

### 2. Hero Section
**Layout**: Split (text left 50%, visual right 50%)

**Copy (FRENCH)**:
- Badge: "Depuis 2024 - Collection Retro Curee"
- Headline: "Revivez l'Ere Retro"
- Subheadline: "Jeux vintage premium, authentifies et restaures avec soin. Chaque cartouche raconte une histoire - nous nous assurons qu'elle fonctionne parfaitement."
- CTA Primary: "Parcourir la Collection"
- CTA Secondary: "Notre Processus"

**Visual**: `1.PNG` (pastel Game Boy) with floating animation and blur orbs

### Cartridge Design Approach: HYBRID
- Use existing `DraggableCardBody` component as base
- CSS-drawn cartridge shapes (Tailwind) for consistent styling
- Use cropped images from `retro_gam_3.png` as labels inside the CSS cartridge frames
- Prototype #483 gets a glitchy/corrupted label effect

### 3. Interactive Shelf (THE CHALLENGE SECTION)
**Layout**: Full-width, centered content

**Header (FRENCH)**:
- Title: "Le Coffre-Fort"
- Subtitle: "Raretes selectionnees de notre inventaire"
- Instruction: "Glissez une cartouche vers la console pour la tester"

**Structure**:
```
┌──────────────────────────────────────────────────────┐
│              [GameBoy Component - Drop Zone]          │
│                                                       │
├──────────────────────────────────────────────────────┤
│  [Cartridge 1]  [Cartridge 2]  [Cartridge 3]  [#483] │
└──────────────────────────────────────────────────────┘
```

**Cartridge Data (FRENCH)**:
1. **Zelda Gold** - 189€ - "Cartouche doree originale de 1987"
2. **Super Mario Bros. 3** - 74€ - "Le jeu de plateforme NES definitif"
3. **Metroid First Print** - 156€ - "Premier tirage de 1986"
4. **Prototype #483** - NON DISPONIBLE - "Origine: Inconnue. Contenu: Non verifie. *Inserez a vos risques et perils.*"

### 4. Trust Signals Section
**Layout**: 3-column grid + featured image

**Image**: `retro_4.png` (hands cleaning cartridge)

**Cards (FRENCH)**:
1. **Authenticite Verifiee** (Shield icon) - "Processus d'authentification en 12 points"
2. **Restauration Experte** (Wrench icon) - "Nettoyage des contacts, remplacement batterie"
3. **Garantie 90 Jours** (Clock icon) - "Reparation, remplacement ou remboursement"

### 5. Featured Collections
**Layout**: 3-column card grid using `retro_gam_3.png` + CometCard component

**Collections (FRENCH)**:
1. **L'Age d'Or** (1985-1995) - Classiques NES, SNES, Genesis
2. **Legendes Portables** - Du Game Boy au GBA SP
3. **Pieces de Collection** - Ultra rares, qualite investissement

### 6. Community/Lifestyle Section
**Layout**: Full-width with `retro_game_2.png`

**Copy (FRENCH)**: "Plus qu'une Boutique" - Statistiques communaute et temoignages

### 7. Footer
**Layout**: Dark footer (4 columns)

**Legal Text (FRENCH)**:
> "RetroCollect est un revendeur independant. Non affilie a Nintendo, Sega ou Sony. Toutes les marques appartiennent a leurs proprietaires respectifs."

**Links (FRENCH)**: Boutique | Collections | Restauration | Contact | Mentions Legales

---

## Technical Implementation

### New Components to Create

| Component | Purpose |
|-----------|---------|
| `Cartridge.tsx` | Draggable cartridge (extends DraggableCardBody pattern) |
| `CartridgeSlot.tsx` | Visual drop zone indicator on GameBoy |
| `CartridgeShelf.tsx` | Container using DraggableCardContainer |
| `useDropZone.ts` | Custom hook for collision detection |

### Leveraging Existing Components
- Use `DraggableCardContainer` as base for shelf
- Use `DraggableCardBody` pattern for individual cartridges
- Use `CometCard` for Featured Collections cards
- Use `Highlighter` for emphasizing key French text

### GameBoy.tsx Modifications

Add new props and states:
```typescript
interface GameBoyProps {
  activeCartridge?: string | null;  // Controls what's "inserted"
  onCartridgeEject?: () => void;
}

// Screen states
type CartridgeState = 'empty' | 'incompatible' | 'booting' | 'ready';
```

**Screen Behavior by Cartridge**:
- `null` (empty): LCD noise pattern (current "off" state)
- Other cartridges: "ERREUR CARTOUCHE" message
- `prototype-483`: Boot sequence -> Snake game

### Drag & Drop Implementation

**Using DraggableCardBody pattern with collision detection**:
```typescript
// Cartridge component wraps DraggableCardBody
<DraggableCardBody
  className={cartridgeStyles}
  onDragEnd={checkDropZone}
>
  <CartridgeLabel />
</DraggableCardBody>
```

**Collision Detection** (useDropZone hook):
- Track drag position via pointer events
- Compare with GameBoy drop zone bounding rect
- 80px threshold for "near" detection (glow effect)

**Insertion Animation Sequence** (1.5s total):
1. 0-200ms: Cartridge moves toward slot
2. 200-500ms: Slides into slot
3. 500-800ms: Screen flickers
4. 800-1200ms: Boot logo appears
5. 1200ms+: Game ready

### Mobile Fallback
- Detect touch devices: `'ontouchstart' in window`
- Replace drag with tap-to-insert
- Cartridge animates flying to GameBoy on tap

### CSS Additions (globals.css)
```css
@keyframes screenFlicker {
  0%, 100% { filter: brightness(1); }
  10% { filter: brightness(0.3); }
  30% { filter: brightness(0.5); }
}

@keyframes slotPulse {
  0%, 100% { box-shadow: 0 0 10px rgba(155,188,15,0.3); }
  50% { box-shadow: 0 0 20px rgba(155,188,15,0.6); }
}
```

---

## Implementation Order

### Phase 1: Page Structure (30 min)
1. Refactor `page.tsx` - remove Pricing, generic Features
2. Update navbar links to French
3. Set up new section skeleton

### Phase 2: Hero + Footer (30 min)
1. Update Hero with French copy and `1.PNG` asset
2. Refactor Footer with French content

### Phase 3: Static Sections (45 min)
1. Build Trust Signals section with `retro_4.png`
2. Build Featured Collections with CometCard + `retro_gam_3.png`
3. Build Community section with `retro_game_2.png`

### Phase 4: Drag & Drop System (1.5 hours)
1. Create `useDropZone` hook
2. Create `Cartridge.tsx` using DraggableCardBody
3. Create `CartridgeSlot.tsx` component
4. Create `CartridgeShelf.tsx` using DraggableCardContainer
5. Modify `GameBoy.tsx` to accept `activeCartridge` prop
6. Add screen states (empty, incompatible, booting, ready)

### Phase 5: Animation Polish (30 min)
1. Add insertion animation sequence
2. Add screen flicker effect
3. Add drop zone glow animation
4. Mobile fallback implementation

### Phase 6: Final Integration (15 min)
1. Wire up all components in page.tsx
2. Add CSS keyframes to globals.css
3. Test full flow

---

## Critical Files to Modify

| File | Changes |
|------|---------|
| `src/app/page.tsx` | Full redesign - new sections, French copy, layout |
| `src/components/GameBoy.tsx` | Add `activeCartridge` prop, screen states |
| `src/app/globals.css` | Add keyframes for flicker/pulse animations |
| `src/components/Cartridge.tsx` | **NEW** - Draggable cartridge component |
| `src/components/CartridgeShelf.tsx` | **NEW** - Shelf container |
| `src/hooks/useDropZone.ts` | **NEW** - Collision detection hook |

---

## Secret Prototype #483 Details

**Visual Treatment**:
- Dark slate color (#1e293b)
- Glitchy/corrupted label text
- Subtle static noise overlay
- Hover text: "Quelque chose semble... different."

**Insertion Behavior (FRENCH)**:
1. Screen shows "CHARGEMENT..." with glitch effect
2. "PROJET 483 - USAGE INTERNE" appears
3. Snake game starts
4. Game Over shows: "DONNEES CORROMPUES - REJOUER?"

---

## Success Criteria
- [ ] Page looks like a legitimate French vintage game shop
- [ ] All copy is in French
- [ ] Drag & drop works smoothly on desktop
- [ ] Tap-to-insert works on mobile
- [ ] Only Prototype #483 triggers the Snake game
- [ ] Other cartridges show "ERREUR CARTOUCHE" message
- [ ] Animations feel polished and satisfying
- [ ] Hidden game is discoverable but not obvious
