import React, { useState } from 'react';
import axios from 'axios';

const UploadInspectionPopup = ({ onClose }) => {
  const [inspectionData, setInspectionData] = useState({
    InspectionName: '',
    clientName: '',
    phone: '',
    email: '',
    address: '',
    InspectionDate: '',
    pdfFile: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInspectionData({
      ...inspectionData,
      [name]: value,
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setInspectionData({
        ...inspectionData,
        pdfFile: file,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(inspectionData).forEach(([key, value]) => {
        if (key !== 'pdfFile') {
          formData.append(key, value);
        } else if (inspectionData.pdfFile) {
          formData.append('pdf', inspectionData.pdfFile);
        }
      });

      const response = await axios.post('http://localhost:7000/api/inspection/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form submitted successfully:', response.data.data);
      alert('Inspection Uploaded successfully!');
      onClose();
      // Update UI or perform further actions based on response
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error uploading inspection!');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-xl font-semibold mb-4">Upload Inspection</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="InspectionName">Inspection Name</label>
            <input
              type="text"
              id="InspectionName"
              name="InspectionName"
              value={inspectionData.InspectionName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="clientName">Client Name</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={inspectionData.clientName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={inspectionData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inspectionData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={inspectionData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Inspection Date</label>
            <input
              type="date"
              name="InspectionDate"
              value={inspectionData.InspectionDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Upload PDF</label>
            <input
              type="file"
              name="pdfFile"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="text-right">
            <button type="button" className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md focus:outline-none" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadInspectionPopup;
