import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useState,useEffect } from 'react';
import styles from "../Styles/Paginado.module.css"



export default function Paginado ({paginado, videoGamesPerPage, allGames}) {

const pageNumbers = [];

for (let i = 1; i<=Math.ceil(allGames/videoGamesPerPage); i++ ){
    pageNumbers.push(i);
}

return (
    <nav className={styles.paginado}>
        <ul className="paginado">
            {
             pageNumbers && pageNumbers.map (num => {
                 return (
                 <li className="number" key={num}>
                     <button onClick = {() => paginado(num)} key={num} className='button'>{num}</button>
                 </li>
                 )
             })   
            }
        </ul>
    </nav>
)


}