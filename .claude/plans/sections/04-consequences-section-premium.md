# Phase 4: Consequences Section - Dynamic Results

## Goal
Show the impact of user's choice with dramatic visuals, celebrating Choice B and warning about A/C.

## Time Estimate: 45-60 minutes

---

## Components to Use

| Component | Purpose | File |
|-----------|---------|------|
| `Particles` | Celebration effect | `@/components/Particles` |
| `CountUp` | Savings animation | `@/components/CountUp` |
| `CometCard` | Result cards | `@/components/ui/CometCard` |
| `ShatterButton` | Reconsider CTA | `@/components/ui/shatter-button` |
| `BlurText` | Title reveal | `@/components/BlurText` |
| `DecayCard` | Visual decay for Empire | `@/components/DecayCard` |

---

## Conditional Rendering Logic

```tsx
function ConsequencesSection() {
  const { userChoice } = useChoiceStore();

  if (!userChoice) {
    return <AwaitingChoiceState />;
  }

  switch (userChoice) {
    case 'A':
      return <EmpireConsequences />;
    case 'B':
      return <VillageConsequences />; // CELEBRATION MODE
    case 'C':
      return <InactionConsequences />;
  }
}
```

---

## Implementation Steps

### Step 1: Awaiting Choice State (5 min)
```tsx
function AwaitingChoiceState() {
  return (
    <section className="py-32 px-6 bg-[#1a1a1d]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <TrueFocus
            sentence="Faites votre choix"
            blurAmount={5}
            borderColor="#F9A825"
            glowColor="rgba(249, 168, 37, 0.6)"
          />
        </motion.div>
        <p className="text-xl text-gray-400 mt-6">
          Remontez et sélectionnez une option pour voir les conséquences
        </p>
      </div>
    </section>
  );
}
```

### Step 2: Empire Consequences (Choice A) (15 min)
```tsx
function EmpireConsequences() {
  const { setUserChoice, calculatorInputs } = useChoiceStore();
  const cost = calculatorInputs.schoolSize * 800;

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#1a1a1d] via-[#2d1a1a] to-[#1a1a1d]">
      {/* Red warning overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-[#C62828]/20 to-transparent z-0" />

      {/* Squares - ominous pattern */}
      <div className="absolute inset-0 opacity-20 z-0">
        <Squares direction="down" speed={0.3} borderColor="#C62828" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <BlurText
          text="Vous avez choisi l'Empire..."
          className="text-4xl md:text-6xl font-bold text-[#C62828] text-center mb-16"
          delay={80}
          animateBy="words"
        />

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Cost breakdown */}
          <CometCard>
            <div className="p-8 bg-[#1a1a1d]/80 rounded-2xl border border-[#C62828]/30">
              <h3 className="text-2xl font-bold text-white mb-6">💸 Coûts sur 5 ans</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">ESU Année 1</span>
                  <span className="text-[#C62828] font-bold">€{(calculatorInputs.schoolSize * 61).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">ESU Année 2</span>
                  <span className="text-[#C62828] font-bold">€{(calculatorInputs.schoolSize * 122).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">ESU Année 3</span>
                  <span className="text-[#C62828] font-bold">€{(calculatorInputs.schoolSize * 244).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Nouveaux PCs (30%)</span>
                  <span className="text-[#C62828] font-bold">€{(calculatorInputs.schoolSize * 0.3 * 600).toLocaleString()}</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-white font-bold text-xl">TOTAL</span>
                  <CountUp
                    to={cost}
                    prefix="€"
                    separator=" "
                    className="text-3xl font-black text-[#C62828]"
                  />
                </div>
              </div>
            </div>
          </CometCard>

          {/* Risks */}
          <CometCard>
            <div className="p-8 bg-[#1a1a1d]/80 rounded-2xl border border-[#C62828]/30">
              <h3 className="text-2xl font-bold text-white mb-6">⚠️ Risques</h3>
              <ul className="space-y-4">
                {[
                  'Dépendance accrue à Microsoft',
                  'Données hors de l\'UE',
                  'Coûts récurrents chaque année',
                  'Obsolescence programmée',
                  'E-waste environnemental',
                ].map((risk, i) => (
                  <motion.li
                    key={risk}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <span className="text-[#C62828]">✗</span>
                    {risk}
                  </motion.li>
                ))}
              </ul>
            </div>
          </CometCard>
        </div>

        {/* Reconsider CTA */}
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-6">
            Il n'est pas trop tard pour rejoindre le Village...
          </p>
          <ShatterButton
            shatterColor="#00997d"
            shardCount={25}
            onClick={() => setUserChoice(null)}
            className="text-lg font-bold"
          >
            🏛️ Reconsidérer mon choix
          </ShatterButton>
        </div>
      </div>
    </section>
  );
}
```

### Step 3: Village Consequences (Choice B) - CELEBRATION (20 min)
```tsx
function VillageConsequences() {
  const { calculatorInputs } = useChoiceStore();
  const savings = calculatorInputs.schoolSize * (800 - 50);

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#1a1a1d] via-[#0a2e1a] to-[#1a1a1d]">
      {/* Celebration particles - gold and green */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={200}
          particleSpread={20}
          speed={0.1}
          particleColors={['#00997d', '#F9A825', '#2E7D32', '#FFF8E1']}
          moveParticlesOnHover={true}
          alphaParticles={true}
          particleBaseSize={120}
        />
      </div>

      {/* Green glow overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00997d]/30 to-transparent z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <span className="text-8xl block mb-6">🏛️</span>
        </motion.div>

        <BlurText
          text="BIENVENUE AU VILLAGE !"
          className="text-4xl md:text-6xl lg:text-7xl font-black text-[#00997d]
                     drop-shadow-[0_0_60px_rgba(0,153,125,0.8)] mb-8"
          delay={60}
          animateBy="letters"
        />

        {/* Savings highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <CometCard>
            <div className="p-10 bg-[#00997d]/20 rounded-2xl border border-[#00997d]/50 backdrop-blur-md">
              <p className="text-2xl text-white mb-4">Économies réalisées sur 5 ans</p>
              <div className="flex items-center justify-center gap-4">
                <CountUp
                  to={savings}
                  prefix="€"
                  separator=" "
                  duration={3}
                  className="text-6xl md:text-8xl font-black text-[#F9A825]
                             drop-shadow-[0_0_30px_rgba(249,168,37,0.6)]"
                />
              </div>
              <p className="text-gray-300 mt-4">
                Et vos {calculatorInputs.schoolSize} ordinateurs durent 5 ans de plus !
              </p>
            </div>
          </CometCard>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: '💰', label: 'Gratuit', value: '€0/licence' },
            { icon: '🛡️', label: 'Souveraineté', value: 'Données en France' },
            { icon: '🌱', label: 'Durable', value: '10+ ans' },
            { icon: '🔓', label: 'Libre', value: 'Open Source' },
          ].map((benefit, i) => (
            <motion.div
              key={benefit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="p-6 bg-white/5 rounded-xl border border-[#00997d]/30"
            >
              <span className="text-4xl block mb-2">{benefit.icon}</span>
              <p className="text-white font-bold">{benefit.label}</p>
              <p className="text-[#00997d] text-sm">{benefit.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA to NIRD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <ShatterButton
            shatterColor="#F9A825"
            shardCount={30}
            onClick={() => window.open('https://nird.forge.apps.education.fr/', '_blank')}
            className="text-xl font-bold px-12 py-6"
          >
            🚀 Découvrir la démarche NIRD
          </ShatterButton>
        </motion.div>
      </div>
    </section>
  );
}
```

### Step 4: Inaction Consequences (Choice C) (10 min)
```tsx
function InactionConsequences() {
  const { setUserChoice, calculatorInputs } = useChoiceStore();

  const timeline = [
    { date: 'Oct 2025', event: 'Fin support gratuit', severity: 'warning' },
    { date: 'Jan 2026', event: 'Premières vulnérabilités', severity: 'warning' },
    { date: 'Mi-2026', event: 'Cyberattaques potentielles', severity: 'danger' },
    { date: '2027', event: 'Migration forcée urgente', severity: 'danger' },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#1a1a1d] via-[#2a2a2a] to-[#1a1a1d]">
      <div className="relative z-10 max-w-6xl mx-auto">
        <BlurText
          text="L'inaction a un prix..."
          className="text-4xl md:text-6xl font-bold text-[#455A64] text-center mb-16"
          delay={80}
          animateBy="words"
        />

        {/* Timeline */}
        <div className="max-w-2xl mx-auto mb-16">
          {timeline.map((item, i) => (
            <motion.div
              key={item.date}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className={cn(
                "flex items-center gap-6 p-4 rounded-lg mb-4",
                item.severity === 'warning' && "bg-[#ff8c00]/20 border-l-4 border-[#ff8c00]",
                item.severity === 'danger' && "bg-[#C62828]/20 border-l-4 border-[#C62828]",
              )}
            >
              <span className="font-mono text-gray-400 w-24">{item.date}</span>
              <span className={cn(
                "font-bold",
                item.severity === 'warning' && "text-[#ff8c00]",
                item.severity === 'danger' && "text-[#C62828]",
              )}>
                {item.event}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Hidden costs */}
        <div className="text-center mb-16">
          <p className="text-xl text-gray-300 mb-4">Coût réel de l'inaction :</p>
          <CountUp
            to={calculatorInputs.schoolSize * 1200}
            prefix="€"
            separator=" "
            className="text-5xl font-black text-[#C62828]"
          />
          <p className="text-gray-400 mt-2">(Migration urgente + pertes + risques)</p>
        </div>

        {/* Reconsider */}
        <div className="text-center">
          <ShatterButton
            shatterColor="#00997d"
            onClick={() => setUserChoice(null)}
            className="text-lg font-bold"
          >
            🏛️ Rejoindre le Village maintenant
          </ShatterButton>
        </div>
      </div>
    </section>
  );
}
```

---

## Files to Create/Modify

- `src/app/page.tsx` - Add ConsequencesSection with sub-components

---

## Testing Checklist

- [ ] Conditional rendering based on userChoice works
- [ ] Empire path shows red/warning theme
- [ ] Village path shows celebration with particles
- [ ] Inaction path shows timeline
- [ ] CountUp animations work
- [ ] Reconsider button resets choice
- [ ] External links work
