// const { app, BrowserWindow, Menu } = require("electron/main");

// const path = require("node:path");

// let isMac = process.platform == "darwin";
// // let template = [
// //   {
// //     label: "File",
// //     submenu: [
// //       { label: "Open Inspection" },
// //       { label: "Save Insprction" },
// //       { label: "Open Template" },
// //       { label: "Save Template" },
// //       isMac ? { role: "close" } : { role: "quit" },
// //     ],
// //   },
// //   {x
// //     label: "Edite",
// //     submenu: [
// //       { label: "Client Information" },
// //       { label: "Address Book" },
// //       { label: "Contract Page" },
// //       { label: "Create/Edit Documents" },
// //       { label: "Insert PDF Documents" },
// //       { label: "Application Settings" },
// //     ],
// //   },
// //   {
// //     label: "Internet",
// //     submenu: [{ label: "Office Login" }, { label: "Upload Report" }],
// //   },
// //   {
// //     label: "Report Settings",
// //     submenu: [
// //       { label: "Company Logo" },
// //       { label: "Inspector Signature" },
// //       { label: "Client Signature" },
// //     ],
// //   },
// //   {
// //     label: "Photos",
// //     submenu: [
// //       { label: "Add Review Photos" },
// //       { label: "Batch Add Photos" },
// //       { label: "Clear All Photos" },
// //     ],
// //   },
// //   {
// //     label: "About",
// //     submenu: [
// //       { label: "Contact Support" },
// //       { label: "Remote Help Connection" },
// //       { label: "About" },
// //     ],
// //   },
// // ];

// let win;
// function createWindow() {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       contextIsolation: true,
//       preload: path.join(__dirname, "preload.js"),
//       nodeIntegration: true,

//       enableRemoteModule: true,
//     },
//   });

//   win.loadURL("http://localhost:3000");
//   let menu = Menu.buildFromTemplate(template);
//   Menu.setApplicationMenu(menu);
// }

// app.whenReady().then(() => {
//   createWindow();

//   app.on("activate", () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

const { app, BrowserWindow, Menu } = require("electron/main");
const path = require("node:path");

let isMac = process.platform == "darwin";

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    autoHideMenuBar: true, // Hide the default menu bar
  });

  win.loadURL("http://localhost:3000/");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
