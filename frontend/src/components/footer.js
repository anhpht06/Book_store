import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4 absolute bottom-0 w-full" >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <p className="text-sm">
            © 2024 Book Store Tuan Anh. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Contact
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
