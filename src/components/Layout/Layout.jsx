import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MenuMobile from "../MenuMobile/MenuMobile";

function Layout({ children, auth, logout }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const closeLogoutMenuMobile = () => {
    setMenuVisible(false);
    logout();
  }

  return (
    <>
      <Header isLogged={auth} logout={logout} openMenu={openMenu} />
      {menuVisible && <MenuMobile logout={closeLogoutMenuMobile} isLogged={auth} closeMenu={closeMenu} />}
      {children}
      <Footer />
    </>
  );
}

export default Layout;
