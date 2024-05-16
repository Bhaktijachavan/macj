const { app, BrowserWindow } = require("electron");
const path = require("path");

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
    autoHideMenuBar: true,
  });

  // const appPath = app.isPackaged ? path.dirname(app.getPath("exe")) : __dirname;
  // const indexPath = path.join(appPath, "build", "index.html");

  // win.loadURL("file:///D:/virtuebyteprojects/WebApp/macj/public/build/index.html")
  // win.loadURL("file:///D:/virtuebyteprojects/WebApp/macj/public/build/index.html")
  win
    .loadURL("http://localhost:3000")

    .then(() => {
      console.log("Load successful");
    })
    .catch((error) => {
      console.error("Error loading the URL:", error);
    });

  // Log additional information
  win.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    console.error("Failed to load URL:", errorCode, errorDescription);
  });
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

// const { app, BrowserWindow, dialog } = require("electron");
// const path = require("path");

// let win;

// function createWindow() {
//   win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       contextIsolation: true,
//       preload: path.join(__dirname, "preload.js"),
//       nodeIntegration: true,
//       enableRemoteModule: true,
//     },
//     autoHideMenuBar: true,
//   });

//   const baseDirectory = __dirname;
//   const filePath = path.join(baseDirectory, "..", "build", "index.html");
//   const fileUrl = `file:///${filePath}`;

//   win.loadURL(fileUrl);

//   win.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
//     console.error("Failed to load URL:", errorCode, errorDescription);
//   });

//   // Handle close event
//   win.on("close", (event) => {
//     const choice = dialog.showMessageBoxSync(win, {
//       type: "question",
//       buttons: ["Cancel", "OK"],
//       title: "Confirm",
//       message:
//         "Your data will be cleared. Are you sure you want to close the application?",
//     });

//     if (choice === 1) {
//       win.webContents.executeJavaScript("localStorage.clear();");
//     } else {
//       event.preventDefault();
//     }
//   });
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
