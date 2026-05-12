import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '5+', label: 'Technologies' },
  { value: '∞', label: 'Curiosity' },
];

export default function About() {
  const headingRef = useScrollReveal();
  const textRef = useScrollReveal({ threshold: 0.2 });
  const statsRef = useStaggerReveal({ staggerMs: 100 });

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-violet/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="inline-block font-mono text-accent-violet text-sm mb-3 tracking-wider">// ABOUT ME</span>
          <h2 className="section-heading">
            Crafting <span className="gradient-text">Digital Experiences</span>
          </h2>
          <p className="section-subheading mt-4">A brief introduction to who I am and what drives me.</p>
        </div>
        <div ref={textRef} className="reveal max-w-3xl mx-auto mb-16">
          <div className="gradient-border p-8 md:p-10 rounded-2xl">
            <p className="text-dark-200 text-lg leading-relaxed mb-4">
              I&apos;m a passionate full-stack software engineer with a knack for turning complex problems
              into elegant, scalable solutions. Currently working at{' '}
              <span className="text-accent-violet font-medium">Fanaye Technologies</span> and{' '}
              <span className="text-accent-cyan font-medium">Ethio Telecom</span>, I focus on API
              integrations, performance optimization, and building modern frontend/backend systems.
            </p>
            <p className="text-dark-200 text-lg leading-relaxed">
              Beyond my day job, I&apos;m a competitive programmer who thrives on algorithmic challenges
              and an open-source contributor who believes in giving back to the community.
            </p>
          </div>
        </div>
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="reveal-scale text-center p-6 rounded-2xl glass glow hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-dark-300 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
