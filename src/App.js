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
  const [istoken, setIstoken] = useState();

  const handleChange = (e)=>{
    e.preventDefault();
    console.log(e.target.value);
    setinputval(e.target.value);
  }

    useEffect(()=>{
      const fetchData = async()=>{
        if (inputval!==""){
          await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${inputval}`)
          .then( function (response){
              if (response.data.pairs){
                setIstoken(true);
                console.log("Tokens", inputval, response.data.pairs);
                  setPairs(response.data.pairs);
              }else{
                  setPairs([]);
              }
          }
          ).catch(function (err){
          })
        }
        if (pairs.length===0){
          await axios.get(`https://api.dexscreener.com/latest/dex/search/?q=${inputval}`)
          .then( function (response2){
              if (response2.data.pairs){
                  console.log("Pairs", inputval, response2.data.pairs);
                  setIstoken(false);
                  setPairs(response2.data.pairs);
              }else{
                  setPairs([]);
              }
          }
          ).catch(function (err){
          })
        }
      }
      fetchData();
    }, [inputval])
  return (
    <div className='top-head'>
      <img className='bg-img' src="./bg_img.png" alt=""/>
      <div className='main-body-head'>
        <Navbar buttonstate={buttonstate} handletoggle={(val)=>{setButtonState(val)}}/>

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
              {/* istoken.start?<h2>Please Enter Input Token Address or Pairs</h2>:
              istoken.generated?<h2>Token Address not found</h2>:<h2>Pair Address not found</h2> */}
          </div>
          <>

                      {(() => {
                            if (pairs.length===0) {
                            return (
                                <h2>No Data was found at the given Input</h2>
                            )
                            } if (istoken && buttonstate && pairs.length>0) {
                            return (<>
                                  <h2>Token Search Results</h2>
                                  {pairs.map((pair, i)=><div className='main-body-content'>
                                    <Block pair={pair} ind={0}/>
                                    <Block pair={pair} ind={1}/>
                                    <Block pair={pair} ind={2}/>
                                    <Block pair={pair} ind={3}/>
                                    </div>
                                )}
                              </>
                            )
                            } 
                            if(!istoken && !buttonstate && pairs.length>0){
                            return (
                                <>
                                  <h2>Pair Search Results</h2>
                                  {pairs.map((pair, i)=><div className='main-body-content'>
                                    <Block pair={pair} ind={0}/>
                                    <Block pair={pair} ind={1}/>
                                    <Block pair={pair} ind={2}/>
                                    <Block pair={pair} ind={3}/>
                                    </div>
                                )}
                              </>
                            )
                            }
                        })()}
            {/* {pairs.map((pair, i)=><>
                <Block pair={pair} ind={0}/>
                <Block pair={pair} ind={1}/>
                <Block pair={pair} ind={2}/>
                <Block pair={pair} ind={3}/>
                </>
            )} */}
              
          </>
        </div>
      </div>
      <div className='footer'>

      </div>
    </div>
  );
}

export default App;
