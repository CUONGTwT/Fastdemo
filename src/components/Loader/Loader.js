import React from 'react'
import "../../styles/loader.css"
import LoaderImg from "../../assets/images/loader.gif"
import reactDOM from 'react-dom'
function Loader() {
  return reactDOM.createPortal (
    <div className= "wrapper">
        <div className= "loader">
            <img src = {LoaderImg} alt = "loading..." />

        </div>
      
    </div>,
    document.getElementById("loader")
  )
}

export default Loader
