import React from 'react' 







const ComicSearch = (props) => {

    const [comicData, setComicData] = React.useState({title: "",})

    

    const handleChange = (event) => {
        setComicData({...comicData, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        props.comicsearch(comicData.title)
        props.history.push("/comic-display")
    }   

    return (
        <div className="search">
        <h1>This is the Search Title section</h1>
            <form onSubmit={handleSubmit}>
                <input className="input"
                   type="text"
                   name="title"
                   value={comicData.searchtitle}
                   onChange={handleChange}
                   placeholder="Enter name"></input>
                <input className="submit"
                type="submit"
                value="submit"></input>
            </form>
                <h2>Type a name of any Marvel comic to generate a details page with your results.</h2>
                <h2>When you're done typing the name you would like to search just hit "submit".</h2>
        </div>
    )
}


export default ComicSearch