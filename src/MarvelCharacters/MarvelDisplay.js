import React, { useEffect, useRef, useState} from 'react' 
import { Link } from "react-router-dom";
import md5 from 'md5'
import '../styles/display.css'


const MarvelDisplay = (props) => {

  const apiPublic = process.env.REACT_APP_PUBLIC_KEY
  // console.log('public key', apiPublic)

  const privateKey = process.env.REACT_APP_PRIVATE_KEY
  // console.log('private key', privateKey)

  const date = new Date()
  const timestamp = date.getTime()

  const hashStr = timestamp + privateKey + apiPublic
  let hash = md5(hashStr)

  const searchname = props?.character

  const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchname}&ts=${timestamp}&apikey=${apiPublic}&hash=${hash}`

  const [characters, setCharacters] = useState(null)
  
  const getCharacters = useRef()

  getCharacters.current = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setCharacters(data)
      // console.log('This is character', characters)
  }
  
  useEffect(() => {
    getCharacters.current()
  }, [])
   
  const loaded = () => {
    
    return (
      characters?.data?.results?.map((character, index) => {
        // console.log('character items',character)

        // const comicCollectionURI = `${character.comics.collectionURI}?ts=${timestamp}&apikey=${apiPublic}&hash=${hash}`
        //  console.log('collectionURI', comicCollectionURI)

        const oldURI = character.comics.collectionURI
        const newURI = oldURI.split('')
          newURI.splice(4, 0, 's')
        const finalURI = newURI.join('')
          // console.log('new URI ', finalURI)


        const imgStr = [`${character?.thumbnail?.path}`,'.', `${character?.thumbnail?.extension}`]
        const newImgStr = imgStr.join('')
    
            return (
              <div key={index}>
                <div className="character-container">
                  <div className="character-card">
                    <Link className="underline" to="/marvel-search">
                      <h3 className="return-search">Return to search</h3>
                    </Link>
                      <h1>{character?.name}</h1>
                      <div className="char-img-desc">
                        <img className="character-img" src={newImgStr} alt="thumbnail"></img>
                        <h3>"{character?.description || "Not Available"}"</h3>
                      </div>
                      <h3>Comic book appearances: {character?.comics?.available}</h3>
                  </div>
                </div>
                    <h2>Comic Books Available</h2>
                    <p>{character?.comics?.list}</p>
                    <button>Stories: {character?.stories?.collectionURI}</button>
                    <button ><h4><a target="_blank" rel="noreferrer" href={character.urls[0].url}>More comics on {character.name}</a></h4></button>
                    <button ><h4><a target="_blank" rel="noreferrer" href={character.urls[1].url}>More Info about {character.name}</a></h4></button>
                  <Link to="/comics">
                    <button  className="button" onClick={() => props.setComics(finalURI)}>List of comics</button>
                  </Link>
              </div>
            )
          }
        )
      )
    }
            
  const loading = () => {

    return (
        <h1>Loading</h1>
    )
  }

  return characters ? loaded() : loading()

}


export default MarvelDisplay