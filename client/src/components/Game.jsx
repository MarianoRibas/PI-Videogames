import React  from "react";
import { NavLink } from "react-router-dom";
import styles from '../Styles/Game.module.css';


export default function Game ({name, genres, image,id}) {
   
    return (
        <div className={styles.container}>
            <NavLink to = {`/videogame/${id}`}>
                <img src ={image} alt = {name} className={styles.image} />
                
                <div className={styles.containerInfo}>
                    <h3>{name}</h3>
                    <ul>
                        {genres}
                    </ul>
                </div>
            </NavLink>
        </div>
)
};