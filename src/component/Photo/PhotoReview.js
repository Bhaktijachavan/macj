// import React, { useCallback, useState, useEffect } from "react";
// import "./PhotoReview.css";
// import Location from "./Location";
// import Buttons from "./Buttons";
// import Caption from "./Caption";

// const PhotoReview = () => {
//   const [panels, setPanels] = useState([
//     { id: 1, uploadedFile: null },
//     { id: 2, uploadedFile: null },
//     { id: 3, uploadedFile: null },
//     { id: 4, uploadedFile: null },
//   ]);

//   useEffect(() => {
//     const fetchCoverImage = (panelId) => {
//       const coverImagePath = localStorage.getItem("coverphotoImage");
//       const newImage = JSON.parse(coverImagePath);
//       if (newImage && newImage[panelId]) {
//         console.log("New Image:", newImage[panelId]);
//         setPanels((prevPanels) =>
//           prevPanels.map((panel) =>
//             panel.id === panelId
//               ? { ...panel, uploadedFile: newImage[panelId] }
//               : panel
//           )
//         );
//       }
//     };

//     panels.forEach((panel) => fetchCoverImage(panel.id));

//     const intervalId = setInterval(() => {
//       panels.forEach((panel) => fetchCoverImage(panel.id));
//     }, 4000);

//     return () => clearInterval(intervalId);
//   }, [panels]);

//   const handleFileSelect = (file, panelId) => {
//     console.log("File selected:", file);
//     setPanels((prevPanels) =>
//       prevPanels.map((panel) =>
//         panel.id === panelId ? { ...panel, uploadedFile: file } : panel
//       )
//     );
//   };

//   const handleDrop = useCallback((event, panelId) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;
//     console.log("Files dropped:", files);

//     if (files.length > 0) {
//       setPanels((prevPanels) =>
//         prevPanels.map((panel) =>
//           panel.id === panelId ? { ...panel, uploadedFile: files[0] } : panel
//         )
//       );
//     }
//   }, []);

//   const handleDragOver = useCallback((event) => {
//     event.preventDefault();
//   }, []);

//   const handleDragEnter = useCallback((event) => {
//     event.preventDefault();
//     event.currentTarget.classList.add("drag-over");
//   }, []);

//   const handleDragLeave = useCallback((event) => {
//     event.preventDefault();
//     event.currentTarget.classList.remove("drag-over");
//   }, []);

//   return (
//     <>
//       <p className="PhotoReview-Main-Para">
//         The photo added to the top-left box will appear on the cover of the
//         report <br />
//         the drop-down boxes are automatically preloaded with the sectors from
//         The photo added to the top left box will appear on the cover of the the
//         current template. The photo will print in the location specified using
//         both drop-down boxes, unless you check "Print At End" for a photo.
//         <br />
//         The caption will be placed under each photo unless you check the 'Use
//         Location As Caption' button check the 'Summary' box to include the photo
//         in the Report Summary in addition to the report body.
//       </p>
//       <div className="PhotoReview-rectangular-container">
//         {panels.map((panel) => (
//           <div
//             key={panel.id}
//             className="PhotoReview-rectangle"
//             onDrop={(event) => handleDrop(event, panel.id)}
//             onDragOver={handleDragOver}
//             onDragEnter={handleDragEnter}
//             onDragLeave={handleDragLeave}
//           >
//             <Location id={panel.id} setId={() => {}} />
//             <div className="PhotoReview-Drag-Drop-Box">
//               {panel.uploadedFile ? (
//                 <img
//                   src={
//                     typeof panel.uploadedFile === "string"
//                       ? panel.uploadedFile
//                       : URL.createObjectURL(panel.uploadedFile)
//                   }
//                   alt="Uploaded Image"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                   }}
//                 />
//               ) : (
//                 <p className="Drag-Drop-Box-Para">
//                   The Selected File will Appear Here !
//                 </p>
//               )}
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Buttons
//                 onFileSelect={(file) => handleFileSelect(file, panel.id)}
//                 id={panel.id}
//               />
//             </div>
//             <Caption />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default PhotoReview;
