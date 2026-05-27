import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { scrollToHomeTop, scrollToSection } from '../utilities/scrollNavigation';

interface Props {
  isHamburgActive: boolean;
  isSidebarActive: boolean;
  onHamburgClick: () => void;
}

export default function HeaderMenu({ isHamburgActive, isSidebarActive, onHamburgClick }: Props) {
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
      <header className={`creative-header-wrap ${isHamburgActive || isSidebarActive ? "hamburg-active" : ""}`}>
        <div className="creative-outer-pill">
          {/* Left: Logo */}
          <div className="creative-logo">
            <motion.a 
              href="/" 
              onClick={handleHomeClick} 
              className="font-display flex items-center cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={springConfig}
            >
              <img 
                src="/assets/images/brand/Logo-Header-V1.png" 
                alt="PHONGDEV Logo" 
              />
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
        className={`hamburg-menu ${isHamburgActive && !isSidebarActive ? "active" : ""}`} 
        onClick={onHamburgClick}
      >
        <span />
        <span />
        <span />
      </span>
    </>
  );
}
