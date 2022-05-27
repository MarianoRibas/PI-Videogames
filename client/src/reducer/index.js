import { FILTER_BY_GENRE, GET_ALL_VIDEOGAMES,ORDER_BY_NAME, ORDER_BY_RATING, DELETE_ALL} from "../actions";


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
    case DELETE_ALL:
        return {
            
            videoGame: action.payload
        }

    case ORDER_BY_NAME:
        if(action.payload != ''){
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
        return {...state}
    case ORDER_BY_RATING:
        if(state.videoGames){
        if(action.payload != ''){
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
         return {
        ...state
                };
        } 
    case FILTER_BY_GENRE:
        return {
            ...state,
            videoGames: action.payload
        };
                        

    default:
        return state;
}
};

export default reducer

