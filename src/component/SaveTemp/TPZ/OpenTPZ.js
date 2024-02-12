import React, { useRef } from 'react';

const OpenTPZ = () => {
  const fileInputRef = useRef(null);

  const openOpenTemplatePopup = () => {
    // Trigger the hidden file input to select a .tpz file
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        // Retrieve the key and IV used for encryption
        const storedKey = localStorage.getItem('encryptionKey');
        const storedIV = localStorage.getItem('encryptionIV');

        if (storedKey && storedIV) {
          const key = await window.crypto.subtle.importKey('jwk', JSON.parse(storedKey), { name: 'AES-CBC', length: 256 }, true, ['encrypt', 'decrypt']);
          const iv = new Uint8Array(JSON.parse(storedIV));

          const encryptedData = await file.arrayBuffer();
          const decryptedData = await decryptData(encryptedData, key, iv);

          // Display the decrypted data in the textarea
          const textarea = document.getElementById('template-textarea');
          textarea.value = decryptedData;
        } else {
          console.error('Encryption key or IV not found.');
        }
      } catch (error) {
        console.error('Error during decryption:', error);
      }
    }
  };

  const decryptData = async (encryptedData, key, iv) => {
    try {
      const decryptedArrayBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-CBC', iv: iv },
        key,
        encryptedData
      );

      const decryptedData = new TextDecoder().decode(decryptedArrayBuffer);
      return decryptedData;
    } catch (error) {
      throw new Error('Decryption error');
    }
  };

  return (
    <li className="list-for-header-section-main-nav">
      <input
        ref={fileInputRef}
        type="file"
        accept=".tpz"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <a href="#" onClick={openOpenTemplatePopup} className="header2-tag-a">
        <div className="flex justify-center">
          {/* Your open image component */}
        </div>
        <div>
          Open
          <br /> Template
        </div>
      </a>
    </li>
  );
};

export default OpenTPZ;
