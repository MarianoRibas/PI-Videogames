import axios from 'axios';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const DELETE_ALL = 'DELETE_ALL'


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
             }
    
    };
};

export function deleteAllGames () {
    return {
        type: DELETE_ALL,
        payload: []
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
};

export function orderByRating(payload){
    return{
        type: ORDER_BY_RATING,
        payload
    }
};

export function filterByGenre (genre) {
    return async (dispatch) => {
        try {
        const filteredGames = await axios (`http://localhost:3001/videogames?genre=${genre}`)
        
        return dispatch(
            {
            type: GET_ALL_VIDEOGAMES,
            payload: filteredGames.data
                }
            );
    
        } catch (error) {
            console.log(error)
             }
    
    };
};