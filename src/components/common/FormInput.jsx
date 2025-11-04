import React from 'react';

export default function FormInput({ label, id, value, onChange, ...props }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input 
        id={id} 
        value={value} 
        onChange={onChange} 
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        {...props} 
      />
    </div>
  );
}