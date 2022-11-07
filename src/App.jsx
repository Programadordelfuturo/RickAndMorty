import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import RickMorty from './components/RickMorty'

function App() {

  const [ isInput, setIsInput ] = useState('')
  const [ location, setLocation ] = useState({})

  
  const i = Math.floor(Math.random()*20) + 1;


    useEffect(()=>{
      axios.get(`https://rickandmortyapi.com/api/location`)
        .then(res => setLocation(res.data.results[i]))
    }, [])
  

    const click = () => {
      axios.get(`https://rickandmortyapi.com/api/location/${isInput}`)
        .then(res => setLocation(res.data))
    }


  return (
    <div className="App">
      <img id='panel' src="https://creators-images.vice.com/content-images/contentimage/no-slug/bbc20efcbd2998134f9140bc5b20f0a5.jpg" alt="" />
      <div>
        <input type="text" value={isInput} onChange={(e)=>setIsInput(e.target.value)}/>
        <button onClick={click}>CLICK</button>
      </div>
      <div id='option'>
        <h1>{location?.name}</h1>
        <div>
          <p><strong>type: </strong>{location?.type}</p>
          <p><strong>dimension: </strong>{location?.dimension}</p>
          <p><strong>population: </strong>{location?.residents?.length}</p>
        </div>
      </div>
      <div className='container-options'>
        <h2>Residents</h2>
        <div>
          <ul>
            {location?.residents?.map(extras =>(
              <RickMorty
                url={extras}
                key={extras}
              />
            ))}
          </ul>
        </div> 
      </div>
    </div>
  )
}
export default App