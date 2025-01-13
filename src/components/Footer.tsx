import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-white py-4 mt-10">
      <div className="container mx-auto flex flex-col justify-center items-center">
        {/* Left Section */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Currency Converter. All Rights Reserved.
        </p>

       
        
      </div>
    </footer>
  );
};

export default Footer;