import React, { useEffect, useState } from "react";
import "./MobileUploadPopup.css";
import img from "../../../Assets/icons/icons8-download-from-the-cloud-48.png";
import image1 from "../../../Assets/icons/icons8-delete-16.png";

import axios from "axios";
import Alert from "../../Alert/Alert";

const MobileUploadPopup = ({ onClose }) => {
  const [inspectionData, setInspectionData] = useState([]);
  const [selectedInspectionIds, setSelectedInspectionIds] = useState([]);
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const fetchInspectionData = async () => {
      const user = localStorage.getItem("User");
      if (!user) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        return;
      }

      try {
        const response = await fetch("http://localhost:7000/api/inspection");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInspectionData();
  }, []);

  const handleDownload = (url) => {
    window.open(url, "_self");
  };

  const handleDelete = (id) => {
    // Function to handle delete action if needed
    console.log("Delete item with id:", id);
    // Add your delete logic here
  };

  return (
    <div className="container-for-the-mobileuploadpopup">
      {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
      {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
      <div className="width-set-for-the-mobileuploadpopup">
        <div className="close-button-and-mobileuploadpopup-header-for-popup-box">
          <p>Manage Inspections in Cloud</p>

          <p className="close-btn-mobileuploadpopup" onClick={onClose}>
            X
          </p>
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
          <button className="delete-button-mobileuploadpopup">
            <img src={image1} alt="" style={{ width: 20, height: 20 }} /> Delete
            from Cloud
          </button>
          <button className="refresh-button-mobileuploadpopup">
            <img src={image1} alt="" style={{ width: 20, height: 20 }} />{" "}
            Refresh List
          </button>
        </div>
        <div>
          <table className="custom-table-mobileuploadpopup">
            <thead>
              <tr>
                <th>Inspection Name</th>
                {/* <th>Client Name</th>
                <th>Inspection Address</th>
                <th>Date Inspected</th> */}
                <th>Download</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.originalFileName || ""}</td>
                  <td>{/* Fill with client name if available */}</td>
                  <td>{/* Fill with inspection address if available */}</td>
                  <td>{/* Fill with date inspected if available */}</td>
                  <td>
                    {item.url && (
                      <button onClick={() => handleDownload(item.url)}>
                        Download
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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

// import React, { useState, useEffect } from 'react';

// const MobileUploadPopup = () => {
//   const [data, setData] = useState([]);
// const [showAlert, setShowAlert] = useState(false);
//    useEffect(() => {
//     const fetchInspectionData = async () => {
//       const user = localStorage.getItem("User");
//       if (!user) {
//         setShowAlert(true);
//         setTimeout(() => {
//           setShowAlert(false);
//         }, 3000);
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:7000/api/abc');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchInspectionData();
//   }, []);

//   const handleDownload = (url) => {
//     window.open(url, '_blank');
//   };

//   const handleDelete = (id) => {
//     // Function to handle delete action if needed
//     console.log('Delete item with id:', id);
//     // Add your delete logic here
//   };

//   return (
//     <div>
//       <h2>API Data Table</h2>
//        <table>
//         <thead>
//           <tr>
//             <th>Inspection Name</th>
//             <th>Client Name</th>
//             <th>Inspection Address</th>
//             <th>Date Inspected</th>
//             <th>Download</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(item => (
//             <tr key={item._id}>
//               <td>{item.originalFileName || ''}</td>
//               <td>{/* Fill with client name if available */}</td>
//               <td>{/* Fill with inspection address if available */}</td>
//               <td>{/* Fill with date inspected if available */}</td>
//               <td>
//                 {item.url && (
//                   <button onClick={() => handleDownload(item.url)}>Download</button>
//                 )}
//               </td>
//               <td>
//                 <button onClick={() => handleDelete(item._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MobileUploadPopup;
