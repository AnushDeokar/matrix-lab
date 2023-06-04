import React from 'react'
import "./Navbar.css"
import {AiOutlineBlock} from "react-icons/ai";
import {HiOutlineCube} from "react-icons/hi";
import {GiCube} from "react-icons/gi";

function Navbar({buttonstate, handletoggle}) {
  return (
    <div className='navbar-container'>
        
        <div className='navbar-head'>
           <GiCube color='white' size={40}/> NFTify
        </div>
        <div className='navbar-link-div' onClick={()=>{handletoggle(true)}}  style={buttonstate?{backgroundColor:"#f30050"}:null}>
           <HiOutlineCube color='white'size={30}/> Token Address
        </div>
        <div className='navbar-link-div' onClick={()=>{handletoggle(false)}} style={!buttonstate?{backgroundColor:"#f30050"}:null}>
             <AiOutlineBlock color='white' size={30}/> <span style={{transform:"translateY(5px)"}}>Pair Address</span>
        </div>
    </div>
  )
}

export default Navbar