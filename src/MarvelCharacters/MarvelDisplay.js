import React, { useEffect, useRef} from 'react' 
import { Link } from "react-router-dom";
import md5 from 'md5'
import '../styles/display.css'
import env from "react-dotenv";




const MarvelDisplay = (props) => {
  //  console.log('this is props', props)

  const apiPublic = env.PUBLIC_KEY

  const privateKey = env.PRIVATE_KEY

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

 
  const [characters, setCharacters] = React.useState(null)
  // const [comicsList, setComicsList] = React.useState(null)
  
  const getCharacters = useRef(() => {})

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
                        <h3>Total comics: {character?.comics?.available}</h3>
                    </div>
                  </div>
                      <h2>Comic Books Available</h2>
                    <div>
                      {                       
                        character?.comics?.items?.map((item, index) => {

                          const comicApi = `${item?.resourceURI}?nameStartsWith=${searchname}&ts=${timestamp}&apikey=${apiPublic}&hash=${hash}`

                          return(
                            <>
                              <Link to="/selected-display">
                                <button className="buttons" onClick={() => props.comics(comicApi)}><p>{item?.name}</p>Click here</button>
                              </Link>
                            </>
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