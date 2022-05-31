import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getGamesByName, searchedGame} from "../actions";
import styles from '../Styles/SearchBar.module.css'
import image from '../images/search.png'

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
            <form className={styles.container}>
            <input type= "text" value={search} placeholder="Search a game..." onChange={(e) => handleInputChange(e)}/>
            <button type="submit" onClick={(e) => handleSubtmit(e)}>
                {/* <img src={image}/> */}
                </button>
                <p>I</p>
            </form>
        </div>
    )
}