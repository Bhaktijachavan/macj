import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import './OneDamage.css';
function OneDamage({ setIsPopupOpen, onClose, subItemName, onDone }) {
  const localStorageKey = 'oneDamageFormData';
  const [formData, setFormData] = useState({
    onetabId: '',
    onetabName: '',
    onedamagePanelId: '',
    onedamagePanelName: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCancel = () => {
    console.log('Cancel button clicked');
    setIsPopupOpen(false);
  };
  const handleBack = () => {
    console.log('Back button clicked');
    onClose();
  };
  const handleDone = () => {
    const updatedFormData = {
      ...formData,
      onetabId: uuidv4(), // Generate unique ID for Tab Name
      onedamagePanelId: uuidv4(),
    };
    onDone(updatedFormData); // Generate unique ID for Damage Panel Name
    localStorage.setItem(localStorageKey, JSON.stringify(updatedFormData));
    console.log('Done button clicked');
    setIsPopupOpen(false);
  };
  useEffect(() => {
    const storedFormData = localStorage.getItem(localStorageKey);
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);
  return (
    <div className="form-container-onedamage">
      <p className='p-onedamage'>Creating A Page With 1 Damage Panel. The Damage Panel Name is what will appear on the report.</p>
      <div className='label-container-onedamage'>
        <label className='label-onedamage' htmlFor="field1">Tab Name:</label>
        <input
          className='input1-onedamage'
          type="text"
          name="onetabName"
          value={formData.onetabName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='label-container-onedamage'>
        <label className='label-onedamage' htmlFor="field2">Damage Panel Name:</label>
        <input
          className='input-onedamage'
          type="text"
          name="onedamagePanelName"
          value={formData.onedamagePanelName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="button-container-onedamage">
        <button type="button" className="cancel-button-onedamage" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="back-button-onedamage" onClick={handleBack}>
          Back
        </button>
        <button type="button" className="done-button-onedamage" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
}
export default OneDamage;
