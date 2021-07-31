import React, { useEffect, useRef, useState} from 'react' 
import { Link } from "react-router-dom";
import md5 from 'md5'
import '../styles/display.css'


const MarvelDisplay = (props) => {
  //  console.log('this is props', props)

  const apiPublic = process.env.REACT_APP_PUBLIC_KEY
  // console.log('public key', apiPublic)

  const privateKey = process.env.REACT_APP_PRIVATE_KEY

// This generates a timestamp that is unique by request  
  const date = new Date()
  const timestamp = date.getTime()
//   console.log('timestamp', timestamp)

// This adds all three items into a string
  const hashStr = timestamp + privateKey + apiPublic
  let hash = md5(hashStr)
//   console.log('this is hash string', hashStr)
//   console.log('this is hash', hash)

  const searchname = props?.character

  const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchname}&ts=${timestamp}&apikey=${apiPublic}&hash=${hash}`

  const [characters, setCharacters] = useState(null)
  
  const getCharacters = useRef()

  getCharacters.current = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setCharacters(data)
      console.log('This is characters', characters)
  }
  
  useEffect(() => {
    getCharacters.current()
  }, [])
   
  const loaded = () => {
    
    return (
      characters?.data?.results?.map((character, index) => {
        // console.log('character items',character?.thumbnail)

        const imgStr = [`${character?.thumbnail?.path}`,'.', `${character?.thumbnail?.extension}`]
        const newImgStr = imgStr.join('')
        // console.log('newString', newImgStr)

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
                        <h3>Total comics: {character?.comics?.available}</h3>
                    </div>
                  </div>
                      <h2>Comic Books Available</h2>
                      <p>{character?.comics?.list}</p>
                    <Link to="/comics">
                      <button  onClick={() => props.setComics(character?.comics?.items )}>List of comics</button>
                    </Link>
                    <div>
                      {                       
                        character?.comics?.items?.map((item, index) => {
                          // console.log('mapped item', item)
                          // const comicInfo = props.setComicImg(item)
                          // console.log('comicInfo', comicInfo)

                          return(
                            <div key={index}>
                              <p></p>
                            </div>
                          )})
                        } 
                    </div>
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