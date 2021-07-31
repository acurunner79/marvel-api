import React, { useState } from 'react' 
import MarvelSearch from './MarvelCharacters/MarvelSearch'
import MarvelDisplay from './MarvelCharacters/MarvelDisplay';
import ComicDisplay from './MarvelComics/ComicDisplay';
import ComicSearch from './MarvelComics/ComicSearch';
import SelectedComicDisplay from './MarvelComics/SelectedComicDisplay';
import ComicsList from './MarvelComics/ComicsList';
import Comic from './MarvelComics/Comic'
import Nav from './nav';
import { Route } from "react-router-dom"
import { createGlobalStyle } from "styled-components";
import './App.css';
import AnimeAceWOFF from './fonts/animeace2_reg.woff'


const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: 'Anime Ace';
  src: local('Anime Ace'), url(${AnimeAceWOFF}) format('woff');
  }
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Anime Ace',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-stroke: 2px black;
  font-size: 20px;
  color: white;
  text-decoration: none !important;
  background-color: red;
  height: 1080px;
  align-items: center;
}

h1{
  font-family: 'Bangers';
  font-size: 60px;
}

`

function App(props) {

  // State for character search form
  const [character, setCharacter] = useState(null)
    const charactersearch = (myCharacter) => {
      setCharacter(myCharacter)
    }

  // State for comic search form
  const [comic, setComic] = useState(null)
    const comicsearch = (myComic) => {
      setComic(myComic)
    }

  // Selected Comic List
  const [comics, setComics] = useState(null)
  
  //Individual comic from comic list
  const [selectedComic, setSelectedComic] = useState(null)
  

  const [comicImg, setComicImg] = useState(null)
 
  return (
    <div className="App">
      <GlobalStyle />
      <Nav />
      <h1>Marvel API Test</h1>
      <Route path="/marvel-display">
        <MarvelDisplay character={character} setComics={setComics} setComicImg={setComicImg}/>
      </Route>
      <Route exact path="/selected-display">
        <SelectedComicDisplay selectedComic={selectedComic}/>
      </Route>
      {/* <Route exact path="/comics-list"> */}
        {/* <ComicsList comics={comics} character={character} selectedComic={setSelectedComic}/> */}
        {/* <ComicsList comics={comics} character={character} comicImg={comicImg} selectedComic={setSelectedComic}/>
      </Route> */}
      <Route exact path="/comics">
        <Comic comics={comics} comicImg={comicImg} character={character} selectedComic={setSelectedComic}/>
      </Route>
      <Route exact path="/marvel-search" render={(routerProps) => <MarvelSearch {...routerProps} charactersearch={charactersearch}/>} />
      <Route path="/comic-display">
        <ComicDisplay comic={comic}/>
      </Route>
      <Route exact path="/comic-search" render={(routerProps) => <ComicSearch {...routerProps} comicsearch={comicsearch}/>} />
    </div>
  );
}

export default App;
