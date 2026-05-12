import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Ethio Telecom',
    period: '2024 – Present',
    description: 'Building internal tools, integrating voice QoE analytics, and developing visitor management systems with Laravel and React.',
    tech: ['Laravel', 'React', 'PHP', 'PostgreSQL'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Fanaye Technologies',
    period: '2023 – Present',
    description: 'Developing scalable web and mobile applications, API integrations, and workflow automation for enterprise clients.',
    tech: ['React Native', 'Next.js', 'Laravel', 'Flutter'],
  },
  {
    role: 'Competitive Programmer',
    company: 'Self-directed',
    period: '2022 – Present',
    description: 'Solving algorithmic challenges, studying data structures, and participating in programming contests to sharpen problem-solving skills.',
    tech: ['C++', 'Python', 'Algorithms', 'DSA'],
  },
];

export default function Experience() {
  const headingRef = useScrollReveal();
  const timelineRef = useStaggerReveal({ staggerMs: 200 });

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent" />
      <div className="max-w-4xl mx-auto px-6">
        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="inline-block font-mono text-accent-purple text-sm mb-3 tracking-wider">// EXPERIENCE</span>
          <h2 className="section-heading">
            Where I&apos;ve <span className="gradient-text">Worked</span>
          </h2>
          <p className="section-subheading mt-4">My professional journey so far.</p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-violet via-accent-purple to-accent-cyan opacity-30" />

          {experiences.map((exp, i) => (
            <div key={i} className={`reveal relative flex items-start gap-8 mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent-violet border-2 border-dark-950 -translate-x-1/2 mt-8 z-10 shadow-lg shadow-accent-violet/30" />

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card */}
              <div className="ml-12 md:ml-0 md:w-1/2 gradient-border rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300">
                <span className="font-mono text-accent-cyan text-xs">{exp.period}</span>
                <h3 className="text-white font-bold text-xl mt-1">{exp.role}</h3>
                <p className="text-accent-violet font-medium text-sm mb-3">{exp.company}</p>
                <p className="text-dark-300 text-sm leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
