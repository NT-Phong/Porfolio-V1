import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { scrollToHomeTop, scrollToSection } from '../utilities/scrollNavigation';

interface Props {
  isHamburgActive: boolean;
  onHamburgClick: () => void;
}

export default function HeaderMenu({ isHamburgActive, onHamburgClick }: Props) {
  const handleHomeClick = (event: React.MouseEvent) => {
    event.preventDefault();

    if (window.location.pathname === "/") {
      scrollToHomeTop();
      return;
    }

    window.location.href = "/";
  };

  const springConfig = { type: 'spring', stiffness: 400, damping: 20 };

  return (
    <>
      <header className="creative-header-wrap">
        <div className="creative-outer-pill">
          {/* Left: Logo */}
          <div className="creative-logo">
            <motion.a 
              href="/" 
              onClick={handleHomeClick} 
              className="font-display flex items-center text-lg font-black leading-none tracking-tighter cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={springConfig}
            >
              <svg className="h-6 w-6 mr-2.5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px var(--accent-orange))', width: '24px', height: '24px' }}>
                <path d="M30 20 H65 C80 20, 80 50, 65 50 H30" stroke="var(--accent-orange)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M30 20 V80" stroke="var(--accent-orange)" strokeWidth="12" strokeLinecap="round" />
                <circle cx="65" cy="50" r="10" fill="var(--accent-cyan)" />
              </svg>
              <span className="text-white font-extrabold tracking-tighter uppercase mr-1">PHONG</span>
              <span className="portfolio-accent font-extrabold tracking-tighter uppercase" style={{ color: 'var(--accent-orange)' }}>DEV</span>
            </motion.a>
          </div>
          
          {/* Center: Inner Nav Pill */}
          <nav className="creative-inner-pill-nav">
            <ul className="creative-menu">
              <li>
                <motion.a 
                  href="/" 
                  onClick={handleHomeClick} 
                  className="cursor-pointer"
                  whileHover={{ scale: 1.08, color: 'var(--accent-orange)' }}
                  transition={springConfig}
                >
                  HOME
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#about" 
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === "/") scrollToSection('about' as any);
                    else window.location.href = "/#about";
                  }}
                  whileHover={{ scale: 1.08, color: 'var(--accent-orange)' }}
                  transition={springConfig}
                >
                  ABOUT
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#projects" 
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === '/') scrollToSection('projects' as any);
                    else window.location.href = '/#projects';
                  }}
                  whileHover={{ scale: 1.08, color: 'var(--accent-orange)' }}
                  transition={springConfig}
                >
                  PROJECTS
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#contact" 
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === "/") scrollToSection('contact' as any);
                    else window.location.href = "/#contact";
                  }}
                  whileHover={{ scale: 1.08, color: 'var(--accent-orange)' }}
                  transition={springConfig}
                >
                  CONTACT
                </motion.a>
              </li>
            </ul>
          </nav>
 
          {/* Right: Contact & CTA */}
          <div className="creative-right-actions">
            <motion.a 
              href="mailto:phongg.dev@gmail.com" 
              className="contact-mail-icon cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 6 }}
              whileTap={{ scale: 0.92 }}
              transition={springConfig}
            >
              <Mail size={18} />
            </motion.a>
            <motion.a 
              href="#contact" 
              className="creative-cta-btn cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact' as any);
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={springConfig}
            >
              Get in touch
            </motion.a>
          </div>
        </div>
      </header>

      {/* Hamburg Menu (Floating at top right) */}
      <span 
        className={`hamburg-menu ${isHamburgActive ? "active" : ""}`} 
        onClick={onHamburgClick}
      >
        <span />
        <span />
        <span />
      </span>
    </>
  );
}
