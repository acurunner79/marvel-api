import React, { useEffect, useState, useRef } from 'react' 
import md5 from 'md5'
import { Link } from 'react-router-dom'
import '../styles/comics.css'



const Comics = (props) => {
    // console.log('Comic props', props)

    const apiPublic = process.env.REACT_APP_PUBLIC_KEY

    const privateKey = process.env.REACT_APP_PRIVATE_KEY

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
            // console.log('charComic.resouceUR', charComic) 

        const oldURI = charComic?.resourceURI
        const newURI = oldURI.split('')
          newURI.splice(4, 0, 's')
        const finalURI = newURI.join('')
        //   console.log('new URI ', finalURI)

        const testJoin = [`${charComic?.thumbnail?.path}`,'.', `${charComic?.thumbnail?.extension}`]
        const newImgStr = testJoin.join('')
        

            return(
                    <div className="comic-card" key={index}>
                        {/* <p>{charComic.title}</p> */}
                        <div className="comic-main">
                            <Link className="sel-com-link" to="selected-display">
                                <img className="comic-cover" src={newImgStr} alt="cover"></img>
                                <button className="comic-button" onClick={() => props.selectedComic(finalURI)}>{charComic.title}</button>
                            </Link>
                        </div>
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