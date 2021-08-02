import React from 'react' 
import '../styles/search.css'

const MarvelSearch = (props) => {

    const [characterData, setCharacterData] = React.useState({name: "" })
    // const [characterId, setCharacterId] = React.useState({id: 0})
    // console.log('this is characterId', characterId)
    

    const handleChange = (event) => {
        setCharacterData({...characterData, [event.target.name]: event.target.value })
        // setCharacterId({...characterId, [event.target.id]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        props.charactersearch(characterData.name)
        props.history.push("/")
    }   

    return (
        <div className="search">
        <h1>This is the Search Title section</h1>
            <form onSubmit={handleSubmit}>
                <input className="input"
                   type="text"
                   name="name"
                   value={characterData.searchname}
                   onChange={handleChange}
                   placeholder="Enter name"></input>
                <input className="submit"
                type="submit"
                value="submit"></input>
            </form>
                <h2>Type a name of any Marvel character to generate a details page with your results.</h2>
                <h2>When you're done typing the name you would like to search just hit "submit".</h2>
        </div>
    )
}


export default MarvelSearch