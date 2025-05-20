// --- File: src/constants.js ---

/**
 * @file constants.js
 * @description Defines constant values used throughout the application,
 * based on the official guidelines document.
 */

// Example ID Types for Reporting Person (FR-01 (11))
export const REPORTING_PERSON_ID_TYPES = [
    { code: 1, description: 'תעודת זהות' },
    { code: 2, description: 'דרכון' },
    { code: 3, description: 'תעודת מסע' },
    // Add other relevant codes from guidelines if needed (e.g., 21, 22, 23 from XSD section)
    { code: 99, description: 'אחר' },
  ];
  
  // Example Phone Types (FR-01 (7) & FR-04.1 (27)) - Based on XSD 5.1.4
  export const PHONE_TYPES = [
      { code: 1, description: 'נייח' },
      { code: 2, description: 'פקס' },
      { code: 3, description: 'נייד' },
  ];
  
  // Example Email Types (FR-01 (8) & FR-04.1 (29)) - Based on XSD 5.1.3
  export const EMAIL_TYPES = [
      { code: 1, description: 'פרטי' },
      { code: 2, description: 'עבודה' },
      { code: 3, description: 'לא ידוע' },
  ];
  
  // Example ISO Country Codes (Simplified) - A full list would be needed
  export const COUNTRY_CODES = [
      { code: 'IL', name: 'Israel' },
      { code: 'US', name: 'United States' },
      { code: 'GB', name: 'United Kingdom' },
      // Add more countries as needed
  ];
  
  // Report Status Codes (FR-04 (20))
  export const REPORT_STATUS_CODES = [
      { code: 1, description: 'דיווח חדש' },
      { code: 2, description: 'השלמה לדיווח שנשלח בעבר לרשות' },
      { code: 3, description: 'המשך לדיווח שנשלח בעבר לרשות' },
      { code: 4, description: 'קשור לדיווח שנשלח בעבר לרשות' },
  ];
  
  // Related Report Relation Types (FR-03 (2))
  export const RELATED_REPORT_RELATION_TYPES = [
      { code: 2, description: 'השלמה לדיווח שנשלח בעבר לרשות' },
      { code: 3, description: 'המשך לדיווח שנשלח בעבר לרשות' },
      { code: 7, description: 'קשור לדיווח שנשלח בעבר לרשות' }, // Note: Code 7 used in spec table, XSD shows 4? Verify. Using 7 based on spec table.
  ];
  
  // Reporting Reason Codes (FR-04 (2))
  export const REPORTING_REASONS = [
      { code: 1, description: 'ניסיון למנוע, או הימנעות מדיווח' },
      { code: 2, description: 'ניסיון להסתיר, או הסתרה של זהות המעורבים' },
      { code: 3, description: 'פעילות מול אזורים בסיכון' },
      { code: 4, description: 'פעילות שנראה כי הינה בעלת זיקה לפעילות פלילית' },
      { code: 5, description: 'פעילות שנראה כי הינה בעלת זיקה לפעילות מימון טרור' },
      { code: 6, description: 'פעילות שלא בהתאם לפרופיל לקוח, לרבות פעילות שאינה תואמת ל- KYC' },
      { code: 7, description: 'חוסר סבירות כלכלית של הפעולה ו/או היעדר הסבר סביר' },
      { code: 8, description: 'פעולות במזומן - תדירות גבוהה, או סכומים גבוהים' },
      { code: 9, description: 'נראה כי הפעילות מבוצעת עבור אחר' },
      { code: 10, description: 'פעילות הנחזית להיות פיקטיבית' },
      { code: 11, description: 'פעילות בלתי רגילה בנכסים וירטואליים' },
      { code: 99, description: 'פעילות בלתי רגילה אחרת' },
  ];
  
  // Report Keyword Codes (FR-04 (5))
  export const REPORT_KEYWORDS = [
      { code: 301, description: 'דחיפות מיוחדת' },
      { code: 302, description: 'דיווח לרשויות אכיפה' },
      { code: 303, description: 'ניסיון לביצוע פעולה' },
      { code: 304, description: 'עבירת מקור' },
      { code: 305, description: 'איש ציבור' },
      { code: 306, description: 'עבירות מס' },
      { code: 203, description: 'מימון טרור' },
      { code: 1, description: 'ארגון פשיעה' },
      { code: 31, description: 'סחר בסמים' },
      { code: 14, description: 'הימורים' },
      { code: 300, description: 'תחום בסיכון אחר' },
  ];
  
  // Additional Authority Codes (FR-04 (7))
  export const ADDITIONAL_AUTHORITIES = [
      { code: 1, description: 'משטרה' },
      { code: 2, description: 'משרד ביטחון' },
      { code: 3, description: 'שירות הביטחון הכללי' },
      { code: 4, description: 'גורם אכיפה אחר' },
  ];
  
  // Transaction Committed Options (FR-04 (10))
  export const TRANSACTION_COMMITTED_OPTIONS = [
      { code: 1, description: 'כן (הדיווח מכיל פעולות)' }, // Value '1' for true
      { code: 0, description: 'לא (הדיווח לא מכיל פעולות)' }, // Value '0' for false
  ];
  
  
  // Add other constants here as needed