import React  from "react";
import { NavLink } from "react-router-dom";
import styles from '../Styles/Game.module.css';


export default function Game ({name, genres, image,id}) {
    
    return (
        <div style={{
            backgroundImage: `url(${image})`,
            maxHeight:'300px',
            maxWidth: '290px',
            height: '300px',
            width: '290px',
            backgroundSize: '110% 100%',
            position: 'relative',
            borderRadius: '8px 8px 0 0'
        }} >
            <NavLink to = {`/videogame/${id}`}>
                {/* <img src ={image} alt = {name} className={styles.image} /> */}
                
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

// style={{backgroundImage:`${image}`}}