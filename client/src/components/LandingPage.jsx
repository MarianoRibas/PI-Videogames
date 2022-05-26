import React from 'react';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideoGames } from '../actions';



export default function LandingPage () {
    const dispatch = useDispatch();
    useEffect (() => {
        dispatch(getAllVideoGames());
    },[dispatch])

    const allGames = useSelector((state) => state.videoGames);
    
    return (
        <div>
            <h1>Bienvenidos</h1>
            <Link to ='/home'>
            {allGames.length>0?
            <button>Ingresar</button>
            : <p>Loading...</p>}
            </Link>
            
        
        </div>
    )

};
