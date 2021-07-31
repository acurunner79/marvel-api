import React, { useEffect, useState, useRef } from 'react' 
import md5 from 'md5'
// import { Link } from 'react-router-dom'



const Comic = (props) => {
    console.log('Comic prop', props)
    
    const apiPublic = process.env.REACT_APP_PUBLIC_KEY
    
    const privateKey = process.env.REACT_APP_PRIVATE_KEY
    
    const date = new Date()
    const timestamp = date.getTime()
    
    const hashStr = timestamp + privateKey + apiPublic
    let hash = md5(hashStr)
    
    const searchname = props?.character
    
    const api = `?nameStartsWith=${searchname}&ts=${timestamp}&apikey=${apiPublic}&hash=${hash}`
    
    const [comicURI, setComicURI] = useState(null)
    // const [uri, setUri] = useState(null)
    
    
    // var obj = props?comics?.map( (comic) => comic.resourceURI)
    // console.log('api', obj)
    const getComicURI = useRef()

    getComicURI.current = async () => {
        const response = await fetch(`${api}${props.comic}`)
        const data = await response.json()
        setComicURI(data)
        console.log('comicURI', comicURI)
    }

    useEffect(() => {
        getComicURI.current()
    }, [])
   
    const loaded = () => {
        return(
            <>
              <p>{comicURI}</p>
            </>  
        )
    }
    const loading = () => {

        return (
            <h1>Loading</h1>
        )
      }
    
      return comicURI ? loaded() : loading()
    }




export default Comic