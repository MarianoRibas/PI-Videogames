import React  from "react";
import { NavLink } from "react-router-dom";
import styles from '../Styles/Card.module.css';


export default function Game ({name, genres, image,id}) {
   
    return (<div className={styles.container}>
            <NavLink to = {`/videogame/${id}`}>
            <img src ={image} alt = {name} className={styles.image} />
            <h3 className={styles.data}>{name}</h3>
            <h5 className={styles.data}>{genres}</h5>
            </NavLink>

        
    </div>)
};