import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; {currentYear} Travel Itinerary Planner</p>
      <div className="flex justify-center mt-2">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4"
        >
          <img
            src="/icons/instagram-icon.png"
            alt="Instagram"
            className="h-6"
          />
        </a>
        <a
          href="https://www.github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/icons/github-icon.png" alt="GitHub" className="h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
