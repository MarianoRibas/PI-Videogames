import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useState,useEffect } from 'react';
import {getAllVideoGames, orderByName} from '../actions';
import {Link} from 'react-router-dom';
import Game from "./Game"
import Paginado from './Paginado';


export default function Home () {

    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videoGames);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(allGames.length/15);
    const indexLastGame = currentPage * 15;
    const indexFirstGame = indexLastGame - 15;
    const currentGames = allGames.slice(indexFirstGame, indexLastGame); //juegos en cada pagina



const paginado = (pageNum) => {
    setCurrentPage(pageNum);
};


    // useEffect (() => {
    //     dispatch(getAllVideoGames());
    // },[dispatch])

    
    function handleReload (e) {
        dispatch(getAllVideoGames());
    }
    
    
    return (
            <div>
        <h1>HOME</h1>
        <Link to='/videogame'>Create Game</Link>
        <button onClick={e => {handleReload(e)}}>Re-load All Games</button>
             
        <div>    
            <select onChange={e => {dispatch(orderByName(e.target.value))}}>
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
            <Paginado paginado={paginado} videoGamesPerPage ={15} allGames = {allGames.length} />
            {console.log(currentPage)}
        </div>
        <div>
        {
            (currentGames.length > 0) ? 
            <div>
            {
                currentGames.map((e, index) => (
                <div key={index}>
                <Link to={"/videogame/" + e.id}>
                <Game
                name={e.name}
                image={e.image}
                genres={e.genres.map((s, index) => (<li key={index}>{s}</li>))} />
                </Link>
                </div>

                ))
            }
            </div>  : <h2>Loading ...</h2>
        }
        
        </div>
             
             </div>

             
    )



}