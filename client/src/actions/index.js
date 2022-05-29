import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const ORDER = 'ORDER';
export const FILTER ='FILTER';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';



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

export function getGamesByName (payload) {
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogames?name=${payload}`)
            return dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: json.data
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
        const allGames = await axios (`http://localhost:3001/videogames?name=${payload.name}&source=${payload.source}&genre=${payload.genre}`)
        return dispatch(
            {
            type: FILTER,
            payload: allGames.data
                }
            );
        } else 
        if (!payload.name && payload.source && payload.genre) {
            const allGames = await axios (`http://localhost:3001/videogames?source=${payload.source}&genre=${payload.genre}`)
            return dispatch(
                {
                type: FILTER,
                payload: allGames.data
                    }
                );   
        } else 
        if (!payload.name && !payload.source && payload.genre) {
            const allGames = await axios (`http://localhost:3001/videogames?genre=${payload.genre}`)
            return dispatch(
                {
                type: FILTER,
                payload: allGames.data
                    }
                );    
        } else 
        if (!payload.name && payload.source && !payload.genre) {
            const allGames = await axios (`http://localhost:3001/videogames?source=${payload.source}`);
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







