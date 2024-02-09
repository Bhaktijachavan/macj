import React, { createContext, useContext, useState } from "react";
// import EditTemp from "./component/EditTemp/EditTemp";

export const EditTempContext = createContext();

export const ContextProvider = ({ children }) => {
  const [addressBook, setAddressBook] = useState([]);
  const [editTempData, setEditTempData] = useState([]);
  

  const contextValues = {
    addressBook,
    setAddressBook,
    editTempData,
    setEditTempData,
  };

  return (
    <EditTempContext.Provider value={contextValues}>
      {children}
    </EditTempContext.Provider>
  );
};

const useEditTempContext = () => {
  return useContext(EditTempContext);
};