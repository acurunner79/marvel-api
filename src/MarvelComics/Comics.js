import React, { useEffect, useState, useRef } from 'react' 
import md5 from 'md5'
import { Link } from 'react-router-dom'



const Comics = (props) => {
    // console.log('Comic props', props)

    const apiPublic = process.env.REACT_APP_PUBLIC_KEY
  // console.log('public key', apiPublic)

  const privateKey = process.env.REACT_APP_PRIVATE_KEY
  // console.log('private key', privateKey)

  const date = new Date()
  const timestamp = date.getTime()

  const hashStr = timestamp + privateKey + apiPublic
  let hash = md5(hashStr)

  const comicsApi = `${props?.comics}?ts=${timestamp}&apikey=${apiPublic}&hash=${hash}`

  const [charComics, setCharComics] = useState(null)

  const getCharComics = useRef()

  getCharComics.current = async () => {
    const response = await fetch(comicsApi)
    const data = await response.json()
    setCharComics(data)
    //    console.log('This is charComicss', charComics)
  }
  
  useEffect(() => {
    getCharComics.current()
  }, [])

  const loaded = () => {

    return(
        charComics?.data?.results?.map((charComic, index) => {
            console.log('charComic.resouceUR', charComic) 

            const testJoin = [`${charComic?.thumbnail?.path}`,'.', `${charComic?.thumbnail?.extension}`]
            const newImgStr = testJoin.join('')
          

            return(
                <div key={index}>
                    <h1>{charComic.title}</h1>
                    <img src={newImgStr} alt="cover"></img>
                    <Link to="selected-display">
                        <button onClick={() => props.selectedComic(charComic?.resourceURI)}>Details</button>
                    </Link>
                </div>
            )
        })
        )
    }
        
        const loading = () => {

    return(
        <div>
            <p>Loading comics for {props.character}</p>
        </div>
    )
}

    return charComics ? loaded() : loading()
   
}




export default Comics