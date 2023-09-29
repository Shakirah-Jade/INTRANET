import React from 'react';
import '../styles/Footer.css'; // Create a CSS file for styling

const Footer = () => {
  // return (
  //   <div className="footer">
  //     <div className="footer-content">
  //       <p className='tbl'>&copy; {new Date().getFullYear()} Tropical Bank Limited</p>
  //       <div className="footer-links">
  //         <div><a href="/">Home</a></div>
  //         <div><a href="/about">About</a></div>
  //         <div><a href="/contact">Contact</a></div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="footer">
      <div className="footer-item">Tropical Bank</div>
      <div className="footer-item">Home</div>
      <div className="footer-item">About</div>
    </div>
  );
};

export default Footer;
