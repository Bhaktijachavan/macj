import React, { useState , useEffect } from 'react';

const Alert = ({ children , color }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };



  return (
    <>
      {showAlert && (
       <div className={`fixed top-0 left-0 w-full bg-yellow-300 text-${color || 'yellow'}-900 px-4 py-2 shadow-md z-50`}>
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <p>{children}</p>
              {/* <button
                className="text-yellow-900"
                onClick={handleCloseAlert}
              >
                OK
              </button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;