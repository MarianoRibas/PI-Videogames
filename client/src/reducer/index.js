import {GET_ALL_VIDEOGAMES, ORDER, FILTER} from "../actions";


const initialState = {
    
    videoGames: [],
    genres: [],
    lastGameSearched: ""
};


function reducer (state = initialState, action) {
switch (action.type) {
    case GET_ALL_VIDEOGAMES:
        return {
            ...state,
            videoGames: action.payload
        };
    
    case ORDER:
        {
            if (state.videoGames) {
                if (action.payload === 'highRating' || action.payload === 'lowRating') {
                    const orderedGamesbyRating = action.payload === 'highRating'? 
            state.videoGames.sort ((a,b)=> {
                if (a.rating < b.rating) return 1;
                if (a.rating > b.rating) return -1;
                return 0;
            } )
            : state.videoGames.sort ((a,b)=> {
                if (a.rating > b.rating) return 1;
                if (a.rating < b.rating) return -1;
                return 0;
            } )
    
        return {
            ...state,
            videoGames: orderedGamesbyRating
        }
                } else 
                if (action.payload === 'asc' || action.payload === 'desc') {
                    const orderedGames = action.payload === 'asc'? 
                    state.videoGames.sort ((a,b)=> {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                        return 0;
                    } )
                    : state.videoGames.sort ((a,b)=> {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    } )
        
        return {
            ...state,
            videoGames: orderedGames
        
                };   
                } else 
        return {
            ...state
        }
            }
        };   

    case FILTER:
    console.log()    
    return {
            ...state,
            videoGames: action.payload
        };
    
    default:
        return state;
}
};

export default reducer

