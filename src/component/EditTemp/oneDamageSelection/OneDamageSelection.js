import React, { useState } from 'react';
import './OneDamageSelection.css';

function OneDamageSelection({ setIsPopupOpen, onClose }) {
  const [formData, setFormData] = useState({
    tabName_4th: '',
    damagePanelName_3rd: '',
    selectionPanelName_3rd: '',
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
    console.log('Cancel button clicked');
  };

  const handleBack = () => {
    onClose();
    console.log('Back button clicked');
  };

  const handleDone = () => {
    const localData = {
      onedamageselection: formData.tabName_4th,
      damagePanelName_dpsp: formData.damagePanelName_3rd,
      selectionPanelName_dpsp: formData.selectionPanelName_3rd,
    };
    localStorage.setItem('oneDamageSelectionFormData', JSON.stringify(localData));
    console.log('Stored data in local storage:', localData);

    setIsPopupOpen(false);
    console.log('Done button clicked');
  };

  return (
    <div className="form-container-onedamageselection">
      <p className="p-onedamageselection">Creating the page with 1 Damage Panel and 1 Selection Panel. The Damage Panel Name will appear on the report.</p>
      <form>
        <div className="label-container-onedamageselection">
          <label className="label-onedamageselection">Tab Name:</label>
          <input
            className="input1-onedamageselection"
            type="text"
            name="tabName_4th"
            value={formData.tabName_4th}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="label-container-onedamageselection">
          <label className="label-onedamageselection">Damage Panel Name:</label>
          <input
            className="input2-onedamageselection"
            type="text"
            name="damagePanelName_3rd"
            value={formData.damagePanelName_3rd}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="label-container-onedamageselection">
          <label className="label-onedamageselection">Selection Panel Name:</label>
          <input
            className="input-onedamageselection"
            type="text"
            name="selectionPanelName_3rd"
            value={formData.selectionPanelName_3rd}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="button-container-onedamageselection">
          <button type="button" className="cancel-button-onedamageselection" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="back-button-onedamageselection" onClick={handleBack}>
            Back
          </button>
          <button type="button" className="done-button-onedamageselection" onClick={handleDone}>
            Done
          </button>
        </div>
      </form>
    </div>
  );
}

export default OneDamageSelection;
