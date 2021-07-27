import React from 'react' 
import MarvelSearch from './MarvelCharacters/MarvelSearch'
import MarvelDisplay from './MarvelCharacters/MarvelDisplay';
import ComicDisplay from './MarvelComics/ComicDisplay';
import ComicSearch from './MarvelComics/ComicSearch';
import SelectedComicDisplay from './MarvelComics/SelectedComicDisplay';
import Nav from './nav';
import { Route } from "react-router-dom"
import './App.css';


function App() {


const [character, setCharacter] = React.useState(null)
  const charactersearch = (myCharacter) => {
     setCharacter(myCharacter)
  }

const [comic, setComic] = React.useState(null)
  const comicsearch = (myComic) => {
    setComic(myComic)
  }

  // Selected Comic List
  const [comics, setComics] = React.useState(null)
 

  return (
    <div className="App">
      <Nav />
      <h1>Marvel API Test</h1>
      <Route path="/marvel-display">
        <MarvelDisplay character={character} comics={setComics}/>
      </Route>
      <Route exact path="/selected-display">
        <SelectedComicDisplay comics={comics}/>
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
