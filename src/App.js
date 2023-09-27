import React, { useState, useEffect } from "react"; // Tuodaan React-kirjasto sekä tarvittavat koukut (hooks).
import axios from "axios"; // Tuodaan Axios HTTP-kirjasto.
import "./App.css"; // Tuodaan CSS-tyylitiedosto, joka liitetään tähän komponenttiin.

function App() { // Määritellään React-komponentti nimeltä App.
  // useState-koukut käytetään komponentin tilan hallintaan.
  const [data, setData] = useState(); // data on tilamuuttuja, setData on funktio sen päivittämiseen.
  const [hakuTemp, setHakuTemp] = useState(); // hakuTemp on tilamuuttuja hakusanan väliaikaiseen tallentamiseen.
  const [haku, setHaku] = useState(); // haku on tilamuuttuja varsinaisen hakusanan tallentamiseen.

  useEffect(() => { // useEffect-koukku suorittaa toiminnon aina, kun haku-muuttuja muuttuu.
    axios // Käytetään Axiosia tehdäksemme HTTP-pyynnön Wikipedia API:lle.
      .get(`http://localhost:4000/wiki?haku=${haku}`) // Tehdään GET-pyyntö API:lle hakusanan kanssa.
      .then(function (response) { // Käsitellään onnistunut vastaus (response).
        setData(response.data); // Asetetaan saatu data tilamuuttujaan data.
      })
      .catch(function (error) { // Käsitellään mahdollinen virhe (error).
        console.log(error); // Tulostetaan virhe konsoliin.
      });
  }, [haku]); // Ainoastaan haku-muutoksen yhteydessä suoritettava useEffect.

  return (
    <div className="App"> {/* Luodaan div-elementti ja asetetaan sille CSS-luokka "App". */}
      <input
        type="text"
        placeholder="Haku"
        onChange={(event) => setHakuTemp(event.target.value)} // Käsitellään hakusanan muutosta ja päivitetään hakuTemp-tila.
      />
      <button onClick={() => setHaku(hakuTemp)}>Hae</button> {/* Napin painallus asettaa hakusanan haku-muuttujaan. */}
      {data?.[0]?.title && <h1>{data[0].title}</h1>} {/* Näytetään otsikko, jos se on saatavilla datasta. */}
      {data?.[0]?.thumbnail?.source && (
        <img src={data?.[0]?.thumbnail?.source} />
      )} {/* Näytetään kuva, jos se on saatavilla datasta. */}
      {data?.[0]?.extract && <p>{data[0].extract}</p>} {/* Näytetään teksti, jos se on saatavilla datasta. */}
    </div>
  );
}

export default App; // Viedään App-komponentti käytettäväksi muissa tiedostoissa.

