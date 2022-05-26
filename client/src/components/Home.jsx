import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useState,useEffect } from 'react';
import {getAllVideoGames} from '../actions';
import {Link} from 'react-router-dom';
import Game from "./Game"
import Paginado from './Paginado';


export default function Home () {

    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videoGames);
    const [currentPage, setCurrentPage] = useState(1);

const paginado = (pageNum) => {
    setCurrentPage(pageNum);
};


    useEffect (() => {
        dispatch(getAllVideoGames());
    },[dispatch])

    
    function handleReload (e) {
        dispatch(getAllVideoGames());
    }
    
    
    return (
            <div>
        <h1>HOME</h1>
        <Link to='/videogame'>Create Game</Link>
        <button onClick={e => {handleReload(e)}}>Re-load All Games</button>
             
        <div>    
            <select>
                <option value="">Order by Name</option>
                <option value='desc'>Descending</option>
                <option value='asc'>Ascending</option>
            </select>
            <select>
                <option value=''>Order by Rating</option>
                <option value='lowRating'>Lower Rating</option>
                <option value='highRating'>Higher Rating</option>
            </select>
            {
            <select>
                <option value="">Filter by Genre</option>
                <option value="Strategy">Strategy</option>
                <option value="Adventure">Adventure</option>
                <option value="Indie">Indie</option>
                <option value="RPG">RPG</option>
                <option value="Action">Action</option>
                <option value="Shooter">Shooter</option>
                <option value="Casual">Casual</option>
                <option value="Simulation">Simulation</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Arcade">Arcade</option>
                <option value="Platformer">Platformer</option>
                <option value="Racing">Racing</option>
                <option value="Massively Multiplayer">Massively Multiplayer</option>
                <option value="Sports">Sports</option>
                <option value="Fighting">Fighting</option>
                <option value="Family">Family</option>
                <option value="Board Games">Board Games</option>
                <option value="Educational">Educational</option>
                <option value="Card">Card</option>
            </select>
                    }
            <select>
                <option value="">Filter by Origin</option>
                <option value="created">Created</option>
                <option value="existant">Existant</option>
            </select>
        </div>

        <div>
            <Paginado paginado={paginado}/>
            {console.log(currentPage)}
        </div>
        <div>
        {allGames && allGames[currentPage].map ((e) => { 
                return ( 
                <div>
                {/* <Game name ={e.name} genres ={e.genres} image = {e.image} key = {e.id} /> */}
                <Game name ={e.name} key = {e.id} />
                </div>
                );
        })}
        </div>
             
             </div>

             
    )



}