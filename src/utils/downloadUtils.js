// --- File: src/utils/downloadUtils.js ---
  
  /**
   * @file downloadUtils.js
   * @description Contains utility function for triggering file downloads.
   */
  
  export function downloadXml(xmlString, reportNumber) {
    console.log("Attempting to download XML for report:", reportNumber);
    const filename = `IrregularReport-${reportNumber || 'UNKNOWN'}.xml`;
    try {
        const blob = new Blob([xmlString], { type: 'application/xml;charset=utf-8' }); // Specify charset
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none'; // Hide the anchor
        a.href = url;
        a.download = filename;
        document.body.appendChild(a); // Append anchor to body
        a.click(); // Programmatically click the anchor
        // Clean up: remove anchor and revoke object URL after a short delay
        window.setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log("Download initiated for:", filename);
        }, 100);
    } catch (error) {
        console.error("Error generating download link:", error);
        // Provide feedback to the user if possible
        alert("An error occurred while preparing the download.");
    }
  }