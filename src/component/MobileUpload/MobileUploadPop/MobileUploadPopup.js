import React, { useEffect, useState } from "react";
import "./MobileUploadPopup.css";
import img from "../../../Assets/icons/icons8-download-from-the-cloud-48.png";
import image1 from "../../../Assets/icons/icons8-delete-16.png";
import axios from 'axios';
import Alert from "../../Alert/Alert";


const MobileUploadPopup = ({ onClose }) => {
  const [inspectionData, setInspectionData] = useState([]);
  const [selectedInspectionIds, setSelectedInspectionIds] = useState([]);

  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
  });

  useEffect(() => {
    fetchInspectionData();
  }, []);

  const fetchInspectionData = async () => {
    const user = localStorage.getItem("User")
    if(!user){
      setShowAlert({
        showAlert: true,
        message: "Please Login First ",
      })
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        }); // Hide the alert after 3 seconds
      }, 3000);
     return;
    }
    try {
      const response = await axios.get('http://localhost:7000/api/inspection');
      if (response.status === 200) {
        setInspectionData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching inspection data:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    // Toggle selection status
    setSelectedInspectionIds(prevIds => {
      if (prevIds.includes(id)) {
        return prevIds.filter(item => item !== id); // Remove ID if already selected
      } else {
        return [...prevIds, id]; // Add ID if not selected
      }
    });
  };

  const handleDeleteFromCloud = async () => {
    const user = localStorage.getItem("User")
    if(!user){
    
     return;
    }
    try {
      // Send selectedInspectionIds array to the server for deletion
      const response = await axios.delete('http://localhost:7000/api/inspection', {
        data: { inspectionIds: selectedInspectionIds } // Sending data in the request body
      });
      console.log("Response from server:", response.data);
      
      // Reset selectedInspectionIds array after successful deletion
      setSelectedInspectionIds([]);
      
      // Refresh inspection data
      fetchInspectionData();
    } catch (error) {
      console.error("Error deleting inspections:", error);
    }
    
  };

  return (
    <div className="container-for-the-mobileuploadpopup">
        {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
      <div className="width-set-for-the-mobileuploadpopup">
        <div className="close-button-and-mobileuploadpopup-header-for-popup-box">
          <p>Manage Inspections in Cloud</p>
          <p className="close-btn-mobileuploadpopup" onClick={onClose}>X</p>
        </div>
        <div className="container-header-mobileuploadpopup">
          <p>
            Here is the list of all the Inspections you have saved in the cloud.
          </p>
          <p>
            You can remove any unused inspections from the Cloud by selecting
            them and
          </p>
          <p>
            clicking in the Delete from Cloud button. This will not delete from
            your phone.
          </p>
        </div>
        <div className="container-button-mobileuploadpopup">
          <button className="delete-button-mobileuploadpopup" onClick={handleDeleteFromCloud}>
            <img src={image1} alt="" style={{ width: 20, height: 20 }} /> Delete from Cloud
          </button>
          <button className="refresh-button-mobileuploadpopup" onClick={() => fetchInspectionData()}>
            <img src={image1} alt="" style={{ width: 20, height: 20 }} /> Refresh List
          </button>
        </div>
        <div>
          <table className="custom-table-mobileuploadpopup">
            <thead>
              <tr>
                <th>Inspection Name</th>
                <th>Client Name</th>
                <th>Inspection Address</th>
                <th>Date Inspected</th>
                <th>Download</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {inspectionData ? (
  inspectionData.map(data => (
    <tr key={data._id}>
      <td>{data.InspectionName || ""}</td>
      <td>{data.clientName || ""}</td>
      <td>{data.address || ""}</td>
      <td>{data.InpectionDate}</td>
      <td>
        <button onClick={() => window.open(data.pdf, '_blank')}>
          <img src={img} alt="" style={{ width: 30, height: 30 }} />
        </button>
      </td>
      <td>
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(data._id)}
          checked={selectedInspectionIds.includes(data._id)}
        />
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="6">No Inspections Found</td>
  </tr>
)}

            </tbody>
          </table>
        </div>
        <div>
          <button className="close-button-mobileuploadpopup" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileUploadPopup;
