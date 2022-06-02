import React from 'react';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideoGames } from '../actions';
import styles from '../Styles/Landing.module.css'



export default function LandingPage () {
    const dispatch = useDispatch();
    useEffect (() => {
        dispatch(getAllVideoGames());
    },[dispatch])

    const allGames = useSelector((state) => state.videoGames);
    
    return (
        <div className={styles.background}>
            {/* <div>
            <h1 className={styles.title}>WELCOME</h1>
            </div> */}
            <Link to ='/home'>
            <div>
            {allGames.length>0?
            <button className={styles.button}>ACCESS</button>
            
            : <div className={styles.sppiner}></div>}
            </div>
            </Link>
        </div>
    )

};
