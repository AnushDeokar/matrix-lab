import "./Block.css";
import {FaDollarSign} from "react-icons/fa";
import {AiOutlineInfoCircle} from "react-icons/ai";
import ATP from "./ApiTemplate";
import {RxCube} from "react-icons/rx";
import { useEffect, useState } from "react";

function Block({pair, ind}) {

    const [val, setVal] = useState([]);

    useEffect(()=>{
        function updateval(){
            if (pair.length>0){
                val.push(pair.baseToken.name);
                val.push(pair.quoteToken.name);
                val.push("#780");
                console.log(val);
            }
        }   
        updateval();
    }, [pair]);

  return (
    <div className="block-container">
        <div className="left-section">
            <div className="block-head">
                {ATP[ind][0]}
            </div>
            {/* <div className="head-val">
                {ATP[ind].length>1 &&val.length>0?<><p className="content-key-val">{ATP[ind][1]}</p><p className="content-key-val">{val[0]}</p></>:null}
                {ATP[ind].length>2 &&val.length>0?<><p className="content-key-val">{ATP[ind][2]}</p><p className="content-key-val">{val[1]}</p></>:null}
                {ATP[ind].length>3 &&val.length>0?<><p className="content-key-val">{ATP[ind][3]}</p><p className="content-key-val">{val[2]}</p></>:null}
                {ATP[ind].length>4 &&val.length>0?<><p className="content-key-val">{ATP[ind][4]}</p><p className="content-key-val">{val[3]}</p></>:null}
            </div> */}

            <div className="head-val">
                        {(() => {
                            if (ind===0) {
                            return (
                                <>
                                    <p className="content-key-val">{ATP[ind][1]}</p><p className="content-key-val">{pair.pairCreatedAt}</p>
                                    <p className="content-key-val">{ATP[ind][2]}</p><p className="content-key-val">{pair.chainId}</p>
                                    <p className="content-key-val">{ATP[ind][3]}</p><p className="content-key-val">{pair.dexId.slice(0, 4)}</p>
                                    <p className="content-key-val">{ATP[ind][4]}</p><p className="content-key-val">{pair.pairAddress.slice(0, 4)}</p>
                                </>
                            )
                            } else if (ind===1) {

                            return (
                                <>
                                    <p className="content-key-val">{ATP[ind][1]}</p><p className="content-key-val">{pair.baseToken.name}</p>
                                    <p className="content-key-val">{ATP[ind][2]}</p><p className="content-key-val">{pair.baseToken.symbol}</p>
                                    <p className="content-key-val">{ATP[ind][3]}</p><p className="content-key-val">{pair.baseToken.address.slice(0, 4)}</p>                                
                                </>
                            )
                            } else if(ind===2){
                                return (
                                    <>
                                        <p className="content-key-val">{ATP[ind][1]}</p><p className="content-key-val">{pair.quoteToken.name}</p>
                                        <p className="content-key-val">{ATP[ind][2]}</p><p className="content-key-val">{pair.quoteToken.symbol}</p>
                                        <p className="content-key-val">{ATP[ind][3]}</p><p className="content-key-val">{pair.quoteToken.address.slice(0, 4)}</p>                                
                                    </>
                                )                                
                            }
                            else {
                                return (
                                    <>
                                        <p className="content-key-val">{ATP[ind][1]}</p><p className="content-key-val">{pair.priceNative}</p>
                                        <p className="content-key-val">{ATP[ind][2]}</p><p className="content-key-val">{pair.priceUsd}</p>
                                    </>
                                )    
                            }
                        })()}


                {/* {ATP[ind].length>1 &&val.length>0?<><p className="content-key-val">{ATP[ind][1]}</p><p className="content-key-val">{val[0]}</p></>:null}
                {ATP[ind].length>2 &&val.length>0?<><p className="content-key-val">{ATP[ind][2]}</p><p className="content-key-val">{val[1]}</p></>:null}
                {ATP[ind].length>3 &&val.length>0?<><p className="content-key-val">{ATP[ind][3]}</p><p className="content-key-val">{val[2]}</p></>:null}
                {ATP[ind].length>4 &&val.length>0?<><p className="content-key-val">{ATP[ind][4]}</p><p className="content-key-val">{val[3]}</p></>:null} */}
            </div>




        </div>
        <div className="icon-section">
            <div className="icon-section-bottom">

                    {(() => {
                            if (ind===0) {
                            return (
                                <AiOutlineInfoCircle color="white" size={18} style={{
                                    margin:"auto", marginTop:"28%"
                                  }}/>
                            )
                            } else if (ind===1 || ind===2) {
                            return (
                                <RxCube color="white" size={18} style={{
                                    margin:"auto", marginTop:"28%"
                                  }}/>
                            )
                            } else {
                            return (
                                <FaDollarSign color="white" size={18} style={{
                                    margin:"auto", marginTop:"28%"
                                  }}/>
                            )
                            }
                        })()}
            </div>
        </div>
    
    </div>
  )
}

export default Block