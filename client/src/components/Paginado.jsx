import React from "react";
import styles from "../Styles/Paginado.module.css"

export default function Paginado ({paginado, videoGamesPerPage, allGames, currentPage}) {

const pageNumbers = [];
console.log(currentPage)

const styleCurrentPage = {
    transform:'scale(1.2)',
    color:'white'
}

const stylePages = {}

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
                        <button onClick = {() => paginado(num)} key={num} className={styles.pagNum}
                        style={(currentPage===num)? styleCurrentPage: {}}
                        >{num}</button>
                    </li>
                    )
                })   
                }
            </ul>
        </div>    
    </nav>
)


}