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
  },
  {
    id: '008',
    title: 'Anécdota México 8',
    byUser: 'Anónimo',
    text: `Yo una vez tuve una parálisis y lo unico que llegué a ver fue a mi perro entrando a mi habitación, justo al lado de mi cama rodeo algo. No había nada ahí pero el caminó hacia un lado como si estuviera esquivando algo, como si algo frente a mi cama obstaculizara su camino.`
  },
  {
    id: '009',
    title: 'Anécdota México 9',
    byUser: 'Anónimo',
    text: `A mí hace casi 3 años me pasó que en la casa de mi abuela, que por lo general pasan cosas extrañas, me dio parálisis de sueño, en eso que no me podía mover, sentí que alguien pequeño se sentó en mi cama y luego me abrazo por la espalda, no podía verlo, pero sentía como me respiraba y fue muy aterrador, cuando me desperté vi que mi sabana avía quedado en el suelo y jamás me pasa eso porque siempre me acobijo con ella y nunca termina haci... Fue espeluznante`
  },
  {
    id: '010',
    title: 'Anécdota México 10',
    byUser: 'Anónimo',
    text: `Yo una vez tuve una parálisis y lo unico que llegué a ver fue a mi perro entrando a mi habitación, justo al lado de mi cama rodeo algo. No había nada ahí pero el caminó hacia un lado como si estuviera esquivando algo, como si algo frente a mi cama obstaculizara su camino.`
  },
  {
    id: '011',
    title: 'Amigo imaginario 1',
    byUser: 'Anónimo',
    text: `Yo tuve uno cuando estaba chiquita como de 5 años pero yo no me acuerdo pero mi familia me cuenta que se llamaba "Maco" y a mi me asustaba una vez me dijeron que yo dije que había una mujer colgada por la ventana y que Maco la había colgado, que bueno que yo no me acuerdo.`
  },
  {
    id: '012',
    title: 'amigo imaginario 2',
    byUser: 'Anónimo',
    text: `Yo cuando tenía 5 años tenía una amiga imaginaria,como era muy tímida y no tenía amigos me ponía a jugar con ella,después de unas semanas me empezó a sangrar la nariz casi todos los días,mi mamá asustada decidió llevarme al hospital pero eso no ayudó, entonces mi mamá optó por llevarme a qué me hicieran una limpia y resultó que mi supuesta amiga imaginaria era un fantasma de una niña que me lastimaba y eso provocaba mi sangrado`
  },
  {
    id: '013',
    title: 'Anécdota México 11',
    byUser: 'Anónimo',
    text: `Yo una vez tuve una parálisis y lo unico que llegué a ver fue a mi perro entrando a mi habitación, justo al lado de mi cama rodeo algo. No había nada ahí pero el caminó hacia un lado como si estuviera esquivando algo, como si algo frente a mi cama obstaculizara su camino.`
  },
  {
    id: '014',
    title: 'Anécdota México 12',
    byUser: 'Anónimo',
    text: `Yo ví a mi bisabuelo fallecido sin siquiera conocerlo. Y hablé con él, cuando mi mamá vino a ver con quién hablaba yo le dije "con mi amigo Martín, solo que tiene un problema no tiene piernas..... " Y mi bisabuelo Martín la cual yo no conocía tiempo antes le habían amputado las piernas y yo no sabía nada sobre él..........`
  },
  {
    id: '015',
    title: 'Anécdota México 13',
    byUser: 'Anónimo',
    text: `En el edificio donde vivo, en el departamento que está al final del pasillo, vivía una señora y un señor que eran hermanos. El señor en especial, tenía problemas en la columna y le costaba caminar erguido.
    Hace un año justamente, iba saliendo para ir a trabajar, como casi todas las mañanas compartíamos elevador, le abrí las puertas para que pudiera pasar y nos quedamos dentro del elevador solos. Se volteó y me dijo "ya es hora de ir a trabajar, niña. Me saludas a tus papás, espero que estén bien. Nos vemos" casi no hablaba como era de costumbre,  me sorprendió que esta vez hablara con claridad. Me despedí de él mientras lo ayudaba a salir y le deseé un buen día.
    Me fui rápido por que ya era algo tarde, lo raro es que no oí sus pasos lentos detrás de mí.
    Ese día por la noche, les dije a mis papás que el señor los mandaba saludar y mi mamá se quedó en blanco. 
    Me dijo que ese señor ya llevaba 4 semanas de fallecido.
    No me lo creí, se veía como cualquier otro día.
    Me dijeron que seguramente venía a cuidar a su hermana que también estaba delicada de salud.
    Ya lo he visto salir del elevador, solito hace 3 meses.
    Yo sí creo cuando dicen que vienen a cuidarnos los que ya se fueron.`
  },
  {
    id: '016',
    title: 'Anécdota México 14',
    byUser: 'Anónimo',
    text: `Hace unos días escuchamos que una persona gritó al fondo del túnel de una estación de la línea naranja, incluso los policías ordenaron parar los vagones mientras rápidamente las mujeres policía corrían a acercarse a ayudar, fue un grito desgarrador de terror y dolor que a todos nos sorprendió, fue tal que hasta yo me asusté e incluso rápidamente se movilizaron los policías por lo mismo, llegaron paramédicos y el equipo de rescate, por radio se comunicaron con el conductor del tren y el conductor preguntó qué era lo que pasaba, por que había frenado todos los trenes y bla bla bla 30 minutos tardó en total, no sé encontró nada, ni la persona que gritó, ni rastros de sangre por algún accidente que haya sucedido ni nada apenas escuchamos eso por la radio del policía e inmediatamente nos quedamos congelados.`
  },
  {
    id: '017',
    title: 'Anécdota México 15',
    byUser: 'Anónimo',
    text: `Buenas noches,mi nombre es Armando y espero la pasen bien en estos tiempos de encierro ya que es algo tedioso, pero bueno para quienes no podemos dejar de laborar pues tenemos que salir a diario exponiendonos a las cosas cotidianas y no tan frecuentes en la ciudad y tal vez preguntarán por qué digo eso de "no tan frecuentes" y me refiero a esas historias que suceden que nadie cree a veces, específicamente las del metro y es que por más que uno piense que no podrá llegar a ver o coincidir con algún relato de aquí, créame que estaba en un grave error,  trabajo en la colonia del valle cerca del metrobus Ciudad de los deportes en un restaurante y ahí el servicio es todo para llevar, por ciertas cuestiones modificaron el horario del lugar de 12 am a 11 pm pues antes era de 8 am a 8 pm. Hay días que el servicio es pesado y por eso me quedo tarde y aún que rasguñando alcance el último metro de Observatorio a Pantitlán y lo tomé justo en Insurgentes de la línea Rosa. llegue corriendo y como pude le puse saldo a mi tarjeta, corrí y me fui casí al fondo del andén pegado a la zona exclusiva de mujeres, estaba ahí parado solo, acompañado de unos cuantos usuarios, 7 cuando mucho, pasó el último tren hacía Observatorio y quedamos esparcidos en el andén dirección Pantitlán é inmerso en mi música tenía poca atención alrededor mío pero de repente sentí como si una cortina pesada cayera encima de mi y se sintió un olor muy pesado y hediondo, pensé que era mi cansancio pero al voltear a ver el túnel se iluminó como si viniera a lo lejos el tan anhelado metro pero grande fue mi sorpresa cuando vi que se paró a mitad de camino y eso no era el metro pero se veía como la luz de sus faros de los nuevos vagones pero al bajar la vista al riel,ahí vi como estaba una "persona" con el pelo tapándole la cara pero eso sí piel blanca muy blanca,estaba en posición de rodillas pegadas al pecho y sentí un poco de escalofrío recorrer mi espalda y aún que no es la primera vez que veo algo de este tipo el estar distraído verla a unos metros fue algo impresionante y difícil de digerir y aunque solo fueron segundo sentí como se detuviera el tiempo y en cuanto pude reaccionar del shock me fui yendo más al centro de la estación cerca de las escaleras pero al caminar y darle la espalda sentí su mirada clavada en mi y como venía cerca a cada paso que daba sentía que iba atrás de mí pero para mí fortuna el tren llegó y sentir esa brisa de arribo que hace el metro fue como respirar sin esa pesadez de la cortina,me metí al vagón y por fortuna estaba con gente al interior y me sentí un poco más tranquilo pero no dejaba de pensar en esa cosa que vi,se que no seré el último en verla pero espero sea de los pocos muy pocos que la alcanzaron a ver.`
  },
  {
    id: '019',
    title: 'Anécdota México 16',
    byUser: 'Anónimo',
    text: `Cuando yo iba como en sexto semestre, nos tocó hacer prácticas y estábamos en el hospital y para la despedida llevamos pastel a los enfermeros, pero el festejo lo hicimos en el 2do piso del hospital (solo eran 2 pisos) y como no todos podían ir, nosotros bajamos a para llevarlos al servicio y cuando íbamos a bajar escuchamos que se abrió el elevador y vimos que un hombre vestido de intendencia se subió y nosotros corrimos para alcanzarlo y que no se cerraran las puertas y cuando llegamos, oh sorpresa ¡NO HABIA NADIE! cabe aclarar que las 3 compañeras que íbamos lo vimos y es el hospital en que más apariciones y cosas paranormales se han visto.`
  },
  {
    id: '020',
    title: 'Anécdota México 17',
    byUser: 'Anónimo',
    text: `De un hospital de la ciudad de México me gustaría platicarles extraños sucesos que me pasaron ahí; pero a todo el demás personal ya le parecía normal.... pues bueno, yo ingresé al instituto apenas hace unos meses,, ahí varios compañeros ya me habían dicho que "espantan" en las noches, yo hice caso omiso, pero en una ocasión, aborde el elevador yo sola, una vez dentro del elevador, empecé a escuchar llantos de alguien, el miedo invadió mi cuerpo y no me moví en ningún momento, al llegar a mi piso, en cuanto se abrieron las puertas salí corriendo.`
  },
  {
    id: '021',
    title: 'Anécdota México 18  ',
    byUser: 'Anónimo',
    text: `En otra ocasión, en ese mismo hospital; en uno de los pisos de pediatría, pase a tomar signos a mis niños, lo curioso fue que en una cuna había una señora cuidando al bebe, yo me le acerque y le dije que le iba a tomar signos al niño, la señora no me contestó y en ningún momento vi su cara, pero me percate que era mayor por la ropa que traía; después llegó a la visita la mamá del niño, yo muy indiscreta le pregunte si la otra señora ya se había ido, ella sorprendida me pregunto ¿cuál señora?, y yo le dije de la señora que vi mas temprano, ella me dijo que era imposible, ya que ella se encontraba sola, venia de Zacatecas con su bebe ella sola, pues su familia no la pudo acompañar, yo todavía insistiendo le describí a ropa de la señora, a lo que con la voz entrecortada y los ojos llorosos la señora me dijo que era su mamá, y que ya había fallecido.`
  },
  {
    id: '022',
    title: 'Anécdota escuela',
    byUser: 'Anónimo',
    text: `Mi tío fue velador durante 13 años en una secundaria, hace aproximadamente 3 años lo cambiaron al puesto de prefecto pero en esos años en los que estuvo de velador tuvo el turno de noche y le pasaron muchas cosas sin explicación lógica, en una ocasión él estaba en un cuartito que tienen para los veladores donde hay casilleros, es una zona de descanso, nos cuenta que eran como las 11:30 de la noche y alguien comenzó a golpear la puerta pero al revisar no había nadie, el ambiente comenzó a ponerse pesado, sentía que alguien a sus espaldas lo veía, en eso comenzaron a ladrar los perros y los casilleros comenzaron a cerrarse con violencia, estos están en la parte de atrás y era imposible que alguien los hubiera movido ya que el estaba solo, como pudo se armó de valor y fue a revisar, no había nadie, cuando regresó a donde estaba sintió que alguien respiraba detrás de él, ya no aguantó mas, saco sus cosas y se fue a dormir a su troca (camioneta) que tenía camper y estaba acomodada con cobijas para poder acostarse, en otra ocasión se encontraba haciendo rondas y vió que un camión que utiliza la escuela para paseos escolares tenía los focos prendidos, fue a ver si había alguien y mientras se acercaba sintió que el ambiente se iba poniendo frío, subió al camión y no había nadie ni dentro ni cerca del camión, apagó los focos y bajo, se oían muchos perros ladrando, intentó calmarse y cuando estaba a algunos metros la luz se volvió a encender, fue entonces que se asustó de verdad y se encerró el resto de la noche en la sala de maestros, cabe destacar que esos focos tienen de esos interruptores de metal que son difíciles de accionar, nos comentó que días antes de que pasara todo eso, uno de los maestros había fallecido en un accidente automovilístico, creemos que fue él quien estaba prendiendo las luces. En esa escuela pasan muchas cosas por la noche, desde ruidos hasta cosas que se mueven, incluso una vez mi tío y un compañero suyo vieron una sombra que los vigilaba y se escondía a plena luz del día.`
  },
  {
    id: '023',
    title: 'Anécdota velador 1',
    byUser: 'Anónimo',
    text: `Estaba en una planta tratadora de aguas negras, obviamente no hay más que un par de pozos profundos y una máquina de tableros automáticos que se activan las 24 hrs. Era una constructora casas de interés social. Esa noche mi jefe me mandó allí de castigo por haber faltado, yo estaba acostado en una cama de madera, era un cuarto de unos dos por tres metros, sólo había espacio para la cama y el baño. Estaba recostado a medio dormir, de lado, viendo hacia la pared, digo a medio dormir por que tenía conciencia de mi alrededor en ese instante, cuándo de pronto siento un par de manos que me toman del brazo así cómo estaba de lado, al momento abro los ojos pero no pude moverme, quedé inmovilizado, y así en ese preciso instante algo que no se que habrá sido grita en mi oído, era un grito desgarrador, macabro lo describiría yo. Yo soy una persona escéptica, no creo en cosas de fantasmas o cosas de ese estilo,, pero en ese momento sentí un miedo cómo no había tenido en mucho tiempo, para ser sincero traté de rezar pero la situación me tenía bloqueado, igual sentí unas ganas de llorar, tenía tantas emociones juntas en un sólo un instante. Al momento de qué pasó eso ya pude moverme y quedé boca arriba, cómo en shock, lo único que pude ver fue una cruz de madera que estaba en la cabecera, que supongo no me sirvió de nada pues por lo que acaba de pasar, vi la hora y eran pasadas las 3 de la madrugada, cuando reaccione tomé el radio que estaba a mi lado y le hablé a mi Jefe de Turno, que necesitaba su presencia lo más pronto posible, cosa que para él era raro pues yo nunca lo molestaba ni reportaba, era raro que usara el radio. Llegó, me dijo que pasaba, que por que tenía esa cara, ya le conté lo sucedido y me dijo que sólo lo había soñado. Se quedó conmigo hasta pasadas las 7 de la mañana para que pudiera yo estar tranquilo. A las 7 de la mañana al llegar el personal de la planta, me dice el encargado, ahora que te pasó, no dormiste o por que traes esa cara, y le dije, ¿Pasan cosas aquí? A lo que me respondió cosas de qué, y le dije me asustaron, empezó a reírse y me dijo, no te saques de onda, varios han visto cosas aquí, no eres el primero, no pasa nada. Ese grito fue tan macabro que al turno siguiente cuándo empezó a oscurecer comencé a sentir miedo, estaba en una zona sin luz eléctrica, era una obra negra, lo que hice fue ponerme a mandar msjs y entretenerme con el celular para distraer mi mente. Jamás sabré qué fue ese grito en mi oído tan macabro ni qué eran esas manos que sentía me tenían del brazo.`
  },
  {
    id: '024',
    title: 'Después de fallecido fue a la oficina',
    byUser: 'Anónimo',
    text: `En un edificio de oficinas en la CDMX, un empleado siempre llegaba a su oficina, pedía que se prendieran las luces y ventilación de dicha oficina, un día como cualquier otro llegó, saludó a su secretaria y pidió activar luces y ventilación de su oficina, despúes entró. En la noche de ese mismo día un policia tocó en la oficina porque no salía el empleado, cuando abrieron su sorpresa fue tal porque estaba vacía, jamas vieron salir al señor. Al siguiente día supieron que tenía algunas semanas de haber fallecido...`
  },
  {
    id: '025',
    title: 'Cementerio 1',
    byUser: 'Anónimo',
    text: `Cuando tenía como diez años mi mamá me llevó al sepelio de una vecina que había fallecido. El cementerio era en el pueblo, allá acostumbran a colocar rosarios, crucifijos y santos sobre las tumbas. Había un rosario muy lindo, me llamó la atención, lo tomé y me lo llevé para mi casa. Cuando llegue se lo mostré a mi mamá y ella me pegó muy duro y me hizo devolverlo, me tuvo que acompañar y en la entrada del cementerio mi mamá me hizo rezar el rosario con ella y pedir perdón al alma de donde yo lo había tomado, en la salida escuché una voz que me dijo “Muchas gracias, te acompañaré siempre”. Hoy tengo 62 años y todavía esa alma está conmigo y yo le rezo todos los días.Yo me siento feliz y nunca me ha pasado nada. Yo me fui de mi pueblo hace muchos años.
    `
  }
  /*
  {
    id: '018',
    title: 'Anécdota México 16',
    byUser: 'Anónimo',
    text: `xxxxxxxxxxx`
  },
  {
    id: '018',
    title: 'Anécdota México 17',
    byUser: 'Anónimo',
    text: `xxxxxxxxxxx`
  },
  */
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

    const currentTime = moment();

    const extra = moment().format('YYYY-MM-DD') + ' ';
    const start_time = moment(extra + '18:00');
    const end_time = moment(extra + '23:59');

    const start_timeTwo = moment(extra + '00:00');
    const end_timeTwo = moment(extra + '05:00');

    if (
      moment(currentTime).isBetween(start_time, end_time) ||
      moment(currentTime).isBetween(start_timeTwo, end_timeTwo)
    ) {
      if (localStorage.getItem('isActiveTerrorMessage') !== 'true') {
        setTimeout(() => {
          let value = 'T';
          setSearchValue(value);
          localStorage.setItem('isActiveTerrorMessage', 'true');
          setTimeout(() => {
            value = value + 'E';
            setSearchValue(value);
            setTimeout(() => {
              value = value + ' ';
              setSearchValue(value);
              setTimeout(() => {
                value = value + 'O';
                setSearchValue(value);
                setTimeout(() => {
                  value = value + 'B';
                  setSearchValue(value);
                  setTimeout(() => {
                    value = value + 'S';
                    setSearchValue(value);
                    setTimeout(() => {
                      value = value + 'E';
                      setSearchValue(value);
                      setTimeout(() => {
                        value = value + 'R';
                        setSearchValue(value);
                        setTimeout(() => {
                          value = value + 'V';
                          setSearchValue(value);
                          setTimeout(() => {
                            value = value + 'A';
                            setSearchValue(value);
                          }, 800);
                          setTimeout(() => {
                            value = value + 'M';
                            setSearchValue(value);
                          }, 800);
                          setTimeout(() => {
                            value = value + 'O';
                            setSearchValue(value);
                          }, 800);
                          setTimeout(() => {
                            value = value + 'S';
                            setSearchValue(value);
                          }, 800);
                          setTimeout(() => {
                            setSearchValue('');
                          }, 5000);
                        }, 800);
                      }, 800);
                    }, 800);
                  }, 800);
                }, 800);
              }, 800);
            }, 800);
          }, 2000);
        }, 1300);
      }
    }
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
              Última actualización: 20/11/2020 01:03 am
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
