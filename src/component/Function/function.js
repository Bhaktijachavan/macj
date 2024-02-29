import * as CryptoJS from "crypto-js";
import Panel4 from "../Panel/Panel4/Panel4";
import Panel1 from "../Panel/Panel1/Panel1";
import Panel5 from "../Panel/Panel5/Panel5";
import Panel6 from "../Panel/Panel6/Panel6";
import Panel3 from "../Panel/Panel3/Panel3";
import Panel2 from "../Panel/Panel2/Panel2";

export function encryptData(data, key) {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    key
  ).toString();
  return encryptedData;
}

export function decryptData(encryptedData, key) {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
}

export const downloadFile = (encryptedData) => {
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
};
export const downloadFileTpz = (encryptedData) => {
  const blob = new Blob([encryptedData], {
    type: "application/octet-stream",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Template.tpz";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const encryptionKey = "secretkey";

export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export const jsxToString = (jsxElement) => {
  const div = document.createElement("div");
  div.appendChild(jsxElement);
  return div.innerHTML;
};

// Function to convert string to JSX elements
export const stringToJsx = (htmlString) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export const PanalSelect = (value, panelData) => {
  switch (value) {
    case 1:
      return <Panel4 panelData={panelData} />;
    case 2:
      return <Panel1 panelData={panelData} />;
    case 3:
      return <Panel5 panelData={panelData} />;
    case 4:
      return <Panel6 panelData={panelData} />;
    case 5:
      return <Panel2 panelData={panelData} />;
    case 6:
      return <Panel3 panelData={panelData} />;
    default:
      return "";
  }
};
