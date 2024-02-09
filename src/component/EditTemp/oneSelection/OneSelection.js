import React, { useState } from 'react';
import './OneSelection.css';

function OneSelection({ setIsPopupOpen, isPopupOpen, onClose, onTabNameChange }) {
  const [formData, setFormData] = useState({
    tabName_2nd: '',
    selectionPanelName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  const handleBack = () => {
    onClose();
  };

  const handleDone = () => {
    setIsPopupOpen(false);
    console.log('Done button clicked');
    // Pass the tabName to the parent component using the callback prop
    onTabNameChange(formData.tabName_2nd);
  };

  return (
    <div className="form-container-oneselection">
      <p className='p-oneselection'>Creating A Page With 1 Selection Panel. The Selection Panel Name is what will appear on the report.</p>
      <div className='label-container-oneselection'>
        <label className='label-oneselection' htmlFor="field1">Tab Name:</label>
        <input
          className='input1-oneselection'
          type="text"
          name="tabName_2nd"
          value={formData.tabName_2nd}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='label-container-oneselection'>
        <label className='label-oneselection' htmlFor="field2">Selection Panel Name:</label>
        <input
          className='input-oneselection'
          type="text"
          name="selectionPanelName"
          value={formData.selectionPanelName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="button-container-onselection">
        <button type="button" className="cancel-button-oneselection" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="back-button-oneselection" onClick={handleBack}>
          Back
        </button>
        <button type="button" className="done-button-oneselection" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
}

export default OneSelection;
