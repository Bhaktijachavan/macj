import React, { useState } from 'react';
import './Panel5.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import PanelHeader from '../PanelHeader/PanelHeader';

function Panel2() {


  return (
    <>
      <div>
        <Header />
      </div>
      <PanelHeader />
      <div>
        <div className="panel-heading text-center m-2">
          Panel 5
        </div>
        <div className='pl-2 m-2'>
          <div className="scroll-box4-panel5 bg-white">
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
