import React, { useEffect, useState } from 'react';
import "../../component/EditTemp/DynamicMenuComponent.css"

const SubdetailsDisplay = ({ subdetails }) => {
  if (!subdetails || Object.keys(subdetails).length === 0) {
    return null;
  }

  return (
    <div>
      <h4>Added Subdetails:</h4>
      {Object.entries(subdetails).map(([key, values]) => (
        <div key={key}>
          <p>{`Option ${key}:`}</p>
          <ul>
            {Object.entries(values).map(([label, value]) => (
              <li key={label}>{`${label}: ${value}`}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};


const DynamicMenuComponent = () => {
  const [menuData, setMenuData] = useState({});
  const [menuName, setMenuName] = useState('');
  const [submenuName, setSubmenuName] = useState('');
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [selectedSubMenuId, setSelectedSubMenuId] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [inputValues, setInputValues] = useState({
    tabname: '',
    damage1: '',
    damage2: '',
    selection1: '',
    selection2: '',
  });
  const [selectedOption, setSelectedOption] = useState(''); // New state for selected option

  useEffect(() => {
    const storedMenuData = localStorage.getItem('menuData');
    if (storedMenuData) {
      setMenuData(JSON.parse(storedMenuData));
    }
  }, []);

  // Save menu data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('menuData', JSON.stringify(menuData));
  }, [menuData]);

  const handleAddMenu = () => {
    if (menuName.trim() === '') {
      alert('Please enter a valid menu name');
      return;
    }

    setMenuData((prevMenuData) => {
      const newMenuId = Object.keys(prevMenuData).length + 1;

      return {
        ...prevMenuData,
        [newMenuId]: {
          id: newMenuId,
          name: menuName,
          subitems: [],
          subdetails: {},
        },
      };
    });

    setMenuName(''); // Clear the input field
    setSelectedMenuId(null); // Clear the selected menu
  };
  const handleClosePopup = () => {
    // Add any additional cleanup logic here if needed
    // For now, just clear selected menu and submenu
    setSelectedMenuId(null);
    setSelectedSubMenuId(null);

  };
  const handleAddSubmenu = () => {
    if (submenuName.trim() === '') {
      alert('Please enter a valid submenu name');
      return;
    }

    setMenuData((prevMenuData) => {
      if (!selectedMenuId) {
        alert('Please select a menu first');
        return prevMenuData;
      }

      const selectedMenu = prevMenuData[selectedMenuId];
      const newSubmenuId = selectedMenu.subitems.length + 1;

      return {
        ...prevMenuData,
        [selectedMenuId]: {
          ...selectedMenu,
          subitems: [
            ...selectedMenu.subitems,
            {
              id: newSubmenuId,
              subName: submenuName,
              si: newSubmenuId,
              selectedOption: selectedRadio,
            },
          ],
          subdetails: {
            ...selectedMenu.subdetails,
            [newSubmenuId]: {},
          },
        },
      };
    });

    setSubmenuName(''); // Clear the input field
    setSelectedRadio(''); // Clear the selected radio
    setInputValues({
      tabname: '',
      damage1: '',
      damage2: '',
      selection1: '',
      selection2: '',
    }); // Clear the input values
    setSelectedSubMenuId(null); // Clear the selected submenu
  };

  const handleAddSubdetails = () => {
    if (!selectedMenuId || !selectedSubMenuId) {
      alert('Please select a menu and submenu first');
      return;
    }

    setMenuData((prevMenuData) => {
      const selectedMenu = prevMenuData[selectedMenuId];

      if (!selectedMenu) {
        alert('Please select a valid menu');
        return prevMenuData;
      }

      const selectedSubmenu = selectedMenu.subitems.find(
        (submenu) => submenu.id === selectedSubMenuId
      );

      if (!selectedSubmenu) {
        alert('Please select a valid submenu');
        return prevMenuData;
      }

      return {
        ...prevMenuData,
        [selectedMenuId]: {
          ...selectedMenu,
          subdetails: {
            ...selectedMenu.subdetails,
            [selectedSubMenuId]: {
              ...selectedMenu.subdetails[selectedSubMenuId],
              [selectedRadio]: { ...inputValues },
            },
          },
        },
      };
    });

    setSelectedRadio(''); // Clear the selected radio
    setInputValues({
      tabname: '',
      damage1: '',
      damage2: '',
      selection1: '',
      selection2: '',
    }); // Clear the input values
  };

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };

  const handleInputChange = (inputName, inputValue) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputName]: inputValue,
    }));
  };

  const getOptionLabel = (radioValue) => {
    switch (radioValue) {
      case 1:
        return '1 Damage';
      case 2:
        return '2 Damage';
      case 3:
        return '1 Selection';
      case 4:
        return '2 Selections';
      case 5:
        return '1 Damage 1 Selection';
      case 6:
        return '1 Damage 2 Selections';
      default:
        return '';
    }
  };

  const renderInputFields = (selectedRadio) => {
    switch (selectedRadio) {
      case 1:
        return (
          <div className='flex float-right'>
            <label htmlFor="tabname">Tab Name:</label>
            <input
              type="text"
              id="tabname"
              value={inputValues.tabname}
              onChange={(e) => handleInputChange('tabname', e.target.value)}
            />
            <br />
            <label htmlFor="damage1">1st Damage:</label>
            <input
              type="text"
              id="damage1"
              value={inputValues.damage1}
              onChange={(e) => handleInputChange('damage1', e.target.value)}
            />
          </div>
        );
      case 2:
        return (
          <div className='flex float-right'>
            <label htmlFor="tabname">Tab Name:</label>
            <input
              type="text"
              id="tabname"
              value={inputValues.tabname}
              onChange={(e) => handleInputChange('tabname', e.target.value)}
            />
            <br />
            <label htmlFor="damage1">1st Damage:</label>
            <input
              type="text"
              id="damage1"
              value={inputValues.damage1}
              onChange={(e) => handleInputChange('damage1', e.target.value)}
            />
            <br />
            <label htmlFor="damage2">2nd Damage:</label>
            <input
              type="text"
              id="damage2"
              value={inputValues.damage2}
              onChange={(e) => handleInputChange('damage2', e.target.value)}
            />
          </div>
        );
      case 3:
        return (
          <div className='flex float-right'>
            <label htmlFor="tabname">Tab Name:</label>
            <input
              type="text"
              id="tabname"
              value={inputValues.tabname}
              onChange={(e) => handleInputChange('tabname', e.target.value)}
            />
            <br />
            <label htmlFor="selection1">1st Selection:</label>
            <input
              type="text"
              id="selection1"
              value={inputValues.selection1}
              onChange={(e) => handleInputChange('selection1', e.target.value)}
            />
          </div>
        );
      case 4:
        return (
          <div className='flex float-right'>
            <label htmlFor="tabname">Tab Name:</label>
            <input
              type="text"
              id="tabname"
              value={inputValues.tabname}
              onChange={(e) => handleInputChange('tabname', e.target.value)}
            />
            <br />
            <label htmlFor="selection1">1st Selection:</label>
            <input
              type="text"
              id="selection1"
              value={inputValues.selection1}
              onChange={(e) => handleInputChange('selection1', e.target.value)}
            />
            <br />
            <label htmlFor="selection2">2nd Selection:</label>
            <input
              type="text"
              id="selection2"
              value={inputValues.selection2}
              onChange={(e) => handleInputChange('selection2', e.target.value)}
            />
          </div>
        );
      case 5:
        return (
          <div className='flex float-right'>
            {/* Handle 1 Damage 1 Selection input fields */}
            <label htmlFor="tabname">Tab Name:</label>
            <input
              type="text"
              id="tabname"
              value={inputValues.tabname}
              onChange={(e) => handleInputChange('tabname', e.target.value)}
            />
            <br />
            <label htmlFor="damage1">1st Damage:</label>
            <input
              type="text"
              id="damage1"
              value={inputValues.damage1}
              onChange={(e) => handleInputChange('damage1', e.target.value)}
            />
            <br />
            <label htmlFor="selection1">1st Selection:</label>
            <input
              type="text"
              id="selection1"
              value={inputValues.selection1}
              onChange={(e) => handleInputChange('selection1', e.target.value)}
            />
          </div>
        );

      case 6:
        return (
          <div className='flex float-right'>
            {/* Handle 1 Damage 2 Selections input fields */}
            <label htmlFor="tabname">Tab Name:</label>
            <input
              type="text"
              id="tabname"
              value={inputValues.tabname}
              onChange={(e) => handleInputChange('tabname', e.target.value)}
            />
            <br />
            <label htmlFor="damage1">1st Damage:</label>
            <input
              type="text"
              id="damage1"
              value={inputValues.damage1}
              onChange={(e) => handleInputChange('damage1', e.target.value)}
            />
            <br />
            <label htmlFor="selection1">1st Selection:</label>
            <input
              type="text"
              id="selection1"
              value={inputValues.selection1}
              onChange={(e) => handleInputChange('selection1', e.target.value)}
            />
            <br />
            <label htmlFor="selection2">2nd Selection:</label>
            <input
              type="text"
              id="selection2"
              value={inputValues.selection2}
              onChange={(e) => handleInputChange('selection2', e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };


  const renderMenuTree = () => {
    return Object.keys(menuData).map((menuId) => {
      const menu = menuData[menuId];

      return (
        <div
          key={menuId}
          style={{
            marginLeft: 20,
            cursor: 'pointer',
            backgroundColor: selectedMenuId === menuId ? '#e0e0e0' : 'transparent',
          }}
          onClick={() => setSelectedMenuId(menuId)}
        >
          {menu.name}

          {menu.subitems.map((submenu) => (
            <div
              key={submenu.id}
              style={{
                marginLeft: 20,
                cursor: 'pointer',
                backgroundColor: selectedSubMenuId === submenu.id ? '#c0c0c0' : 'transparent',
              }}
              onClick={() => setSelectedSubMenuId(submenu.id)}
            >
              {submenu.subName}

              {selectedMenuId === menuId && selectedSubMenuId === submenu.id && (
                <div style={{ marginLeft: 20 }} className='flex-wrap'>
                  {/* Radio buttons for subdetails */}
                  {[1, 2, 3, 4, 5, 6].map((radioValue) => (
                    <label key={radioValue}>
                      <input
                        type="radio"
                        name={`subdetails_${submenu.id}`}
                        value={radioValue}
                        checked={selectedRadio === radioValue}
                        onChange={() => handleRadioChange(radioValue)}
                      />
                      {getOptionLabel(radioValue)}
                    </label>
                  ))}

                  {/* Input fields for selected radio */}
                  {selectedRadio && (
                    <div>
                      {renderInputFields(selectedRadio)}
                      {/* Add subdetails button */}
                      <button onClick={handleAddSubdetails}>Add Subdetails</button>

                      {/* Display added subdetails */}
                      <div>
                        <SubdetailsDisplay
                          subdetails={menu.subdetails[selectedSubMenuId][selectedRadio]}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Move SubdetailsDisplay outside the inner map but inside the menu div */}
          {selectedMenuId === menuId && selectedSubMenuId && (
            <SubdetailsDisplay
              subdetails={menu.subdetails[selectedSubMenuId]}
            />
          )}
        </div>
      );
    });
  };


  return (
    <div>
      {/* Popup Wrapper */}
      <div className="popup-wrapper text-left z-10">
        {/* Popup Content */}
        <div className="popup-content">
          {/* Heading */}
          <div className='text-left height-for-data'>

            <h2> Menu </h2>
            <div className='z-50'>

              {renderMenuTree()}
            </div>

          </div>

          {/* Add Menu Section */}
          <div>
            <label htmlFor="menuName">Menu Name:</label>
            <input
              type="text"
              id="menuName"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            />
            <button onClick={handleAddMenu}>Add Menu</button>
          </div>

          {/* Add Submenu Section */}
          <div>
            <label htmlFor="submenuName">Submenu Name:</label>
            <input
              type="text"
              id="submenuName"
              value={submenuName}
              onChange={(e) => setSubmenuName(e.target.value)}
            />
            <button onClick={handleAddSubmenu}>Add Submenu</button>
          </div>

          <button className="close-button" onClick={handleClosePopup}>Close</button>
        </div>
      </div>
    </div>
  );
};


export default DynamicMenuComponent;
