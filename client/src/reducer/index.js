import { GET_ALL_VIDEOGAMES } from "../actions";


const initialState = {
    videoGames: [],
    genres: []
};


function reducer (state = initialState, action) {
switch (action.type) {
    case GET_ALL_VIDEOGAMES:
        return {
            ...state,
            videoGames: action.payload
        };
    default:
        return state;
}
};

export default reducer

