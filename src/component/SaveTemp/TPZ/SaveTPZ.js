import React from 'react';

const SaveTPZ = () => {
  const openSaveTemplatePopup = async () => {
    // Assuming you have the data to save in localStorage
    const localStorageData = localStorage.getItem('oneDamageFormData');
    const menuData = localStorage.getItem('menuData');

    // Check if there is data to save
    if (localStorageData && menuData) {
      try {
        // Generate a new key and IV for encryption
        const key = await window.crypto.subtle.generateKey(
          { name: 'AES-CBC', length: 256 },
          true,
          ['encrypt', 'decrypt']
        );
        const iv = window.crypto.getRandomValues(new Uint8Array(16));

        console.log('Generated Key:', key);
        console.log('Generated IV:', iv);

        const encoder = new TextEncoder();
        const encryptedLocalStorage = await window.crypto.subtle.encrypt(
          { name: 'AES-CBC', iv: iv },
          key,
          encoder.encode(localStorageData)
        );
        const encryptedMenuData = await window.crypto.subtle.encrypt(
          { name: 'AES-CBC', iv: iv },
          key,
          encoder.encode(menuData)
        );

        // Save the key and IV to localStorage or some secure storage
        localStorage.setItem('encryptionKey', JSON.stringify(await window.crypto.subtle.exportKey('jwk', key)));
        localStorage.setItem('encryptionIV', JSON.stringify(Array.from(iv)));

        const fileName = 'template.tpz';

        // Create a Blob with the encrypted data
        const blob = new Blob([encryptedLocalStorage, encryptedMenuData], { type: 'application/octet-stream' });

        const link = document.createElement('a');
        console.log('Created link element:', link);
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Log encryption details (for potential decryption)
        console.log('Encryption Key:', key);
        console.log('Initialization Vector (IV):', iv);
      } catch (error) {
        console.error('Error during encryption:', error);
      }
    } else {
      console.error('No data to save.');
    }
  };

  return (
    <li className="list-for-header-section-main-nav border-r border-black-900">
      <a href="#report-settings" onClick={openSaveTemplatePopup} className="header2-tag-a">
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
