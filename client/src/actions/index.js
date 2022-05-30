import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const ORDER = 'ORDER';
export const FILTER ='FILTER';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const SEARCHED_GAME = 'SEARCHED_GAME';
export const DELETE_SEARCHED = 'DELETE_SEARCHED';
export const DELETE= 'DELETE';
export const GET_DETAIL = "GET_DETAIL";
export const DELETE_DETAIL = 'DELETE_DETAIL';
export const GET_GENRES = 'GET_GENRES';
export const POST_GAME = 'POST_GAME';


// ACTIONS:

export function getAllVideoGames () {
    return async (dispatch) => {
        try {
        const allGames = await axios ('http://localhost:3001/videogames')
        
        return dispatch(
            {
            type: GET_ALL_VIDEOGAMES,
            payload: allGames.data
                }
            );
    
        } catch (error) {
            console.log(error)
             };
    
    };
};

export function searchedGame (payload) {
    return {
        type: SEARCHED_GAME,
        payload
    };
};

export function deleteSearchedGame () {
    return {
        type: DELETE_SEARCHED,
        payload: ""
    };
};

export function deleteAll() {
    return {
        type: DELETE,
        payload: []
    };
};

export function getGamesByName (payload) {
    return async function(dispatch){
        try{
            const gamesByName = await axios.get(`http://localhost:3001/videogames?name=${payload}`)
            return dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: gamesByName.data
            });
        } catch(e){
            console.log(e)
        };
    };
};

export function orderBy(payload){
    return{
        type: ORDER,
        payload
    };
};

export function filterBy (payload) {
    return async (dispatch) => {
        try {
        if (payload.name) {
        const allGames = await axios (`http://localhost:3001/videogames?name=${payload.name}&source=${payload.source.name}&genre=${payload.genre.name}`)
        console.log(payload)
        return dispatch(
            {
            type: FILTER,
            payload: allGames.data
                }
            );
        } else 
        if (!payload.name && payload.source.name && payload.genre.name) {
            
            const allGames = await axios (`http://localhost:3001/videogames?source=${payload.source.name}&genre=${payload.genre.name}`)
            return dispatch(
                {
                type: FILTER,
                payload: allGames.data
                    }
                );   
        } else 
        if (!payload.name && !payload.source.name && payload.genre.name) {
            const allGames = await axios (`http://localhost:3001/videogames?genre=${payload.genre.name}`)
            
            return dispatch(
                {
                type: FILTER,
                payload: allGames.data
                    }
                );    
        } else 
        if (!payload.name && payload.source.name && !payload.genre.name) {
            const allGames = await axios (`http://localhost:3001/videogames?source=${payload.source.name}`);
            return dispatch(
                {
                type: FILTER,
                payload: allGames.data
                    }
                );    
        };
        if (!payload.name && payload.source.activated === false && payload.genre.activated === false) {
            const allGames = await axios (`http://localhost:3001/videogames`);
            return dispatch(
                {
                type: FILTER,
                payload: allGames.data
                    }
                );    
        };
        } catch (error) {
            console.log(error)
            };
    
    };
};

export function getDetail (id) {
    return async function(dispatch){
        try{
            const game = await axios.get(`http://localhost:3001/videogame/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: game.data
            })
        } catch(e){
            console.log(e)
        }
    }
};

export function deleteDetail () {
    return {
        type: DELETE_DETAIL,
        payload: []
    };
};

export function getGenres() {
    return async (dispatch) => {
        try {
        const genres = await axios ('http://localhost:3001/genres')
        
        return dispatch(
            {
            type: GET_GENRES,
            payload: genres.data
                }
            );
    
        } catch (error) {
            console.log(error)
             };
    
    };
};

export function createGame (game) {
    return async (dispatch) => {
        try {
        const newGame = await axios.post('http://localhost:3001/videogame', game)
        
        return dispatch(
            {
            type: POST_GAME,
            newGame
                }
            );
    
        } catch (error) {
            console.log(error)
             };
    
    };
}










