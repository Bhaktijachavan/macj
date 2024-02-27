import React from "react";

const SaveTPZ = () => {
  const openSaveTemplatePopup = async () => {
    try {
      // Assuming you have the data to save in localStorage
      const clientInfoData = localStorage.getItem("clientInfoData");
      const menuData = localStorage.getItem("menuData");
      const outputContent = localStorage.getItem("outputContent");
      const tempPanelData = localStorage.getItem("TempPanelData");

      // Check if there is data to save
      if (clientInfoData && menuData && outputContent && tempPanelData) {
        // Generate a new key and IV for encryption
        const key = await window.crypto.subtle.generateKey(
          { name: "AES-CBC", length: 256 },
          true,
          ["encrypt", "decrypt"]
        );
        const iv = window.crypto.getRandomValues(new Uint8Array(16));

        console.log("Generated Key:", key);
        console.log("Generated IV:", iv);

        const encoder = new TextEncoder();
        const encryptedClientInfoData = await window.crypto.subtle.encrypt(
          { name: "AES-CBC", iv: iv },
          key,
          encoder.encode(clientInfoData)
        );
        const encryptedMenuData = await window.crypto.subtle.encrypt(
          { name: "AES-CBC", iv: iv },
          key,
          encoder.encode(menuData)
        );
        const encryptedOutputContent = await window.crypto.subtle.encrypt(
          { name: "AES-CBC", iv: iv },
          key,
          encoder.encode(outputContent)
        );
        const encryptedTempPanelData = await window.crypto.subtle.encrypt(
          { name: "AES-CBC", iv: iv },
          key,
          encoder.encode(tempPanelData)
        );

        // Save the key and IV to localStorage or some secure storage
        localStorage.setItem(
          "encryptionKey",
          JSON.stringify(await window.crypto.subtle.exportKey("jwk", key))
        );
        localStorage.setItem("encryptionIV", JSON.stringify(Array.from(iv)));

        // Save the encrypted data under the name 'tpzData'
        const tpzData = {
          clientInfoData,
          menuData,
          outputContent,
          tempPanelData,
        };
        localStorage.setItem("tpzData", JSON.stringify(tpzData));

        // Log encryption details (for potential decryption)
        console.log("Encryption Key:", key);
        console.log("Initialization Vector (IV):", iv);
        console.log("tpzData", JSON.stringify(tpzData));

        // Now, let's decrypt and log the data
        const decryptedClientInfoData = await window.crypto.subtle.decrypt(
          { name: "AES-CBC", iv: iv },
          key,
          encryptedClientInfoData
        );
        const decryptedMenuData = await window.crypto.subtle.decrypt(
          { name: "AES-CBC", iv: iv },
          key,
          encryptedMenuData
        );
        const decryptedOutputContent = await window.crypto.subtle.decrypt(
          { name: "AES-CBC", iv: iv },
          key,
          encryptedOutputContent
        );
        const decryptedTempPanelData = await window.crypto.subtle.decrypt(
          { name: "AES-CBC", iv: iv },
          key,
          encryptedTempPanelData
        );

        const decodedClientInfoData = new TextDecoder().decode(
          decryptedClientInfoData
        );
        const decodedMenuData = new TextDecoder().decode(decryptedMenuData);
        const decodedOutputContent = new TextDecoder().decode(
          decryptedOutputContent
        );
        const decodedTempPanelData = new TextDecoder().decode(
          decryptedTempPanelData
        );

        console.log(
          "Decrypted Client Info Data:",
          JSON.parse(decodedClientInfoData)
        );
        console.log("Decrypted Menu Data:", JSON.parse(decodedMenuData));
        console.log("Decrypted Output Content:", decodedOutputContent);
        console.log(
          "Decrypted Temp Panel Data:",
          JSON.parse(decodedTempPanelData)
        );

        // Create a Blob with the tpzData
        const encryptedBlob = new Blob([JSON.stringify(tpzData)], {
          type: "application/json",
        });

        // Create a Blob with the encrypted data
        const link = document.createElement("a");
        console.log("Created link element:", link);
        link.href = URL.createObjectURL(encryptedBlob);
        link.download = "template.tpz";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("No data to save.");
      }
    } catch (error) {
      console.error("Error during encryption or decryption:", error);
    }
  };

  return (
    <li className="list-for-header-section-main-nav border-r border-black-900">
      <a
        href="#report-settings"
        onClick={openSaveTemplatePopup}
        className="header2-tag-a"
      >
        <div className="flex justify-center">
          {/* Your save image component */}
        </div>
        <div>
          Save
          <br /> Template
        </div>
      </a>
    </li>
  );
};

export default SaveTPZ;
