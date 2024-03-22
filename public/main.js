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

// const { app, BrowserWindow } = require("electron");
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

//   // const appPath = app.isPackaged ? path.dirname(app.getPath("exe")) : __dirname;
//   // const indexPath = path.join(appPath, "build", "index.html");

//   // win.loadURL("file:///D:/virtuebyteprojects/WebApp/macj/public/build/index.html")
//   // win.loadURL("file:///D:/virtuebyteprojects/WebApp/macj/public/build/index.html")

//   //  win.loadURL(`file:///C:/Users/amar/OneDrive/Desktop/virtuebyte/newmacje/macj/public/build/index.html`)
//   // const filePath =
//   //   "C:/Users/amar/OneDrive/Desktop/virtuebyte/newmacje/macj/dist/electron-react-win32-x64/resources/app/build/index.html";

//   const baseDirectory = __dirname;

//   // Construct the file path with the correct relative path
//   const filePath = path.join(baseDirectory, "..", "build", "index.html");

//   // Convert the path to a file URL
//   const fileUrl = `file:///${filePath}`;

//   console.log("fileUrl", fileUrl);

//   // Load the local file using the dynamically constructed file URL
//   win
//     .loadURL(fileUrl)
//     .then(() => {
//       console.log("Load successful");
//     })
//     .catch((error) => {
//       console.error("Error loading the URL:", error);
//     });

//   // Log additional information
//   win.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
//     console.error("Failed to load URL:", errorCode, errorDescription);
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
