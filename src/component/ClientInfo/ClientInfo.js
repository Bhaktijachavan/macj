// import React, { useState, useEffect } from "react";
// import "./ClientInfo.css";
// import Footer from "../Footer/Footer";
// import Header from "../Header/Header";

// const ClientInfo = () => {
//   const [lastName, setLastName] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [fax, setFax] = useState("");
//   const [email, setEmail] = useState("");
//   const [inspectionAddress, setInspectionAddress] = useState("");
//   const [addressLine2, setAddressLine2] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [agent, setAgent] = useState("");
//   const [dateOfInspection, setDateOfInspection] = useState("");
//   const [timeOfInspection, setTimeOfInspection] = useState("");
//   const [ageOfHome, setAgeOfHome] = useState("");
//   const [size, setSize] = useState("");
//   const [inspectionFee, setInspectionFee] = useState("");
//   const [weather, setWeather] = useState("");
//   const [otherInfo, setOtherInfo] = useState("");

//   const [defaultDate, setDefaultDate] = useState("");

//   useEffect(() => {
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const month = `${currentDate.getMonth() + 1}`.padStart(2, "0"); // Month is zero-based
//     const day = `${currentDate.getDate()}`.padStart(2, "0");
//     const formattedDate = `${year}-${month}-${day}`;
//     setDefaultDate(formattedDate);
//   }, []);

//   return (
//     <div className="main-container-clientinfo">
//       <div>
//         <Header />
//       </div>

//       <form className="formcont text-sm">
//         <h1 className="text text-lg py-5">Client Information</h1>

//         <div className="form-group">
//           <label htmlFor="inputlastname" className="label">
//             Last Name:
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputlastname"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />

//           <label
//             htmlFor="inputfirstname"
//             className="label"
//             style={{ width: "11%", marginLeft: "5px" }}
//           >
//             First Name:
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputfirstname"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="inputphone" className="label">
//             Phone Number:
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputphone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />

//           <label
//             htmlFor="inputfax"
//             className="label"
//             style={{ width: "11%", marginLeft: "5px" }}
//           >
//             Fax:
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputfax"
//             value={fax}
//             onChange={(e) => setFax(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="inputemail" className="label">
//             Email:
//           </label>
//           <input
//             type="email"
//             className="input-for-form"
//             id="inputemail"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="inputinspection" className="label">
//             Inspection Address:
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputinspection"
//             value={inspectionAddress}
//             onChange={(e) => setInspectionAddress(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="inputaddress2" className="label">
//             Address (Line 2):
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputaddress2"
//             value={addressLine2}
//             onChange={(e) => setAddressLine2(e.target.value)}
//           />
//         </div>
//         <div className="block">
//           <div className="form-group">
//             <label htmlFor="inputcity" className="label">
//               City:
//             </label>
//             <input
//               type="text"
//               className="input-for-form"
//               id="inputcity"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//             />

//             <label
//               htmlFor="inputstate"
//               className="label"
//               style={{ width: "11%", marginLeft: "5px" }}
//             >
//               State:
//             </label>
//             <input
//               type="text"
//               className="input-for-form"
//               id="inputstate"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//             />
//           </div>
//           <div className="form-group1">
//             <label htmlFor="inputzip" className="label">
//               ZIP Code:
//             </label>
//             <input
//               type="text"
//               className="input-for-form"
//               id="inputzip"
//               value={zipCode}
//               onChange={(e) => setZipCode(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="inputagent" className="label">
//             Real Estate Agent:
//           </label>
//           <select
//             className="input-for-form"
//             id="inputagent"
//             value={agent}
//             onChange={(e) => setAgent(e.target.value)}
//           >
//             <option value="macj-home-inspector">macj-home-inspector</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="inputdate" className="label">
//             Date of Inspection:
//           </label>
//           <input
//             type="date"
//             className="input-for-form"
//             id="inputdate"
//             value={dateOfInspection || defaultDate}
//             onChange={(e) => setDateOfInspection(e.target.value)}
//           />

//           <label
//             htmlFor="inputtime"
//             className="label"
//             style={{ width: "11%", marginLeft: "5px" }}
//           >
//             Time :
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputtime"
//             value={timeOfInspection}
//             onChange={(e) => setTimeOfInspection(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="inputage" className="label">
//             Age of Home:
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputage"
//             value={ageOfHome}
//             onChange={(e) => setAgeOfHome(e.target.value)}
//           />

//           <label
//             htmlFor="inputsize"
//             className="label"
//             style={{ width: "11%", marginLeft: "5px" }}
//           >
//             Size:
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputsize"
//             value={size}
//             onChange={(e) => setSize(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="inputfee" className="label">
//             Inspection Fee:
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputfee"
//             value={inspectionFee}
//             onChange={(e) => setInspectionFee(e.target.value)}
//           />

//           <label
//             htmlFor="inputweather"
//             className="label"
//             style={{ width: "11%", marginLeft: "5px" }}
//           >
//             Weather:
//           </label>
//           <input
//             type="text"
//             className="input-for-form"
//             id="inputweather"
//             value={weather}
//             onChange={(e) => setWeather(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="inputagent" className="label">
//             Other Info:
//           </label>
//           <textarea
//             className="input-for-form"
//             id="inputagent"
//             rows="4"
//             value={otherInfo}
//             onChange={(e) => setOtherInfo(e.target.value)}
//           ></textarea>
//         </div>
//       </form>
//       <div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default ClientInfo;




import React, { useState, useRef } from "react";
import "./ClientInfo.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const ClientInfo = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [inspectionAddress, setInspectionAddress] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [agent, setAgent] = useState("macj-home-inspector");
  const [dateOfInspection, setDateOfInspection] = useState("");
  const [timeOfInspection, setTimeOfInspection] = useState("");
  const [ageOfHome, setAgeOfHome] = useState("");
  const [size, setSize] = useState("");
  const [inspectionFee, setInspectionFee] = useState("");
  const [weather, setWeather] = useState("");
  const [otherInfo, setOtherInfo] = useState("");

  const fileInputRef = useRef(null);

  const handleSaveInspection = async () => {
    try {
      // Combine input values into an object representing HXF format
      const inspectionData = {
        lastName,
        firstName,
        phone,
        fax,
        email,
        inspectionAddress,
        addressLine2,
        city,
        state,
        zipCode,
        agent,
        dateOfInspection,
        timeOfInspection,
        ageOfHome,
        size,
        inspectionFee,
        weather,
        otherInfo,
        // Add other fields as needed
      };

      // Convert the data to an HXF formatted string
      const hxfData = createHxfFormat(inspectionData);

      // Request file system access for saving a file
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "inspection_data.hzf",

        types: [
          {
            description: "HZF Files",
            accept: {
              "application/hzf": [".hzf"],
            },
          },
        ],
        
      });

      // Create a writable stream
      const writable = await fileHandle.createWritable();

      // Write the HXF data to the file
      await writable.write(hxfData);

      // Close the writable stream
      await writable.close();

      console.log("File saved successfully!");
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };

  const handleOpenInspection = async () => {
    if (fileInputRef.current && fileInputRef.current.files.length > 0) {
      const selectedFile = fileInputRef.current.files[0];

      try {
        // Get a Blob containing the file data
        const fileBlob = await selectedFile.arrayBuffer();

        // Create a new FileReader
        const reader = new FileReader();

        // Set up the onload event for the reader
        reader.onload = function (event) {
          try {
            // Parse the content as HXF format
            const inspectionData = parseHxfFormat(event.target.result);

            // Set the state with the retrieved data
            setLastName(inspectionData.lastName);
            setFirstName(inspectionData.firstName);
            setPhone(inspectionData.phone);
            setFax(inspectionData.fax);
            setEmail(inspectionData.email);
            setInspectionAddress(inspectionData.inspectionAddress);
            setAddressLine2(inspectionData.addressLine2);
            setCity(inspectionData.city);
            setState(inspectionData.state);
            setZipCode(inspectionData.zipCode);
            setAgent(inspectionData.agent);
            setDateOfInspection(inspectionData.dateOfInspection);
            setTimeOfInspection(inspectionData.timeOfInspection);
            setAgeOfHome(inspectionData.ageOfHome);
            setSize(inspectionData.size);
            setInspectionFee(inspectionData.inspectionFee);
            setWeather(inspectionData.weather);
            setOtherInfo(inspectionData.otherInfo);

            console.log("File opened successfully!");
          } catch (error) {
            console.error("Error parsing file content:", error);
          }
        };

        // Read the content of the file as text
        reader.readAsText(new Blob([fileBlob]));
      } catch (error) {
        console.error("Error opening file:", error);
      }
    }
  };

  // Example function to create HXF format based on your specifications
  const createHxfFormat = (data) => {
    // Implement the logic to format the data into HXF format
    // For example, convert the object to a string and format as needed
    return JSON.stringify(data, null, 2); // Replace with actual HXF formatting logic
  };

  // Example function to parse HXF format based on your specifications
  const parseHxfFormat = (content) => {
    try {
      // Parse the content as JSON
      const inspectionData = JSON.parse(content);
      return inspectionData;
    } catch (error) {
      console.error("Error parsing HXF content:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  return (
    <div className="main-container-clientinfo">
      <div>
        {/* <Header /> */}
        <Header
          onSaveInspection={handleSaveInspection}
          onOpenInspection={() => fileInputRef.current.click()}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            value={fax}
            onChange={(e) => setFax(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={inspectionAddress}
            onChange={(e) => setInspectionAddress(e.target.value)}
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
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
              value={state}
              onChange={(e) => setState(e.target.value)}
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
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
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
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
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
            value={dateOfInspection}
            onChange={(e) => setDateOfInspection(e.target.value)}
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
            value={timeOfInspection}
            onChange={(e) => setTimeOfInspection(e.target.value)}
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
            value={ageOfHome}
            onChange={(e) => setAgeOfHome(e.target.value)}
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
            value={size}
            onChange={(e) => setSize(e.target.value)}
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
            value={inspectionFee}
            onChange={(e) => setInspectionFee(e.target.value)}
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
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
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
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
          ></textarea>
        </div>

        <button
          style={{
            backgroundColor: "#4CAF50",
            padding: "10px 20px",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleSaveInspection}
        >
          Save Inspection
        </button>

        <button
          style={{
            backgroundColor: "#4CAF50",
            padding: "10px 20px",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={() => fileInputRef.current.click()}
        >
          Open Inspection
        </button>

        {/* Hidden file input for opening HXF files */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".hzf"

          onChange={handleOpenInspection}
        />
      </form>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ClientInfo;

































