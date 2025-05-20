// --- File: src/utils/xmlGenerator.js ---
  
  /**
   * @file xmlGenerator.js
   * @description Contains logic to generate the XML string from report data,
   * aligned with irregularReport.xsd structure.
   */
  
  // --- XML Generation Helpers ---
  
  /**
   * Escapes special XML characters.
   * @param {*} unsafe - The value to escape. Converts non-strings to strings.
   * @returns {string} The escaped string.
   */
  const escapeXml = (unsafe) => {
    if (unsafe === null || unsafe === undefined) return '';
    const str = String(unsafe);
    return str.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

/**
 * Creates an XML element string. Omits the element if the value is null, undefined, or an empty string.
 * Handles boolean conversion to '0' or '1'.
 * @param {string} name - The element name (including namespace prefix if needed).
 * @param {*} value - The value for the element.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML element string or an empty string.
 */
const createElement = (name, value, indent = '') => {
    let processedValue = value;
    // Handle boolean specifically for relevant fields based on XSD type xs:boolean
    if (typeof value === 'boolean') {
        processedValue = value ? '1' : '0';
    }

    if (processedValue === null || processedValue === undefined || processedValue === '') {
        return ''; // Omit empty/null elements
    }
    if (typeof processedValue === 'number' && !Number.isFinite(processedValue)) {
        return ''; // Omit NaN, Infinity
    }

    return `\n${indent}<${name}>${escapeXml(processedValue)}</${name}>`;
};

/**
 * Creates an XML element for linking using reporterObjId.
 * @param {string} name - The element name (e.g., 'AccountObjID', 'EntityObjID').
 * @param {string} relatedId - The reporterObjId of the linked item.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML element string or an empty string.
 */
const createLinkElement = (name, relatedId, indent = '') => {
    if (!relatedId) return '';
    // XSD uses cns:nonWhitespacesNorBlank, implying value inside tag is correct
    return createElement(name, relatedId, indent);
};


/**
 * Creates a standard Relation block (cns:Relation).
 * @param {object} relation - The relation object { relationTypeID, relatedObjID, relationTypeDesc }.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createRelationBlock = (relation, indent = '') => {
    // relatedObjID is mandatory within cns:Relation according to common.xsd (likely)
    if (!relation || !relation.relationTypeID || !relation.relatedObjID) return '';
    let block = `\n${indent}<cns:Relation>`;
    block += createElement('cns:RelationTypeID', relation.relationTypeID, indent + '  ');
    block += createElement('cns:RelatedObjID', relation.relatedObjID, indent + '  '); // Link via reporterObjId
    // Only include description if it exists (assuming 'Other' types require it)
    if (relation.relationTypeDesc) {
         block += createElement('cns:RelationTypeDesc', relation.relationTypeDesc, indent + '  ');
    }
    block += `\n${indent}</cns:Relation>`;
    return block;
};

/**
 * Creates an Address block (cns:Address).
 * @param {object} address - The address object.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createAddressBlock = (address, indent = '') => {
    if (!address) return '';
    // Check for minimal required fields based on common sense/potential XSD rules
    if (!address.countryID && !address.streetName && !address.cityName && !address.houseNumber) return '';

    let block = `\n${indent}<cns:Address>`;
    // Add reporterObjId if needed by XSD linking mechanisms (unlikely for address?)
    // block += createElement('cns:ReporterObjID', address.reporterObjId, indent + '  ');
    block += createElement('cns:CountryID', address.countryID, indent + '  '); // ens:ISOCountryIDSimp
    block += createElement('cns:CityCode', address.cityCode, indent + '  ');
    block += createElement('cns:CityName', address.cityName, indent + '  ');
    block += createElement('cns:StreetCode', address.streetCode, indent + '  ');
    block += createElement('cns:StreetName', address.streetName, indent + '  ');
    block += createElement('cns:HouseNumber', address.houseNumber, indent + '  ');
    block += createElement('cns:NewZIPCode', address.newZIPCode, indent + '  ');
    block += createElement('cns:ZIPCode', address.zipCode, indent + '  ');
    // Add other fields if present in state/XSD: POBox, AppartmentNumber, StateCode, StateName, RegionCode, RegionName, AddressType
    block += `\n${indent}</cns:Address>`;
    return block;
};

/**
 * Creates a Phone block (cns:Phone).
 * @param {object} phone - The phone object.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createPhoneBlock = (phone, indent = '') => {
    if (!phone || !phone.number) return ''; // Phone number is mandatory
    let block = `\n${indent}<cns:Phone>`;
    // block += createElement('cns:ReporterObjID', phone.reporterObjId, indent + '  ');
    block += createElement('cns:PhoneType', phone.phoneType, indent + '  ');
    block += createElement('cns:Number', phone.number, indent + '  ');
    block += `\n${indent}</cns:Phone>`;
    return block;
};

/**
 * Creates an Email block (cns:Email).
 * @param {object} email - The email object.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createEmailBlock = (email, indent = '') => {
     if (!email || !email.emailAddress) return ''; // Email address is mandatory
    let block = `\n${indent}<cns:Email>`;
    // block += createElement('cns:ReporterObjID', email.reporterObjId, indent + '  ');
    block += createElement('cns:EmailType', email.emailType, indent + '  ');
    block += createElement('cns:EmailAddress', email.emailAddress, indent + '  ');
    block += `\n${indent}</cns:Email>`;
    return block;
};

/**
 * Creates a CurrencyInfo block (cns:CurrencyInfo).
 * @param {object} currencyInfo - The currency info object { sum, currencyType }.
 * @param {string} blockName - The name of the parent block (e.g., 'SumInNis'). NO PREFIX NEEDED HERE.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createCurrencyInfoBlock = (currencyInfo, blockName, indent = '') => {
    // SumInNis, SumInOriginalCurrency etc. are defined in targetNamespace within IrRegularTransaction
    if (!currencyInfo || currencyInfo.sum === null || currencyInfo.sum === undefined || !currencyInfo.currencyType) return '';
    let block = `\n${indent}<${blockName}>`; // No prefix for the wrapper (SumInNis, etc.)
    // Inside, the elements are from cns:CurrencyInfo type
    block += createElement('cns:CurrencyType', currencyInfo.currencyType, indent + '  '); // ens:ISOCurrencyIDSimp
    block += createElement('cns:Sum', currencyInfo.sum, indent + '  '); // Assuming integer sum based on doc
    block += `\n${indent}</${blockName}>`;
    return block;
};

/**
 * Creates a ChequeDetails block (cns:ChequeDetails).
 * @param {object} details - The cheque details object.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createChequeDetailsBlock = (details, indent = '') => {
    if (!details) return '';
    // Check if any relevant field exists
    if (details.chequePaymentDate === null && details.numOfBillTransfers === null) return '';

    let block = `\n${indent}<cns:ChequeDetails>`;
    block += createElement('cns:ChequePaymentDate', details.chequePaymentDate, indent + '  '); // xs:date
    block += createElement('cns:NumOfBillTransfers', details.numOfBillTransfers, indent + '  '); // xs:integer
    block += `\n${indent}</cns:ChequeDetails>`;
    return block;
};

/**
 * Creates a CreditCardDetails block (cns:CreditCardDetails).
 * @param {object} details - The credit card details object.
 * @param {string} [indent=''] - Indentation string.
 * @returns {string} The XML block string.
 */
const createCreditCardDetailsBlock = (details, indent = '') => {
    if (!details) return '';
     // Check if any relevant field exists
     if (details.creditCardBrandID === null && !details.creditCardCountryID && !details.creditCardRemark) return '';

    let block = `\n${indent}<cns:CreditCardDetails>`;
    block += createElement('cns:CreditCardBrandID', details.creditCardBrandID, indent + '  ');
    if (details.creditCardBrandID === 99 && details.creditCardBrandDesc) { // Assuming 99 is 'Other' code
        block += createElement('cns:CreditCardBrandDesc', details.creditCardBrandDesc, indent + '  ');
    }
    block += createElement('cns:CreditCardCountryID', details.creditCardCountryID, indent + '  '); // ens:ISOCountryIDSimp
    block += createElement('cns:CreditCardRemark', details.creditCardRemark, indent + '  ');
    block += `\n${indent}</cns:CreditCardDetails>`;
    return block;
};

// --- Main XML Generation Function ---

export function generateXml(reportData) {
  console.log("Generating XML for:", reportData);
  const indentStep = '  '; // 2 spaces for indentation
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;

  // Define namespaces based on the provided XSD
  const namespaces = `
    xmlns="[http://impa.lego.generic.irr.gov.il](http://impa.lego.generic.irr.gov.il)"
    xmlns:cns="[http://impa.lego.common.simple.gov.il](http://impa.lego.common.simple.gov.il)"
    xmlns:ens="[http://impa.lego.enum.simple.gov.il](http://impa.lego.enum.simple.gov.il)"
    xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)"`;

  xml += `<IrRegularReport ${namespaces} Version="${escapeXml(reportData.version)}">\n`;

  // 1. ReportMetaData (cns:ReportMetaData)
  const meta = reportData.reportMetaData;
  xml += `${indentStep}<cns:ReportMetaData>`; // Element itself is cns:
  // Elements inside ReportMetaData are likely defined in common.xsd without prefix *within that type*
  // xml += createElement('cns:ReporterObjID', meta.reporterObjId, indentStep.repeat(2));
  xml += createElement('cns:ReportNumber', meta.reportNumber, indentStep.repeat(2));
  xml += createElement('cns:ReportType', meta.reportType, indentStep.repeat(2));
  xml += createElement('cns:ReportDate', meta.reportDate, indentStep.repeat(2)); // xs:date
  xml += createElement('cns:ReportDescription', meta.reportDescription, indentStep.repeat(2));
  xml += createElement('cns:ReportStatus', meta.reportStatus, indentStep.repeat(2));
  xml += createElement('cns:ReportClassification', meta.reportClassification, indentStep.repeat(2));
  xml += `\n${indentStep}</cns:ReportMetaData>\n`;

  // 2. IrRegularSourceMetaData (targetNamespace)
  const sourceMeta = reportData.irregularSourceMetaData;
  xml += `${indentStep}<IrRegularSourceMetaData>`; // No prefix
  // xml += createElement('cns:ReporterObjID', sourceMeta.reporterObjId, indentStep.repeat(2)); // Inherited from cns:BaseClass via cns:SourceMetaData
  // Elements inherited from cns:SourceMetaData (check common.xsd)
  xml += createElement('cns:SourceType', sourceMeta.sourceType, indentStep.repeat(2));
  xml += createElement('cns:SourceId', sourceMeta.sourceId, indentStep.repeat(2));
  xml += createElement('cns:BranchId', sourceMeta.branchId, indentStep.repeat(2));
  xml += createElement('cns:SourceName', sourceMeta.sourceName, indentStep.repeat(2));
  // ReportingPerson (targetNamespace)
  const rp = sourceMeta.reportingPerson;
  if (rp) {
      xml += `\n${indentStep.repeat(2)}<ReportingPerson>`; // No prefix
      // xml += createElement('cns:ReporterObjID', rp.reporterObjId, indentStep.repeat(3)); // Inherited from cns:Person via cns:BaseClass
      // Elements inherited from cns:Person
      xml += createElement('cns:IDType', rp.idType, indentStep.repeat(3));
      xml += createElement('cns:IDNumber', rp.idNumber, indentStep.repeat(3));
      xml += createElement('cns:IDCountry', rp.idCountry, indentStep.repeat(3)); // ens:ISOCountryIDSimp
      if (rp.idType === 99 && rp.idTypeDesc) {
          xml += createElement('cns:IDTypeDesc', rp.idTypeDesc, indentStep.repeat(3));
      }
      xml += createElement('cns:FirstName', rp.firstName, indentStep.repeat(3));
      xml += createElement('cns:LastName', rp.lastName, indentStep.repeat(3));
      // Phones (cns:Phones containing cns:Phone)
      if (rp.phones && rp.phones.length > 0 && rp.phones.some(p => p.number)) {
          xml += `\n${indentStep.repeat(3)}<cns:Phones>`;
          rp.phones.forEach(phone => { xml += createPhoneBlock(phone, indentStep.repeat(4)); });
          xml += `\n${indentStep.repeat(3)}</cns:Phones>`;
      }
       // Emails (cns:Emails containing cns:Email)
      if (rp.emails && rp.emails.length > 0 && rp.emails.some(e => e.emailAddress)) {
          xml += `\n${indentStep.repeat(3)}<cns:Emails>`;
           rp.emails.forEach(email => { xml += createEmailBlock(email, indentStep.repeat(4)); });
          xml += `\n${indentStep.repeat(3)}</cns:Emails>`;
      }
      // Element defined specifically in ReportingPerson type (targetNamespace)
      xml += createElement('ReportingPersonRole', rp.reportingPersonRole, indentStep.repeat(3)); // No prefix
      xml += `\n${indentStep.repeat(2)}</ReportingPerson>`;
  }
   // ManagementCompanyID is defined in IrRegularSourceMetaData (targetNamespace)
   // xml += createElement('ManagementCompanyID', sourceMeta.managementCompanyID, indentStep.repeat(2)); // Add if needed
  xml += `\n${indentStep}</IrRegularSourceMetaData>\n`;

  // 3. RelatedReports (targetNamespace)
  if (reportData.relatedReports && reportData.relatedReports.length > 0) {
      xml += `${indentStep}<RelatedReports>`; // No prefix
      reportData.relatedReports.forEach(related => {
          xml += `\n${indentStep.repeat(2)}<RelatedReport>`; // No prefix
          // xml += createElement('cns:ReporterObjID', related.reporterObjId, indentStep.repeat(3)); // Inherited from cns:BaseClass
          xml += createElement('ReportNumber', related.reportNumber, indentStep.repeat(3)); // No prefix
          // RelationsToEvent (cns:ListOfRelations)
          if (related.relationsToEvent && related.relationsToEvent.length > 0) {
              xml += `\n${indentStep.repeat(3)}<RelationsToEvent>`; // No prefix, type is cns:ListOfRelations
              related.relationsToEvent.forEach(rel => {
                   const mainEventId = reportData.irregularReportEvent?.reporterObjId;
                   if(mainEventId) {
                       // createRelationBlock handles cns:Relation structure
                       xml += createRelationBlock({ ...rel, relatedObjID: mainEventId }, indentStep.repeat(4));
                   }
              });
              xml += `\n${indentStep.repeat(3)}</RelationsToEvent>`;
          }
          xml += `\n${indentStep.repeat(2)}</RelatedReport>`;
      });
      xml += `\n${indentStep}</RelatedReports>\n`;
  }

  // 4. IrregularReportEvent (targetNamespace)
  const event = reportData.irregularReportEvent;
  xml += `${indentStep}<IrregularReportEvent>`; // No prefix
  // xml += createElement('cns:ReporterObjID', event.reporterObjId, indentStep.repeat(2)); // Inherited from cns:Event -> cns:BaseClass
  // Elements inherited from cns:Event
  xml += createElement('cns:EventDateTime', event.eventDateTime, indentStep.repeat(2)); // xs:dateTime
  // Elements defined in IrregularReportEvent
  xml += createElement('ReportingBriefContent', event.reportingBriefContent, indentStep.repeat(2)); // No prefix
  xml += createElement('ReportingContent', event.reportingContent, indentStep.repeat(2)); // No prefix, required by XSD

  // ReportingReasons (targetNamespace)
  if (event.reportingReasons && event.reportingReasons.length > 0) {
      xml += `\n${indentStep.repeat(2)}<ReportingReasons>`; // No prefix
      event.reportingReasons.forEach(reason => {
          xml += createElement('ReportingReason', reason.reportingReason, indentStep.repeat(3)); // No prefix
      });
      xml += `\n${indentStep.repeat(2)}</ReportingReasons>`;
  } else {
      // XSD requires ReportingReasons block, even if empty? Check common.xsd. Assuming required.
      xml += `\n${indentStep.repeat(2)}<ReportingReasons />`; // Add empty if required
  }
   if (event.reportingReasons?.some(r => r.reportingReason === 99) && event.reportingReasonDesc) {
       xml += createElement('ReportingReasonDesc', event.reportingReasonDesc, indentStep.repeat(2)); // No prefix
   }

  xml += createElement('TransactionCommitted', event.transactionCommitted, indentStep.repeat(2)); // No prefix, xs:boolean

  // AdditionalAuthoritiesCodes (targetNamespace)
  if (event.additionalAuthoritiesCodes && event.additionalAuthoritiesCodes.length > 0) {
       xml += `\n${indentStep.repeat(2)}<AdditionalAuthoritiesCodes>`; // No prefix
       event.additionalAuthoritiesCodes.forEach(auth => {
           xml += createElement('AdditionalAuthorityCode', auth.additionalAuthorityCode, indentStep.repeat(3)); // No prefix
       });
       xml += `\n${indentStep.repeat(2)}</AdditionalAuthoritiesCodes>`;
   }
    if (event.additionalAuthoritiesCodes?.some(a => a.additionalAuthorityCode === 4) && event.additionalAuthoritiesDesc) { // Assuming 4 is 'Other'
        xml += createElement('AdditionalAuthoritiesDesc', event.additionalAuthoritiesDesc, indentStep.repeat(2)); // No prefix
    }

  // IrRegularAccounts (targetNamespace, contains IrRegularAccount)
  if (event.irregularAccounts && event.irregularAccounts.length > 0) {
      xml += `\n${indentStep.repeat(2)}<IrRegularAccounts>`; // No prefix
      event.irregularAccounts.forEach(acc => {
          xml += `\n${indentStep.repeat(3)}<IrRegularAccount>`; // No prefix
          // Elements inherited from cns:Account
          // xml += createElement('cns:ReporterObjID', acc.reporterObjId, indentStep.repeat(4));
          xml += createElement('cns:FinancialInstituteType', acc.financialInstituteType, indentStep.repeat(4));
          xml += createElement('cns:FinancialInstituteCountry', acc.financialInstituteCountry, indentStep.repeat(4)); // ens:ISOCountryIDSimp
          xml += createElement('cns:FinancialInstituteID', acc.financialInstituteID, indentStep.repeat(4));
          xml += createElement('cns:FinancialInstituteName', acc.financialInstituteName, indentStep.repeat(4));
          xml += createElement('cns:BranchID', acc.branchID, indentStep.repeat(4));
          xml += createElement('cns:AccountNum', acc.accountNum, indentStep.repeat(4));
          xml += createElement('cns:AccountName', acc.accountName, indentStep.repeat(4));
          xml += createElement('cns:AccountType', acc.accountType, indentStep.repeat(4)); // Should be 77
          xml += createElement('cns:MoneyTransferCode', acc.moneyTransferCode, indentStep.repeat(4));
          xml += createElement('cns:MoneyTransferCodeType', acc.moneyTransferCodeType, indentStep.repeat(4));
          if (acc.moneyTransferCodeType === 3 && acc.moneyTransferCodeTypeDesc) { // Assuming 3 is 'Other'
               xml += createElement('cns:MoneyTransferCodeTypeDesc', acc.moneyTransferCodeTypeDesc, indentStep.repeat(4));
          }
          // RelationsToEvent (cns:ListOfRelations)
           if (acc.relationsToEvent && acc.relationsToEvent.length > 0) {
               xml += `\n${indentStep.repeat(4)}<cns:RelationsToEvent>`; // cns prefix based on common.xsd likely type def
               acc.relationsToEvent.forEach(rel => {
                   if(event.reporterObjId) { xml += createRelationBlock({ ...rel, relatedObjID: event.reporterObjId }, indentStep.repeat(5)); }
               });
               xml += `\n${indentStep.repeat(4)}</cns:RelationsToEvent>`;
           }
           // RelatedEntities (cns:ListOfRelations)
            if (acc.relatedEntities && acc.relatedEntities.length > 0) {
               xml += `\n${indentStep.repeat(4)}<cns:RelatedEntities>`; // cns prefix based on common.xsd likely type def
               acc.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(5)); });
               xml += `\n${indentStep.repeat(4)}</cns:RelatedEntities>`;
           }
           // Elements specific to IrRegularAccount (targetNamespace)
           // xml += ... Loans, RelatedAccounts (check XSD/common.xsd) ...
          xml += `\n${indentStep.repeat(3)}</IrRegularAccount>`;
      });
      xml += `\n${indentStep.repeat(2)}</IrRegularAccounts>`;
  }

   // IrRegularOtherAccounts (targetNamespace, contains IrRegularOtherAccount)
   if (event.irregularOtherAccounts && event.irregularOtherAccounts.length > 0) {
       xml += `\n${indentStep.repeat(2)}<IrRegularOtherAccounts>`; // No prefix
       event.irregularOtherAccounts.forEach(acc => {
           xml += `\n${indentStep.repeat(3)}<IrRegularOtherAccount>`; // No prefix
           // Elements inherited from cns:OtherAccount
           // xml += createElement('cns:ReporterObjID', acc.reporterObjId, indentStep.repeat(4));
           xml += createElement('cns:FinancialInstituteType', acc.financialInstituteType, indentStep.repeat(4));
           xml += createElement('cns:FinancialInstituteCountry', acc.financialInstituteCountry, indentStep.repeat(4)); // ens:ISOCountryIDSimp
           xml += createElement('cns:FinancialInstituteID', acc.financialInstituteID, indentStep.repeat(4)); // Should be 1
           xml += createElement('cns:FinancialInstituteNum', acc.financialInstituteNum, indentStep.repeat(4));
           xml += createElement('cns:FinancialInstituteName', acc.financialInstituteName, indentStep.repeat(4));
           xml += createElement('cns:BranchName', acc.branchName, indentStep.repeat(4));
           xml += createElement('cns:BranchAddress', acc.branchAddress, indentStep.repeat(4));
           xml += createElement('cns:AccountNum', acc.accountNum, indentStep.repeat(4)); // Wallet Address or Account Num
           xml += createElement('cns:AccountName', acc.accountName, indentStep.repeat(4));
           xml += createElement('cns:AccountType', acc.accountType, indentStep.repeat(4));
            if (acc.accountType === 99 && acc.accountTypeDescription) { // Assuming 99 is 'Other'
               xml += createElement('cns:AccountTypeDescription', acc.accountTypeDescription, indentStep.repeat(4));
           }
           xml += createElement('cns:MoneyTransferCode', acc.moneyTransferCode, indentStep.repeat(4));
           xml += createElement('cns:MoneyTransferCodeType', acc.moneyTransferCodeType, indentStep.repeat(4));
            if (acc.moneyTransferCodeType === 3 && acc.moneyTransferCodeTypeDesc) { // Assuming 3 is 'Other'
               xml += createElement('cns:MoneyTransferCodeTypeDesc', acc.moneyTransferCodeTypeDesc, indentStep.repeat(4));
           }
            xml += createElement('cns:AccountComments', acc.accountComments, indentStep.repeat(4));
            // RelationsToEvent (cns:ListOfRelations)
            if (acc.relationsToEvent && acc.relationsToEvent.length > 0) {
               xml += `\n${indentStep.repeat(4)}<cns:RelationsToEvent>`;
               acc.relationsToEvent.forEach(rel => {
                   if(event.reporterObjId) { xml += createRelationBlock({ ...rel, relatedObjID: event.reporterObjId }, indentStep.repeat(5)); }
               });
               xml += `\n${indentStep.repeat(4)}</cns:RelationsToEvent>`;
           }
           // RelatedEntities (cns:ListOfRelations)
            if (acc.relatedEntities && acc.relatedEntities.length > 0) {
               xml += `\n${indentStep.repeat(4)}<cns:RelatedEntities>`;
               acc.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(5)); });
               xml += `\n${indentStep.repeat(4)}</cns:RelatedEntities>`;
           }
           xml += `\n${indentStep.repeat(3)}</IrRegularOtherAccount>`;
       });
       xml += `\n${indentStep.repeat(2)}</IrRegularOtherAccounts>`;
   }

   // IrRegularTransactions (targetNamespace, contains IrRegularTransaction)
   if (event.irregularTransactions && event.irregularTransactions.length > 0) {
       xml += `\n${indentStep.repeat(2)}<IrRegularTransactions>`; // No prefix
       event.irregularTransactions.forEach(tx => {
           // Use IrRegularEtransaction type for NSHP sector
           xml += `\n${indentStep.repeat(3)}<IrRegularTransaction xsi:type="IrRegularEtransaction">`; // No prefix + xsi:type
           // Elements inherited from cns:Transaction -> cns:Event -> cns:BaseClass
           // xml += createElement('cns:ReporterObjID', tx.reporterObjId, indentStep.repeat(4));
           xml += createElement('cns:EventDateTime', tx.eventDateTime, indentStep.repeat(4)); // xs:dateTime
           xml += createCurrencyInfoBlock(tx.sumInNis, 'cns:SumInNis', indentStep.repeat(4)); // Wrapper has cns prefix? Check common.xsd Transaction type
           xml += createCurrencyInfoBlock(tx.sumInOriginalCurrency, 'cns:SumInOriginalCurrency', indentStep.repeat(4)); // Wrapper has cns prefix?
           xml += createCurrencyInfoBlock(tx.sumInDestinationCurrency, 'SumInDestinationCurrency', indentStep.repeat(4)); // Defined in IrRegularTransaction (no prefix)
           xml += createElement('cns:EventComment', tx.eventComment, indentStep.repeat(4));
           // RelatedEntities (cns:ListOfRelations) - Inherited from cns:Transaction? Check common.xsd
           if (tx.relatedEntities && tx.relatedEntities.length > 0) {
              xml += `\n${indentStep.repeat(4)}<cns:RelatedEntities>`;
              tx.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(5)); });
              xml += `\n${indentStep.repeat(4)}</cns:RelatedEntities>`;
          }
           // Elements defined in IrRegularTransaction (targetNamespace)
           xml += createElement('TransactionIDSource', tx.transactionIDSource, indentStep.repeat(4)); // No prefix
           xml += createElement('TransactionTypeDesc', tx.transactionTypeDesc, indentStep.repeat(4)); // No prefix
           xml += createElement('TransactionReportedBefore', tx.transactionReportedBefore, indentStep.repeat(4)); // No prefix, xs:boolean
           // GrantedEventID, GrantedEventIdDesc, CourtFile are in IrRegularTransaction but maybe not for NSHP? Check guidelines.
           xml += createElement('EntityCommittedTransaction', tx.entityCommittedTransaction, indentStep.repeat(4)); // No prefix, link to Person/Corp ID
           xml += createElement('TransactionCommitted', tx.transactionCommitted, indentStep.repeat(4)); // No prefix, xs:boolean
           xml += createElement('IpAddress', tx.ipAddress, indentStep.repeat(4)); // No prefix
           xml += createElement('IMEI', tx.imei, indentStep.repeat(4)); // No prefix
           xml += createElement('TXID', tx.txid, indentStep.repeat(4)); // No prefix, Blockchain TXID
           xml += createElement('DefrayalCompanyLicenseID', tx.defrayalCompanyLicenseID, indentStep.repeat(4)); // No prefix

           // Elements specific to IrRegularEtransaction (targetNamespace)
           xml += createElement('SecondaryTransactionIDSource', tx.secondaryTransactionIDSource, indentStep.repeat(4)); // No prefix
           xml += createElement('ProviderTransactionDate', tx.providerTransactionDate, indentStep.repeat(4)); // No prefix, xs:date
           xml += createElement('ProviderTransactionType', tx.providerTransactionType, indentStep.repeat(4)); // No prefix
           xml += createElement('CreditSerialNumber', tx.creditSerialNumber, indentStep.repeat(4)); // No prefix
           xml += createElement('CreditPurposeTypeID', tx.creditPurposeTypeID, indentStep.repeat(4)); // No prefix
            if (tx.creditPurposeTypeID === 99 && tx.creditPurposeTypeDesc) { // Assuming 99 is 'Other'
               xml += createElement('CreditPurposeTypeDesc', tx.creditPurposeTypeDesc, indentStep.repeat(4)); // No prefix
           }
           xml += createElement('CreditNumOfPaymentLeft', tx.creditNumOfPaymentLeft, indentStep.repeat(4)); // No prefix
           xml += createElement('EstimatedCreditRefundDate', tx.estimatedCreditRefundDate, indentStep.repeat(4)); // No prefix, xs:date

            // IrRegularFinancialAsset (targetNamespace)
            const asset = tx.irregularFinancialAsset;
            if (asset) {
                 xml += `\n${indentStep.repeat(4)}<IrRegularFinancialAsset>`; // No prefix
                 // xml += createElement('cns:ReporterObjID', asset.reporterObjId, indentStep.repeat(5)); // Inherited from cns:BaseClass
                 xml += createElement('FinancialAssetTypeID', asset.financialAssetTypeID, indentStep.repeat(5)); // No prefix
                 if (asset.financialAssetTypeID === 13 && asset.financialAssetTypeDesc) { // Assuming 13 is 'Other'
                      xml += createElement('FinancialAssetTypeDesc', asset.financialAssetTypeDesc, indentStep.repeat(5)); // No prefix
                 }
                 xml += createElement('FinancialAssetCountry', asset.financialAssetCountry, indentStep.repeat(5)); // No prefix, type ens:ISOCountryIDSimp
                 xml += createElement('FinancialAssetStatus', asset.financialAssetStatus, indentStep.repeat(5)); // No prefix, 1 or 2
                 xml += createElement('FinancialAssetReference', asset.financialAssetReference, indentStep.repeat(5)); // No prefix
                 xml += createElement('FinancialAssetName', asset.financialAssetName, indentStep.repeat(5)); // No prefix

                 // RelatedAttachments (targetNamespace)
                 if (asset.relatedAttachments && asset.relatedAttachments.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<RelatedAttachments>`; // No prefix
                     asset.relatedAttachments.forEach(attLink => {
                          xml += createLinkElement('AttachmentObjID', attLink.attachmentObjID, indentStep.repeat(6)); // No prefix
                     });
                     xml += `\n${indentStep.repeat(5)}</RelatedAttachments>`;
                 }
                  // RelatedEntities (cns:ListOfRelations)
                 if (asset.relatedEntities && asset.relatedEntities.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<RelatedEntities>`; // No prefix, type cns:ListOfRelations
                     asset.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(6)); }); // createRelationBlock uses cns:
                     xml += `\n${indentStep.repeat(5)}</RelatedEntities>`;
                 }
                 // RelatedAccounts (targetNamespace) - Max 1
                 if (asset.relatedAccounts && asset.relatedAccounts.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<RelatedAccounts>`; // No prefix
                     xml += createLinkElement('AccountObjID', asset.relatedAccounts[0]?.accountObjID, indentStep.repeat(6)); // No prefix
                     xml += `\n${indentStep.repeat(5)}</RelatedAccounts>`;
                 }

                 // Conditional Detail Blocks (cns types)
                 if ([1, 2, 3].includes(asset.financialAssetTypeID)) { // Cheque/Bill
                     xml += createChequeDetailsBlock(asset.chequeDetails, indentStep.repeat(5)); // createChequeDetailsBlock uses cns:
                 }
                 if ([14, 16].includes(asset.financialAssetTypeID)) { // Card/Plate
                      xml += createCreditCardDetailsBlock(asset.creditCardDetails, indentStep.repeat(5)); // createCreditCardDetailsBlock uses cns:
                 }

                 xml += `\n${indentStep.repeat(4)}</IrRegularFinancialAsset>`;
            }

            // RelatedPledges (targetNamespace)
            if (tx.relatedPledges && tx.relatedPledges.length > 0) {
                 xml += `\n${indentStep.repeat(4)}<RelatedPledges>`; // No prefix
                 tx.relatedPledges.forEach(plLink => {
                      xml += createLinkElement('PledgeObjID', plLink.pledgeObjID, indentStep.repeat(5)); // No prefix
                 });
                 xml += `\n${indentStep.repeat(4)}</RelatedPledges>`;
            }


           xml += `\n${indentStep.repeat(3)}</IrRegularTransaction>`; // Close IrRegularTransaction
       });
       xml += `\n${indentStep.repeat(2)}</IrRegularTransactions>`;
   }

    // ListOfInvolvedEntities (cns:ListOfInvolvedEntities) - Appears here in XSD sequence for IrregularReportEvent
    const entities = event.listOfInvolvedEntities;
    if (entities && (entities.persons?.length > 0 || entities.corporates?.length > 0)) {
        xml += `\n${indentStep.repeat(2)}<cns:ListOfInvolvedEntities>`; // cns prefix
        // xml += createElement('cns:ReporterObjID', entities.reporterObjId, indentStep.repeat(3));

        // Persons (cns:Person)
        if (entities.persons && entities.persons.length > 0) {
            xml += `\n${indentStep.repeat(3)}<cns:Persons>`; // cns prefix
            entities.persons.forEach(person => {
                xml += `\n${indentStep.repeat(4)}<cns:Person>`; // cns prefix
                // xml += createElement('cns:ReporterObjID', person.reporterObjId, indentStep.repeat(5));
                xml += createElement('cns:IDType', person.idType, indentStep.repeat(5));
                xml += createElement('cns:IDNumber', person.idNumber, indentStep.repeat(5));
                xml += createElement('cns:IDCountry', person.idCountry, indentStep.repeat(5)); // ens:ISOCountryIDSimp
                if (person.idType === 99 && person.idTypeDesc) {
                    xml += createElement('cns:IDTypeDesc', person.idTypeDesc, indentStep.repeat(5));
                }
                xml += createElement('cns:LastName', person.lastName, indentStep.repeat(5));
                xml += createElement('cns:FirstName', person.firstName, indentStep.repeat(5));
                xml += createElement('cns:LatinName', person.latinName, indentStep.repeat(5));
                xml += createElement('cns:LatinSurname', person.latinSurname, indentStep.repeat(5));
                xml += createElement('cns:BirthDate', person.birthDate, indentStep.repeat(5)); // xs:date
                xml += createElement('cns:EntityGender', person.entityGender, indentStep.repeat(5));
                 if (person.entityGender === 99 && person.entityGenderDesc) {
                    xml += createElement('cns:EntityGenderDesc', person.entityGenderDesc, indentStep.repeat(5));
                }
                xml += createElement('cns:ResidenceStatus', person.residenceStatus, indentStep.repeat(5));
                 if (person.residenceStatus === 5 && person.residenceStatusDesc) { // Assuming 5 is 'Other'
                    xml += createElement('cns:ResidenceStatusDesc', person.residenceStatusDesc, indentStep.repeat(5));
                }
                 // Profession
                 if (person.professionTypeCodes && person.professionTypeCodes.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<cns:ProfessionTypeCodes>`;
                     person.professionTypeCodes.forEach(prof => {
                          xml += createElement('cns:ProfessionTypeCode', prof.professionTypeCode, indentStep.repeat(6));
                     });
                     xml += `\n${indentStep.repeat(5)}</cns:ProfessionTypeCodes>`;
                 }
                 if (person.professionTypeCodes?.some(p => p.professionTypeCode === 'xxxx') && person.profession) { // Assuming xxxx requires description
                     xml += createElement('cns:Profession', person.profession, indentStep.repeat(5));
                 }
                 // Addresses (cns:Addresses)
                 if (person.addresses && person.addresses.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<cns:Addresses>`;
                     person.addresses.forEach(addr => { xml += createAddressBlock(addr, indentStep.repeat(6)); }); // createAddressBlock uses cns:
                     xml += `\n${indentStep.repeat(5)}</cns:Addresses>`;
                 }
                 // Phones (cns:Phones)
                 if (person.phones && person.phones.length > 0 && person.phones.some(p => p.number)) {
                     xml += `\n${indentStep.repeat(5)}<cns:Phones>`;
                     person.phones.forEach(phone => { xml += createPhoneBlock(phone, indentStep.repeat(6)); }); // createPhoneBlock uses cns:
                     xml += `\n${indentStep.repeat(5)}</cns:Phones>`;
                 }
                  // Emails (cns:Emails)
                 if (person.emails && person.emails.length > 0 && person.emails.some(e => e.emailAddress)) {
                     xml += `\n${indentStep.repeat(5)}<cns:Emails>`;
                     person.emails.forEach(email => { xml += createEmailBlock(email, indentStep.repeat(6)); }); // createEmailBlock uses cns:
                     xml += `\n${indentStep.repeat(5)}</cns:Emails>`;
                 }
                xml += createElement('cns:EntityComment', person.entityComment, indentStep.repeat(5));
                 // RelationsToEvent (cns:ListOfRelations)
                  if (person.relationsToEvent && person.relationsToEvent.length > 0) {
                      xml += `\n${indentStep.repeat(5)}<cns:RelationsToEvent>`;
                      person.relationsToEvent.forEach(rel => {
                           if(event.reporterObjId) { xml += createRelationBlock({ ...rel, relatedObjID: event.reporterObjId }, indentStep.repeat(6)); }
                      });
                      xml += `\n${indentStep.repeat(5)}</cns:RelationsToEvent>`;
                  }
                  // RelatedEntities (cns:ListOfRelations)
                  if (person.relatedEntities && person.relatedEntities.length > 0) {
                      xml += `\n${indentStep.repeat(5)}<cns:RelatedEntities>`;
                      person.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(6)); });
                      xml += `\n${indentStep.repeat(5)}</cns:RelatedEntities>`;
                  }

                xml += `\n${indentStep.repeat(4)}</cns:Person>`;
            });
            xml += `\n${indentStep.repeat(3)}</cns:Persons>`;
        }

        // Corporates (cns:Corporate)
        if (entities.corporates && entities.corporates.length > 0) {
            xml += `\n${indentStep.repeat(3)}<cns:Corporates>`; // cns prefix
             entities.corporates.forEach(corp => {
                xml += `\n${indentStep.repeat(4)}<cns:Corporate>`; // cns prefix
                // xml += createElement('cns:ReporterObjID', corp.reporterObjId, indentStep.repeat(5));
                xml += createElement('cns:IDType', corp.idType, indentStep.repeat(5));
                xml += createElement('cns:IDNumber', corp.idNumber, indentStep.repeat(5));
                xml += createElement('cns:IDCountry', corp.idCountry, indentStep.repeat(5)); // ens:ISOCountryIDSimp
                if (corp.idType === 99 && corp.idTypeDesc) {
                    xml += createElement('cns:IDTypeDesc', corp.idTypeDesc, indentStep.repeat(5));
                }
                xml += createElement('cns:Name', corp.name, indentStep.repeat(5));
                xml += createElement('cns:LatinName', corp.latinName, indentStep.repeat(5));
                xml += createElement('cns:FoundationDate', corp.foundationDate, indentStep.repeat(5)); // xs:date
                xml += createElement('cns:ResidenceStatus', corp.residenceStatus, indentStep.repeat(5));
                 if (corp.residenceStatus === 5 && corp.residenceStatusDesc) { // Assuming 5 is 'Other'
                    xml += createElement('cns:ResidenceStatusDesc', corp.residenceStatusDesc, indentStep.repeat(5));
                }
                xml += createElement('cns:CorporateFieldDesc', corp.corporateFieldDesc, indentStep.repeat(5));
                // Addresses, Phones, Emails, EntityComment, RelationsToEvent, RelatedEntities (similar structure to Person, using cns:)
                 if (corp.addresses && corp.addresses.length > 0) {
                     xml += `\n${indentStep.repeat(5)}<cns:Addresses>`;
                     corp.addresses.forEach(addr => { xml += createAddressBlock(addr, indentStep.repeat(6)); });
                     xml += `\n${indentStep.repeat(5)}</cns:Addresses>`;
                 }
                 if (corp.phones && corp.phones.length > 0 && corp.phones.some(p => p.number)) {
                     xml += `\n${indentStep.repeat(5)}<cns:Phones>`;
                     corp.phones.forEach(phone => { xml += createPhoneBlock(phone, indentStep.repeat(6)); });
                     xml += `\n${indentStep.repeat(5)}</cns:Phones>`;
                 }
                 if (corp.emails && corp.emails.length > 0 && corp.emails.some(e => e.emailAddress)) {
                     xml += `\n${indentStep.repeat(5)}<cns:Emails>`;
                     corp.emails.forEach(email => { xml += createEmailBlock(email, indentStep.repeat(6)); });
                     xml += `\n${indentStep.repeat(5)}</cns:Emails>`;
                 }
                xml += createElement('cns:EntityComment', corp.entityComment, indentStep.repeat(5));
                 if (corp.relationsToEvent && corp.relationsToEvent.length > 0) {
                      xml += `\n${indentStep.repeat(5)}<cns:RelationsToEvent>`;
                      corp.relationsToEvent.forEach(rel => {
                          if(event.reporterObjId) { xml += createRelationBlock({ ...rel, relatedObjID: event.reporterObjId }, indentStep.repeat(6)); }
                      });
                      xml += `\n${indentStep.repeat(5)}</cns:RelationsToEvent>`;
                  }
                  if (corp.relatedEntities && corp.relatedEntities.length > 0) {
                      xml += `\n${indentStep.repeat(5)}<cns:RelatedEntities>`;
                      corp.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(6)); });
                      xml += `\n${indentStep.repeat(5)}</cns:RelatedEntities>`;
                  }

                xml += `\n${indentStep.repeat(4)}</cns:Corporate>`;
            });
            xml += `\n${indentStep.repeat(3)}</cns:Corporates>`;
        }

        xml += `\n${indentStep.repeat(2)}</cns:ListOfInvolvedEntities>`;
    }

    // CreditCards (targetNamespace, contains cns:CreditCard) - Check if needed for NSHP sector
    // if (event.creditCards && event.creditCards.length > 0) { ... }

    // ReportKeyWordsCodes (targetNamespace)
    if (event.reportKeyWordsCodes && event.reportKeyWordsCodes.length > 0) {
        xml += `\n${indentStep.repeat(2)}<ReportKeyWordsCodes>`; // No prefix
        event.reportKeyWordsCodes.forEach(kw => {
            xml += createElement('ReportKeyWordCode', kw.reportKeyWordCode, indentStep.repeat(3)); // No prefix
        });
        xml += `\n${indentStep.repeat(2)}</ReportKeyWordsCodes>`;
    }
     if (event.reportKeyWordsCodes?.some(k => k.reportKeyWordCode === 300) && event.reportKeyWordDesc) { // Assuming 300 is 'Other'
         xml += createElement('ReportKeyWordDesc', event.reportKeyWordDesc, indentStep.repeat(2)); // No prefix
     }

    // IrRegularPledges (targetNamespace, contains IrRegularPledge)
    if (event.irregularPledges && event.irregularPledges.length > 0) {
        xml += `\n${indentStep.repeat(2)}<IrRegularPledges>`; // No prefix
        event.irregularPledges.forEach(pledge => {
            xml += `\n${indentStep.repeat(3)}<IrRegularPledge>`; // No prefix
            // Elements inherited from cns:Pledge -> cns:BaseClass
            // xml += createElement('cns:ReporterObjID', pledge.reporterObjId, indentStep.repeat(4));
            xml += createElement('cns:PledgeTypeID', pledge.pledgeTypeID, indentStep.repeat(4));
            if (pledge.pledgeTypeID === 4 && pledge.pledgeTypeDesc) { // Assuming 4 is 'Other'
                 xml += createElement('cns:PledgeTypeDesc', pledge.pledgeTypeDesc, indentStep.repeat(4));
            }
            xml += createElement('cns:SecondaryPledgeTypeID', pledge.secondaryPledgeTypeID, indentStep.repeat(4));
             if ((pledge.secondaryPledgeTypeID === 99 || pledge.secondaryPledgeTypeID === 1) && pledge.secondaryPledgeTypeDesc) { // Check 'Other' codes
                 xml += createElement('cns:SecondaryPledgeTypeDesc', pledge.secondaryPledgeTypeDesc, indentStep.repeat(4));
             }
            xml += createElement('cns:PledgeValue', pledge.pledgeValue, indentStep.repeat(4)); // NIS Amount
            xml += createElement('cns:PledgeNumber', pledge.pledgeNumber, indentStep.repeat(4)); // Cheque/Vehicle No.
            xml += createElement('cns:Year', pledge.year, indentStep.repeat(4)); // YYYY
            xml += createElement('cns:Remarks', pledge.remarks, indentStep.repeat(4));

             // Related Accounts (targetNamespace) - Max 1
             if (pledge.relatedAccounts && pledge.relatedAccounts.length > 0) {
                  xml += `\n${indentStep.repeat(4)}<RelatedAccounts>`; // No prefix
                  xml += createLinkElement('AccountObjID', pledge.relatedAccounts[0]?.accountObjID, indentStep.repeat(5)); // No prefix
                  xml += `\n${indentStep.repeat(4)}</RelatedAccounts>`;
             }
             // Related Entities (cns:ListOfRelations)
             if (pledge.relatedEntities && pledge.relatedEntities.length > 0) {
                xml += `\n${indentStep.repeat(4)}<cns:RelatedEntities>`;
                pledge.relatedEntities.forEach(rel => { xml += createRelationBlock(rel, indentStep.repeat(5)); });
                xml += `\n${indentStep.repeat(4)}</cns:RelatedEntities>`;
            }
             // Related Attachments (targetNamespace)
             if (pledge.relatedAttachments && pledge.relatedAttachments.length > 0) {
                  xml += `\n${indentStep.repeat(4)}<RelatedAttachments>`; // No prefix
                  pledge.relatedAttachments.forEach(attLink => {
                       xml += createLinkElement('AttachmentObjID', attLink.attachmentObjID, indentStep.repeat(5)); // No prefix
                  });
                  xml += `\n${indentStep.repeat(4)}</RelatedAttachments>`;
             }

             // Conditional Detail Blocks (cns types)
             if (pledge.pledgeTypeID === 1) { // Cheque
                  xml += createChequeDetailsBlock(pledge.chequeDetails, indentStep.repeat(4)); // Uses cns:
             } else if (pledge.pledgeTypeID === 2) { // Real Estate
                  const rd = pledge.realEstateDetails;
                  if (rd) {
                      xml += `\n${indentStep.repeat(4)}<cns:RealEstateDetails>`; // cns:
                      xml += createElement('cns:CountryID', rd.countryID, indentStep.repeat(5)); // ens:
                      xml += createElement('cns:CityID', rd.cityID, indentStep.repeat(5));
                      xml += createElement('cns:CityName', rd.cityName, indentStep.repeat(5));
                      xml += createElement('cns:StreetID', rd.streetID, indentStep.repeat(5));
                      xml += createElement('cns:StreetName', rd.streetName, indentStep.repeat(5));
                      xml += createElement('cns:HouseNumber', rd.houseNumber, indentStep.repeat(5));
                      xml += createElement('cns:Block', rd.block, indentStep.repeat(5));
                      xml += createElement('cns:Parcel', rd.parcel, indentStep.repeat(5));
                      xml += createElement('cns:SurParcel', rd.surParcel, indentStep.repeat(5));
                      xml += createElement('cns:RightTypeID', rd.rightTypeID, indentStep.repeat(5));
                       if (rd.rightTypeID === 99 && rd.rightTypeDesc) { // Assuming 99 is 'Other'
                          xml += createElement('cns:RightTypeDesc', rd.rightTypeDesc, indentStep.repeat(5));
                      }
                      xml += `\n${indentStep.repeat(4)}</cns:RealEstateDetails>`;
                  }
             } else if (pledge.pledgeTypeID === 3) { // Vehicle
                  const cd = pledge.carDetails;
                  if (cd) {
                      xml += `\n${indentStep.repeat(4)}<cns:CarDetails>`; // cns:
                      xml += createElement('cns:Manufacturer', cd.manufacturer, indentStep.repeat(5));
                      xml += `\n${indentStep.repeat(4)}</cns:CarDetails>`;
                  }
             }

            xml += `\n${indentStep.repeat(3)}</IrRegularPledge>`;
        });
        xml += `\n${indentStep.repeat(2)}</IrRegularPledges>`;
    }

    // Attachments (targetNamespace, contains cns:Attachment) - Appears here in XSD sequence for IrregularReportEvent
    if (event.attachments && event.attachments.length > 0) {
        xml += `\n${indentStep.repeat(2)}<Attachments>`; // No prefix
        event.attachments.forEach(att => {
            xml += `\n${indentStep.repeat(3)}<cns:Attachment>`; // cns:
            // xml += createElement('cns:ReporterObjID', att.reporterObjId, indentStep.repeat(4));
            xml += createElement('cns:FileName', att.fileName, indentStep.repeat(4));
            xml += createElement('cns:DocumentType', att.documentType, indentStep.repeat(4));
             if (att.documentType === 99 && att.documentTypeDesc) { // Assuming 99 is 'Other'
                 xml += createElement('cns:DocumentTypeDesc', att.documentTypeDesc, indentStep.repeat(4));
             }
            xml += createElement('cns:NumberOfPages', att.numberOfPages, indentStep.repeat(4));
            xml += createElement('cns:Comments', att.comments, indentStep.repeat(4));
            // Add Classification if needed from XSD
            xml += `\n${indentStep.repeat(3)}</cns:Attachment>`;
        });
        xml += `\n${indentStep.repeat(2)}</Attachments>`;
    }


  xml += `\n${indentStep}</IrregularReportEvent>`;
  xml += `\n</IrRegularReport>`;

  console.log("Generated XML String:", xml); // For debugging
  return xml;
}