import React from 'react' 
import { Link } from 'react-router-dom'
import md5 from 'md5'


const ComicsList = (props) => {
    console.log('ComicList prop',props.comics)


    
    const loaded = () => {
        
        return(
            
            props?.comics?.map(comic => {

            const apiPublic = process.env.REACT_APP_PUBLIC_KEY
        
            const privateKey = process.env.REACT_APP_PRIVATE_KEY
        
            const date = new Date()
            const timestamp = date.getTime()
        
            const hashStr = timestamp + privateKey + apiPublic
            let hash = md5(hashStr)
        
            const searchname = props?.character
            
            const selectedComicURI = `${comic.resourceURI}?nameStartsWith=${searchname}&ts=${timestamp}&apikey=${apiPublic}&hash=${hash}`
            // console.log('selectedComicURI', selectedComicURI)
            
            return(
                <>
                    <Link to="/selected-display">
                        <button className="buttons" onClick={() => props?.selectedComic(selectedComicURI) }>{comic?.name}<br></br> <br></br><p>Click here</p></button>
                    </Link>
                </>  
            )
            }
        )
    )
    }
    const loading = () => {

        return (
            <h1>Loading Comics...</h1>
        )
    }
    
    return props?.comics ? loaded() : loading()
    }


export default ComicsList