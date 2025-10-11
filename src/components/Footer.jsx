import { Shield, FileText, Lock, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Resources',
      links: [
        { name: 'Technical Documentation', href: '#', icon: FileText },
        { name: 'Privacy Policy', href: '#', icon: Lock },
        { name: 'Security Audit', href: '#', icon: Shield },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Candidates', href: '#candidates' },
        { name: 'Live Results', href: '#results' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'FAQs', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SecureVote</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The future of democratic voting powered by blockchain technology and zero-knowledge cryptography.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm"
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.name}
                      {link.icon && <ExternalLink className="w-3 h-3 opacity-50" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800">
          <div className="glass-morphism rounded-xl p-4 mb-6 bg-cyan-500/10 border border-cyan-500/20 text-center">
            <p className="text-sm text-gray-300 leading-relaxed">
              All votes encrypted end-to-end. No personal data collected or stored.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} SecureVote. All rights reserved. Built for democracy.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
