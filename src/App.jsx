import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:natenaelnebiyu@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    setSubmitStatus('Email client opened! Please send your message.');
    
    // Clear status after 3 seconds
    setTimeout(() => setSubmitStatus(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-600">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-indigo-600 transition-colors ${activeSection === item ? 'text-indigo-600 font-medium' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="text-center px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">Hello, I&apos;m <span className="text-indigo-600">Natenael</span></h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">Full-Stack Software Engineer & Competitive Programmer</p>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Get In Touch
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-gray-600 mb-6">
                  I&apos;m a passionate full-stack software engineer with experience in building scalable web and mobile solutions. 
                  Currently working at Fanaye Technologies and Ethio Telecom, I focus on API integrations, performance improvements, 
                  and modern frontend/backend stacks. I&apos;m also a competitive programmer and open-source contributor.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {['React/Next.js', 'Laravel/PHP', 'Flutter/React Native', 'JavaScript/TypeScript', 'Python', 'Competitive Programming'].map((skill) => (
                    <div key={skill} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-indigo-600">{skill}</h3>
                    </div>
                  ))}
                </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Great Run (Marathon Tracker)",
                    description: "React Native & Laravel app with live GPS tracking, Kalman filtering, geofencing, and leaderboard features.",
                    tech: "React Native, Laravel, Mapbox, Expo"
                  },
                  {
                    title: "Race Tracking Web App",
                    description: "Next.js + Laravel backend for real-time race monitoring with local-first storage and efficient syncing.",
                    tech: "Next.js, Laravel, Real-time APIs"
                  },
                  {
                    title: "Health Information Management",
                    description: "Full-stack web & mobile application for managing health records with database integration.",
                    tech: "Flutter, Laravel, Database Design"
                  },
                  {
                    title: "Accent Analysis Tool",
                    description: "AI-powered tool that processes video URLs, extracts audio, and classifies English accents with confidence scores.",
                    tech: "Python, AI/ML, Audio Processing"
                  },
                  {
                    title: "Employee Management System",
                    description: "Robust staff management system built with PHP and comprehensive database management.",
                    tech: "PHP, MySQL, Web Development"
                  },
                  {
                    title: "API Integration & Automation",
                    description: "Secure and scalable webhook-based integrations using Make.com for workflow automation.",
                    tech: "API Integration, Webhooks, Automation"
                  }
                ].map((project, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold text-xl">{index + 1}</span>
                        </div>
                        <p className="text-sm text-gray-600">{project.tech}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex space-x-3">
                        <a href="https://github.com/Lostinaa" className="text-indigo-600 hover:underline">View Project</a>
                        <a href="https://github.com/Lostinaa" className="text-gray-500 hover:text-indigo-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.84 9.49.5.09.68-.217.68-.48 0-.236-.008-.864-.013-1.696-2.782.602-3.37-1.34-3.37-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.07-.608.07-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.528 2.34 1.087 2.91.833.09-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.94 0-1.09.39-1.984 1.03-2.683-.103-.254-.447-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.393.1 2.647.64.7 1.028 1.593 1.028 2.683 0 3.84-2.34 4.685-4.566 4.933.36.31.68.92.68 1.852 0 1.336-.012 2.414-.012 2.743 0 .267.18.577.688.48C19.14 20.163 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                {submitStatus && (
                  <div className="text-green-600 text-sm text-center">
                    {submitStatus}
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Opening Email...' : 'Send Message'}
                  </button>
                </div>
              </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://github.com/Lostinaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.39-1.334-1.756-1.334-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/natenael-nebiyu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:natenaelnebiyu@gmail.com"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Email"
            >
              <span className="sr-only">Email</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819c.904 0 1.636.732 1.636 1.636z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Natenael. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
