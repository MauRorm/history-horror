import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';
import Header from './components/Header';
import Footer from './components/Footer';
import './css/index.css';
import { Link } from 'react-router-dom';


const App = ({ route }) => {
  console.log("fewfjweoifojewf", route)
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Header />

      <div style={{ overflowY:'hidden',  height: '100%', width: '100%' }}>

        <div style={{ top:'15px', position:"fixed", zIndex:'1'}}>
          <nav role="navigation" style={{ position: 'absolute', height: '100%' }}>
            <div id="menuToggle" style={{ position: 'absolute', height: '100%' }}>
              <input type="checkbox" />

              <span />
              <span />
              <span />

              <ul id="menu" style={{height:window.innerHeight}}>
                <a>
                  <li><Link to="/" className="link">Historias</Link></li>
                </a>
                <a>
                  <li><Link to="/about" className="link">Acerca de nosotros</Link></li>
                </a>
                <a>
                  <li><Link to="/notice" className="link">Noticias</Link></li>
                </a>
                <a>
                  <li><Link to="/contact" className="link">Contactanos</Link></li>
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
        >
          <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
        </div>
        
      </div>
      {/*<Footer />*/}
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
