```markdown
# Irregular Report Generation Portal (IMPA Compliance)

## Description

This project is a client-side React web application designed to help users, particularly financial service providers (נש"פים - Netafim), generate structured XML reports for irregular financial activities. These reports must comply with the format mandated by the Israeli Money Laundering and Terror Financing Prohibition Authority (IMPA), as detailed in the "הנחיות דיווח בלתי רגיל מובנה של נותני שירותים פיננסים" document.

The primary goal is to simplify the reporting process by providing an interactive, multi-step form. All data input and XML generation occur entirely on the client-side (in the user's browser) to ensure the privacy and security of sensitive financial information. No data is transmitted to or stored on any server.

The application guides users through all necessary data entry sections and, upon completion, allows them to download the generated XML file in the precise format required for submission.

## Key Features

* **Interactive Multi-Step Form:** A user-friendly wizard interface guides users through the complex data entry requirements for the irregular report.
* **Client-Side Data Handling:** All data input, processing, and XML generation happen within the user's browser. No sensitive information is stored or transmitted externally.
* **Structured XML Generation:** Dynamically generates an XML file strictly adhering to the IMPA XSD specifications.
* **Downloadable Reports:** Users can download the generated XML file (`IrregularReport-<ReportNumber>.xml`) for submission.
* **Modular Component Structure:** Built with React, using a clear separation of concerns for maintainability.
* **State Management:** Utilizes Zustand for efficient and predictable global state management of the report data.
* **Styled with Tailwind CSS:** Modern and responsive user interface.

## Tech Stack

* **Frontend:** React (using functional components and hooks)
* **State Management:** Zustand
* **Styling:** Tailwind CSS
* **XML Handling:** Native JavaScript (with Immer for state updates)
* **Deployment:** Designed for static site deployment (e.g., GitHub Pages) and embedding via iframe.

## Project Structure Overview


aml-portal/
├── public/                 # Static assets and index.html
├── src/
│   ├── components/
│   │   ├── layout/         # Wizard layout component
│   │   ├── shared/         # Reusable form components (InputField, SelectField, etc.)
│   │   └── steps/          # Components for each step of the report wizard
│   ├── store/
│   │   └── useReportStore.js # Zustand store for global state management
│   ├── utils/
│   │   ├── xmlGenerator.js   # Logic for generating the XML report
│   │   └── downloadUtils.js  # Helper for downloading files
│   ├── constants.js        # Application-wide constants (dropdown options, codes)
│   ├── App.js              # Main application component, routing/step management
│   ├── index.js            # Entry point for the React application
│   └── ...                 # Other React files
├── .gitignore
├── package.json
└── README.md


## Setup and Local Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

1.  **Clone the repository:**
    bash
    git clone <repository-url>
    cd aml-portal
    

2.  **Install dependencies:**
    bash
    npm install
    

3.  **Run the application:**
    bash
    npm start
    
    This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits.

## Usage

1.  Open the application in your web browser.
2.  Navigate through the multi-step form, entering the required information for the irregular report in each section.
3.  The application is divided into logical steps corresponding to the sections of the official IMPA guidelines:
    * Reporter Details
    * General Report Details
    * Related Reports
    * Event Details & Content
    * Involved Entities (Persons & Corporates)
    * Related Accounts (Bank/Post & Foreign/Digital)
    * Pledges/Collateral
    * Transactions & Assets
    * Attachments (Metadata)
    * Review & Generate
4.  On the final "Review & Generate" step, review the summary of the entered data.
5.  Click the "הפק דוח XML" (Generate XML Report) button.
6.  An XML file named `IrregularReport-<ReportNumber>.xml` will be downloaded to your computer.
7.  This XML file, along with any actual attachment files (which should be placed in an "Attachments" folder), needs to be bundled into a ZIP file according to the IMPA submission guidelines.

**Important Note on Privacy:** This application operates entirely on the client-side. No data you enter is sent to any server or stored by this application after you close the browser tab/window.

## Future Considerations / TODO (MVP Enhancements)

* **Comprehensive Client-Side Validation:** Implement robust validation for all fields based on data types, lengths, formats, and conditional requirements from the IMPA guidelines.
* **Completeness of Constants:** Ensure all dropdown options (codes from appendices) in `constants.js` are exhaustive and accurate.
* **Enhanced Relationship Linking UI:**
    * Implement selection of existing entities for entity-to-entity relationships.
    * Implement linking of attachments (from Step 9) to pledges and financial assets.
* **XML Output Testing:** Rigorously test generated XML against the official IMPA XSDs.
* **UX Refinements:** Improve usability for managing lists of complex items, add tooltips, and enhance the Review step.
* **Error Handling:** More granular error handling during data input and XML generation.

```
