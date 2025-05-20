// --- File: src/components/shared/TextAreaField.js ---
  
  /**
   * @file TextAreaField.js
   * @description Reusable textarea field component.
   */
  import React from 'react';
  
  const TextAreaField = ({ label, id, value, onChange, required = false, placeholder = '', error = null, className = '', rows = 4, name }) => (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={name || id}
        rows={rows}
        value={value ?? ''}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
  
  export default TextAreaField;