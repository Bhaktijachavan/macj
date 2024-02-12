import React, { useState } from 'react';
import { FaFolderOpen } from 'react-icons/fa';
import '../EditTemp//EditTemp.css';


const EditTemp = ({ onClose }) => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleSelectMenu = (index) => {
        setSelectedMenu(index);
    };

    const handleAddItem = () => {
        if (itemName.trim() !== '') {
            setItems((prevItems) => {
                if (selectedMenu !== null) {
                    return prevItems.map((item, index) => {
                        if (index === selectedMenu) {
                            return {
                                ...item,
                                subItems: [...item.subItems, { id: Date.now(), submenuname: itemName }],
                            };
                        }
                        return item;
                    });
                } else {
                    return [
                        ...prevItems,
                        {
                            id: Date.now(),
                            menuname: itemName,
                            subItems: [],
                        },
                    ];
                }
            });

            setItemName('');
            setSelectedMenu(null);
        }
    };

    return (
        <div className='Contant-edittemp'>
            <div className='template-card-edittemp'>
                <div className='template-selector-edittemp'>
                    <span className='selectTemp-edittemp'>Edit Template</span>
                    <div className='close-div-edittemp'>
                        <p onClick={onClose} className='close-button-edittemp'>
                            X
                        </p>
                    </div>
                </div>
                <div className='Menu-Item flex justify-center'>
                    <div className='menu'>
                        <p className='p-menutitle-edittemp'>Menu</p>
                    </div>
                    <div className='item'>
                        <p className='p-itemtitle-edittemp'>Item</p>
                    </div>
                </div>
                <div className='Menu-Item-edittemp'>
                    <div className='template-card__body__center__input-edittemp'>
                        <div className='box-edittemp'>
                            <div className='menubox text-left'>
                                <div className='iconmenu-edittemp'>
                                    <div>
                                        <FaFolderOpen className='mr-2 inline-block' size={18} />
                                    </div>
                                    <div>
                                        {items.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`menu-item ${selectedMenu === index ? 'bg-gray-200' : ''
                                                    }`}
                                            >
                                                <p onClick={() => handleSelectMenu(index)} className='menutitle1-edittemp'>
                                                    {item.menuname}
                                                </p>
                                                <ul className='pl-10'>
                                                    {item.subItems.map((subItem, subIndex) => (
                                                        <li key={subIndex} className='submenu-item'>
                                                            {subItem.submenuname}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='box2-edittemp'>
                            <div className='item text-left'>{/* Display any relevant information */}</div>
                        </div>
                    </div>
                </div>
                <div className='Menu-Item-edittemp'>
                    <div className='button-container-edittemp'>
                        <div className='input-container-edittemp'>
                            <input
                                type='text'
                                className='custom-input-edittemp'
                                placeholder='Text...'
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                            <button className='btnM-edittemp' onClick={handleAddItem}>
                                Add
                            </button>
                            <button className='btnM-edittemp'>Remove</button>
                            <button className='btnM-edittemp'>Move Up</button>
                            <button className='btnM-edittemp'>Move Down</button>
                            <button className='btnM-edittemp'>Copy</button>
                        </div>
                    </div>
                    {/* ... Other components or sections */}
                </div>
                <div className='para1-edittemp'>
                    <p>
                        Double click on a menu or inspection item to rename it. Move a menu by dragging and dropping an item to the new location. Type into the box
                        left of Add and click Add to add a new area or menu.
                    </p>
                </div>
                <div className='Donebtn-edittemp'>
                    <button className='open-button-edittemp' onClick={onClose}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTemp;
