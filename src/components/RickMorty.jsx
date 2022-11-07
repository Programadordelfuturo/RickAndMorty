import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react'


const RickMorty = ({url}) => {

  const [ person, setPerson ] = useState({})

  useEffect(()=>{
    axios.get(url)
      .then(res => setPerson(res.data))
  },[])

  return (
    <div className='card'>
      <img src={person?.image} alt='image' />
      <div className='data'>
        <p>name: {person?.name}</p>
        <p className='container'>
          <span className={person?.status === 'Dead' ?'circle dead' : (person?.status === 'unknown' ?'circle gray' :'circle green')}></span>              
          status: {person?.status} - {person?.species}
        </p>
        <p className='text'>
          origin: 
          <br/>
          {person.origin?.name}</p>
        <p className='text'>
          episodes where appear: 
          <br/>
          {person.episode?.length}
        </p>
      </div>
    </div>
  );
};

export default RickMorty;

