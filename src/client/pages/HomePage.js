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
  faWindowClose
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
    title: 'Anécdota en el metro cdmx',
    byUser: 'anonimous',
    text:
      'Esta es mi historia .Rosario si que es rara esa estación al menos para mi , una vez fui a ver a una chica que vivía por tlalne y obvio tenía que tomar ahuevo El Rosario para regresar a mi casa ya de regreso llegando a la estación eran como las 7 de la noche un domingo empeze a sentir una vibra bien culera y pesada como si no conociera ese lugar , neta se va a oír tonto pero como si hubiese entrado en una dimensión extraña que no conocía todo era súper gris y raro no había ni madres de gente en el metro me empecé a asustar bastante comenzaba a sentirme cansado recuerdo que al bajar al andén un trabajador de limpieza se me quedo viendo súper raro de esos chavos que tienen problemas de retraso o así y su mirada me comenzó a pesar bien pero bien culero había como 5 personas en el andén , fue como si en ese preciso momento algo me hubiese absorbido la energía  y neta estuviese en otro plano o dimensión extraña y rara , se oye cagado pero juro que así me sentía lit iba bien bajoneado de regreso a mi casa , y esa es mi historia y no no iba drogado .'
  },
  {
    id: '002',
    title: 'Anécdota 2',
    byUser: 'anonimous',
    text: `Mi historia de terror pasó hace aproximadamente 3 años. Mi abuela tenía bastante de que había fallecido, nosotros vivimos en el piso de arriba, mientras mis abuelos en la parte de abajo, todo comenzó una tarde donde mis padres y mi tía (que ella cuida de mi abuelo) decidieron salir a una fiesta; mis hermanas y yo nos rehusamos a ir, por lo que a ellos les pareció buena idea que cuidáramos a nuestro abuelo.
      La noche llegó y mis dos hermanas y yo bajamos al primer piso para cuidarlo, todas llevábamos algo para pasar el rato en lo que llegaban, yo un libro, otra hermana su celular para oír música, y la más pequeña un poco de tarea que aún necesitaba terminar.
      Nos situamos en el cuarto de mi tía, que se encuentra conectado de manera poco convencional, en la parte de abajo hay 3 recamaras, las cuales están unidas una con otra, como un andén de tren, siendo la del fondo de la casa donde solía dormir mi abuela, en la de en medio mi abuelo y pues en la tercera mi tía, donde estábamos las 3 acostadas en la cama, no podíamos poner la televisión ya que mi abuelo se dormía desde muy temprano al estar enfermo; él no podía caminar bien y estaba quedando prácticamente ciego.
      Todo transcurría normal, tranquilo, las 3 estábamos concentradas en lo que llevamos para hacer, todo era silencio.
      Al poco rato, mi abuelo llamó a alguien para ayudarlo, como soy la mayor fui, dijo que no habláramos tan alto, que porque ya era muy noche, yo, extrañada, le comenté que desde que llegamos estábamos en silencio, el solo se volteó y continuó durmiendo, yo regrese al cuarto con mis hermanas, las cuales me preguntaron qué era lo que necesitaba mi abuelito, les dije que no era nada y seguimos en nuestros asuntos.
      Transcurrió un poco más de tiempo y yo comencé a escuchar algo y a sudar frío, hice una pausa en mi lectura y me dispuse a oír atentamente, comencé a escuchar muchos susurros y voces a un lado de mi oreja, no paraban, cada vez los oía más fuerte, rápido y cerca, voltee a ver a mis hermanas asustada, y al mismo tiempo nuestras miradas coincidieron con los ojos muy abiertos, la más pequeña ya estaba al borde del llanto, comenzó a gritar que mi abuela la estaba llamando, mi otra hermana solo dijo que eran susurros muy fuertes, tanto que los escucho aún con los audífonos, no sabíamos de donde provenían, pero estábamos seguras de que venían de algún cuarto, mi abuelo comenzó a llamarme de nuevo en ese instante, las 3 estábamos muy asustadas y seguíamos escuchando esas voces cerca de nosotros, no paraban, tenía pavor de pararme y avanzar hacia la habitación de mi abuelo, y ver al fondo en el otro cuarto algo más, sé que no era mi abuela como decía mi hermanita, ya que ella era una persona muy dulce y religiosa, y jamás nos asustaría de esa manera, junte todo el valor que pude y me dispuse a pararme y avanzar.
      En cuanto me puse de pie, las voces pararon, mis hermanas me decían que me quedara con ellas, pero camine lentamente hacia con mi abuelo, y lo único que me dijo fue: me dijeron que ya vienen por mí, y yo no me quiero ir todavía.
      Me quede helada, corrí a llamar por teléfono a mis padres para que se regresarán lo más rápido posible, mis hermanas en shock, porque también alcanzaron a escuchar lo que dijo mi abuelo, comenzaron a llorar más y a entrar en pánico. No tardaron más de 10 minutos en volver mis papas y mi tía, les contamos lo que había pasado, y extrañamente nos creyeron a la primera, solo se vieron entre ellos 3 y no dijeron nada.
      No sabemos qué fue lo que sucedió en realidad, pero lo que si estamos seguras es que en verdad pasó, ya que lo vivimos de manera simultánea, aun después de mucho tiempo, sigo recordando cómo se escuchaban esas voces`
  },
  {
    id: '003',
    title: 'Anécdota en el metro cdmx 3',
    byUser: 'anonimous',
    text: `Buenas noches leyendas de Monterrey soy muy fan de su página y me encanta leer sus relatos como a eso de la una o dos de la madrugada o a veces hasta más tarde, les platico que como en el mes de noviembre del año pasado 2019, recién acababa de tener a mi bebé; pero meses antes de que yo me aliviara le había dicho a mi esposo que quería que el bebé durmiera conmigo y que me acondicionaran el otro cuarto para mí y para él, quería tranquilidad y estar dedicada al 100% con mi niño, que no nos molestará el ruido ni nada, una noche tal vez solo fue sugestión pero me puse a leer un relato que una persona de aquí comentó que ella tenía a su bebé recién nacido y que una persona se lo quería llevar, bueno el caso fue que lo que a mí me pasó tal vez fue que tuve una parálisis del sueño, tenía pocos días de haber tenido a mi bebé y pues como hacía mucho frío decidí dormirlo en mi brazo y por la cesárea no podía moverme solo podía dormir boca arriba ya que estaba muy adolorida. Trate de acomodar a mi bebé lo más bien que pudiera dormir él agusto y yo igual, me quedé dormida y empecé a soñar con una persona que me quería arrebatar al bebé, en el sueño yo le hablaba a mi esposo; Pero no me salía la voz no podía despertar intente varias veces moverme y gritarle a él hasta que pude hablarle, se despertó y me dice: que pasó, me asustas! Le dije: -Ven a dormir con nosotros, me dice él: -Pues tú no querías que nadie te molestara, pues que pasó? Le platiqué lo que había soñado y que me había dado miedo ya que lo había sentido muy real, (pero pues solo fue sugestión) me regañó obviamente por leer este tipo de cosas porque como él es muy miedoso, pues no le gusta escuchar nada de relatos o historias y así. Pasaron varios días y una noche que me encontraba sola con mis hijas y el bebé ya que mi esposo llegaba muy tarde de trabajar, recuerdo que ese día había cerrado mal la puerta del cuarto en dónde dormíamos, la misma que comunica al patio, yo me levanté al baño y pues el bebé lo deje dormido en la cama y mi otra niña estaba dormida en el suelo ya que tampoco ni ella ni la otra niña se querían dormir solas en el cuarto principal por lo mismo que les daba miedo estar allí solas, la niña pequeña se paró al baño conmigo y en eso que yo abrí la puerta ella dice una expresión de "ay"!! Le pregunté qué pasaba, entre al baño y dejé la puerta abierta porque me lo pidió y me dijo: -mami es que te voy a decir algo, le pregunte que pasaba y me dice: -es que cuando tú abriste la puerta se abrió la otra (misma que se abrió porque estaba mal cerrada y por la presión que hizo cuando abrí la otra puerta la otra se abrió) y continuó diciéndome la niña que había visto a una persona afuera de la puerta en el patio de pie. Le dije yo que  tal vez había sido producto de su imaginación; pero para que no se sintiera ignorada decidí preguntarle cómo era y me la describió tal como si fuera una mujer anciana cabello enredado me decía que así como cuando se sale uno de bañar (cabello suelto, enredado, largo y con un vestido negro). No le creí mucho porque pues es sólo una niña pequeña pero pues por la manera en la que describió a la persona quise imaginar que sería una bruja, a lo que yo me imagino cuando describen a una bruja porque pues nunca he visto ninguna, al día siguiente le volví a preguntar a la niña y la volvió a describir tal y como me lo dijo la primera vez, lo volví a confirmar porque se lo comenté a la niña mayor y me dijo -a la mejor si es cierto porque ésa noche anterior ella se despertó y dice que escuchó que la niña dijo la expresión de ay!! asi asustada o impresionada. Hoy en día no quiere recordar ya que dice que le da mucho miedo, nunca me ha tocado ver ni escuchar nada pero lo que me comentó la niña haber visto si me dejó algo sorprendida, es día en que prefiere no recordarlo. 
Gracias por leer mi relato`
  },
  {
    id: '004',
    title: 'Anécdota 3',
    byUser: 'anonimous',
    text: `Había compartido una historia en el grupo de WhatsApp donde les compartí una experiencia que tuvimos mi familia y yo con un perrito que teníamos , al cuál queríamos mucho , mi abuela estaba muy enferma y en una ocasión vio a mi hermana entrar con su uniforme de la Escuela y cargando a el perro , ella le dijo , Mija por qué saliste tan temprano de la escuela , y ella no le respondió solo la vio y se metió a la casa . Mi abuela le contó esto a mi mamá y mi mamá le dijo que mi hermana estaba en la escuela que le había ido a dejar su almuerzo , al poco tiempo el perro se empezó a comportar raro no quería comer y al poco tiempo mi abuela fue a la tienda y el perro la siguió y lo atropellaron , muchas personas dicen que algo le iba a pasar a mi hermana y el perro tomo su lugar`
  },
  {
    id: '005',
    title: 'Anécdota 4',
    byUser: 'anonimous',
    text: `Pues no se pero hace tiempo hace como 5 años.. Yo trabajaba x la unidad modelo.. Y casi nunca pasaba x ese lado del panteón.. Y un día se me ocurre pasar x ahí no era tan tarde eran como las 8y media.. Iba yo bien quitada de la pena caminandox la banqueta y justo pasando la segunda puerta oí pasos atrás de mi.. Y lo que ize fue hacerme un lado para que la persona pasara pues yo iba normal caminando.. Pero grande fue mi sorpresa cuando yo esperaba que la persona pasara.., 😲y.nunca paso.. Volteo y no era nadie. Nadie a mi alrededor.. 😬😬. En esos momentos patas para que te quiero.. Me eche a correr.. Para saber 😬😬que fue.. Pero de que eran pasos de persona eran..Bueno eso digo yo..`
  },
  {
    id: '006',
    title: 'Anécdota 5',
    byUser: 'anonimous',
    text: `Al amigo de mi papá les pasó algo parecido, no recuerdo la historia , pero venían por la parte de atrás del panteón después de haber ido a trabajar o a jugar fut no recuerdo pero eran como las 11 o 12 pm , y en la barda afuera del panteón vieron a 3 niños , entonces como era muy extraño verlos él les hablo y les dijo hey chavos "" y ellos lo único que hicieron fue subirse la barda y brincarse hacia el panteón , cuenta que eran tres niños de diferentes edades y lo más extraño es que subieron la barda en plena noche y se metieron sin pensarlo al panteón ....`
  },
  {
    id: '007',
    title: 'Anécdota 6',
    byUser: 'anonimous',
    text: `Al amigo de mi papá les pasó algo parecido, no recuerdo la historia , pero venían por la parte de atrás del panteón después de haber ido a trabajar o a jugar fut no recuerdo pero eran como las 11 o 12 pm , y en la barda afuera del panteón vieron a 3 niños , entonces como era muy extraño verlos él les hablo y les dijo hey chavos "" y ellos lo único que hicieron fue subirse la barda y brincarse hacia el panteón , cuenta que eran tres niños de diferentes edades y lo más extraño es que subieron la barda en plena noche y se metieron sin pensarlo al panteón ....`
  },
  {
    id: '008',
    title: 'Anécdota7',
    byUser: 'anonimous',
    text: `Pues no se pero hace tiempo hace como 5 años.. Yo trabajaba x la unidad modelo.. Y casi nunca pasaba x ese lado del panteón.. Y un día se me ocurre pasar x ahí no era tan tarde eran como las 8y media.. Iba yo bien quitada de la pena caminandox la banqueta y justo pasando la segunda puerta oí pasos atrás de mi.. Y lo que ize fue hacerme un lado para que la persona pasara pues yo iba normal caminando.. Pero grande fue mi sorpresa cuando yo esperaba que la persona pasara.., 😲y.nunca paso.. Volteo y no era nadie. Nadie a mi alrededor.. 😬😬. En esos momentos patas para que te quiero.. Me eche a correr.. Para saber 😬😬que fue.. Pero de que eran pasos de persona eran..Bueno eso digo yo..`
  },
  {
    id: '009',
    title: 'Anécdota 8',
    byUser: 'anonimous',
    text: `Mi tío cuando era joven juntos con sus amigos me contaron que cada cosa que veían en el panteón ellos si pasaban entre las 12 am a 3 am , una vez dicen que venían de trabajar ya tarde al rededor de las 2 am cuando su amigo vio algo en el suelo y jalo a mi tío si no lo detiene dice que la viera caído un bulto de cal , solo se quedaron sorprendidos y no comentaron nada y se fueron , al día siguiente tenían que irse temprano como las 6 de la mañana y volvieron a pasar por el panteón y dice que su sorpresa fue que no vieron nada de bulto de cal ni nada de señal que lo hayan barrido , como si no viera estado el bulto de cal`
  },
  {
    id: '010',
    title: 'Anécdota 9',
    byUser: 'anonimous',
    text: `Me sucedió algo muy similar solo que en mi caso yo era la paciente. Tenía 13 años y después de mucho insistir me dieron permiso para ir por un helado con una amiguita de la escuela, esa era la primera vez que me permitían ir ya que mis padres me sobreprotegian y lo hicieron solo por que quedaba cerca de casa e iría con una amiga que tenía más experiencia en andar sola mi madre me dió mil recomendaciones: no hablar con extraños, tener cuidado al cruzar las calles y ponerme lista con el cambio del billete que me había dado. Iba feliz, emocionada, me sentía grande, caminaba del lado de las casas y mi amiga del lado de los carros ya que ella cumplía con su función de cuidarme; de pronto observé como un camión dió la vuelta y venía hacía nosotras, casi flotaba de la gran velocidad que traía era como si pudiera verlo en cámara lenta, mi reacción fué jalar a mi amiga hacía mi lado y en ese momento comencé a ver las piedras del camino pasar como si fuese observando por la ventana de un carro a gran velocidad hasta que llego un momento en que se detuvo completamente. Quedé bocaarriba pegada a las llantas traseras del lado derecho del camión, mi cabello quedó prensado de una malla ciclónica de un terreno baldío, solo quería levantarme, sacudir mi ropa, e irme a casa, pensaba en el billete que llevaba para el helado y del cual tendría que regresar el cambio jajaja!!. Estaba consciente, había personas tranquilizandome, se escuchaban gritos, llantos, discusiones, yo no sentía nada, estaba aturdida, no había dolor, quería a mi mamá, quería irme a casa. Mi amiga estaba asustada pero bien. Nadie creyó que viviría eran pocas las esperanzas. Tuve múltiples fracturas, mi pelvis estaba destrozada en 3 partes, 4 costillas fracturadas al igual que mis rodillas, la cadera y el coxis estaban deshechos. Después de meses de no moverme y estar postrada en una cama con una hamaca pelviana, clavos en rodillas, transfusiones sanguíneas, descubrirían que la piel y carne de la espalda estaba desprendida en un 60% por lo que tuvieron que retirarla toda pues estaba descompuesta. Yo estaba en terapia intensiva, asustada, inconsciente y con mucho dolor pero recuerdo claramente que sentía sed y suplicaba por un poco de agua pero nadie me daba ya que me decían que no podían pues de un momento a otro podría ser necesario meterme a quirófano. Una noche desperté al sentir agua en mi boca y al abrir un poco los ojos pude ver a una enfermera me daba agua con un algodón, me curaba mis heridas de cara y brazos y me trataba de forma cuidadosa, dulce y así fueron varias veces. En otras ocasiones solo me contemplaba desde un costado de mi cama mientras me pedía que no tuviera miedo que todo estaría bien que debía ser fuerte. Al estar ya en mi habiatacion después de muchas semanas yo les mencionaba a mi familia de Marina, les hablaba de ella insistentemente, más cuando sentía un inmenso dolor o me hacían curaciones a carne viva pues llegó un momento en la anestesia no surgía efecto y despertaba en medio del quirófano gritando desesperadamente mientras yo les pedía que ella fuera quien lo hiciera, le gritaba Marinaaa!! Los otros médicos y enfermeras me tranquilizaban diciéndome ya viene, ya la fueron a buscarla pero ella nunca llegaba. Cuando ella llegaba yo le reclamaba, le decía que me habían lastimado, que me dolía, que no sabían hacerlo como ella y que ya no quería estar ahí, que quería ir a mi casa; ella solo me observaba y me decía que tenía que ser fuerte, que aún faltaba más dolor pero que era necesario, que ellos sabían lo que hacían y que sus manos eran instrumentos de Dios. Yo me tranquilizaba y el dolor desaparecía conforme la escuchaba, un día simplemente ya no volvió y era tanta era mi inasistencia que mi familia la buscó, preguntaron por ella en la administración, en terapia intensiva, en el quirófano, a enfermeras, médicos y al parecer ella jamás existió!!! ( su nombre era Marina, una joven enfermera) ella me lo dijo. Han pasado 25 años y quien no sabe de mi vida jamás se imaginan que pasé por todo eso. Hace poco me encontré con uno de los cirujanos y bromeando me dijo qué no sabe como le hicieron, que cuando yo llamaba a Marina a ellos les daban ganas de llamar a un médico pues no sabían ya que hacerme jajaja!! y reímos juntos. Yo estoy casada, tuve dos hijos maravillosos, soy maestra de Educación Preescolar y me fascina serlo, he vívido infinidad de cosas maravillosas, en mi vida ya no hay dolor; soy sana, fuerte y feliz. En donde quiera que estés, quien hayas sido jamás dejaré de agradecerte lo que hiciste por mi. Mil gracias por todo Marina!! Mil Gracias por todo mi Dios.`
  },
  {
    id: '011',
    title: 'Anécdota 10',
    byUser: 'anonimous',
    text: `Mi abuelo me contó algo similar, eso pasó en santa rosa ocotlan ellos venían de oaxaca en el autobús que iba para Miauatlan se bajaron en el cruzero del pueblo y como ya era muy tarde decidieron caminar hacia el pueblo ninguno tenía lámpara o Cerillo así que solo iban iluminados por la luna cual fue su sorpresa que a medio camino escucharon los llantos de un bebé los tres amigos se asustaron y comenzaron a buscar al niño, lo encontraron y decidieron llevarlo con ellos más adelante comenzaron a escuchar una risa como diabólica no sabían de donde venía hasta que se les ocurrió mirar la cara del bebé el cual les dijo con una voz muy gruesa y rasposa mira mi diente, el que lo iba cargando lo avento y salieron corriendo hacia el pueblo jamás supieron que avia sido eso. Bueno es lo que me contó mi abuelo`
  },
  {
    id: '012',
    title: 'Anécdota 11',
    byUser: 'anonimous',
    text: `Una vez nos tocó ver sobre un accidente en motocicleta de una amigo de mi papá al señor no le pasó nada pero el acompañante falleció en el accidente a los 9 días fueron a levantar el alma ahí donde fue el accidente nos contó el señor que sentía el peso de su amigo en el hombro cuando fueron a levantarlo.`
  },
  {
    id: '013',
    title: 'Anécdota 12.1',
    byUser: 'anonimous',
    text: `Una vez nos tocó ver sobre un accidente en motocicleta de una amigo de mi papá al señor no le pasó nada pero el acompañante falleció en el accidente a los 9 días fueron a levantar el alma ahí donde fue el accidente nos contó el señor que sentía el peso de su amigo en el hombro cuando fueron a levantarlo.`
  }
];

const HomePage = props => {
  const [searchValue, setSearchValue] = useState('');

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
                    }}
                    onBlur={() => {}}
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
                        color: themeColorId === 0 ? 'white' : 'black',
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
                        color: 'white',
                        borderRadius: '4px',
                        padding: '10px'
                      }}
                      onClick={() => {
                        document.getElementById('text-box').scroll(0, 0);
                        setCurrentHistoryData(null);
                      }}
                    >
                      <FontAwesomeIcon icon={faWindowClose} />
                    </div>
                  </div>
                  <div style={{ color: themeColorId === 0 ? 'white' : 'black' }}>
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
