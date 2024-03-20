import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Book.css";
import "./Style.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import imageCompression from "browser-image-compression";

const Book = () => {
  // const [lastName, setLastName] = useState("");
  // const [firstName, setFirstName] = useState("");
  //const [Company, setCompany] = useState("");
  // const [workPhone, setworkPhone] = useState("");

  // const [formData, setFormData] = useState({ id: '', agentlastname: '', firstName: '', Company: '', workPhone: '' });
  const [formData, setFormData] = useState({
    agentlastname: "",
    firstName: "",
    Company: "",
    workPhone: "",
    WorkFax: "",
    HomePhone: "",
    HomeFax: "",
    Cellphone: "",
    Pager: "",
    Address: "",
    addressLine2: "",
    City: "",
    Province: "",
    PostalCode: "",
    Country: "",
    EmailAddress: "",
    Website: "",
    state: "",
    zipCode: "",
    Notes: "",
  });
  const [tableData, setTableData] = useState([]);
  const [selectedAgentId, setSelectedAgentId] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem("uploadedphot") || null
  );

  const [WorkFax, setWorkFax] = useState("");
  const [HomePhone, setHomePhone] = useState("");
  const [HomeFax, setHomeFax] = useState("");
  const [Cellphone, setCellphone] = useState("");
  const [Pager, setPager] = useState("");
  const [Address, setAddress] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [City, setCity] = useState("");
  const [Province, setProvince] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Country, setCountry] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [Website, setWebsite] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [Notes, setNotes] = useState("");

  const [otherInfo, setOtherInfo] = useState("");

  const [defaultDate, setDefaultDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = `${currentDate.getMonth() + 1}`.padStart(2, "0"); // Month is zero-based
    const day = `${currentDate.getDate()}`.padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDefaultDate(formattedDate);
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setIsUploading(true);

      // Simulate an asynchronous upload (replace with your actual upload logic)
      setTimeout(() => {
        setIsUploading(false);
        alert("File uploaded successfully!");
        setSelectedFile(null);
      }, 2000);
    } else {
      alert("Please select a file before uploading.");
    }
  };

  const handleCancel = () => {
    setIsUploading(false);
    setSelectedFile(null);
  };
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(tableData));
  }, [tableData]);
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("formData")) || [];
    setTableData(existingData);
  }, []);

  // const handleSave = () => {
  //   const newId = uuidv4();
  //   const newData = {
  //     id: newId,
  //     agentlastname: formData.agentlastname,
  //     firstName: formData.firstName,
  //     Company: formData.Company,
  //     workPhone: formData.workPhone,
  //     // Add other properties as needed
  //   };

  //   // Update the state with the new data entry
  //   setFormData((prevData) => [...prevData, newData]);

  //   // Save the updated data to localStorage
  //   const dataToSave = JSON.stringify({ formData: [...formData, newData] });
  //   localStorage.setItem('yourDataKey', dataToSave);
  // };
  const handleSave = () => {
    const newId = uuidv4();
    const newData = {
      id: newId,
      ...formData,
    };

    setTableData((prevData) => [...prevData, newData]);
    clearForm();
    setSelectedAgentId(null);
    localStorage.setItem("formData", JSON.stringify([...tableData, newData]));
  };

  const clearLocalStorage = (agentId) => {
    // Remove the specific agent's data from localStorage
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    const updatedData = storedData.filter((data) => data.id !== agentId);
    localStorage.setItem("formData", JSON.stringify(updatedData));

    // Update the table data
    const updatedTableData = tableData.filter((data) => data.id !== agentId);
    setTableData(updatedTableData);

    // Clear the form data for the selected agent
    setFormData({
      agentlastname: "",
      firstName: "",
      Company: "",
      workPhone: "",
      WorkFax: "",
      HomePhone: "",
      HomeFax: "",
      Cellphone: "",
      Pager: "",
      Address: "",
      addressLine2: "",
      City: "",
      Province: "",
      PostalCode: "",
      Country: "",
      EmailAddress: "",
      Website: "",
      state: "",
      zipCode: "",
      Notes: "",
    });

    // Clear the selectedAgentId
    setSelectedAgentId(null);
  };

  const clearForm = () => {
    setFormData({
      agentlastname: "",
      firstName: "",
      Company: "",
      workPhone: "",
      WorkFax: "",
      HomePhone: "",
      HomeFax: "",
      Cellphone: "",
      Pager: "",
      Address: "",
      addressLine2: "",
      City: "",
      Province: "",
      PostalCode: "",
      Country: "",
      EmailAddress: "",
      Website: "",
      state: "",
      zipCode: "",
      Notes: "",
    });

    // Clear other state variables as needed
    setWorkFax("");
    setHomePhone("");
    setHomeFax("");
    setCellphone("");
    setPager("");
    setAddress("");
    setAddressLine2("");
    setCity("");
    setProvince("");
    setPostalCode("");
    setCountry("");
    setEmailAddress("");
    setWebsite("");
    setState("");
    setZipCode("");
    setNotes("");
    // setOtherState("");
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      try {
        // Compress the image before converting to data URL
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Set the desired max size in MB (adjust as needed)
          maxWidthOrHeight: 800, // Set the maximum width or height (adjust as needed)
        });

        const reader = new FileReader();
        reader.onload = (event) => {
          const photoUrl = event.target.result;
          setSelectedImage(photoUrl);

          // Save imageUrl to localStorage
          localStorage.setItem("uploadedphot", photoUrl);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing the image:", error);
      }
    } else {
      console.error("Please select a valid image file.");
    }
  };

  return (
    <div className="main-container-book">
      <div>
        <Header />
      </div>

      <div class="flex flex-row mt-4" style={{ lineHeight: "25px" }}>
        <div class="basis-1/1 ml-4">
          <div className="box1-book flex ">
            <form className="formcont-book ">
              <h1 className="text-book text-lg">
                Real Estate Agent Information
              </h1>

              <div className="form-group-book">
                {/* <label htmlFor="inputlastname" className="label-book">
                  Agent Last Name
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="agentlastname"
                  value={formData.agentlastname}
                  style={{ width: "12%" }}
                  onChange={(e) =>
                    setFormData({ ...formData, agentlastname: e.target.value })
                  }
                />

                <label
                  htmlFor="inputfirstname"
                  className="label-book"
                  style={{ width: "12%", marginLeft: "5px" }}
                >
                  First
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="firstName"
                  value={formData.firstName}
                  style={{ width: "12%", marginLeft: "5px" }}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                /> */}
                <label htmlFor="inputlastname" className="label-book">
                  Agent Last Name
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="agentlastname"
                  value={formData.agentlastname}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      agentlastname: e.target.value,
                    }))
                  }
                />

                <label htmlFor="inputfirstname" className="label-book">
                  First Name
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group-book">
                {/* <label htmlFor="inputCompany" className="label-book">
                  Company
                </label>
                <input
                  type="emaCompanyil"
                  className="input-for-form-book"
                  id="Company"
                  value={formData.Company}
                  style={{ width: "12%" }}
                  onChange={(e) =>
                    setFormData({ ...formData, Company: e.target.value })
                  }
                /> */}
                <label htmlFor="inputCompany" className="label-book">
                  Company
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="Company"
                  value={formData.Company}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      Company: e.target.value,
                    }))
                  }
                />
              </div>

              {/* <div className="form-group-book">
                <label htmlFor="inputworkPhone" className="label-book">
                  Work Phone
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="workPhone"
                  value={formData.workPhone}
                  style={{ width: "12%", marginLeft: "5px" }}
                  onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })}
                />

                <label
                  htmlFor="inputWorkFax"
                  className="label-book"
                  style={{ marginLeft: "5px" }}
                >
                  Work Fax
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputWorkFax"
                  value={WorkFax}
                  style={{ width: "12%", marginLeft: "6px" }}
                  onChange={(e) => setWorkFax(e.target.value)}
                />
              </div> */}

              {/* <div className="flex ">
                <div>
                <label htmlFor="" className="label-book">Work Phone</label>
                <input type="text"
                 className="input-for-form-book" />

                </div>
              
              <div>
                <label htmlFor="">Work Fax</label>
                <input type="text" />
              </div>
              </div> */}
              <div className="form-group-book">
                <label htmlFor="inputHomePhone" className="label-book">
                  Home Phone
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputHomePhone"
                  value={formData.HomePhone}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      HomePhone: e.target.value,
                    }))
                  }
                />

                <label htmlFor="inputHomeFax" className="label-book">
                  Home Fax
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputHomeFax"
                  value={formData.HomeFax}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      HomeFax: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group-book">
                <label htmlFor="inputCellphone" className="label-book">
                  Cellphone
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputCellphone"
                  value={formData.Cellphone}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      Cellphone: e.target.value,
                    }))
                  }
                />

                <label htmlFor="inputPager" className="label-book">
                  Pager
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputPager"
                  value={formData.Pager}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      Pager: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group-book">
                <label htmlFor="inputAddress" className="label-book">
                  Address
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputAddress"
                  value={formData.Address}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      Address: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group-book">
                <label htmlFor="inputAddressLine2" className="label-book">
                  Address (Line 2)
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputAddressLine2"
                  value={formData.AddressLine2}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      AddressLine2: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group-book">
                <label htmlFor="inputCity" className="label-book">
                  City
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputCity"
                  value={formData.City}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      City: e.target.value,
                    }))
                  }
                />

                <label htmlFor="inputProvince" className="label-book">
                  Province
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputProvince"
                  value={formData.Province}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      Province: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group-book">
                <label htmlFor="inputPostalCode" className="label-book">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputPostalCode"
                  value={formData.PostalCode}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      PostalCode: e.target.value,
                    }))
                  }
                />

                <label htmlFor="inputCountry" className="label-book">
                  Country
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputCountry"
                  value={formData.Country}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      Country: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group-book">
                <label htmlFor="inputEmailAddress" className="label-book">
                  Email Address
                </label>
                <input
                  type="text"
                  className="input-for-form-book"
                  id="inputEmailAddress"
                  value={formData.EmailAddress}
                  style={{ width: "12%", marginLeft: "5px" }}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      EmailAddress: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="block">
                <div className="form-group-book">
                  <label htmlFor="inputWebsite" className="label-book">
                    Website
                  </label>
                  <input
                    type="text"
                    className="input-for-form-book"
                    id="inputWebsite"
                    value={formData.formWebsite}
                    style={{ width: "12%", marginLeft: "5px" }}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        formWebsite: e.target.value,
                      }))
                    }
                  />

                  <label
                    htmlFor="inputState"
                    className="label-book"
                    style={{ width: "12%", marginLeft: "5px" }}
                  >
                    State
                  </label>
                  <input
                    type="text"
                    className="input-for-form-book"
                    id="inputstate"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        state: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group-book">
                  <label htmlFor="inputzip" className="label-book">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="input-for-form-book"
                    id="inputzip"
                    value={formData.zipCode}
                    style={{ width: "12%", marginLeft: "5px" }}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        zipCode: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="form-group-book">
                <label htmlFor="inputNotes" className="label-book">
                  Notes
                </label>
                <textarea
                  className="input-for-form-book"
                  id="inputNotes"
                  rows="5"
                  value={formData.Notes}
                  style={{ width: "12%", marginLeft: "5px" }}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      Notes: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </form>
            <div className="flex flex-row" style={{ lineHeight: "17px" }}>
              {/* ... Other form elements ... */}
              <div className="photoupload-book">
                <div className="bg-white ml-5 mt-10 mr-5 w-40 h-48 border-2 border-dashed border-gray-400 flex items-center justify-center px-3">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-h-full max-w-full"
                    />
                  ) : (
                    <p className="text-gray-600">Agent Photo</p>
                  )}
                </div>

                <div className="flex ml-2 mt-2">
                  <div className="flex space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageInput"
                    />
                    <label
                      htmlFor="imageInput"
                      className="bg-gray-300 hover:bg-gray-400 px-3 h-6 border border-gray-400 rounded cursor-pointer text-sm"
                    >
                      Upload
                    </label>
                    <button
                      className="bg-gray-300 hover:bg-gray-400 px-3 h-6 border border-gray-400 rounded text-sm"
                      onClick={() => {
                        // Clear the selected image
                        setSelectedImage(null);
                        // Clear the file input value
                        document.getElementById("imageInput").value = "";
                        // Remove imageUrl from localStorage
                        localStorage.removeItem("uploadedphot");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-l border-black"></div>
        <div
          className="basis-1/2 bg-white mt-2 w-100 mr-3 ml-5 "
          style={{ hight: "45%" }}
        >
          <div className="">
            <table className="table-auto border border-black ml-5 mt-2">
              <thead>
                <tr>
                  <th
                    className="border border-black p-2 text-center"
                    style={{ width: "20%" }}
                  >
                    First
                  </th>
                  <th
                    className="border border-black p-2 text-center"
                    style={{ width: "20%" }}
                  >
                    Agent Last Name
                  </th>
                  <th
                    className="border border-black p-2 text-center"
                    style={{ width: "20%" }}
                  >
                    Company
                  </th>
                  <th
                    className="border border-black p-2 text-center"
                    style={{ width: "20%" }}
                  >
                    Work Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data) => (
                  <tr
                    key={data.id}
                    onClick={() => setSelectedAgentId(data.id)}
                    className={`cursor-pointer ${
                      selectedAgentId === data.id
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                  >
                    <td style={{ border: "1px solid black" }}>
                      {data.firstName}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {data.agentlastname}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {data.Company}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {data.workPhone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="btn-conat-book ml-5 text-sm ">
        <div className="flex flex-col-3 gap-1 mt-2 ml-2 ">
          {/* <button className="border border-black bg-gray-300 hover:bg-blue-100 w-60 h-6 rounded"
            onClick={submitForm}>
            Save
          </button> */}
          <button
            className="border border-black bg-gray-300 hover:bg-blue-100 w-60 h-6 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button className="border border-black bg-gray-300 hover:bg-blue-100 w-60 h-6 rounded">
            Export Contacts
          </button>
          <button
            className="border border-black bg-gray-300 hover:bg-blue-100 w-60 h-6 rounded"
            onClick={() => clearLocalStorage(selectedAgentId)}
          >
            Delete Agent
          </button>
        </div>
        <div className="flex gap-1 mt-2 ml-2">
          <button
            className="border border-black bg-gray-300 hover:bg-blue-100 h-6 rounded"
            style={{ width: "24%" }}
          >
            Sync Agents with MACJ Office
          </button>
          <button
            className="border border-black bg-gray-300 hover:bg-blue-100 h-6 rounded"
            style={{ width: "24%" }}
            onClick={clearForm}
          >
            Add New Agent
          </button>
        </div>
        <div className="flex gap-1 mt-2 ml-2">
          <button
            className="border border-black bg-gray-300 hover:bg-blue-100  h-6 rounded"
            style={{ width: "48.2%" }}
          >
            Import Contacts
          </button>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Book;
