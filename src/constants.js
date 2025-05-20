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

// Transaction Committed Options (FR-04 (10)) - For IrregularReportEvent.TransactionCommitted
export const EVENT_TRANSACTION_COMMITTED_OPTIONS = [
    { code: 1, description: 'כן (הדיווח מכיל פעולות)' }, // Value '1' for true
    { code: 0, description: 'לא (הדיווח לא מכיל פעולות)' }, // Value '0' for false
];

// --- Constants for Involved Entities (Step 5) ---

// Entity Relation to Event Codes (Spec Table 3.4.1, Field 1)
export const ENTITY_EVENT_RELATIONS = [
    { code: 1, description: 'נשוא הידיעה' },
    { code: 2, description: 'קשור לנשוא הידיעה' },
    { code: 3, description: 'בן לוויה' },
    { code: 4, description: 'שותף עסקי' },
    { code: 5, description: 'בעלים' },
    { code: 8, description: 'מיופה כח' },
    { code: 9, description: 'נהנה' },
    { code: 10, description: 'ערב' },
    { code: 11, description: 'בעל שליטה בתאגיד' },
    { code: 13, description: 'מוטב' },
    { code: 15, description: 'נאמן' },
    { code: 19, description: 'קרוב משפחה' },
    { code: 21, description: 'צד לפעולה' },
    { code: 22, description: 'בעל עניין בחברה' },
    { code: 23, description: 'בעל מניות' },
    { code: 24, description: 'אחר' },
    { code: 33, description: 'ג. קשור' },
    { code: 34, description: 'נושה' },
    { code: 51, description: 'נש"פ באמצעותו בוצעה הפעולה' },
];

// Person ID Types (Spec Table 3.4.1, Field 4 - for Persons)
export const PERSON_ID_TYPES = [
    { code: 1, description: 'תעודת זהות' },
    { code: 2, description: 'דרכון לאומי' },
    { code: 3, description: 'תעודת מסע' },
    { code: 4, description: 'מספר כרטיס מגנטי שהנפיק המינהל האזרחי' },
    // Codes 21,22,23 from XSD are also relevant for "תעודת מסע" variants
    { code: 99, description: 'אחר' },
];

// Corporate ID Types (Spec Table 3.4.1, Field 4 - for Corporates)
export const CORPORATE_ID_TYPES = [
    { code: 10, description: 'חברה ישראלית (למעט חל"צ)' },
    { code: 11, description: 'חברה זרה רשומה בישראל' },
    { code: 12, description: 'חברה זרה' },
    { code: 13, description: 'חברה לתועלת הציבור (חל"צ)' },
    { code: 14, description: 'שותפות' },
    { code: 15, description: 'עמותה' },
    { code: 16, description: 'אגודה עותומנית' },
    { code: 17, description: 'אגודה שיתופית' },
    { code: 18, description: 'מפלגה' },
    { code: 19, description: 'הקדש' },
    { code: 20, description: 'חסר ישות (שע"מ)' }, // Should this be here or a separate category?
    { code: 99, description: 'אחר' },
];

// Gender Codes (Spec Table 3.4.1, Field 12)
export const GENDER_CODES = [
    { code: 1, description: 'זכר' },
    { code: 2, description: 'נקבה' },
    { code: 99, description: 'אחר' },
];

// Residence Status Codes (Spec Table 3.4.1, Field 14)
// Differentiated for Person/Corporate for clarity in forms
export const PERSON_RESIDENCE_STATUS_CODES = [
    { code: 1, description: 'תושב' },
    { code: 2, description: 'תושב חוץ' },
    { code: 6, description: 'תושב אזור' },
    { code: 5, description: 'אחר (למשל מבקש מקלט)' },
];
export const CORPORATE_RESIDENCE_STATUS_CODES = [
    { code: 3, description: 'תאגיד ישראלי' },
    { code: 4, description: 'תאגיד חוץ' },
    { code: 7, description: 'תאגיד אזור' },
    { code: 5, description: 'אחר (למשל ועד בית)' },
];


// Profession Type Codes (Spec Table 3.4.1, Field 17) - Placeholder
// This should be a comprehensive list from CBS.
export const PROFESSION_CODES_EXAMPLE = [
    { code: '1234', description: 'רואה חשבון (דוגמה)' },
    { code: '5678', description: 'עורך דין (דוגמה)' },
    { code: 'xxxx', description: 'לא ידוע/אחר (יש לפרט)' },
];

// Entity to Entity Relation Types (Spec Table 3.4.1.1, Field 2)
export const ENTITY_TO_ENTITY_RELATIONS = [
    { code: 1, description: 'בעלים/בעל מניות' },
    { code: 2, description: 'מורשה חתימה' },
    { code: 3, description: 'נהנה' },
    { code: 4, description: 'בעל שליטה' },
    { code: 6, description: 'יו"ר מועצת המנהלים' },
    { code: 8, description: 'נישואים' },
    { code: 10, description: 'דירקטור' },
    { code: 13, description: 'אח' },
    { code: 15, description: 'אחות' },
    { code: 16, description: 'בן / בת' },
    { code: 17, description: 'חברת בת' },
    { code: 18, description: 'מזכיר/ה' },
    { code: 24, description: 'בעל שליטה בתאגיד נהנה' },
    { code: 25, description: 'משעבד' },
    { code: 26, description: 'אב' },
    { code: 27, description: 'אם' },
    { code: 28, description: 'בן/בת זוג' },
    { code: 29, description: 'דירקטור לשעבר' },
    { code: 30, description: 'אחר' },
    { code: 32, description: 'בעל שליטה בתאגיד מיופה כח' },
    { code: 36, description: 'מיופה כח (כללי)' },
    { code: 37, description: 'שותף' },
    { code: 38, description: 'מייסד' },
    { code: 39, description: 'חברת אם' },
    { code: 40, description: 'אפוטרופוס' },
    { code: 41, description: 'נאמן' },
    { code: 42, description: 'חברה נכדה' },
    { code: 43, description: 'יוצר נאמנות' },
];

// --- Constants for Related Accounts (Step 6) ---

// Account Relation to Event Codes (Spec Table 3.4.2, Field 1)
export const ACCOUNT_EVENT_RELATIONS = [
    { code: 1, description: 'חשבון נשוא הידיעה' },
    { code: 2, description: 'חשבון קשור' },
    { code: 4, description: 'חשבון נגדי' },
    { code: 5, description: 'חשבון משועבד/משמש כבטוחה' },
    { code: 6, description: 'אחר' },
];

// Financial Institute Types (Spec Table 3.4.2, Field 3)
export const FINANCIAL_INSTITUTE_TYPES = [
    { code: 1, description: 'בנק' },
    { code: 6, description: 'בנק הדואר' },
    { code: 33, description: 'מוסדות פיננסים בחו"ל' },
    { code: 34, description: 'ארנקים דיגיטליים' },
];

// Bank Codes (Israel) (Spec Table 3.4.2, Field 5 - for Banks)
export const BANK_CODES = [
    { code: 3, description: 'בנק אש ישראל' },
    { code: 4, description: 'בנק יהב לעובדי המדינה' },
    { code: 10, description: 'בנק לאומי' },
    { code: 11, description: 'בנק דיסקונט' },
    { code: 12, description: 'בנק הפועלים' },
    { code: 13, description: 'בנק איגוד' },
    { code: 14, description: 'בנק אוצר החייל' },
    { code: 17, description: 'בנק מרכנתיל דיסקונט' },
    { code: 18, description: 'וואן זירו הבנק הדיגיטלי' },
    { code: 20, description: 'בנק מזרחי טפחות' },
    { code: 22, description: 'Citibank N.A' },
    { code: 23, description: 'HSBC' },
    { code: 26, description: 'יובנק בע"מ' },
    { code: 27, description: 'בנק Barclays Bank PLC' },
    { code: 31, description: 'הבנק הבינלאומי הראשון' },
    { code: 39, description: 'SBI State Bank of India' },
    { code: 46, description: 'בנק מסד' },
    { code: 52, description: 'בנק פועלי אגודת ישראל' },
    { code: 54, description: 'בנק ירושלים' },
];
export const POST_BANK_CODE = { code: 9, description: 'בנק הדואר' }; // Specific for Post Bank

// Account Types for Foreign/Digital (Spec Table 3.4.2, Field 13)
export const FOREIGN_ACCOUNT_TYPES = [
    { code: 1, description: 'בנק' },
    { code: 10, description: 'קרן נאמנות' },
    { code: 3, description: 'קזינו/בית הימורים' },
    { code: 4, description: 'MSB' },
    { code: 5, description: 'כרטיס חיוב' },
    { code: 6, description: 'זירת סוחר' },
    { code: 7, description: 'ביטוח' },
    { code: 77, description: 'חבר בורסה' },
    { code: 99, description: 'אחר' },
];
export const DIGITAL_WALLET_TYPES = [
    { code: 1, description: 'קסטודי' },
    { code: 2, description: 'לא קסטודי/פרטי' },
    { code: 3, description: 'לא ידוע' },
    { code: 99, description: 'אחר' },
];

// Money Transfer Code Types (Spec Table 3.4.2, Field 16)
export const MONEY_TRANSFER_CODE_TYPES = [
    { code: 1, description: 'IBAN' },
    { code: 2, description: 'BIC' },
    { code: 3, description: 'אחר' },
];

// Entity to Account Relation Types (Based on Appendix B - Simplified for now)
// This list needs to be dynamically generated or filtered based on AccountType selected in the form.
// For now, a general list.
export const ENTITY_ACCOUNT_RELATIONS_BANK = [
    { code: 1, description: 'בעלים' },
    { code: 2, description: 'מורשה חתימה' },
    { code: 3, description: 'נהנה' },
    { code: 8, description: 'כונס נכסים' },
    { code: 11, description: 'מיופה כח' },
    { code: 13, description: 'אחר' },
    { code: 104, description: 'ערב' },
    { code: 107, description: 'נאמן' },
    { code: 108, description: 'אפוטרופוס' },
    { code: 117, description: 'מורשה לקבלת מידע' },
];
export const ENTITY_ACCOUNT_RELATIONS_POST_BANK = [
    { code: 1, description: 'בעלים' },
    { code: 2, description: 'מורשה חתימה' },
    { code: 3, description: 'מיופה כח' },
    { code: 5, description: 'נהנה' },
    { code: 9, description: 'נאמן' },
    { code: 10, description: 'אפוטרופוס טבעי' },
    { code: 11, description: 'אחר' },
    { code: 12, description: 'מורשה לקבלת מידע' },
    { code: 13, description: 'כונס נכסים' },
    { code: 14, description: 'ערב' },
];
export const ENTITY_ACCOUNT_RELATIONS_FOREIGN_DIGITAL = [
    { code: 1, description: 'בעלים' },
    { code: 2, description: 'מורשה חתימה' },
    { code: 3, description: 'מיופה כח' },
    { code: 4, description: 'מורשה לקבלת מידע' },
    { code: 5, description: 'כונס נכסים' },
    { code: 6, description: 'נהנה' },
    { code: 7, description: 'ערב (חו"ל)' }, // Different from Bank/Post bank 'ערב'
    { code: 8, description: 'נאמן (חו"ל)' },
    { code: 9, description: 'אפוטרופוס (חו"ל)' },
    { code: 99, description: 'אחר' },
];

// --- Constants for Pledges (Step 7) ---

// Pledge Types (Spec Table 3.4.3, Field 1)
export const PLEDGE_TYPES = [
    { code: 1, description: 'שיק' },
    { code: 2, description: 'נדל"ן' },
    { code: 3, description: 'כלי תחבורה' },
    { code: 4, description: 'אחר' },
];

// Secondary Pledge Types (Spec Table 3.4.3, Field 3) - Grouped by primary type
export const SECONDARY_PLEDGE_TYPES_CHEQUE = [
    { code: 1, description: 'שיק' }, // As per document
    { code: 99, description: 'אחר (לשיק)' }
];
export const SECONDARY_PLEDGE_TYPES_REAL_ESTATE = [
    { code: 1, description: 'מגרש' },
    { code: 2, description: 'רכוש משותף' },
    { code: 3, description: 'תת חלקה' },
    { code: 4, description: 'מחובר' },
    { code: 99, description: 'אחר (לנדל"ן)' }
];
export const SECONDARY_PLEDGE_TYPES_VEHICLE = [
    { code: 1, description: 'רכב' },
    { code: 2, description: 'ציוד מכני הנדסי (צמ"ה)' },
    { code: 3, description: 'טיס' },
    { code: 4, description: 'שיט' },
    { code: 99, description: 'אחר (לכלי תחבורה)' }
];
export const SECONDARY_PLEDGE_TYPES_OTHER = [ // For Primary Pledge Type 'Other'
    { code: 1, description: 'אחר (כללי)' }
];

// Real Estate Right Types (Spec Table 3.4.3, Field 18)
export const REAL_ESTATE_RIGHT_TYPES = [
    { code: 1, description: 'בעלות' },
    { code: 2, description: 'חכירה' },
    { code: 3, description: 'משכנתה' },
    { code: 4, description: 'הערה' },
    { code: 5, description: 'זיקת הנאה' },
    { code: 6, description: 'הערת אזהרה' },
    { code: 7, description: 'זכות קדימה' },
    { code: 8, description: 'נכס' }, // This seems generic, clarify if needed
    { code: 99, description: 'אחר' },
];

// Entity to Pledge Relation Types (Spec Table 3.4.3.2, Field 2)
export const ENTITY_PLEDGE_RELATIONS = [
    { code: 1, description: 'בעלים של בטוחה' },
    { code: 2, description: 'מוטב בבטוחה (לשיק בלבד)' },
    { code: 3, description: 'אחר' },
];

// --- Constants for Transactions and Assets (Step 8) ---

// Transaction Action Indication (Spec Table 3.4.4, Field 1)
export const TRANSACTION_ACTION_INDICATIONS = [
    { code: 1, description: 'בוצע' }, // True
    { code: 0, description: 'לא בוצע (ניסיון)' }, // False
];

// Reported Before Options (Spec Table 3.4.4, Field 2)
export const REPORTED_BEFORE_OPTIONS = [
    { code: 1, description: 'דווח בדיווח רגיל' },
    { code: 0, description: 'לא דווח' },
];

// Transaction Types (Appendix A, Spec Table 3.4.4, Field 5)
export const TRANSACTION_TYPES = [
    { code: 1, description: 'המרת מטבע של מדינה אחת במטבע של מדינה אחרת' },
    { code: 2, description: 'מכירה של המחאות נוסעים בכל סוג של מטבע' },
    { code: 3, description: 'פדיון של המחאות נוסעים בכל סוג של מטבע' },
    { code: 4, description: 'קבלת נכסים פיננסיים במדינה אחת כנגד העמדת נכסים פיננסיים במדינה אחרת' },
    { code: 5, description: 'החלפת מטבע' },
    { code: 6, description: 'ניכיון שיקים, שטרי חליפין ושטרי חוב' },
    { code: 7, description: 'שירותי ניכיון כרטיס חיוב' },
    { code: 8, description: 'מסירת נכסים פיננסיים לאדם כנגד המחאת זכותו (פקטורינג)' },
    { code: 9, description: 'מתן אשראי אגב רכישת נכס או שירות (כגון ליסינג)' },
    { code: 10, description: 'החזר אשראי שניתן אגב רכישת נכס או שירות (כגון ליסינג)' },
    { code: 11, description: 'מתן אשראי (לרבות הלוואה)' },
    { code: 12, description: 'החזר אשראי (לרבות החזר הלוואה)' },
    { code: 13, description: 'החלפה של נכס פיננסי בנכס פיננסי אחר' },
    { code: 14, description: 'העברה של נכס פיננסי' },
    { code: 15, description: 'העברת נכס פיננסי מ-מפעיל מערכת לתיווך באשראי אל מקבל השירות' },
    { code: 16, description: 'העברת נכס פיננסי מ-מקבל השירות אל מפעיל מערכת לתיווך באשראי' },
    { code: 17, description: 'העברת נכס פיננסי מ-מפעיל מערכת לתיווך באשראי אל מקבל השירות אגב רכישת נכס או שירות' },
    { code: 18, description: 'העברת נכס פיננסי מ-מקבל השירות אל מפעיל מערכת לתיווך באשראי אגב רכישת נכס או שירות' },
    { code: 99, description: 'אחר' },
];

// Credit Purpose Types (Spec Table 3.4.4, Field 17)
export const CREDIT_PURPOSE_TYPES = [
    { code: 1, description: 'רכישת רכב' },
    { code: 2, description: 'רכישת נדל"ן/השקעה בנדל"ן' },
    { code: 3, description: 'מימון לימודים' },
    { code: 4, description: 'שיפוצים' },
    { code: 5, description: 'סגירת חוב' },
    { code: 6, description: 'אירוע משפחתי' },
    { code: 7, description: 'טיסה מחוץ לישראל' },
    { code: 8, description: 'הלוואת גישור' },
    { code: 9, description: 'רכישת ציוד' },
    { code: 10, description: 'יבוא' },
    { code: 11, description: 'אשראי עסקי (שאינו אחת מהמטרות שנמנו מעלה)' },
    { code: 99, description: 'אחר /מידע נוסף' },
];

// Provider Transaction Types (for Card Discounting - Spec Table 3.4.4, Field 20)
export const PROVIDER_TRANSACTION_TYPES = [
    { code: 1, description: 'רגילה' },
    { code: 2, description: 'תשלומים' },
];

// Defrayal Company License IDs (Spec Table 3.4.4, Field 21)
export const DEFRAYAL_COMPANY_IDS = [
    { code: 12002, description: 'ישראכרט' },
    { code: 10023, description: 'כאל' },
    { code: 10033, description: 'MAX (מקס איט)' },
    { code: 12011, description: 'פרימיום אקספרס' },
    { code: 51388, description: 'טרנזילה' },
    { code: 60001, description: 'קארדקום' },
];

// Financial Asset Types (Spec Table 3.4.4, Field 29)
export const FINANCIAL_ASSET_TYPES = [
    { code: 1, description: 'שיק' },
    { code: 2, description: 'שטר חוב' },
    { code: 3, description: 'שטר חליפין' },
    { code: 4, description: 'מניה ע"ש בלווית כתב ערובה' },
    { code: 5, description: 'מניה למוכ"ז' },
    { code: 6, description: 'אגרת חוב ע"ש בלווית כתב העברה' },
    { code: 7, description: 'אגרת חוב למוכ"ז' },
    { code: 8, description: 'כתב אופציה' },
    { code: 9, description: 'פקדון כספי' },
    { code: 10, description: 'העברה בנקאית בארץ' },
    { code: 11, description: 'העברה בנקאית בינלאומית' },
    // Code 12 is 'אשראי' and seems to be removed/not used for NSHAPIM, based on note "קוד 12 מבוטל"
    { code: 13, description: 'אחר' },
    { code: 14, description: 'כרטיס חיוב' },
    { code: 15, description: 'המחאת זכות' },
    { code: 16, description: 'לוחית/חפץ שניתן לצבור בהם ערך כספי' },
    { code: 17, description: 'מטבע וירטואלי' },
    { code: 18, description: 'העברה אלקטרונית (לא כולל קודים 10 ו-11)' },
    { code: 19, description: 'ניהול או שמירה בכספת' },
    { code: 20, description: 'זיכוי או חיוב כרטיס מקבל השירות או גורם אחר' },
    { code: 21, description: 'מזומנים' },
    { code: 22, description: 'המחאת נוסעים' },
];

// Financial Asset Status (Spec Table 3.4.4, Field 32)
export const FINANCIAL_ASSET_STATUS_OPTIONS = [
    { code: 1, description: 'התקבל (אצל המדווח)' },
    { code: 2, description: 'נמסר/הועמד (על ידי המדווח)' },
];

// Credit Card Brands (Spec Table 3.4.4, Field 37)
export const CREDIT_CARD_BRANDS = [
    { code: 1, description: 'ויזה' },
    { code: 2, description: 'מסטרקארד' },
    { code: 3, description: 'דיינרס' },
    { code: 4, description: 'אמריקן אקספרס (אמקס)' },
    { code: 5, description: 'ישראכרט' },
    { code: 6, description: 'Union pay' },
    { code: 99, description: 'אחר' },
];

// Entity to Transaction Relation Types (Appendix C, Spec Table 3.4.4.1, Field 2)
export const ENTITY_TRANSACTION_RELATIONS = [
    { code: 6, description: 'מקבל שירות' },
    { code: 7, description: 'מקבל שירות שהוא מחזיר האשראי (שאינו מקבל האשראי)' },
    { code: 9, description: 'מיופה כח' },
    { code: 11, description: 'נהנה' },
    { code: 13, description: 'ערב' },
    { code: 14, description: 'מעמיד האשראי (אם אינו המדווח/SPC) - תיאום מראש' },
    { code: 15, description: 'מקבל שירות שהוא לווה (מערכת תיווך באשראי)' },
    { code: 16, description: 'מקבל שירות שהוא מלווה (מערכת תיווך באשראי)' },
    { code: 17, description: 'מקבל שירות שהאשראי מוחזר אליו (ואינו מלווה)' },
    { code: 18, description: 'מעמיד האשראי המקורי (אם אינו המדווח/SPC) - תיאום מראש' },
    { code: 19, description: 'מעביר' },
    { code: 20, description: 'נעבר' },
    { code: 21, description: 'הנש"פ באמצעותו בוצעה הפעולה' },
    { code: 99, description: 'מקבל שירות - אחר' },
];

// Entity to Financial Asset Relation Types (Spec Table 3.4.4.2, Field 2)
// This is a simplified list; the actual codes are conditional on the asset type.
export const ENTITY_ASSET_RELATIONS_GENERAL = [
    { code: 1, description: 'בעל החשבון/נכס' },
    { code: 2, description: 'המוטב' },
    { code: 3, description: 'הנמשך' }, // For Cheque
    { code: 4, description: 'נסב' }, // For Cheque, Traveler's Cheque
    { code: 5, description: 'חייב' }, // For Assignment of Right
    { code: 6, description: 'מעביר' }, // For Transfers, Virtual Currency
    { code: 7, description: 'נעבר' }, // For Transfers, Virtual Currency
    { code: 8, description: 'מחזיק כרטיס החיוב' }, // For Card, Plate
    { code: 99, description: 'אחר' },
];

// --- Constants for Attachments (Step 9) ---
// Attachment Document Types (Spec Table 3.4.5, Field 2)
export const ATTACHMENT_DOCUMENT_TYPES = [
    { code: 1, description: 'הצהרת מקבל שירות' },
    { code: 2, description: 'מסמכי זיהוי' },
    { code: 3, description: 'ייפוי כוח או כתב נאמנות' },
    { code: 4, description: 'רישום התאגיד המשפטי' },
    { code: 5, description: 'מורשה חתימה ו/או מיופה כוח ו/או בעל שליטה בתאגיד ו/או נהנה' },
    { code: 6, description: 'צילום של השיק המנוכה' },
    { code: 7, description: 'המחאת זכות' },
    { code: 8, description: 'מסמכי העברה (SWIFT, שוברי העברה)' },
    { code: 9, description: 'מסמכי הכר את הלקוח' },
    { code: 10, description: 'רשימת המוטבים' },
    { code: 11, description: 'רשימת ערבים' },
    { code: 12, description: 'מסמכי אימות' },
    { code: 13, description: 'מסמכי הלוואה' },
    { code: 14, description: 'בטוחות להלוואה' },
    { code: 15, description: 'פלט מתוכנת ניהול וניטור פנימי (לדוגמא ציינאלסיס, מפת קשרים וכיוצ"ב)' },
    { code: 16, description: 'טבלת פעולות' },
    { code: 99, description: 'אחר' },
];