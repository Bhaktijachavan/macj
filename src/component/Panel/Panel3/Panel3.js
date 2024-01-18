import React, { useState } from 'react';
import './Panel3.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import PanelHeader from '../PanelHeader/PanelHeader';



function Panel2() {

    const [selectedText, setSelectedText] = useState('');
    const [blackText, setBlackText] = useState('');
    const [redText, setRedText] = useState('');
    const [index] = (''); // Remove this line or provide a valid value
    const [lines, setLines] = useState('');


    const [selectedLine, setSelectedLine] = useState(0); // Initialize with a default value
    const [SelectedLineText, setSelectedLineText] = useState(0);


    const handleLineClick = (index) => {
        // setSelectedLineIndex(index);
    };

    const handleMoveUp = (text, setText) => {
        if (SelectedLineText !== null && SelectedLineText > 0) {
            const linesArray = text.split('\n');
            const temp = linesArray[SelectedLineText];
            linesArray[SelectedLineText] = linesArray[SelectedLineText - 1];
            linesArray[SelectedLineText - 1] = temp;
            const updatedText = linesArray.join('\n');
            setText(updatedText);
            setSelectedLineText(SelectedLineText - 1);
        }
    };

    const handleMoveDown = (text, setText) => {
        if (SelectedLineText !== null && SelectedLineText < text.split('\n').length - 1) {
            const linesArray = text.split('\n');
            const temp = linesArray[SelectedLineText];
            linesArray[SelectedLineText] = linesArray[SelectedLineText + 1];
            linesArray[SelectedLineText + 1] = temp;
            const updatedText = linesArray.join('\n');
            setText(updatedText);
            setSelectedLineText(SelectedLineText + 1);
        }
    };

    const handleTextSelection = () => {
        const selection = window.getSelection();
        const selectedRange = selection.getRangeAt(0);
        const container = selectedRange.commonAncestorContainer;
        const selectedText = container.nodeType === 3 ? container.nodeValue : container.innerText;
        setSelectedText(selectedText);
    };

    const handleAddText = (color) => {
        const newText = selectedText + '\n'; // Add a newline after the selected text
        if (color === 'black') {
            setBlackText(blackText + newText);
        } else if (color === 'red') {
            setRedText(redText + newText);
        }
    };

    const handleMoveDownRedBox = () => {
        if (selectedLine) {
            // Move the selected line to the red text box
            setRedText((prevRedText) => prevRedText + '\n' + selectedLine);

            // Remove the selected line from the black text box
            setBlackText((prevBlackText) => prevBlackText.replace(selectedLine, ''));

            // Clear the selection
            setSelectedLine('');
        }
    };
    const handleMoveUpBlackBox = () => {
        if (selectedLine !== null) {
            // Move the selected text to the black text box on a new line
            setBlackText((prevBlackText) => prevBlackText + '\n' + selectedLine);

            // Remove the selected text from the red text box
            setRedText((prevRedText) => prevRedText.replace(selectedLine, ''));

            // Clear the selection
            setSelectedLine(null);
        }
    };
    const deleteLine = () => {
        if (SelectedLineText !== null) {
            const updatedLines = [...lines];
            updatedLines.splice(SelectedLineText, 1);
            setLines
                (updatedLines);
            setSelectedLineText(null); // Clear selected line after deletion
        }
    };


    return (

        <>
            <div>
                <Header />
            </div>
            <PanelHeader />
            <div className='flex'>
                <div>
                    <div className="panel-heading text-center m-2">
                        Panel 3
                    </div>
                    <div className='pl-2 m-2'>
                        <div className="scroll-box4-panel3 bg-gray-100">
                        </div>

                    </div>
                </div>

                <div>
                    <div className="panel-heading text-center m-2">
                        Panel 3
                    </div>
                    <div className='pl-2 m-2'>
                        <div className="scroll-box4-panel3 bg-gray-100">
                        </div>

                    </div>
                </div>
            </div>

            <div>
                <div className="panel-heading text-center">
                    Panel 2
                </div>
                <div className="container-panel3">
                    <div className="panel3">

                        <div className="p-1">
                            {['Good', 'Fair', 'Poor', 'N/A', 'None'].map((label, index) => (
                                <div key={index} className="flex items-center mb-2 checkbox-container">
                                    <input
                                        type="checkbox"
                                        id={label}
                                        name={label}
                                        value={label}
                                        style={{ backgroundColor: '#3182ce' }}
                                        className="mr-2 focus:ring-2 focus:ring-blue-500 checked:bg-blue-500 checked:border-blue-500"
                                    />
                                    <label htmlFor={label}>{label}</label>
                                </div>
                            ))}
                        </div>


                        <div className="scroll-box-panel3 p-4 bg-gray-100"
                            style={{ cursor: 'pointer' }}
                            onMouseUp={handleTextSelection}>
                            <p>Demo Panel color</p>
                            <p>Color Red and black</p>
                            <p>if color select good stock it go in the 1 box and color is black</p>
                            <p>if color select bad stock it go in the 2 box and color is red</p>
                            {/* Content for scroll box */}
                        </div>

                        <div className="flex flex-col space-y-2 ml-2 mr-2 text-sm">
                            <button className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-10 py-0 rounded" onClick={() => handleAddText('black')}>Black</button>
                            <button className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-10 py-0 rounded" onClick={() => handleAddText('red')}>Red</button>
                            <button className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-10 py-0 rounded">Delete</button>
                            <button className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-0 py-0 rounded">Show Photos</button>
                            <button className="bg-gray-100 border border-gray-400 hover:bg-blue-100 text-black px-0 py-0 rounded">Show PDFs</button>
                        </div>

                        <div className="container1-panel3">
                            <div className="scroll-box1-panel3" onClick={() => handleLineClick(index)}>
                                {blackText.split('\n').map((line, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: selectedLine === index ? '#ddd' : 'transparent',
                                        }}
                                        onClick={() => {
                                            setSelectedLine(line);
                                            setSelectedLineText(index);
                                            handleLineClick(line);
                                        }}
                                    >
                                        {line}
                                    </div>
                                ))}

                            </div>

                            <div className="scroll-box1-panel3" style={{ padding: '10px', color: 'red' }}>
                                {redText.split('\n').map((line, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            cursor: 'pointer',
                                            // backgroundColor: selectedLine === index ? '#ddd' : 'transparent',
                                        }}
                                        onClick={() => {
                                            setSelectedLine(line);
                                            setSelectedLineText(index);
                                            handleLineClick(line);
                                        }}
                                    >
                                        {line}
                                    </div>
                                ))}

                            </div>


          
                        </div>
                        <div className='panelupdown-panel3' >
                            <div className="button-container-panel3">
                                <button className="image-button-panel3" onClick={() => handleMoveUp(blackText, setBlackText)}>
                                    <img src="ic_up.png" alt="Button 1" width={20} />
                                </button>

                                <button className="image-button-panel3" onClick={() => handleMoveDown(blackText, setBlackText)}>
                                    <img src="ic_down.png" alt="Button 2" width={20} />
                                </button>


                                <button className="image-button-panel3" onClick={handleMoveDownRedBox}>
                                    <img src="ic_down2.png" alt="Button 3" width={20} />
                                </button>
                            </div>

                            <div className="button-container-panel3">
                                <button className="image-button-panel3" onClick={handleMoveUpBlackBox}>
                                    <img src="ic_up2.png" alt="Button 3" width={20} />
                                </button>

                                <button className="image-button-panel3" onClick={() => handleMoveUp(redText, setRedText)}>
                                    <img src="ic_up.png" alt="Button 1" width={20} />
                                </button>

                                <button className="image-button-panel3" onClick={() => handleMoveDown(redText, setRedText)}>
                                    <img src="ic_down.png" alt="Button 2" width={20} />
                                </button>
                            </div>
                        </div>
                        <div className="scroll-box3-panel2 p-4 bg-gray-100"></div>
                    </div>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </>
    );
}

export default Panel2;





