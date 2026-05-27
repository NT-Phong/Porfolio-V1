import { scrollToSection } from '../utilities/scrollNavigation';
import SocialShareV1 from '../social/SocialShareV1';
import { X } from 'lucide-react';

interface Props {
  isActive: boolean;
  onClose: () => void;
}

const sectionLinks = [
  { label: "About & Stack", anchor: "about" },
  { label: "Projects", anchor: "projects" },
  { label: "Experience", anchor: "career" },
  { label: "Contact", anchor: "contact" },
];

export default function HeaderSidebar({ isActive, onClose }: Props) {
  const handleSectionClick = (anchor: string) => {
    onClose();

    if (window.location.pathname === "/") {
      scrollToSection(anchor as any);
      return;
    }

    window.location.href = `/#${anchor}`;
  };

  return (
    <div className={`header-sidebar-wrap ${isActive ? 'active' : ''}`}>
      <div className="header-sidebar-content">
        <div 
          className="close-header-sidebar motion-hover" 
          onClick={onClose}
          style={{ position: 'absolute', right: 30, top: 30, cursor: 'pointer', zIndex: 10 }}
        >
          <X size={32} color="#F8FAFC" />
        </div>
        
        <div className="header-sidebar-top">
          {/* Reserve space for top content */}
        </div>

        <div className="sidebar-menu">
          <ul>
            {sectionLinks.map((link) => (
              <li key={link.anchor}>
                <a 
                  href={`#${link.anchor}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionClick(link.anchor);
                  }}
                  className="motion-hover"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="header-sidebar-bottom">
          <SocialShareV1 />
        </div>
      </div>
    </div>
  );
}
