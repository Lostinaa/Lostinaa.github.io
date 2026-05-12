import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';

const projects = [
  {
    title: 'Crowdsource QoE Monitor',
    description: 'Full-stack platform for crowdsourcing Quality of Experience measurements from mobile devices. Collects voice call, throughput, and latency metrics with real-time analytics dashboard.',
    tech: ['React Native', 'Expo', 'Laravel', 'PostgreSQL', 'Filament'],
    image: '/network-monitor.png',
    contra: 'https://contra.com/natenael_nebiyu_9rh5f6he',
    github: 'https://github.com/Lostinaa',
    live: 'https://play.google.com/apps/internaltest/4701323114323070104',
    liveLabel: 'Play Store',
  },
  {
    title: 'Great Run Marathon Tracker',
    description: 'Marathon event platform with live GPS tracking, Kalman filtering, geofencing, OTP login, run tracking, and real-time leaderboards for race day operations.',
    tech: ['React Native', 'Expo', 'Laravel', 'PostgreSQL', 'Mapbox'],
    image: null,
    contra: null,
    github: 'https://github.com/Lostinaa',
    live: 'https://play.google.com/store/apps/details?id=com.greatrun.app',
    liveLabel: 'Play Store',
    gradient: 'from-green-500/20 to-cyan-500/20',
    emoji: '🏃',
  },
  {
    title: 'Fitness App',
    description: 'Mobile fitness application with workout tracking, exercise stats, progress charts, heart rate monitoring, and personalized training plans.',
    tech: ['React Native', 'TypeScript', 'REST APIs'],
    image: '/fitness-app.png',
    contra: 'https://contra.com/natenael_nebiyu_9rh5f6he',
    github: 'https://github.com/Lostinaa',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Data visualization dashboard with interactive charts, KPI metrics, real-time analytics, and reporting tools for business intelligence.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Chart.js'],
    image: '/analytics-dashboard.png',
    contra: 'https://contra.com/natenael_nebiyu_9rh5f6he',
    github: 'https://github.com/Lostinaa',
    live: 'https://crowdsource.ethiotelecom.et/',
    liveLabel: 'Live Site',
  },
  {
    title: 'CV Builder',
    description: 'Resume builder web app with live preview, multiple templates, drag-and-drop sections, and PDF export functionality.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'PDF Generation'],
    image: '/cv-builder.png',
    contra: 'https://contra.com/natenael_nebiyu_9rh5f6he',
    github: 'https://github.com/Lostinaa',
  },
  {
    title: 'Visitor Management System',
    description: 'Enterprise VMS for Ethio Telecom with self-service kiosk, approval workflows, photo capture, digital signatures, multi-language support, and admin dashboard.',
    tech: ['Laravel', 'Filament', 'PostgreSQL', 'Livewire'],
    image: null,
    contra: null,
    github: 'https://github.com/Lostinaa',
    gradient: 'from-purple-500/20 to-pink-500/20',
    emoji: '🏢',
  },
  {
    title: 'SprintBoard API',
    description: 'Production-ready REST API for agile project management with JWT auth, RBAC, sprint lifecycle, task board, activity audit trail, and Celery task queue.',
    tech: ['Django', 'DRF', 'PostgreSQL', 'Docker', 'Celery'],
    image: null,
    contra: null,
    github: 'https://github.com/Lostinaa/sprintboard',
    gradient: 'from-orange-500/20 to-yellow-500/20',
    emoji: '📋',
  },
];

export default function Projects() {
  const headingRef = useScrollReveal();
  const gridRef = useStaggerReveal({ staggerMs: 120 });

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-violet/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="inline-block font-mono text-accent-violet text-sm mb-3 tracking-wider">// PROJECTS</span>
          <h2 className="section-heading">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="section-subheading mt-4">A selection of projects that showcase my skills and passion.</p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="reveal-scale group gradient-border rounded-2xl overflow-hidden hover:scale-[1.03] transition-all duration-300">
              {/* Project thumbnail */}
              <div className="h-44 relative overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-dark-900/40" />
                    <span className="relative text-5xl">{project.emoji}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-accent-violet transition-colors">{project.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-dark-700/60 text-dark-200 border border-dark-500/30">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-dark-300 hover:text-accent-violet transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.39-1.334-1.756-1.334-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  {project.contra && (
                    <a href={project.contra} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-dark-300 hover:text-accent-cyan transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Contra
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-dark-300 hover:text-green-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {project.liveLabel || 'Live'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
