import React, { useState, useCallback, useEffect } from "react";
import "./ClientInfo.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Alert from "../Alert/Alert";

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
    agent: "macj-home-inspector", // Set the default agent here
    dateOfInspection: "",
    timeOfInspection: "",
    ageOfHome: "",
    size: "",
    inspectionFee: "",
    weather: "",
    otherInfo: "",
  });

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const clientInfoData = JSON.parse(localStorage.getItem("clientInfoData"));
    if (clientInfoData) {
      setFormData(clientInfoData);
    }

    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      setAgents(formData);
    }
  }, []);

  const nonEmptyFields = Object.entries(formData).reduce(
    (acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    message: "",
  });

  const hanndleSaveToLocalStorage = (event) => {
    event.preventDefault();

    const { firstName, lastName, email, phone } = formData;

    if (!firstName || !lastName || !email || !phone) {
      setShowAlert({
        showAlert: true,
        message: "Incomplete data. Please fill in all required fields.",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        });
      }, 4000);

      return;
    }

    localStorage.setItem("clientInfoData", JSON.stringify(formData));
    setpop(true);
  };

  const [pop, setpop] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const clearForm = () => {
    setFormData({
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
      agent: "macj-home-inspector", // Reset to default agent here
      dateOfInspection: "",
      timeOfInspection: "",
      ageOfHome: "",
      size: "",
      inspectionFee: "",
      weather: "",
      otherInfo: "",
    });
    localStorage.removeItem("clientInfoData");

    return true;
  };

  const handleClearForm = () => {
    if (clearForm()) {
      setShowAlert({
        showAlert: true,
        message: "Form data is cleared now",
      });
      setTimeout(() => {
        setShowAlert({
          showAlert: false,
          message: "",
        });
      }, 4000);
    }
  };

  return (
    <div className="main-container-clientinfo ">
      {pop && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative max-w-md ">
            <div className="popup">
              <div className="popup-content flex flex-col items-center content-center justify-center">
                <h2 className="text-xl font-semibold mb-2">Inspection Saved</h2>
                <p className="text-gray-700 text-center">
                  Your inspection has been saved successfully.
                </p>
                <button
                  onClick={() => setpop(false)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex items-center justify-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <Header />
      </div>
      {showAlert.showAlert && <Alert>{showAlert.message}</Alert>}

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
            {agents.map((agent) => (
              <option
                key={agent.id}
                value={`${agent.firstName} ${agent.agentlastname}`}
              >
                {agent.firstName} {agent.agentlastname}
              </option>
            ))}
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
            name="dateOfInspection"
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
      <div className="div-for-saving-the-data-to-the-localstorage-btn-client-info">
        <button
          className="for-saving-the-data-to-the-localstorage-btn-client-info"
          onClick={hanndleSaveToLocalStorage}
        >
          Save
        </button>
        <button
          className="for-saving-the-data-to-the-localstorage-btn-client-info"
          onClick={handleClearForm}
        >
          Clear Form
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ClientInfo;
