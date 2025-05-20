 // --- File: src/components/shared/InputField.js ---
  
  /**
   * @file InputField.js
   * @description Reusable input field component with label, validation, and styling.
   */
  
  import React from 'react';
  
  const InputField = ({ label, id, type = 'text', value, onChange, required = false, placeholder = '', error = null, className = '', readOnly = false, name }) => (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name || id} // Use name prop if provided, otherwise fallback to id
        value={value ?? ''} // Ensure value is never undefined/null for controlled input
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'} ${readOnly ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
  
  export default InputField;