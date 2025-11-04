import React from 'react';

export default function PageHeader({ title }) {
  return (
    <header className="bg-white shadow-md p-6 rounded-lg -mt-16 -mx-8 mb-8 sticky top-0">
       <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </header>
  );
}