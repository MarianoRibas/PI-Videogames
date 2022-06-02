import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import styles from "../Styles/Details.module.css"

export default function GameDetail () {

const dispatch = useDispatch();
const detail = useSelector((state) => state.detail);
const gameId = useParams();
gameId.toString();
useEffect(() => {dispatch(getDetail(gameId.id))}, [dispatch]);
const p = "<"
return (
    <div className={styles.background} style={{color:'white',}}>
        <div className={styles.mainConteiner}>
            
            <div>
                <img src={detail.image} alt="" className={styles.gameImage}/>
                {/* <p>ACA VA LA IMG</p> */}
                <div>
                    <p>Rating:{detail.rating}</p>
                    <p>{detail.platforms}</p>
                    <p>{detail.genres}</p>
                    <p>{detail.releaseDate}</p>
                </div>
            </div>
            <div>
                <h1 className={styles.title}>{detail.name}</h1>
                <p>{detail.description}</p>
            </div>
            <div>
                <p>{p}</p>
            </div>
        </div>
        
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
)
};

