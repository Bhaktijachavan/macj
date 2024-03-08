import React, { useState } from "react";
import "./MobileUploadPopup.css"; // Corrected the import statement for CSS
import img from "../../../Assets/icons/icons8-download-from-the-cloud-48.png";
import image from "../../../Assets/icons/icons8-delete-16.png";
import image1 from "../../../Assets/icons/icons8-refresh-16.png";
const MobileUploadPopup = ({ onClose}) => {
  //state to track the active `
 



  return (
    <div className="container-for-the-mobileuploadpopup">
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
          <button className="delete-button-mobileuploadpopup">
            <img src={image} alt="" style={{ width: 20, height: 20 }} /> Delete
            form Cloud
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
                <th>Client Name</th>
                <th>Inspection Address</th>
                <th>Date Inspected </th>
                <th>Download</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Snehlata_2.1.24</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {" "}
                  <img src={img} alt="" style={{ width: 30, height: 30 }} />
                </td>
                <td>
                  {" "}
                  <input type="checkbox" />
                </td>
              </tr>
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
