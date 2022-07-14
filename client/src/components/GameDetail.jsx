import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import styles from "../Styles/Details.module.css"
import home from './home3.png'
import StarRating from "./StarRating";
export default function GameDetail () {

const dispatch = useDispatch();
const detail = useSelector((state) => state.detail);
const gameId = useParams();
gameId.toString();
useEffect(() => {dispatch(getDetail(gameId.id))}, [dispatch]);
const p = "<"

const ratingRound = Math.round(detail.rating);

return (
    <div>
    <header className={styles.header}>
                <Link to='/home'>
                <div className={styles.homeD}>
                    <img  src={home}/>
                </div>
                    </Link>
            </header>
     { Object.keys(detail).length > 0?  
    <div className={styles.background} style={{color:'white'}}>
        
        <div className={styles.mainConteiner}>
            
            <div>
                <div>
                <img src={detail.image} alt="" className={styles.gameImage}/>
                </div>
                
                <div className={styles.gameInfo}>
                    <div  style={{marginTop:'110px'}}>
                    {/* <p>Rating:{Math.round(detail.rating)}</p> */}
                    <StarRating rating={ratingRound} />
                    {/* <p>Platforms{detail.platforms}</p> */}
                    <div style={{display:'flex',marginTop:'.4rem'}}>
                    { detail.createdInDb ?
                        detail.genres.map((s, index) => (<li key={index} style={{listStyleType:'none', marginLeft:'4px'}}>{s.name}</li>)) 
                        : detail.genres.map((s, index) => (<li key={index} style={{listStyleType:'none', marginLeft:'4px'}}>{" " +s.trim() + ""}</li>))
                    }
                    </div>
                    <p style={{marginLeft:'5px'}}>Released:{detail.releaseDate}</p>
                    </div>
                </div>
            </div>
            <div className={styles.gameDescription}>
                <h1 className={styles.title}>{detail.name}</h1>
                {detail.description}
            </div>
        </div>
            
            
            
            {/* <div><p>{p}</p></div> */}
            
        
        {/* <div >
        <div >
            {
            (detail.length === 0) ?
                <div >
                <h1>Loading ...</h1>
                </div>
                :
                <div>
                    <h1 className={styles.h1}>{detail.name}</h1>
                    <img src={detail.image} alt="" className={styles.img} />
                    <div className={styles.segundoB}>
                        <div className={styles.p}>
                            <h3 className={styles.h3}>Description</h3>
                             <p >{detail.description}</p>
                        </div>
                        <div className={styles.div}>
                            <div>
                                <div>
                                    <h3>Released</h3>
                                    <p >{detail.releaseDate}</p>
                                    <div className={styles.div1}>
                                        <h3>Genres</h3>
                                        {
                                        detail.createdInDb ?
                                        detail.genres.map(e => (<li>{e.name}</li>)) :
                                        detail.genres.map(e => (<li>{e}</li>))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3>Rating</h3>
                                    <p>{detail.rating}</p>
                                </div>
                                <div className={styles.div1} >
                                    <h3>Platforms</h3>
                                    {detail.createdInDb?
                                    detail.platforms.map(e => (<li>{e}</li>))
                                    :detail.platform.map(e => (<li>{e}</li>))
                                    };         
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            };
        </div>
        <div className={styles.div2}>
            <Link to="/home">
                <button className={styles.button}>Go back!</button>
            </Link>
        </div>
        </div> */}
    </div>
    : <div className={styles.sppiner}></div>
    }
    
    </div>
)
};

