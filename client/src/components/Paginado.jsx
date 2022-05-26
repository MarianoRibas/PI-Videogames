import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useState,useEffect } from 'react';
import styles from "../Styles/Paginado.module.css"



export default function Paginado ({paginado}) {
const allGames = useSelector((state) => state.videoGames);
const pageNumbers = [];

for (let i = 0; i<allGames.length; i++ ){
    pageNumbers.push(i + 1);
}

return (
    <nav className={styles.paginado}>
        <ul className="paginado">
            {
             pageNumbers && pageNumbers.map (num => (
                 <li className="number" key={num}>
                     <button onClick = {() => paginado(num -1)} key={num} className='button'>{num}</button>
                 </li>
             ))   
            }
        </ul>
    </nav>
)


}