/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import axios from 'axios';
import moment from 'moment';
import DynamicForm from '../components/dynamicForm';
import CustomInput from '../components/customInput';
import Rain from '../images/rainTwo.gif';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faVolumeMute,
  faVolumeUp,
  faWindowClose,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/themeTextColor';
/*
setInterval(()=>{
  console.log("dedededed", window.performance.memory.totalJSHeapSize)
  }, 1000)
  */
const globalHistories = [
  {
    id: '001',
    title: 'Anécdota México 1',
    byUser: 'Anónimo',
    text: `En una ocasión estaba trabajando en la computadora de mi sala, cuando mi hermano llegó, lo saludé pero me ignoró y subió a su cuarto. Algunas horas mas tarde volvió a llegar a la casa y ahora si me saludó(yo nunca me moví de donde estaba), pero con ropa diferente, le pregunte sí había vuelto a salir porque no lo había visto, pero me comento que no, apenas había regresado. Nunca entendí que o quién abrió la puerta de la casa y entró.`
  },
  {
    id: '002',
    title: 'Anécdota México 2',
    byUser: 'Anónimo',
    text: `En una ocasión estaba con mi novia viendo la televisión en su cuarto, había casa sola pero estabamos tranquilos viendo una serie, de repente la perilla de la puerta de su cuarto comenzó a girar como si alguién quisiera entrar, pensando que era su papá abrimos pero toda la casa seguía sola.`
  },
  {
    id: '003',
    title: 'Anécdota México 3',
    byUser: 'Anónimo',
    text: `Cuando era niña se escuchaban caer canicas o monedas en mi cuarto cuando no había nadie, igual tiempo atrás arrastraban un sillón en las noches cuando no había nadie.`
  },
  {
    id: '004',
    title: 'Anécdota México 4',
    byUser: 'Anónimo',
    text: `Hace unos años que una figura con forma humana pero sin facciones y gris me acosaba, era como un adulto delgado dentro de un traje de tela ajustado, cuando estaba ocupado me sentía incomodo y cuando volteaba la mirada veía a la figura azomandose, se ocultaba rápido tras alguna pared. Así era seguido en las noches, de día, a cualquier hora basicamente, pero en las madrugadas que iba al baño francamente si me ponía nervioso. Tiene años que lo deje de ver, pero hace poco vi una forma similar pero como de un niño, color café cartón y la cabeza parecía una bola de periódico, se asomo mientras estaba con mi lap haciendo home office.`
  },
  {
    id: '005',
    title: 'Anécdota México 5',
    byUser: 'Anónimo',
    text: `Cuando era chico, muchas noches iba a dormir a la habitación de mis padres, ya que ellos tenían televisión y yo no, me sentaba a ver la televisión todas las noches.
    En alguna de tantas ocasiones escuché un ruido bajo las escaleras, había un hueco debajo de ellas que daba a otro cuatro, como muchas veces ignoré el ruido pensando que podía ser cualquier cosa, hasta que cierto día escuché ese mismo ruido y me encontraba en la habitación de mis padres con la puerta abierta, eran como las 8 pm y las luces estaban apagadas solo iluminando el cuarto por la luz de la tv, cuando en la entrada ví un ser completamente negro sin ningún rasgo o rostro visible de aprox de casi 2 metros de altura y de complexión delgada, vi esta silueta tan claramente porque reflejó la luz de la televisión, estuvo ahí unos 9 segundosm traté de gritar pero se me fue la voz y mi cuerpo se paralizó, después reaccioné y en un parpadeo ya no estaba.`
  },
  {
    id: '006',
    title: 'Anécdota México 6',
    byUser: 'Anónimo',
    text: `A mi mamá siempre la ha seguido una sombra, desde que es pequeña y ella cuenta como unas cuantas veces a tomado la forma de algunos de sus seres cercanos. Cuando era muy niña, la sombra se transformó con caracteristicas fisica de su vecinito Juan, estuvieron toda la tarde jugando, ella creyó que solo fueron unas dos horas, pero cuando entro en razón escucho los gritos de mi abuela buscandola con el resto de los vecinos por toda la urbanización, ella le explico a mi abuela (que estaba muy molesta) que solo había jugado con Juan, a lo que mi abuela respondió que eso era imposible porque Juan estaba en el grupo que la estaba buscando. La encontraron cerca del rio, ya pasada las 7 de la noche y justo cuando pensaba entrar al agua porque Juan (la sombra) estaba dentro del agua llamandola a que entrara. La sombra sigue con ella, yo la he visto y mis hermanos también, hemos crecido sabiendo siempre que Juan está con ella y con nosotros. Esa sombra nunca nos ha hecho daño, a veces  solo la sientes cerca o como hace sonidos por la casa. Juan abre y cierra puertas, se sienta en la cama, puedes verlo como niño, joven o adulto. a veces es negra la sombra y otras blanca. Hemos tenido visita de personas que tienen algún poder con entidades y sin decirle nada sobre Juan, nos preguntan si con nosotros vive un niño, mi mamá siempre le pregunta porque lo dicen (ella sabe que vieron a Juan) y nos responden, es que vi un niño corriendo, otros dicen que lo ven comiendo con mi perrita. Y a todos los que se quedan en mi casa a dormir por primera vez, se levantan al otro dia con historias de que alguien les hablo al oido, que mi perrita ladró en la madrugada hacia la puerta como impidiendo que alguien se acercara o que sintieron como si alguien se acosto en la cama. Mami siempre les dice que Juan les da la bienvenida.`
  },
  {
    id: '007',
    title: 'Anécdota México 7',
    byUser: 'Anónimo',
    text: `Cuando tenía como 9 años dormía en la sala en el sillón mediano ya que mi papá dormía en el más grande, ese día recuerdo que él no estaba ya que le tocaba trabajar de noche y pues me tocaba dormir sola eran como las 2 de la mañana masomenos yo estaba tapada con un montón de cobijas ya que hacía bastante frío y estaba acostada boca abajo y de repente sentí que me tocaron la espalda muy fuerte así que me voltee y me destape la cabeza para ver quien era solo vi una sombra negra de un niño pequeño asomándose por la puerta que da para la cocina yo confundida sin saber que hacer pregunte que quien era y pues no me contesto solo se  me quedó viendo por 5 segundos y se fue, yo me levante rápidamente a seguirlo y cuando llegue a la cocina no había absolutamente nadie, desde ese dia nunca e tenido una respuesta de qué fue lo que pasó cómo pudo haber desaparecido de la  nada no pudo haber corrido ya que hubiera escuchado ruido y no  se escuchó absolutamente nada y pues cada vez que cuento esta historia se quedan en shock pero pues ahora se que tal vez me paso eso...`
  }
];

const HomePage = props => {
  const [searchValue, setSearchValue] = useState(
    isNil(sessionStorage.getItem('searchHistory')) ? '' : sessionStorage.getItem('searchHistory')
  );

  const [currentScrolltop, setCurrentScrolltop] = useState(0);

  useEffect(() => {
    setHistoriesArray(
      globalHistories.map(item => {
        return {
          id: item.id,
          title: item.title,
          description: item.text.substring(0, 75) + '...',
          byUser: item.byUser
        };
      })
    );
  }, []);

  const [historiesArray, setHistoriesArray] = useState([]);

  const [currentHistoryData, setCurrentHistoryData] = useState(null);

  const sectionStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${Rain})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  const onGetHistoryData = async id => {
    setTimeout(() => {
      const findElement = globalHistories.find(item => {
        if (item.id === id) {
          return item;
        }
      });
      setCurrentHistoryData(findElement);
    }, 500);
  };

  const people = historiesArray;

  const searchString = searchValue;

  const escapeRegExp = (
    str // or better use 'escape-string-regexp' package
  ) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

  const filterBy = term => {
    const re = new RegExp(escapeRegExp(term), 'i');
    return person => {
      for (let prop in person) {
        if (!person.hasOwnProperty(prop)) {
          continue;
        }
        if (re.test(person[prop])) {
          return true;
        }
      }
      return false;
    };
  };

  return (
    <div id="historyScreen" style={sectionStyle}>
      <ThemeContext.Consumer>
        {themeColorId => (
          <div
            className={
              isNil(currentHistoryData)
                ? themeColorId === 0
                  ? 'basic-box-color-night'
                  : 'basic-box-color-sun'
                : themeColorId === 0
                ? 'read-box-color-night'
                : 'read-box-color-sun'
            }
            style={{
              width: '90%',
              height: '80%',
              //padding: '10% 7%',
              //margin: '0 auto',
              opacity: '.95',
              position: 'absolute',
              top: '10%',
              left: '5%'
            }}
          >
            <div style={{ padding: '1% 2%', display: 'flex', flexDirection: 'row' }}>
              {isNil(currentHistoryData) && (
                <div style={{ padding: '0 2%' }}>
                  <CustomInput
                    id="uno"
                    value={searchValue}
                    placeholder="Buscar"
                    textFieldColor={themeColorId === 0 ? 'white' : '#0c0b0b'}
                    onChange={(event, value) => {
                      setSearchValue(value);
                      sessionStorage.setItem('searchHistory', value);
                    }}
                    onBlur={(event, value) => {}}
                  />
                </div>
              )}

              {/*<div style={{ padding: '0 2%' }}>
              <CustomInput
                id="dos"
                value={searchValue}
                placeholder="Buscar 2"
                onChange={(event, value) => {
                  setSearchValue(value);
                }}
                onBlur={() => {}}
              />
            </div>
            <div style={{ padding: '0 2%' }}>
              <CustomInput
                id="tres"
                value={searchValue}
                placeholder="Buscar 3"
                onChange={(event, value) => {
                  setSearchValue(value);
                }}
                onBlur={() => {}}
              />
            </div>
            */}
            </div>
            <div
              id="text-box"
              style={{ padding: '1% 2%', width: '95%', height: '78%', overflowY: 'auto' }}
            >
              {//searchValue

              isNil(currentHistoryData) ? (
                isNil(historiesArray) === false &&
                isEmpty(historiesArray) === false &&
                historiesArray.filter(filterBy(searchValue)).map(item => {
                  return (
                    <div
                      id={item.id}
                      key={item.id}
                      onClick={() => {
                        setCurrentScrolltop(document.getElementById('text-box').scrollTop);
                        onGetHistoryData(item.id);
                        setTimeout(() => {
                          document.getElementById('text-box').scroll(0, 0);
                        }, 500);
                      }}
                      style={{
                        display: 'inline-block',
                        padding: '0 2%',
                        margin: '0 5px',
                        color: themeColorId === 0 ? '#e2dfdf' : 'black',
                        width: '25%',
                        minWidth: '150px'
                      }}
                    >
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <hr />
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    display: 'inline',
                    padding: '0 2%',
                    margin: '0 5px',
                    width: '90%',
                    minWidth: '150px'
                  }}
                  className={
                    isNil(currentHistoryData) ? 'text-basic-box-color' : 'read-text-basic-box-color'
                  }
                >
                  <div title="Cerrar" style={{}}>
                    <div
                      style={{
                        backgroundColor: 'rgb(95 40 130)',
                        textAlign: 'end',
                        color: '#e2dfdf',
                        borderRadius: '4px',
                        padding: '10px'
                      }}
                      onClick={() => {
                        document.getElementById('text-box').scroll(0, 0);
                        setCurrentHistoryData(null);
                      }}
                    >
                      <FontAwesomeIcon icon={faUndo} />
                      &nbsp;&nbsp;
                      <FontAwesomeIcon icon={faWindowClose} />
                    </div>
                  </div>
                  <div style={{ color: themeColorId === 0 ? '#e2dfdf' : 'black' }}>
                    <h3>{currentHistoryData.title}</h3>
                    <p
                      style={{ textAlign: 'justify', textJustify: 'inter-word', fontSize: '1.2em' }}
                    >
                      {currentHistoryData.text}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <p
              style={{
                color: themeColorId === 0 ? '#e2dfdf' : 'black',
                textAlign: 'end',
                marginTop: '3%',
                fontSize: '.8em'
              }}
            >
              v0.10
            </p>
          </div>
        )}
      </ThemeContext.Consumer>
    </div>
  );
};

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default connect(
  null,
  null
)(HomePage);
