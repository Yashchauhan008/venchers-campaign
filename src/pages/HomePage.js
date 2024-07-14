import React from 'react'
import '../index.css'
import Navbar from '../components/navbar';

const HomePage = () => {

  const imageUrls = Array(160).fill('https://via.placeholder.com/150');


  return (
    <>
    <Navbar/>
    <div className="grid-container">
      {imageUrls.map((url, index) => (
        <div key={index} className="grid-item" >
          <img src={url} alt={`img-${index}`} />
        </div>                      
      ))}
    </div>
    </>
  )
}

export default HomePage