import React, { useState, useCallback } from "react";
import "./ClientInfo.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import * as CryptoJS from "crypto-js"; // Import CryptoJS library
import {
  downloadFile,
  readFileAsText,
} from "../../component/Function/function";

const ClientInfo = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    fax: "",
    email: "",
    inspectionAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    agent: "macj-home-inspector",
    dateOfInspection: "",
    timeOfInspection: "",
    ageOfHome: "",
    size: "",
    inspectionFee: "",
    weather: "",
    otherInfo: "",
  });
  const [pop, setpop] = useState(false);

  const encryptionKey = "secretkey";

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSaveInspection = useCallback(() => {
    const encryptedData = encryptData(formData, encryptionKey);
    downloadEncryptedFile(encryptedData);

    // Parse existingClient only if it exists
  }, [formData, encryptionKey]);

  const saveOffline = () => {
    let existingClient = localStorage.getItem("client");

    // Check if existingClient is null (no data stored)
    existingClient = existingClient ? JSON.parse(existingClient) : [];

    const clientInfo = {
      ...formData,
      id: Date.now(),
      clientname: formData.firstName + " " + formData.lastName,
    };

    const updatedClients = [...existingClient, clientInfo];
    console.log(updatedClients);
    localStorage.setItem("client", JSON.stringify(updatedClients));
    setpop(true);
  };

  const encryptData = (data, key) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();
    return encryptedData;
  };

  const downloadEncryptedFile = useCallback((encryptedData) => {
    const blob = new Blob([encryptedData], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "encryptedData.hzf";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, []);

  const decryptData = (encryptedData, key) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const encryptedData = await readFileAsText(file);
      const decryptedData = decryptData(encryptedData, encryptionKey);
      setFormData(decryptedData);
    }
  };

  return (
    <div className="main-container-clientinfo">
      {pop && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="relative bg-white p-8 max-w-md rounded shadow-lg">
            <div className="popup">
              <div className="popup-content">
                <h2 className="text-xl font-semibold mb-2">Inspection Saved</h2>
                <p className="text-gray-700">
                  Your inspection has been saved successfully.
                </p>
                <button
                  onClick={() => setpop(false)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {/* <Header /> */}
        <Header
          onSaveInspection={handleSaveInspection}
          onOpenInspection={handleFileChange}
        />
      </div>

      <form className="formcont text-sm">
        <h1 className="text text-lg">Client Information</h1>

        <div className="form-group">
          <label htmlFor="inputlastname" className="label">
            Last Name:
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputlastname"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />

          <label
            htmlFor="inputfirstname"
            className="label"
            style={{ width: "11%", marginLeft: "5px" }}
          >
            First Name:
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputfirstname"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputphone" className="label">
            Phone Number:
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputphone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />

          <label
            htmlFor="inputfax"
            className="label"
            style={{ width: "11%", marginLeft: "5px" }}
          >
            Fax:
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputfax"
            name="fax"
            value={formData.fax}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputemail" className="label">
            Email:
          </label>
          <input
            type="email"
            className="input-for-form"
            id="inputemail"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputinspection" className="label">
            Inspection Address:
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputinspection"
            name="inspectionAddress"
            value={formData.inspectionAddress}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputaddress2" className="label">
            Address (Line 2):
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputaddress2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
          />
        </div>
        <div className="block">
          <div className="form-group">
            <label htmlFor="inputcity" className="label">
              City:
            </label>
            <input
              type="text"
              className="input-for-form"
              id="inputcity"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />

            <label
              htmlFor="inputstate"
              className="label"
              style={{ width: "11%", marginLeft: "5px" }}
            >
              State:
            </label>
            <input
              type="text"
              className="input-for-form"
              id="inputstate"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group1">
            <label htmlFor="inputzip" className="label">
              ZIP Code:
            </label>
            <input
              type="text"
              className="input-for-form"
              id="inputzip"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputagent" className="label">
            Real Estate Agent:
          </label>
          <select
            className="input-for-form"
            id="inputagent"
            name="agent"
            value={formData.agent}
            onChange={handleInputChange}
          >
            <option value="macj-home-inspector">macj-home-inspector</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inputdate" className="label">
            Date of Inspection:
          </label>
          <input
            type="date"
            className="input-for-form"
            id="inputdate"
            name="dateOfInspection" // Corrected property name
            value={formData.dateOfInspection}
            onChange={handleInputChange}
          />

          <label
            htmlFor="inputtime"
            className="label"
            style={{ width: "11%", marginLeft: "5px" }}
          >
            Time :
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputtime"
            name="timeOfInspection"
            value={formData.timeOfInspection}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputage" className="label">
            Age of Home:
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputage"
            name="ageOfHome"
            value={formData.ageOfHome}
            onChange={handleInputChange}
          />

          <label
            htmlFor="inputsize"
            className="label"
            style={{ width: "11%", marginLeft: "5px" }}
          >
            Size:
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputsize"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputfee" className="label">
            Inspection Fee:
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputfee"
            name="inspectionFee"
            value={formData.inspectionFee}
            onChange={handleInputChange}
          />

          <label
            htmlFor="inputweather"
            className="label"
            style={{ width: "11%", marginLeft: "5px" }}
          >
            Weather:
          </label>
          <input
            type="text"
            className="input-for-form"
            id="inputweather"
            name="weather"
            value={formData.weather}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputagent" className="label">
            Other Info:
          </label>
          <textarea
            className="input-for-form"
            id="inputagent"
            rows="4"
            name="otherInfo"
            value={formData.otherInfo}
            onChange={handleInputChange}
          ></textarea>
        </div>

       
      </form>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ClientInfo;
