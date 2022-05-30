import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect,useRef } from 'react';
import {getAllVideoGames, orderBy, filterBy, deleteSearchedGame, deleteAll, deleteDetail, getGenres} from '../actions';
import {Link} from 'react-router-dom';
import Game from "./Game"
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import styles from '../Styles/Home.module.css'




export default function Home () {

    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videoGames);
    const lastGameSearched = useSelector((state) => state.lastGameSearched);
    const allGenres = useSelector((state) => state.genres);
    let genresCount =  0; 
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState("");
    const [randomState, setRandomState] = useState(0);
    const [filteredByGenre, setFilteredByGenre] = useState ({name: "", activated: false});
    const [filteredBySource, setFilteredBySource] = useState ({name: "", activated: false});
    const indexLastGame = currentPage * 15;
    const indexFirstGame = indexLastGame - 15;
    const currentGames = allGames? allGames.slice(indexFirstGame, indexLastGame) : 0 ; //juegos en cada pagina


const paginado = (pageNum) => {
    setCurrentPage(pageNum);
};

// useEffect(()=>{dispatch(getGenres())}, []);
// genresCount = allGenres.map(genre => {})

// HANDLES PARA FILTROS,ORDENAMIENTOS Y RELOAD  

//Borra el detail para que cuando se cargue el proximo detalle no se muestre el detalle que quedo en el store.detail

useEffect (() => {dispatch(deleteDetail())}, [])

//Recarga todos los juegos:
function handleReload (e) {
        firstUpdate1.current = true;
        firstUpdate2.current = true;
        // firstUpdate3.current = true;
        dispatch(deleteAll());
        setFilteredByGenre({...filteredByGenre, name:"",activated: false});
        setFilteredBySource({...filteredBySource, name:"",activated: false});
        dispatch(getAllVideoGames());
        setCurrentPage(1);
        dispatch(deleteSearchedGame());
        setRandomState(Math.random());
        setOrder("");    
};

// FILTROS: (BACK)

// Es unas sola action que con dos useEffect que se dispara enviando un objeto como payload. Cada Hook esta pendiente si se cambia el valor de cada filtro. Se envia en una sola action para poder juntar ambos filtros

//cuando se cambia el filtro por género:
let firstUpdate1 = useRef(true);
// let firstUpdate2 = useRef(true);


useEffect (() => { 
    if (firstUpdate1.current) {
        firstUpdate1.current = false;
        return;
      }
    let newFilt = {name: lastGameSearched, genre: filteredByGenre, source: filteredBySource};
    // console.log(newFilt)
    dispatch(deleteAll());
    dispatch(filterBy(newFilt));
},[filteredByGenre,filteredBySource, lastGameSearched]);


// cuando se cambia el filtro por fuente(api o DB): NO ES NECESARIO VARIOS USE EFFECT
                                                //  CON UNO Q ESCUCHE LOS TRES ESTADOS ESTA OK
// useEffect (() => {
//     if (firstUpdate2.current) {
//         firstUpdate2.current = false;
//         return;
//       }
//     let newFilt2 = {name: lastGameSearched, genre: filteredByGenre, source: filteredBySource};
//     dispatch(deleteAll());
//     dispatch(filterBy(newFilt2));
// },[filteredBySource, lastGameSearched]);


// ORDENAR: (FRONT)

function handleOrder (e) {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value)
    // let g = e.target.value;
};

// PARA ORDENAR POST FILTRADO, SI ES Q HAY UN ORDENAMIENTO PUESTO
let firstUpdate2 = useRef(true);

useEffect (() => {
    if (firstUpdate2.current) {
        firstUpdate2.current = false;
        return;
      }
    dispatch(orderBy(order));
    setCurrentPage(1);
    setRandomState(Math.random())
    
},[allGames]);

//   

return (
        <div className={styles.body}>
            <div >
                <h1 className={styles.h1}>HOME</h1>
        
                <div className={styles.link}>
                    <Link to='/videogame'>Create Game</Link>
                    <button classname= {styles.button2} onClick={e => {handleReload(e)}}>Re-load All Games</button>
                </div>
        
                <div>
                    <SearchBar />
                </div>   
        
                <div >    
                    <select classname= {styles.select} onChange={e => {handleOrder(e)}}>
                    <option value="">Order by</option>
                    <option value='desc'>Name (A-Z)</option>
                    <option value='asc'>Name (Z-A)</option>
                    <option value='lowRating'>Lower Rating</option>
                    <option value='highRating'>Higher Rating</option>
                    </select>
                </div>    
                <div>
                    <div className={styles.divMiddle}>
                        <div className={styles.divMiddle}>
                        {
                        filteredByGenre.name?
                        <div>
                        <p className={styles.p}><i>{filteredByGenre.name}</i><button className={styles.pButt} onClick={() => 
                        {setFilteredByGenre({...filteredByGenre, name: "", activated:false})
                        dispatch(deleteAll())}}>X</button></p> 
                        </div>
                        : <p></p>
                        }
                        </div>
                        <div className={styles.divMiddle}>
                        {
                        lastGameSearched?
                        <div className={styles.divButton}>
                        <p>{lastGameSearched}<button onClick={() => 
                        {dispatch(deleteSearchedGame());
                        dispatch(deleteAll())}}>X</button></p>                        
                        </div>
                        : <p></p>
                        
                        }
                        </div>
                        <div className={styles.divMiddle}>
                        {  
                        filteredBySource.name?
                        <div>
                        <p>{filteredBySource.name}<button className={styles.divMiddle} onClick={() => 
                        {setFilteredBySource({...filteredBySource, name: "", activated:false})
                        dispatch(deleteAll())}}>X</button></p>                        
                        </div>
                        : <p></p>
                        }
                        </div>
                    </div>
                    <div className={styles.divFilter}>   
                        <select classname= {styles.select} onChange={(e) => 
                        {setFilteredByGenre({...filteredByGenre, name:e.target.value, activated: true}) 
                        }}>
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
                        <select classname= {styles.select} onChange={(e) => 
                        {setFilteredBySource({...filteredBySource, name:e.target.value, activated: true})}}>
                            <option value="">Filter by Origin</option>
                            <option value="created">Added by User</option>
                            <option value="existant">Existant</option>
                        </select>
                    </div>    
                </div>
                <div>
                    <Paginado paginado={paginado} videoGamesPerPage ={15} allGames = {allGames.length} />
                    {
                    (currentGames.length > 0) ? 
                        <div className={styles.conteiner}>
                            {
                                currentGames.map((e, index) => (
                                    <div key={index}>
                                        <Link to ={`/videogame/${e.id}`}>
                                        <Game
                                        id={e.id}
                                        name={e.name}
                                        image={e.image}
                                        genres={e.createdInDb ?
                                        e.genres.map((s, index) => (<li key={index}>{s.name}</li>)) :
                                        e.genres.map((s, index) => (<li key={index}>{s}</li>))} />
                                        </Link> 
                                    </div>
                                ))
                            }
                        </div>  
                    : <h2>Loading ...</h2>
                    }
                </div>
        
                <div>
                    <Paginado paginado={paginado} videoGamesPerPage ={15} allGames = {allGames.length} />
                </div>
            </div>
        </div>      
    )
};