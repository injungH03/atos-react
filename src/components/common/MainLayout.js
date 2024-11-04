import React from 'react';
import Header from './Header';
import ReactFullpage from '@fullpage/react-fullpage';

function MainLayout({ children }) {
    const licenseKey = process.env.REACT_APP_FULLPAGE_LICENSE_KEY;

    return (
       <div id="wrap">
        <Header />
        <ReactFullpage
          licenseKey={licenseKey}
          scrollingSpeed={1000}
          navigation
          render={({ state, fullpageApi }) => {

            return (
              <ReactFullpage.Wrapper>
                {children}
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </div>
    );
}

export default MainLayout;
