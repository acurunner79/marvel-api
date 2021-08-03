import React, { useEffect, useRef} from 'react' 
import { Link } from "react-router-dom";
import md5 from 'md5'
import '../styles/display.css'



const ComicDisplay = (props) => {
  console.log('this is comics props', props)

  const apiPublic = process.env.REACT_APP_PUBLIC_KEY
  //const apiPublic = '5fa0f3c6de9effe680ca20e4ffd6664e' This is my backup account
//   console.log('apiPublic', apiPublic)

  const privateKey = process.env.REACT_APP_PRIVATE_KEY
  //const privateKey = '8dc7a48c524528fc45456c679ae94999aedd1f8a' This is my backup account
//   console.log('private', privateKey)

// This generates a timestamp that is unique by request  
  const date = new Date()
  const timestamp = date.getTime()
//   console.log('timestamp', timestamp)

// This adds all three items into a string
  const hashStr = timestamp + privateKey + apiPublic
  let hash = md5(hashStr)
//   console.log('this is hash string', hashStr)
//   console.log('this is hash', hash)

// const searchtitle = 'deadpool'
  const searchtitle = props?.comic
    // console.log(props.moviesearch)

  const apiUrl = `https://gateway.marvel.com/v1/public/comics?title=${searchtitle}&ts=${timestamp}&apikey=${apiPublic}&hash=${hash}`
  
  const [comics, setComics] = React.useState(null)

  const getComics = useRef(() => {})

  getComics.current = async () => {
    const response = await fetch(apiUrl)
    const comicData = await response.json()
    setComics(comicData)
    console.log('This is com', comics)
  }
  useEffect(() => {
    getComics.current()
  }, [])

  const loaded = () => {

    return (
        comics?.data?.results?.map(comic => {

          const testJoin = [`${comic?.thumbnail?.path}`,'.', `${comic?.thumbnail?.extension}`]
          const newImgStr = testJoin.join('')
          console.log(newImgStr)
            
            return (
                <div key={comic.id}>
                    <Link to="/">
                        <h3 className="return-search">Return to search</h3>
                    </Link>
                    <h2>{comic?.title}</h2>
                    <h3>{comic?.description}</h3>
                    <h3>{comic?.prices?.type}{comic?.prices?.price}</h3>
                    <img newImgStr={newImgStr} src={newImgStr} alt='comic-cover'></img>
                </div>
            )
        })
    )
  }

  const loading = () => {

    return (
        <h1>Loading</h1>
    )
  }

  return comics ? loaded() : loading()

}


export default ComicDisplay