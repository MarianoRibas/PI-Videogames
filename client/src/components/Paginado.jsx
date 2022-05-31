import React from "react";
import styles from "../Styles/Paginado.module.css"

export default function Paginado ({paginado, videoGamesPerPage, allGames}) {

const pageNumbers = [];

for (let i = 1; i<=Math.ceil(allGames/videoGamesPerPage); i++ ){
    pageNumbers.push(i);
}

return (
    <nav className={styles.paginado}>
        <div className={styles.pages}>    
            <ul >
                {
                pageNumbers && pageNumbers.map (num => {
                    return (
                    <li key={num}>
                        <button onClick = {() => paginado(num)} key={num} className={styles.pagNum}>{num}</button>
                    </li>
                    )
                })   
                }
            </ul>
        </div>    
    </nav>
)


}