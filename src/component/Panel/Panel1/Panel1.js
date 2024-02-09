import React, { useState } from 'react';
import './Panel1.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import PanelHeader from '../PanelHeader/PanelHeader';
import PannelComponent from '../PannelComponent/PannelComponent';

function Panel1() {

  return (
    <>
      <div>
        <Header />
      </div>
      <PanelHeader />

      <div>
        <div className="panel-heading text-center">
          Panel 1
        </div>

        <div>
        <PannelComponent/>
       </div>
       <div className="panel-heading text-center">
          Panel 1
        </div>
       <div>
        <PannelComponent/>
       </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Panel1;
