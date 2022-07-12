import React from "react";
import footer from "./../../img/2021-DigitalBooking.svg";
import v1 from "./../../img/Vector-1.svg";
import v2 from "./../../img/Vector-2.svg";
import v3 from "./../../img/Vector.svg";
import twitter from "./../../img/twitter.svg";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer">
      <div className="copyright">
        <img src={footer} alt="copyright" />
      </div>
      <div className="icons-footer">
        <img className="icon-footer"  src={v3} alt="" />
        <img className="icon-footer " src={v1} alt="" />
        <img className="icon-footer "  src={twitter} alt="twitter" />
        <img className="icon-footer instagram"  src={v2} alt="" />
      </div>
      </div>
    </footer>
  );
}

export default Footer;