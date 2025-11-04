import React from 'react';

export default function FormSelect({ label, id, value, onChange, children, ...props }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select 
        id={id} 
        value={value} 
        onChange={onChange} 
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        {...props}
      >
        {children}
      </select>
    </div>
  );
}