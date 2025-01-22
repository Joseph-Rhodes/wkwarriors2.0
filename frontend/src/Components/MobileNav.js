import React, { useEffect, useRef, useState } from "react";
import { menuItemsData } from "../menuItemsData";
import MobileMenuItems from "./MobileMenuItems.js";


const MobileNav = () => {
  const depthLevel = 0;
  const [showMenu, setShowMenu] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (showMenu && ref.current && !ref.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [showMenu]);

  return (
    <nav className="mobile-nav">
      <button
        className="mobile-nav__menu-button"
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`sidebar ${showMenu ? "show" : ""}`} ref={ref}>
        <button
          className="close-button"
          type="button"
          onClick={() => setShowMenu(false)}
        >
          &times;
        </button>
        <ul className="menu-items">
          {menuItemsData.map((menu, index) => (
            <MobileMenuItems
              items={menu}
              key={index}
              depthLevel={depthLevel}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          ))}
        </ul>
        <div className="social-icons" style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop : '-2.5rem' }}>  
          <a href="https://www.instagram.com/warriorswk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://www.youtube.com/@warriorswk" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
