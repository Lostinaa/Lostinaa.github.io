import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const headingRef = useScrollReveal();
  const contentRef = useScrollReveal({ threshold: 0.2 });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:natenaelnebiyu@gmail.com?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', message: '' });
    setSubmitStatus('Email client opened!');
    setTimeout(() => setSubmitStatus(''), 3000);
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'natenaelnebiyu@gmail.com', href: 'mailto:natenaelnebiyu@gmail.com' },
    { icon: '💼', label: 'LinkedIn', value: 'natenael-nebiyu', href: 'https://www.linkedin.com/in/natenael-nebiyu/' },
    { icon: '🐙', label: 'GitHub', value: 'Lostinaa', href: 'https://github.com/Lostinaa' },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-pink/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="reveal text-center mb-16">
          <span className="inline-block font-mono text-accent-pink text-sm mb-3 tracking-wider">// CONTACT</span>
          <h2 className="section-heading">
            Let&apos;s <span className="gradient-text-pink">Connect</span>
          </h2>
          <p className="section-subheading mt-4">Have a project in mind or just want to chat? Reach out!</p>
        </div>

        <div ref={contentRef} className="reveal grid md:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-4">
            {contactInfo.map((item) => (
              <a key={item.label} href={item.href} target={item.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl glass hover:scale-[1.02] transition-all duration-300 group">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-dark-400 text-xs font-mono">{item.label}</div>
                  <div className="text-dark-200 text-sm font-medium group-hover:text-accent-violet transition-colors">{item.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="gradient-border rounded-2xl p-6 md:p-8 space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-dark-300 mb-1.5">Name</label>
                <input type="text" id="contact-name" name="name" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-500/30 text-white placeholder-dark-400 focus:outline-none focus:border-accent-violet/50 focus:ring-1 focus:ring-accent-violet/20 transition-all"
                  placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-dark-300 mb-1.5">Email</label>
                <input type="email" id="contact-email" name="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-500/30 text-white placeholder-dark-400 focus:outline-none focus:border-accent-violet/50 focus:ring-1 focus:ring-accent-violet/20 transition-all"
                  placeholder="your.email@example.com" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-dark-300 mb-1.5">Message</label>
                <textarea id="contact-message" name="message" required rows="4" value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-500/30 text-white placeholder-dark-400 focus:outline-none focus:border-accent-violet/50 focus:ring-1 focus:ring-accent-violet/20 transition-all resize-none"
                  placeholder="Your message..." />
              </div>
              {submitStatus && (
                <div className="text-green-400 text-sm text-center font-medium">{submitStatus}</div>
              )}
              <button type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-cyan text-white font-semibold hover:shadow-lg hover:shadow-accent-violet/25 transition-all duration-300 hover:scale-[1.02]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
