import React from "react";
import { Link } from "react-router-dom";
import BtnWhite from "../ui/BtnWhite";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0f266c] to-[#007bff] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">IP</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              Internship Platform
            </span>
          </div>
          <p className="text-gray-600">
            Building the next generation of tech talent
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © 2025 Internship Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
