import React from "react";

export default function Footer() {
  return (
    <div className="bg-gray-800 text-gray-300 py-4 w-full">
      {/* <h1>fasdfasdfas</h1> */}
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm ml-4">
            © 2024 Book Store Tuan Anh. All rights reserved.
          </p>
          <div className="flex flex-row mr-10 gap-4 ">
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
    </div>
  );
}
