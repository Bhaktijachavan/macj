import React, { useState } from 'react';
import './OneDamageTwoSelection.css';

function OneDamageTwoSelection({ setIsPopupOpen, onClose }) {
  const [formData, setFormData] = useState({
    tabName_dptwosp: '',
    damagePanelName_dptwosp: '',
    selectionPanelName_dptwosp_1: '',
    selectionPanelName_dptwosp_2: '',
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
      tabName_dptwosp: formData.tabName_dptwosp,
      damagePanelName_dptwosp: formData.damagePanelName_dptwosp,
      selectionPanelName_dptwosp_1: formData.selectionPanelName_dptwosp_1,
      selectionPanelName_dptwosp_2: formData.selectionPanelName_dptwosp_2,
    };
    localStorage.setItem('oneDamageTwoSelectionFormData', JSON.stringify(localData));
    console.log('Stored data in local storage:', localData);

    setIsPopupOpen(false);
    console.log('Done button clicked');
  };

  return (
    <div className="form-container-onedamagetwoselection">
      <p className="p-onedamagetwoselection">Creating the page with 1 Damage Panel and 2 Selection Panels. The Damage Panel Name will appear on the report.</p>
      <form>
        <div className="label-container-onedamagetwoselection">
          <label className="label-onedamagetwoselection">Tab Name:</label>
          <input
            className="input1-onedamagetwoselection"
            type="text"
            name="tabName_dptwosp"
            value={formData.tabName_dptwosp}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="label-container-onedamagetwoselection">
          <label className="label-onedamagetwoselection">Damage Panel Name:</label>
          <input
            className="input2-onedamagetwoselection"
            type="text"
            name="damagePanelName_dptwosp"
            value={formData.damagePanelName_dptwosp}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="label-container-onedamagetwoselection">
          <label className="label-onedamagetwoselection">1st Selection Panel Name:</label>
          <input
            className="input3-onedamagetwoselection"
            type="text"
            name="selectionPanelName_dptwosp_1"
            value={formData.selectionPanelName_dptwosp_1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="label-container-onedamagetwoselection">
          <label className="label-onedamagetwoselection">2nd Selection Panel Name:</label>
          <input
            className="input-onedamagetwoselection"
            type="text"
            name="selectionPanelName_dptwosp_2"
            value={formData.selectionPanelName_dptwosp_2}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="button-container-onedamagetwoselection">
          <button type="button" className="cancel-button-onedamagetwoselection" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="back-button-onedamagetwoselection" onClick={handleBack}>
            Back
          </button>
          <button type="button" className="done-button-onedamagetwoselection" onClick={handleDone}>
            Done
          </button>
        </div>
      </form>
    </div>
  );
}

export default OneDamageTwoSelection;
