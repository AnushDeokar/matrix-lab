import './App.css';
import Navbar from './components/Navbar';
import {FiSearch} from "react-icons/fi";
import Block from './components/Block';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {RxHamburgerMenu} from "react-icons/rx";

function App() {
  const [inputval, setinputval] = useState("");
  const [buttonstate, setButtonState] = useState(true);
  const [pairs, setPairs] = useState([]);
  const [tokenpairs, setTokenpairs] = useState([])
  const [togglenav, setTogglenav] = useState(false);
  const [start, setStart] = useState(true);
  const handleChange = (e)=>{
    e.preventDefault();
    setStart(false);
    setinputval(e.target.value);
  }

    useEffect(()=>{
      const fetchData = async()=>{
        if (inputval!==""){
          await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${inputval}`)
          .then( function (response){
              if (response.data.pairs){
                console.log("Tokens", inputval, response.data.pairs);
                  setTokenpairs(response.data.pairs);
              }else{
                setTokenpairs([]);
              }
          }
          ).catch(function (err){
          })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps

          await axios.get(`https://api.dexscreener.com/latest/dex/search/?q=${inputval}`)
          .then( function (response2){
              if (response2.data.pairs){
                  console.log("Pairs", inputval, response2.data.pairs);
                  setPairs(response2.data.pairs);
              }else{
                setPairs([]);
              }
          }
          ).catch(function (err){
          })
        
      }
      fetchData();
    }, [inputval])
  return (
    <div className='top-head'>
      <img className='bg-img' src="./bg_img.png" alt=""/>
      <div className='main-body-head'>
        <div className='nav-lap'>
          <Navbar buttonstate={buttonstate} handletoggle={(val)=>{setButtonState(val)}}/>
        </div>
        <div className='main-body'>
          <div className='left-head'>
              <div className='search-div'>
                  <input className='searchbox' placeholder='Search' value={inputval} onChange={handleChange}/><FiSearch color='white' size={20} 
                      style={{
                        margin:"auto",
                      }}
                  />
              </div>
              <button className='connect-button'>Connect</button>
          </div>


          <div className='left-head-mobile'>
                <div className='row-1-top'>
                  <div className='navbar-head-app'>
                        <RxHamburgerMenu onClick={()=>{setTogglenav(!togglenav)}}/> NFTify
                  </div>
                  <button className='connect-button'>Connect</button>
                </div>
                {togglenav?<div style={{position:"absolute", top:"80px"}}><Navbar buttonstate={buttonstate} handletoggle={(val)=>{setButtonState(val)}}/></div>:null}
                <div className='search-div'>
                  <input className='searchbox' placeholder='Search' value={inputval} onChange={handleChange}/><FiSearch color='white' size={20} 
                        style={{
                          margin:"auto",
                        }}
                    />
                </div>
          </div>

          <div onClick={()=>{setTogglenav(false)}}>

                      {(() => {
                            if (pairs.length===0) {
                            return (
                               <h2>{start?"Please Enter Input":"No Data was found at the given Input"}</h2>
                            )
                            } 
                            if (buttonstate && tokenpairs.length>0) {
                            return (<>
                                  <h2>Token Search Results</h2>
                                  {tokenpairs.map((pair, i)=><>
                                  {i<10?<div key={i} className='main-body-content'>
                                    <Block pair={pair} ind={0}/>
                                    <Block pair={pair} ind={1}/>
                                    <Block pair={pair} ind={2}/>
                                    <Block pair={pair} ind={3}/></div>:null}</>
                                )}
                              </>
                            )
                            } 
                            if(!buttonstate && pairs.length>0){
                            return (
                                <>
                                  <h2>Pair Search Results</h2>
                                  {pairs.map((pair, i)=><>
                                  {i<10?<div key={i} className='main-body-content'>
                                    <Block pair={pair} ind={0}/>
                                    <Block pair={pair} ind={1}/>
                                    <Block pair={pair} ind={2}/>
                                    <Block pair={pair} ind={3}/></div>:null}</>
                                )}
                              </>
                            )
                            }
                        })()}
              
          </div>
        </div>
      </div>
      <div className='footer'>

      </div>
    </div>
  );
}

export default App;
