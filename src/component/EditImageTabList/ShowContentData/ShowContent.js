// const ShowContent = () => {
//   return
//   <>
//     textsWithPositions.map((text) => (
//       <div
//         key={text.id}
//         className="text-overlay"
//         style={{
//           color: text.textColor,
//           position: "absolute",
//           top: `${text.position.y}px`,
//           left: `${text.position.x}px`,
//           fontSize: `${text.fontSize}px`,
//           fontFamily: text.font,
//           fontWeight: text.isBold ? "bold" : "normal",
//           fontStyle: text.isItalic ? "italic" : "normal",
//           backgroundColor: text.isHighlighted
//             ? `${text.highlightColor}${Math.round(
//                 text.highlightOpacity * 255
//               ).toString(16)}`
//             : "transparent",
//           textAlign: "center",
//           pointerEvents: "none", // Disable pointer events so that clicks pass through the text overlay to the image
//         }}
//       >
//         {text.content}
//       </div>
//     ));
//   }
//   {
//     drawnArrows &&
//       drawnArrows.map((arrow, index) => {
//         // Calculate the angle of the arrow
//         const angle = Math.atan2(
//           arrow.end.y - arrow.start.y,
//           arrow.end.x - arrow.start.x
//         );
//         // Calculate the length of the arrowhead lines
//         const arrowheadLength = 10;
//         // Calculate the coordinates of the arrowhead
//         const arrowheadX1 =
//           arrow.end.x - arrowheadLength * Math.cos(angle - Math.PI / 6);
//         const arrowheadY1 =
//           arrow.end.y - arrowheadLength * Math.sin(angle - Math.PI / 6);
//         const arrowheadX2 =
//           arrow.end.x - arrowheadLength * Math.cos(angle + Math.PI / 6);
//         const arrowheadY2 =
//           arrow.end.y - arrowheadLength * Math.sin(angle + Math.PI / 6);

//         return (
//           <div
//             key={index}
//             className="drawn-arrow"
//             style={{
//               position: "absolute",
//               top: `${Math.min(arrow.start.y, arrow.end.y)}px`,
//               left: `${Math.min(arrow.start.x, arrow.end.x)}px`,
//             }}
//           >
//             <svg
//               width={`${Math.abs(arrow.end.x - arrow.start.x)}px`}
//               height={`${Math.abs(arrow.end.y - arrow.start.y)}px`}
//               viewBox={`0 0 ${Math.abs(arrow.end.x - arrow.start.x)} ${Math.abs(
//                 arrow.end.y - arrow.start.y
//               )}`}
//             >
//               <line
//                 x1={Math.abs(
//                   arrow.start.x - Math.min(arrow.start.x, arrow.end.x)
//                 )}
//                 y1={Math.abs(
//                   arrow.start.y - Math.min(arrow.start.y, arrow.end.y)
//                 )}
//                 x2={Math.abs(
//                   arrow.end.x - Math.min(arrow.start.x, arrow.end.x)
//                 )}
//                 y2={Math.abs(
//                   arrow.end.y - Math.min(arrow.start.y, arrow.end.y)
//                 )}
//                 style={{ stroke: arrow.color, strokeWidth: "4" }}
//               />
//               {/* Arrowhead */}
//               <line
//                 x1={arrowheadX1 - Math.min(arrow.start.x, arrow.end.x)}
//                 y1={arrowheadY1 - Math.min(arrow.start.y, arrow.end.y)}
//                 x2={arrow.end.x - Math.min(arrow.start.x, arrow.end.x)}
//                 y2={arrow.end.y - Math.min(arrow.start.y, arrow.end.y)}
//                 style={{ stroke: arrow.color, strokeWidth: "2" }}
//               />
//               <line
//                 x1={arrowheadX2 - Math.min(arrow.start.x, arrow.end.x)}
//                 y1={arrowheadY2 - Math.min(arrow.start.y, arrow.end.y)}
//                 x2={arrow.end.x - Math.min(arrow.start.x, arrow.end.x)}
//                 y2={arrow.end.y - Math.min(arrow.start.y, arrow.end.y)}
//                 style={{ stroke: arrow.color, strokeWidth: "2" }}
//               />
//             </svg>
//           </div>
//         );
//       });
//   }
//   {
//     drawnLines &&
//       drawnLines.map((line, index) => (
//         <svg
//           key={index}
//           width={`${Math.abs(line.end.x - line.start.x)}px`}
//           height={`${Math.abs(line.end.y - line.start.y)}px`}
//           viewBox={`0 0 ${Math.abs(line.end.x - line.start.x)} ${Math.abs(
//             line.end.y - line.start.y
//           )}`}
//           style={{
//             position: "absolute",
//             top: `${Math.min(line.start.y, line.end.y)}px`,
//             left: `${Math.min(line.start.x, line.end.x)}px`,
//           }}
//         >
//           <line
//             x1={Math.abs(line.start.x - Math.min(line.start.x, line.end.x))}
//             y1={Math.abs(line.start.y - Math.min(line.start.y, line.end.y))}
//             x2={Math.abs(line.end.x - Math.min(line.start.x, line.end.x))}
//             y2={Math.abs(line.end.y - Math.min(line.start.y, line.end.y))}
//             style={{ stroke: line.color, strokeWidth: "4" }}
//           />
//         </svg>
//       ));
//   }
//   {
//     drawnRectangles &&
//       drawnRectangles.map((rectangle, index) => {
//         return (
//           <svg
//             key={index}
//             width={`${Math.abs(rectangle.end.x - rectangle.start.x)}px`}
//             height={`${Math.abs(rectangle.end.y - rectangle.start.y)}px`}
//             viewBox={`0 0 ${Math.abs(
//               rectangle.end.x - rectangle.start.x
//             )} ${Math.abs(rectangle.end.y - rectangle.start.y)}`}
//             style={{
//               position: "absolute",
//               top: `${Math.min(rectangle.start.y, rectangle.end.y)}px`,
//               left: `${Math.min(rectangle.start.x, rectangle.end.x)}px`,
//             }}
//           >
//             <rect
//               x={Math.abs(
//                 rectangle.start.x - Math.min(rectangle.start.x, rectangle.end.x)
//               )}
//               y={Math.abs(
//                 rectangle.start.y - Math.min(rectangle.start.y, rectangle.end.y)
//               )}
//               width={Math.abs(rectangle.end.x - rectangle.start.x)}
//               height={Math.abs(rectangle.end.y - rectangle.start.y)}
//               style={{
//                 stroke: rectangle.color,
//                 strokeWidth: "4",
//                 fill: "none",
//               }}
//             />
//           </svg>
//         );
//       });
//   }

//   {
//     drawnOvals &&
//       drawnOvals.map((oval, index) => {
//         const centerX =
//           Math.min(oval.start.x, oval.end.x) +
//           Math.abs(oval.end.x - oval.start.x) / 2;
//         const centerY =
//           Math.min(oval.start.y, oval.end.y) +
//           Math.abs(oval.end.y - oval.start.y) / 2;
//         const radiusX = Math.abs(oval.end.x - oval.start.x) / 2;
//         const radiusY = Math.abs(oval.end.y - oval.start.y) / 2;

//         return (
//           <svg
//             key={index}
//             width={`${Math.abs(oval.end.x - oval.start.x)}px`}
//             height={`${Math.abs(oval.end.y - oval.start.y)}px`}
//             viewBox={`0 0 ${Math.abs(oval.end.x - oval.start.x)} ${Math.abs(
//               oval.end.y - oval.start.y
//             )}`}
//             style={{
//               position: "absolute",
//               top: `${Math.min(oval.start.y, oval.end.y)}px`,
//               left: `${Math.min(oval.start.x, oval.end.x)}px`,
//             }}
//           >
//             <ellipse
//               cx={radiusX}
//               cy={radiusY}
//               rx={radiusX}
//               ry={radiusY}
//               style={{
//                 stroke: oval.color,
//                 strokeWidth: "4",
//                 fill: "none",
//               }}
//             />
//           </svg>
//         );
//       });
//       </>

// };
// export default ShowContent;
