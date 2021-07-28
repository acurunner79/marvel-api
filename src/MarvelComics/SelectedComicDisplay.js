import React, { useEffect, useRef } from 'react' 



const SelectedComicDisplay = (props) => {
    console.log('Selected comicsList prop', props.comics)

    const comicApi = `${props.comics}`


    const [comicsLists, setComicsLists] = React.useState(null)

    const getComicsLists = useRef(() => {})

    getComicsLists.current = async () => {
        const response = await fetch(comicApi)
        const data = await response.json()
        setComicsLists(data)
        console.log('this is comics list', comicsLists)
    }

    useEffect(() => {
        getComicsLists.current()
    }, [])

    const loaded = () => {
    
        return (
          comicsLists?.data?.results?.map((comicsList, index) => {
    
            const testJoin = [`${comicsList?.thumbnail?.path}`,'.', `${comicsList?.thumbnail?.extension}`]
            const newImgStr = testJoin.join('')
    
                return (
                    <div key={index}>
                        <h1>{comicsList.title}</h1>
                        <img src={newImgStr} alt="thumbnail"></img>
                        <p>{comicsList.description}</p>
                        <p>US price: ${comicsList?.prices[0]?.price, comicsList?.prices[1]?.price || " Not Available"}</p>
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