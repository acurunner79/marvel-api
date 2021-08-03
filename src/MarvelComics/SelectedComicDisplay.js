import React, { useEffect, useRef } from 'react' 
import md5 from 'md5'



const SelectedComicDisplay = (props) => {
    console.log('Selected comicsList props', props)
  
  const apiPublic = process.env.REACT_APP_PUBLIC_KEY
  // console.log('public key', apiPublic)

  const privateKey = process.env.REACT_APP_PRIVATE_KEY
  // console.log('private key', privateKey)

  const date = new Date()
  const timestamp = date.getTime()

  const hashStr = timestamp + privateKey + apiPublic
  let hash = md5(hashStr)

  const comicApi = `${props.selectedComic}?ts=${timestamp}&apikey=${apiPublic}&hash=${hash}`

  const [comicsLists, setComicsLists] = React.useState(null)

  const getComicsLists = useRef()

  getComicsLists.current = async () => {
      const response = await fetch(comicApi)
      const data = await response.json()
      setComicsLists(data)
      // console.log('this is comics lists', comicsLists)
  }

  useEffect(() => {
      getComicsLists.current()
  }, [])

  const loaded = () => {
  
      return (
        comicsLists?.data?.results?.map((comicsList, index) => {
          console.log('comicList', comicsList)
  
          const testJoin = [`${comicsList?.thumbnail?.path}`,'.', `${comicsList?.thumbnail?.extension}`]
          const newImgStr = testJoin.join('')
  
              return (
                  <div key={index}>
                      <h1>{comicsList.title}</h1>
                      <img src={newImgStr} alt="thumbnail"></img>
                      <p>"{comicsList.description || "No Description available"}"</p>
                      <p>US price: ${comicsList?.prices[0]?.price || " Not Available"}</p>
                      <p>{comicsList.pageCount}</p>
                      <p>{comicsList?.dates[0].date}</p>
                      <p>{comicsList.urls[0].url}</p>
                      <div>
                          <button className="button"><h4><a target="_blank" rel="noreferrer" href={comicsList.urls[0].url}>Purchase on Marvel.com</a></h4></button>
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
    
    return comicsLists ? loaded() : loading()
}


export default SelectedComicDisplay