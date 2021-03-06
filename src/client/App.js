import React, { useState } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';
import Header from './components/Header';
import Footer from './components/Footer';
import './css/index.css';
import { Link } from 'react-router-dom';
import ThemeContext from './context/themeTextColor';

const App = ({ route }) => {
  const [themeTextColor, setThemeTextColor] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <div
      style={{ height: '100%', width: '100%' }}
      onClick={e => {
        return;
        const element = e.target || e.srcElement;
        if ((isOpenMenu && element.id !== 'openMenu') || (isOpenMenu && element.id !== 'menu')) {
          setIsOpenMenu(false);
          document.getElementById('openMenu').click();
        }
      }}
    >
      <ThemeContext.Provider value={themeTextColor}>
        <Header
          themeTextColor={themeTextColor}
          onClickThemeText={() => {
            if (themeTextColor === 0) {
              setThemeTextColor(1);
            } else {
              setThemeTextColor(0);
            }
          }}
        />

        <div style={{ overflowY: 'hidden', height: '100%', width: '100%' }}>
          <div style={{ top: '15px', position: 'fixed', zIndex: '1' }}>
            <nav role="navigation" style={{ position: 'absolute', height: '100%' }}>
              <div id="menuToggle" style={{ position: 'absolute', height: '100%' }}>
                <input
                  type="checkbox"
                  id="openMenu"
                  onClick={() => {
                    setIsOpenMenu(!isOpenMenu);
                  }}
                />

                <span />
                <span />
                <span />

                <ul id="menu" style={{ height: window.innerHeight }}>
                  <a>
                    <li
                      onClick={() => {
                        setIsOpenMenu(false);
                        document.getElementById('openMenu').click();
                      }}
                    >
                      <Link to="/" className="link">
                        Historias
                      </Link>
                    </li>
                  </a>
                  <a>
                    <li
                      onClick={() => {
                        setIsOpenMenu(false);
                        document.getElementById('openMenu').click();
                      }}
                    >
                      <Link to="/about" className="link">
                        Acerca de nosotros
                      </Link>
                    </li>
                  </a>
                  {/*
                  <a>
                    <li>
                      <Link to="/notice" className="link">
                        Noticias
                      </Link>
                    </li>
                  </a>*/}
                  <a>
                    <li
                      onClick={() => {
                        setIsOpenMenu(false);
                        document.getElementById('openMenu').click();
                      }}
                    >
                      <Link to="/contact" className="link">
                        Contactanos
                      </Link>
                    </li>
                  </a>
                </ul>
              </div>
            </nav>
          </div>

          <div
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: '#7053EA'
            }}
            onClick={() => {
              if (isOpenMenu) {
                setIsOpenMenu(false);
                document.getElementById('openMenu').click();
              }
            }}
          >
            <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
          </div>
        </div>
        {/*<Footer />*/}
      </ThemeContext.Provider>
    </div>
  );
};

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any)
};

App.defaultProps = {
  route: null
};

export default {
  component: App
};
