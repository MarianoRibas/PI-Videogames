import {GET_ALL_VIDEOGAMES, ORDER, FILTER,GET_VIDEOGAMES_BY_NAME, SEARCHED_GAME, DELETE_SEARCHED, DELETE, GET_DETAIL, DELETE_DETAIL, POST_GAME, GET_GENRES} from "../actions";


const initialState = {
    
    videoGames: [],
    genres: [],
    detail: [],
    lastGameSearched: "",
    allPlatforms:[]
};


function reducer (state = initialState, action) {
switch (action.type) {
    case GET_ALL_VIDEOGAMES:
        return {
            ...state,
            videoGames: action.payload
        };
    
    case SEARCHED_GAME: 
        return {
            ...state,
            lastGameSearched: action.payload
        };
    
    case DELETE_SEARCHED:
        return {
            ...state,
            lastGameSearched: action.payload
        };

    case DELETE:
        return {
            ...state,
            videoGames: action.payload
        };
    
    case GET_VIDEOGAMES_BY_NAME: 
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
    
    case GET_DETAIL:
        return {
            ...state,
            detail:action.payload
        };
    
    case DELETE_DETAIL:
        return {
            ...state,
            detail: action.payload
        };
        
    case GET_GENRES: 
    return {
        ...state,
        genres: action.payload
    };

    case POST_GAME:
        return {
            ...state
        };
    
    default:
        return state;
}
};

export default reducer

