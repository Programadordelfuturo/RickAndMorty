import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import RickMorty from './components/RickMorty'
import banner from './assets/rick-morty-banner.png'

function App() {

  const [ isInput, setIsInput ] = useState('')
  const [ location, setLocation ] = useState([])

  
  const i = Math.floor(Math.random()*20) + 1;


    useEffect(()=>{
      axios.get(`https://rickandmortyapi.com/api/location`)
        .then(res =>{console.log(res.data.results[i].residents); setLocation(res.data.results[i])})
    }, [])
  

    const click = () => {
      axios.get(`https://rickandmortyapi.com/api/location/${isInput}`)
        .then(res =>{console.log(res.data); setLocation(res.data)})
    }

    const [ data, setData ] = useState(1);
    const personajesPerData = 6
    const lastPage = Math.ceil((location?.residents?.length) / personajesPerData) ;
    const finalIndex = data*personajesPerData
    const firstIndex = (data - 1)*personajesPerData;
    
    const paginated = location?.residents?.slice(firstIndex, finalIndex);

  return (
    <div className="App">
      <img id='panel' src={banner} alt="image" />
      <div id='search'>
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
        <div id='controllers'>
          <button onClick={() => setData(data - 1)} disabled={data==1}>Previus</button>
          <button onClick={() => setData(data + 1)} disabled={data==lastPage}>Next</button>
          <button onClick={() => setData(1)}>Reset</button>
        </div>
        <div>
          <ul>
            {paginated?.map(extras =>(
              <RickMorty
                url={extras}
                key={extras}
              />
            ))}
          </ul>
        </div>
        <div id='controllers'>
          <button onClick={() => setData(data - 1)} disabled={data==1}>Previus</button>
          <button onClick={() => setData(data + 1)} disabled={data==lastPage}>Next</button>
          <button onClick={() => setData(1)}>Reset</button>
        </div>
      </div>
    </div>
  )
}
export default App