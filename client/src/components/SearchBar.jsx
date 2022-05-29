import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getGamesByName, searchedGame} from "../actions";

export default function SearchBar () {
    const dispatch = useDispatch();
    const [search, setSearch] = useState();

    function handleInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)  
    }
    function handleSubtmit(e){
        e.preventDefault()
        dispatch(searchedGame(search))
        dispatch(getGamesByName(search))
        setSearch("");
    }
    
    return(
        <div >
            <input type= "text" value={search} placeholder="Search..." onChange={(e) => handleInputChange(e)}/>
            <button type="submit" onClick={(e) => handleSubtmit(e)}>Search</button>
        </div>
    )
}