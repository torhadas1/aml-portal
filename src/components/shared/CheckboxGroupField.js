// --- File: src/components/shared/CheckboxGroupField.js ---
  
  /**
   * @file CheckboxGroupField.js
   * @description Reusable component for a group of checkboxes.
   */
  import React from 'react';
  
  const CheckboxGroupField = ({ label, options, selectedCodes = [], onChange, name, error = null, required = false }) => {
      const handleChange = (e) => {
          const { value, checked } = e.target;
          // Value from checkbox is usually string, convert to number if codes are numbers
          const code = parseInt(value, 10);
          onChange(name, code, checked); // Pass name, code, and checked status up
      };
  
      return (
          <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
              </label>
              <div className="mt-2 space-y-2 p-3 border border-gray-200 rounded-md max-h-60 overflow-y-auto">
                  {options.map((option) => (
                      <div key={option.code} className="flex items-center">
                          <input
                              id={`${name}-${option.code}`}
                              name={`${name}-${option.code}`} // Unique name per checkbox might be better
                              type="checkbox"
                              value={option.code}
                              checked={selectedCodes.includes(option.code)}
                              onChange={handleChange}
                              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <label htmlFor={`${name}-${option.code}`} className="ml-2 block text-sm text-gray-900">
                              {option.description || option.name}
                          </label>
                      </div>
                  ))}
              </div>
               {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          </div>
      );
  };
  
  export default CheckboxGroupField;