import React, { useEffect, useRef } from 'react' 



const SelectedComicDisplay = (props) => {
    console.log('Selected comicsList props', props.comics)

    const comicApi = `${props.comics}`


    const [comicsLists, setComicsLists] = React.useState(null)

    const getComicsLists = useRef(() => {})

    getComicsLists.current = async () => {
        const response = await fetch(comicApi)
        const data = await response.json()
        setComicsLists(data)
        console.log('this is comics li', comicsLists)
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
                        <p>US price: ${comicsList.prices[1].price}</p>
                        <div>
                            <button className="button">Purchase on Marvel.com</button>
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