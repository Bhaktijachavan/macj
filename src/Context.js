import React, { createContext, useContext, useState } from "react";
// import EditTemp from "./component/EditTemp/EditTemp";
import OverLayImage from "./component/EditImageTabList/OverLayImage/OverLayImage";

export const EditTempContext = createContext();

export const ContextProvider = ({ children }) => {
  const [addressBook, setAddressBook] = useState([]);
  const [editTempData, setEditTempData] = useState([]);
  const [editImage, setEditImage] = useState();
  const [pdf, setPdf] = useState();
    const [showComment, setShowComment] = useState(false);

  const contextValues = {
    addressBook,
    setAddressBook,
    editTempData,
    setEditTempData,
    setEditImage,
    editImage,
    pdf,
    setPdf,
    setShowComment,
    showComment,
  };

  return (
    <EditTempContext.Provider value={contextValues}>
      {children}
    </EditTempContext.Provider>
  );
};

export const useEditTempContext = () => {
  return useContext(EditTempContext);
};
