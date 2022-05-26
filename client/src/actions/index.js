import axios from 'axios';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'


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

export function orderByName(payload) {
    return (dispatch) => {
    return dispatch (
        {
            type: ORDER_BY_NAME,
            payload
        }
    );
}
};