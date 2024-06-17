import React, { useEffect, useState } from "react";
import axios from 'axios';
import Alert from "../../Alert/Alert";

const ViewTemplate = ({ onClose }) => {
  const [templateData, setTemplateData] = useState([]);
  const [selectedInspectionIds, setSelectedInspectionIds] = useState([]);

    //alert 
    const [showAlert, setShowAlert] = useState({
      showAlert: false,
      message: "",
      color : "",
    
    });

  useEffect(() => {
    fetchTemplateData();
  }, []);

  const fetchTemplateData = async () => {
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
    const response = await axios.get('http://node-backend.macj-abuyerschoice.com/api/template');
    if (response.status === 200) {
      setTemplateData(response.data.data);
    }
  } catch (error) {
    console.error("Error fetching template data:", error);
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

  useEffect(() => {
    console.log(selectedInspectionIds);
  },[selectedInspectionIds])

  const handleDeleteFromCloud = async () => {
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

    const verfify = window.confirm("Are you sure you want to delete these templates?");
    if (!verfify) {
        return;
    }
    try {
      // Send selectedInspectionIds array to the server for deletion
      const response = await axios.delete('http://node-backend.macj-abuyerschoice.com/api/template', {
        data: { templateIds: selectedInspectionIds } // Sending data in the request body
      });
      console.log("Response from server:", response.data);
      
      // Reset selectedInspectionIds array after successful deletion
      setSelectedInspectionIds([]);
      
      // Refresh inspection data
      fetchTemplateData();
    } catch (error) {
      console.error("Error deleting templates:", error);
    }
  }


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}
      <div className="max-w-4xl px-4 py-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold">View Templates</p>
          <button className="text-red-500 hover:text-red-700" onClick={onClose}>X</button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            Here is the list of all the templates saved in the cloud.
          </p>
        </div>
        <div className="mb-4 flex justify-center space-x-4">
  <button className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
   onClick={handleDeleteFromCloud}
  >
    Delete from Cloud
  </button>
  <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded" 
  onClick={fetchTemplateData}
  >
    Refresh
  </button>
</div>

        <div>
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Template Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Download</th>
        
              </tr>
            </thead>
            <tbody>
              {templateData.length > 0 ? (
                templateData.map(data => (
                  <tr key={data._id} className="border-t">
                    <td className="border px-4 py-2">{data.TemplateName || ""}</td>
                    <td className="border px-4 py-2">{data.description || ""}</td>
                    <td className="border px-4 py-2">
                      <button className="text-blue-500 hover:text-blue-700" onClick={() => window.open(data.pdf, '_self')}>
                        Download
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
                  <td className="border px-4 py-2" colSpan="3">No Templates Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTemplate;
