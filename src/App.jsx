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
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      const shouldShowBackToTop = window.scrollY > 300;
      
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      if (shouldShowBackToTop !== showBackToTop) {
        setShowBackToTop(shouldShowBackToTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, showBackToTop]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:natenaelnebiyu@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Natenael
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize relative group transition-all duration-300 ${
                    activeSection === item 
                      ? 'text-indigo-600 font-medium' 
                      : scrolled 
                        ? 'text-gray-700 hover:text-indigo-600' 
                        : 'text-white hover:text-cyan-300'
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full ${
                    activeSection === item ? 'w-full' : ''
                  }`}></span>
                </button>
              ))}
            </div>
            <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-cyan-400/20"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-cyan-400/30 rounded-full blur-lg animate-pulse"></div>
        
        <div className="text-center px-4 relative z-10">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
              Hello, I&apos;m{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Natenael
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
            Full-Stack Software Engineer & Competitive Programmer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => scrollToSection('contact')}
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105"
          >
              <span className="flex items-center gap-2">
            Get In Touch
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="group border-2 border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                View My Work
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
          </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    I&apos;m a passionate <span className="font-semibold text-indigo-600">Full-Stack Software Engineer</span> with a strong foundation in competitive programming 
                    and a love for building scalable web and mobile solutions. Currently working at <span className="font-semibold text-purple-600">Fanaye Technologies</span> 
                    and <span className="font-semibold text-blue-600">Ethio Telecom</span>, I focus on API integrations, performance improvements, and modern tech stacks.
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    As the <span className="font-semibold text-indigo-600">Founder & CEO of Dalhak Tech</span>, I&apos;ve led the development of health information management 
                    systems and delivered full-stack applications. I&apos;m also an active competitive programmer on 
                    <span className="font-semibold text-purple-600"> AtCoder and Topcoder</span>, and contribute to open-source AI projects on <span className="font-semibold text-blue-600">Kaggle</span>.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {['Full-Stack Development', 'Competitive Programming', 'AI/ML', 'Mobile Apps', 'API Integration', 'Cloud Services'].map((skill, index) => (
                    <span 
                      key={skill} 
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/30">
                <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Quick Stats
                </h3>
                <div className="space-y-6">
                  {[
                    { label: 'Experience', value: '3+ Years', icon: '💼' },
                    { label: 'Projects', value: '10+ Completed', icon: '🚀' },
                    { label: 'Technologies', value: '15+ Mastered', icon: '⚡' },
                    { label: 'Competitions', value: 'Active Participant', icon: '🏆' }
                  ].map((stat, index) => (
                    <div key={stat.label} className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{stat.icon}</span>
                        <span className="text-gray-700 font-medium">{stat.label}</span>
                      </div>
                      <span className="font-bold text-indigo-600 text-lg">{stat.value}</span>
                </div>
              ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-tr from-indigo-200/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {/* Current Roles */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      FT
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Full-Stack Software Engineer
                      </h3>
                      <p className="text-gray-600 font-medium text-lg">Fanaye Technologies</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    Feb 2025 – Present
                  </span>
                </div>
                <ul className="text-gray-700 space-y-3 ml-16">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Built and optimized scalable web and mobile solutions
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Focused on API integrations and performance improvements
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Worked with modern frontend/backend technology stacks
                  </li>
                </ul>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      ET
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Software Engineer
                      </h3>
                      <p className="text-gray-600 font-medium text-lg">Ethio Telecom</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    Mar 2025 – Present
                  </span>
                </div>
                <ul className="text-gray-700 space-y-3 ml-16">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mt-2 flex-shrink-0"></span>
                    Contributed to cloud services and AI transformation strategies
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mt-2 flex-shrink-0"></span>
                    Worked on modernizing infrastructure and delivering data-driven solutions
                  </li>
                </ul>
              </div>

              {/* Previous Roles */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      AT
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Junior Software Engineer
                      </h3>
                      <p className="text-gray-600 font-medium text-lg">Ahadoo Tech</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    Feb 2023 – Aug 2023
                  </span>
                </div>
                <ul className="text-gray-700 space-y-3 ml-16">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                    Developed and maintained web apps using Flutter and Laravel
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                    Integrated robust APIs and optimized database-driven solutions
                  </li>
                </ul>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      RG
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Intern Software Engineer
                      </h3>
                      <p className="text-gray-600 font-medium text-lg">Resmax Global Technologies</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    Aug 2022 – Oct 2022
                  </span>
                </div>
                <ul className="text-gray-700 space-y-3 ml-16">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    Built an Employee Management System in PHP
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-2 flex-shrink-0"></span>
                    Designed and implemented DBMS solutions for scalability
                  </li>
                </ul>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      IC
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                        Startup Trainee
                      </h3>
                      <p className="text-gray-600 font-medium text-lg">Solve IT | iCog Labs</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    Jul – Sep 2023
                  </span>
                </div>
                <ul className="text-gray-700 space-y-3 ml-16">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mt-2 flex-shrink-0"></span>
                    Shaped health tech product models and customer acquisition strategies
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mt-2 flex-shrink-0"></span>
                    Semi-finalist team leader in a national innovation competition
                  </li>
                </ul>
              </div>

              <div className="group bg-gradient-to-r from-indigo-50 to-purple-50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-indigo-200 transform hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      DT
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                        Founder & CEO
                      </h3>
                      <p className="text-gray-600 font-medium text-lg">Dalhak Tech</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0 bg-indigo-100 px-3 py-1 rounded-full font-medium">
                    2021 – Present
                  </span>
                </div>
                <ul className="text-gray-700 space-y-3 ml-16">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full mt-2 flex-shrink-0"></span>
                    Led the development of a health information management database
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full mt-2 flex-shrink-0"></span>
                    Delivered full-stack web and mobile applications
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Great Run App */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🏃‍♂️</div>
                  <h3 className="text-xl font-bold">Great Run</h3>
                  <p className="text-blue-100">Marathon Tracker</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">React Native</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Laravel</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Mapbox</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Live GPS tracking with expo-location, react-native-maps, and Mapbox. Features Kalman filtering, 
                  geofencing, pace tracking, leaderboard, and voice feedback.
                </p>
                <div className="flex space-x-3">
                  <a href="https://github.com/Lostinaa" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">View Project</a>
                  <a href="https://github.com/Lostinaa" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.84 9.49.5.09.68-.217.68-.48 0-.236-.008-.864-.013-1.696-2.782.602-3.37-1.34-3.37-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.07-.608.07-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.528 2.34 1.087 2.91.833.09-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.94 0-1.09.39-1.984 1.03-2.683-.103-.254-.447-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.393.1 2.647.64.7 1.028 1.593 1.028 2.683 0 3.84-2.34 4.685-4.566 4.933.36.31.68.92.68 1.852 0 1.336-.012 2.414-.012 2.743 0 .267.18.577.688.48C19.14 20.163 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Race Tracking Web App */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🏁</div>
                  <h3 className="text-xl font-bold">Race Tracking</h3>
                  <p className="text-green-100">Web Application</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Next.js</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Laravel</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Real-time</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Real-time race monitoring with local-first storage and efficient syncing. Built for performance 
                  and reliability in competitive environments.
                </p>
                <div className="flex space-x-3">
                  <a href="https://github.com/Lostinaa" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">View Project</a>
                  <a href="https://github.com/Lostinaa" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.84 9.49.5.09.68-.217.68-.48 0-.236-.008-.864-.013-1.696-2.782.602-3.37-1.34-3.37-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.07-.608.07-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.528 2.34 1.087 2.91.833.09-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.94 0-1.09.39-1.984 1.03-2.683-.103-.254-.447-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.393.1 2.647.64.7 1.028 1.593 1.028 2.683 0 3.84-2.34 4.685-4.566 4.933.36.31.68.92.68 1.852 0 1.336-.012 2.414-.012 2.743 0 .267.18.577.688.48C19.14 20.163 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Health Information Management System */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="h-48 bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🏥</div>
                  <h3 className="text-xl font-bold">Health Management</h3>
                  <p className="text-red-100">DALHAK Tech</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Full-Stack</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Mobile</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Database</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Comprehensive health information management system with database, web, and mobile applications 
                  for managing health records efficiently.
                </p>
                <div className="flex space-x-3">
                  <a href="https://github.com/Lostinaa" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">View Project</a>
                  <a href="https://github.com/Lostinaa" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.84 9.49.5.09.68-.217.68-.48 0-.236-.008-.864-.013-1.696-2.782.602-3.37-1.34-3.37-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.07-.608.07-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.528 2.34 1.087 2.91.833.09-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.94 0-1.09.39-1.984 1.03-2.683-.103-.254-.447-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.393.1 2.647.64.7 1.028 1.593 1.028 2.683 0 3.84-2.34 4.685-4.566 4.933.36.31.68.92.68 1.852 0 1.336-.012 2.414-.012 2.743 0 .267.18.577.688.48C19.14 20.163 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Accent Analysis Tool */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🎤</div>
                  <h3 className="text-xl font-bold">Accent Analysis</h3>
                  <p className="text-purple-100">AI Tool</p>
                </div>
              </div>
                <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">AI/ML</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Audio Processing</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Processes video URLs, extracts audio, and classifies English accents (British/American) with 
                  confidence scores using machine learning.
                </p>
                  <div className="flex space-x-3">
                  <a href="#" className="text-indigo-600 hover:underline font-medium">View Project</a>
                    <a href="#" className="text-gray-500 hover:text-indigo-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.84 9.49.5.09.68-.217.68-.48 0-.236-.008-.864-.013-1.696-2.782.602-3.37-1.34-3.37-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.07-.608.07-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.528 2.34 1.087 2.91.833.09-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.94 0-1.09.39-1.984 1.03-2.683-.103-.254-.447-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.393.1 2.647.64.7 1.028 1.593 1.028 2.683 0 3.84-2.34 4.685-4.566 4.933.36.31.68.92.68 1.852 0 1.336-.012 2.414-.012 2.743 0 .267.18.577.688.48C19.14 20.163 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Frontend Technologies */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-600">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'React Native', 'Flutter'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Technologies */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-600">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Laravel', 'PHP', 'Node.js', 'Python', 'MySQL', 'PostgreSQL', 'API Development', 'REST APIs'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI & Data Science */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-600">AI & Data</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Machine Learning', 'Python', 'Data Analysis', 'Kaggle', 'Audio Processing', 'Computer Vision', 'TensorFlow', 'Pandas'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Platforms */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-600">Tools & Platforms</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'Docker', 'AWS', 'Make.com', 'Mapbox', 'Webhooks', 'Cloud Services', 'Vite'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Competitive Programming */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-600">Competitive Programming</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['AtCoder', 'Topcoder', 'Algorithm Design', 'Data Structures', 'Problem Solving', 'C++', 'Python', 'Optimization'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📜</span>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-600">Certifications</h3>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">• Microsoft C# Foundation</div>
                  <div className="text-sm text-gray-600">• IBM Python for Data Science & AI</div>
                  <div className="text-sm text-gray-600">• Google Data Foundations</div>
                </div>
              </div>
            </div>
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
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                Thank you! Your email client should open with the message ready to send.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                There was an error. Please try again or contact me directly at natenaelnebiyu@gmail.com
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Opening Email...' : 'Send Message'}
              </button>
            </div>
            <div className="text-center text-sm text-gray-600">
              <p>Or reach me directly at: <a href="mailto:natenaelnebiyu@gmail.com" className="text-indigo-600 hover:underline">natenaelnebiyu@gmail.com</a></p>
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
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Natenael. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => scrollToSection('home')}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group"
        >
          <svg 
            className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
