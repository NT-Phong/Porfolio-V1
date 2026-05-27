import { useState, useEffect } from 'react';
import HeaderSidebar from './HeaderSidebar';
import HeaderMenu from './HeaderMenu';

export default function HeaderV1() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isHamburgActive, setIsHamburgActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHamburgActive(window.scrollY >= 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleHamburgClick = () => {
    setIsSidebarActive(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseClick = () => {
    setIsSidebarActive(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <HeaderSidebar isActive={isSidebarActive} onClose={handleCloseClick} />
      <HeaderMenu 
        isHamburgActive={isHamburgActive} 
        isSidebarActive={isSidebarActive} 
        onHamburgClick={handleHamburgClick} 
      />
    </>
  );
}
