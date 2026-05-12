import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: ['Laravel', 'PHP', 'Node.js', 'Python', 'REST APIs'],
  },
  {
    title: 'Mobile',
    icon: '📱',
    skills: ['Flutter', 'React Native', 'Expo', 'Dart'],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    skills: ['Git', 'Docker', 'MySQL', 'PostgreSQL', 'Linux'],
  },
];

export default function Skills() {
  const headingRef = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerMs: 150 });

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="inline-block font-mono text-accent-cyan text-sm mb-3 tracking-wider">// SKILLS</span>
          <h2 className="section-heading">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-subheading mt-4">Technologies I work with daily to build great products.</p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="reveal-scale gradient-border rounded-2xl p-6 hover:scale-[1.03] transition-transform duration-300">
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="text-white font-bold text-lg mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-full text-xs font-medium bg-dark-700/60 text-dark-200 border border-dark-500/30 hover:border-accent-violet/40 hover:text-white transition-all duration-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
