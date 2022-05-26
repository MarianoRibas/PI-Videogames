import React  from "react";
import { NavLink } from "react-router-dom";

export default function Game ({name, genres, image}) {
    
    return (<div>
            <NavLink to = {`/videogame/${name}`}>
            <img src ={image} alt = {name} />
            <p>{name}</p>
            <p>{genres}</p>
            </NavLink>

        
    </div>)
};