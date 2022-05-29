import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import {getAllVideoGames, filterByGenre, filterBySource, orderBy, filterBy} from '../actions';
import {Link} from 'react-router-dom';
import Game from "./Game"
import Paginado from './Paginado';



export default function Home () {

    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videoGames);
    const lastGameSearched = useSelector((state) => state.lastGameSearched);
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState("");
    const [randomState, setRandomState] = useState(0);
    const [filteredByGenre, setFilteredByGenre] = useState ("");
    const [filteredBySource, setFilteredBySource] = useState ("");
    const [filter, setFilter] = useState({});
    const indexLastGame = currentPage * 15;
    const indexFirstGame = indexLastGame - 15;
    const currentGames = allGames.slice(indexFirstGame, indexLastGame) ; //juegos en cada pagina
    let c =  1


const paginado = (pageNum) => {
    setCurrentPage(pageNum);
};


// PARA ORDENAR POST FILTRADO, SI ES Q HAY UN ORDENAMIENTO PUESTO

useEffect (() => {
    dispatch(orderBy(order));
    setCurrentPage(1);
    setRandomState(Math.random())
    
},[allGames]);


// HANDLES PARA FILTROS,ORDENAMIENTOS Y RELOAD  
function handleReload (e) {
        dispatch(getAllVideoGames());
        setCurrentPage(1);
        setRandomState(Math.random())
        setOrder("");
        // s
       
};

// function handleFilterByGenre (e) {
//     e.preventDefault();
//     dispatch(filterByGenre(e.target.value));
//     setFilterBySource(e.target.value);
// };

// function handleFilterBySource (e) {
//     e.preventDefault();
//     dispatch(filterBySource(e.target.value));
    
//     setFilterBySource(e.target.value);

// }


// para juntar filtrado (BACK)
//cuando se cambia el filtro por género:
useEffect (() => {
    
    let newFilt = {name: lastGameSearched, genre: filteredByGenre, source: filteredBySource};
    console.log(newFilt)
    dispatch(filterBy(newFilt))
},[filteredByGenre]);

// cuando se cambia el filtro por fuente(api o DB):
useEffect (() => {
    let newFilt2 = {name: lastGameSearched, genre: filteredByGenre, source: filteredBySource};
    dispatch(filterBy(newFilt2));
},[filteredBySource]);


// para ordenar (FRONT)

function handleOrder (e) {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value)
    let g = e.target.value;
};

    return (
            <div>
        <h1>HOME</h1>
        <Link to='/videogame'>Create Game</Link>
        <button onClick={e => {handleReload(e)}}>Re-load All Games</button>
            
        <div >    
            <select onChange={e => {handleOrder(e)}}>
                <option value="">Order by Name</option>
                <option value='desc'>Descending</option>
                <option value='asc'>Ascending</option>
            </select>
            <select onChange={e => {handleOrder(e)}} >
                <option value=''>Order by Rating</option>
                <option value='lowRating'>Lower Rating</option>
                <option value='highRating'>Higher Rating</option>
            </select>
            <select onChange={(e) => setFilteredByGenre(e.target.value)}>
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
            <select onChange={(e) => setFilteredBySource(e.target.value)}>
                <option value="">Filter by Origin</option>
                <option value="created">Created</option>
                <option value="existant">Existant</option>
            </select>
        </div>

        <div>
            <Paginado paginado={paginado} videoGamesPerPage ={15} allGames = {allGames.length} />
        </div>
        
        <div>
        {
            (currentGames.length > 0) ? 
             <div>
               {currentGames.map((e, index) => (
                <div key={index}>
                <Link to={"/videogame/" + e.id}>
                <Game
                name={e.name}
                image={e.image}
                genres={e.genres.map((s, index) => (<li key={index}>{s}</li>))} />
                </Link>
                </div>
                ))}
             </div>  
            : <h2>Loading ...</h2>
        } 
        </div>
        
             </div>

             
    )



}