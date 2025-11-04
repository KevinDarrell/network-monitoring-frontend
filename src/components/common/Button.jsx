import React from 'react';

export default function Button({ children, type = 'submit', loading = false, className = "", ...props }) {
  return (
    <button 
      type={type} 
      disabled={loading} 
      className={`w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`} 
      {...props}
    >
      {loading ? 'Menyimpan...' : children}
    </button>
  );
}