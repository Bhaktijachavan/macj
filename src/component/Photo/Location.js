// import React from "react";
// import "./Location.css";
// import Recallcheck from "./Recallcheck";
// import { Link } from "react-router-dom";
// const Location = () => {
//   return (
//     <>
//       <div className="container-for-locations-and-recall-component">
//         <div className="syysysysy">
//           <div className="PhotoReview-Location-container">
//             <label htmlfor="username">Location</label>
//             <br />
//             <select className="PhotoReview-Location-first-inputfields"></select>
//             <br />
//             <select className="PhotoReview-Location-first-inputfields"></select>
//           </div>
//           <div className="PhotoReview-Location-button">
//             <Link to="/panel1">
//               <button>@</button>
//             </Link>
//           </div>

//           <div className="PhotoReview-Location-Checkbox-Container">
//             <section className="Section-for-label-and-checkbox">
//               <input type="checkbox" name="agree" />
//               <label
//                 htmlfor="agree"
//                 className="PhotoReview-Location-Checkbox-label"
//               >
//                 Print At End
//               </label>
//             </section>
//             <section className="Section-for-label-and-checkbox">
//               <input
//                 type="checkbox"
//                 className="PhotoReview-Location-Checkbox-label"
//                 name="agree"
//               />
//               <label
//                 htmlfor="agree"
//                 className="PhotoReview-Location-Checkbox-label"
//               >
//                 Summary
//               </label>
//             </section>
//             <section className="Section-for-label-and-checkbox">
//               <input type="checkbox" id="agree" name="agree" />
//               <label
//                 htmlfor="agree"
//                 className="PhotoReview-Location-Checkbox-label"
//               >
//                 Use Location As Caption
//               </label>
//             </section>
//           </div>
//         </div>
//         {/* <div className="recalllllll"><Recallcheck /></div> */}
//       </div>
//     </>
//   );
// };
// export default Location;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import "./Location.css";

// const Location = () => {
//   const [menuData, setMenuData] = useState(null);
//   const [selectedMenuId, setSelectedMenuId] = useState(null);
//   const [selectedSubmenuId, setSelectedSubmenuId] = useState(null);
//   const [submenuDetails, setSubmenuDetails] = useState(null);

//   useEffect(() => {
//     const storedMenuData = localStorage.getItem("menuData");
//     if (storedMenuData) {
//       setMenuData(JSON.parse(storedMenuData));
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedSubmenuId && menuData && menuData[selectedMenuId]) {
//       setSubmenuDetails(menuData[selectedMenuId].subdetails[selectedSubmenuId]);
//     } else {
//       setSubmenuDetails(null);
//     }
//   }, [selectedSubmenuId, menuData, selectedMenuId]);

//   const handleMenuChange = (e) => {
//     const selectedId = e.target.value;
//     setSelectedMenuId(selectedId);
//     setSelectedSubmenuId(null);
//   };

//   const handleSubmenuChange = (e) => {
//     const selectedId = e.target.value;
//     setSelectedSubmenuId(selectedId);
//   };

//   return (
//     <>
//       <div className="container-for-locations-and-recall-component">
//         <div className="syysysysy">
//           <div className="PhotoReview-Location-container">
//             <label htmlFor="menuDropdown">Location</label>
//             <div>
//               <select
//                 id="menuDropdown"
//                 className="PhotoReview-Location-first-inputfields"
//                 onChange={handleMenuChange}
//               >
//                 <option value="">Select Menu</option>
//                 {menuData &&
//                   Object.keys(menuData).map((menuId) => (
//                     <option key={menuId} value={menuId}>
//                       {menuData[menuId].name}
//                     </option>
//                   ))}
//               </select>
//               <br />
//               <label htmlFor="submenuDropdown"></label>

//               <select
//                 id="submenuDropdown"
//                 className="PhotoReview-Location-first-inputfields"
//                 onChange={handleSubmenuChange}
//                 disabled={!selectedMenuId}
//               >
//                 <option value="">Select Submenu</option>
//                 {selectedMenuId &&
//                   menuData[selectedMenuId].subitems.map((submenu) => (
//                     <option key={submenu.id} value={submenu.id}>
//                       {submenu.subName}
//                     </option>
//                   ))}
//               </select>

//               <label htmlFor="damageDropdown"></label>
//               <br />
//               <select
//                 id="damageDropdown"
//                 className="PhotoReview-Location-first-inputfields"
//                 disabled={!selectedSubmenuId}
//               >
//                 <option value="">Select Damage</option>
//                 {submenuDetails &&
//                   Object.values(submenuDetails).map((details) => (
//                     <option
//                       key={details.Damage1Data}
//                       value={details.Damage1Data}
//                     >
//                       {details.damage1}
//                     </option>
//                   ))}
//               </select>
//             </div>
//             <div className="PhotoReview-Location-button">
//               {/* <Link to="/panel1"> */}
//               <button>@</button>
//               {/* </Link> */}
//             </div>
//             <div className="PhotoReview-Location-Checkbox-Container">
//               <section className="Section-for-label-and-checkbox">
//                 <input type="checkbox" name="agree" />
//                 <label
//                   htmlfor="agree"
//                   className="PhotoReview-Location-Checkbox-label"
//                 >
//                   Print At End
//                 </label>
//               </section>
//               <section className="Section-for-label-and-checkbox">
//                 <input
//                   type="checkbox"
//                   className="PhotoReview-Location-Checkbox-label"
//                   name="agree"
//                 />
//                 <label
//                   htmlfor="agree"
//                   className="PhotoReview-Location-Checkbox-label"
//                 >
//                   Summary
//                 </label>
//               </section>
//               <section className="Section-for-label-and-checkbox">
//                 <input type="checkbox" id="agree" name="agree" />
//                 <label
//                   htmlfor="agree"
//                   className="PhotoReview-Location-Checkbox-label"
//                 >
//                   Use Location As Caption
//                 </label>
//               </section>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Location;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import "./Location.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Location = () => {
  const [menuData, setMenuData] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedSubmenuId, setSelectedSubmenuId] = useState(null);
  const [submenuDetails, setSubmenuDetails] = useState(null);

  useEffect(() => {
    const storedMenuData = localStorage.getItem("menuData");
    if (storedMenuData) {
      setMenuData(JSON.parse(storedMenuData));
    }
  }, []);

  useEffect(() => {
    if (selectedSubmenuId && menuData && menuData[selectedMenuId]) {
      setSubmenuDetails(menuData[selectedMenuId].subdetails[selectedSubmenuId]);
    } else {
      setSubmenuDetails(null);
    }
  }, [selectedSubmenuId, menuData, selectedMenuId]);

  const handleMenuChange = (e) => {
    const selectedId = e.target.value;
    setSelectedMenuId(selectedId);
    setSelectedSubmenuId(null);
  };

  const handleSubmenuChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSubmenuId(selectedId);
  };

  return (
    <>
      <div className="container-for-locations-and-recall-component">
        <div className="syysysysy">
          <div className="PhotoReview-Location-container">
            <label htmlFor="menuDropdown">Location</label>
            <div>
              <select
                id="menuDropdown"
                className="PhotoReview-Location-first-inputfields"
                onChange={handleMenuChange}
              >
                <option value="">Select Menu</option>
                {menuData &&
                  Object.keys(menuData).map((menuId) => (
                    <option key={menuId} value={menuId}>
                      {menuData[menuId].name}
                    </option>
                  ))}
              </select>
              <br />
              <label htmlFor="submenuDropdown"></label>

              <select
                id="submenuDropdown"
                className="PhotoReview-Location-first-inputfields"
                onChange={handleSubmenuChange}
                disabled={!selectedMenuId}
              >
                <option value="">Select Submenu</option>
                {selectedMenuId &&
                  menuData[selectedMenuId].subitems.map((submenu) => (
                    <option key={submenu.id} value={submenu.id}>
                      {submenu.subName}
                    </option>
                  ))}
              </select>

              <label htmlFor="damageDropdown"></label>
              <br />
              <select
                id="damageDropdown"
                className="PhotoReview-Location-first-inputfields"
                disabled={!selectedSubmenuId}
              >
                <option value="">Select Damage</option>
                {submenuDetails &&
                  Object.values(submenuDetails).map((details) => (
                    <option
                      key={details.Damage1Data}
                      value={details.Damage1Data}
                    >
                      {details.damage1}
                    </option>
                  ))}
              </select>
            </div>
            <div className="PhotoReview-Location-button">
              <Link
                to={`/panel1?selectedMenuId=${selectedMenuId}&selectedSubmenuId=${selectedSubmenuId}`}
              >
                <button>@</button>
              </Link>
            </div>
            <div className="PhotoReview-Location-Checkbox-Container">
              <section className="Section-for-label-and-checkbox">
                <input type="checkbox" name="agree" />
                <label
                  htmlFor="agree"
                  className="PhotoReview-Location-Checkbox-label"
                >
                  Print At End
                </label>
              </section>
              <section className="Section-for-label-and-checkbox">
                <input
                  type="checkbox"
                  className="PhotoReview-Location-Checkbox-label"
                  name="agree"
                />
                <label
                  htmlFor="agree"
                  className="PhotoReview-Location-Checkbox-label"
                >
                  Summary
                </label>
              </section>
              <section className="Section-for-label-and-checkbox">
                <input type="checkbox" id="agree" name="agree" />
                <label
                  htmlFor="agree"
                  className="PhotoReview-Location-Checkbox-label"
                >
                  Use Location As Caption
                </label>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
