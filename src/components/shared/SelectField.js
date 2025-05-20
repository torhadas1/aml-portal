// --- File: src/components/shared/SelectField.js ---
  
  /**
   * @file SelectField.js
   * @description Reusable select dropdown component with label, validation, and styling.
   */
  
  import React from 'react';
  
  const SelectField = ({ label, id, value, onChange, options, required = false, placeholder = 'Select...', error = null, className = '', name }) => (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name || id} // Use name prop if provided, otherwise fallback to id
        value={value ?? ''} // Ensure value is never undefined/null for controlled select
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(option => (
          <option key={option.code} value={option.code}>
            {/* Display description or name, fallback to code */}
            {option.description || option.name || option.code}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
  
  export default SelectField;