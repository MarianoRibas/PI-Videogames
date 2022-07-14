import React from 'react'
import { useState, useEffect } from "react";
import { createGame, getGenres } from "../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from '../Styles/CreateGame.module.css';
import home from './home3.png';



export default function CreateGame () {
const dispatch = useDispatch();
const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    releaseDate: "",
    rating: 0,
    genres: [],
    platforms: [],
});
const navigate = useNavigate();
const allPlatforms = useSelector((state) => state.allPlatforms)
const [isChecked, setIsChecked] = useState(allPlatforms.fill(false))

const platforms = [
        "PC",
        "Playstation 5",
        "Playstation 4",
        "Xbox One",
        "Xbox Series S/X",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo DSi",
        "macOS",
        "Linux",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PS Vita",
        "PSP",
        "Wii U",
        "Wii",
        "GameCube",
        "Nintendo 64",
        "GameBoy Advance",
        "Game Boy Color",
        "Game Boy",
        "SNES",
        "NES",
        "Classic Macintosh",
        "Apple II",
        "Commodore / Amiga",
        "Atari 7800",
        "Atari 5200",
        "Atari 2600",
        "Atari Flashback",
        "Atari 8-bit",
        "Atari ST",
        "Atari Lynx",
        "Atari XEGS",
        "Genesis",
        "SEGA Saturn",
        "SEGA CD",
        "SEGA 32X",
        "SEGA Master System",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
]

useEffect(() => {dispatch(getGenres())}, []);
const allGenres = useSelector((state) => state.genres);

function handleChange (e) {
    setInput ({
        ...input,
        [e.target.name]: e.target.value
    });
    console.log(input.name)
};

function handleSelect (e) {
    setInput((input) => {
        if (!input.genres.includes(e.target.value)) {
            return {
                ...input,
                genres: [...input.genres, e.target.value]
            };
        }
        else {
            return {
                ...input
            };
        };
    });
};

function handleDelete (e, d) {
    e.preventDefault();
    setInput({
        ...input,
        genres: input.genres.filter(g => g !== d)
    });
};

function handleSubmit(e) {
    if (input.name && input.description && input.rating <= 5 && input.genres.length >= 1 && input.platforms.length >=1) {
        e.preventDefault();
        dispatch(createGame(input));
        alert("Videogame created");
        setInput({
            name: "",
            description: "",
            image: "",
            released: "",
            rating: 0,
            genres: [],
            platforms: [],
        });
        console.log(input)
        navigate("/home");
    } else {
        e.preventDefault();
        alert("You should check name, description, genres, platforms and rating fields!");
    };
};



function handleCheckbox(e) {
    const index = e.target.id
    setIsChecked(!isChecked[index]);
    
    if(e.target.checked === true){
        if(!input.platforms.includes(e.target.value)){
            
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
    }
    if(e.target.checked === false){
        let platforms = input.platforms.filter(d => d !== e.target.value);
        setInput({
            ...input,
            platforms
        })
    }
}

return (
        <div style={{ color:'white'}}>
                                  
            
            <div className={styles.backgroundCreate}>
                
            <div className={styles.NavConteiner}>
                    <Link to ='/home'> 
                        <buton className={styles.NavButton}><img src={home} alt=""/></buton>
                    </Link>    
                        <h6>Home</h6>
            </div> 
                <div className={styles.divMain}>
                    <div className={styles.headerCreate}>
                        <header >
                            Add a Game
                        </header>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={styles.mainContainerCreate}>
                            <div className={styles.divForm1}>
                                <div className={styles.divForm1PerItem}>
                                    {/* <label>Name</label> */}
                                    <input placeholder='Name' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                                </div> 
                                <div className={styles.divForm1PerItem}>
                                    {/* <label>Description</label> */}
                                <input placeholder='Description' type='text' value={input.description} name='description' onChange={(e) => handleChange(e)} />
                                </div>
                                <div className={styles.divForm1PerItem}>
                                    {/* <label>Image (Link)</label> */}
                                    <input placeholder='Image (URL)'  type='text' value={input.image} name='image' onChange={(e) => handleChange(e)} />
                                </div> 
                                <div className={styles.divForm1PerItem}>
                                    {/* <label>Release Date</label> */}
                                    <input placeholder='Release Date (DD/MM/YYYY)'  type='text' value={input.releaseDate} name='releaseDate' onChange={(e) => handleChange(e)} />
                                </div>
                                <div className={styles.divForm1PerItem}>
                                    {/* <label>Rating (0-5)</label> */}
                                    <input placeholder='Rating' style={{width:'8%'}}type='number' value={input.rating} name='rating' onChange={(e) => handleChange(e)} />
                                </div>
                            </div>
                            <div className={styles.divForm2}>
                                   
                                <div  >
                                    <label>Platforms</label>
                                        <div className={styles.divPlatforms} style={{width:'180px'}}>
                                            {
                                                platforms.map((platform,i) =>{
                                                    return (
                                                        <div className={styles.checkBox} style={{fontWeight:'400', color:'hsl(0,0%, 70%,1)'}} key={i}>
                                                            <input type='checkbox'
                                                            id={`${i}`}
                                                            checked= {isChecked[i]}
                                                            name={platform}
                                                            value={platform}
                                                            onChange={(e) => handleCheckbox(e)}
                                                            />
                                                            <label>{platform}</label>
                                                        </div>    
                                                    )
                                                })
                                            }  
                                        </div>    
                                </div> 
                            </div> 
                            <div className={styles.divForm3}>
                                <label>Genres</label>   
                                    {allGenres?
                                        <div className={styles.selectGenres}>
                                            
                                                <select onChange={e => handleSelect(e)}>
                                                    {allGenres.map((genres) => {
                                                    return <option value={genres.name}>{genres.name}</option>
                                                    })}
                                                </select>
                                                <span className={styles.customArrow}></span>
                                                
                                                
                                        </div>
                                        
                                        : <p>Loading Genres...</p>
                                        }
                                   
                                        <div style={{
                                            
                                            borderBottom: '1px solid #1c7',
                                            width: 'max-content'
                                        }}
                                        >
                                            <h3 style={{
                                            fontSize:'18px',
                                            color:'hsl(0 0% 100% /.80)',
                                            fontWeight:'200',
                                            marginBottom:'2px',
                                            textAlign:'left'
                                            // paddingBottom:'3px'
                                        }}>Genres Selected</h3>
                                        
                                        </div>
                                
                                    {
                                        input.genres.length >= 1?
                                        <div className={styles.genresSelectedConteiner}>
                                                    {
                                                    input.genres.map(d => 
                                                        <div className={styles.genresSelected}>
                                                            <p>{d}</p>
                                                            <button onClick={(e) => handleDelete(e, d)}>X</button>
                                                        </div>
                                                        )}           
                                        </div>
                                        :
                                        <div> 
                                        <h4 style={{
                                            color:'rgb(153, 50, 50)',
                                            // color:'hsl(0 0% 50% / 1)',
                                            background:'hsl(0 0% 100% / .16)',
                                            borderRadius:'4px',
                                            width:'max-content',
                                            paddingLeft:'2px',
                                            paddingRight:'6px',
                                            fontWeight:'400',
                                            fontSize:'17px',
                                            textAlign:'left',
                                            fontStyle:'italic'
                                        }}>You must select almost one genre</h4>
                                        </div>            
                                    }
                                </div> 
                        </div>
                            <div className={styles.addButton}>
                                <button type='submit'>Add</button>
                            </div>
                    </form>
                </div>
            </div>
                
        </div>







    // <div style={{background:'white'}}>
    //     <Link to='/home'><button>Back</button></Link>
    //         <h1>Add your videogame</h1>
    //         <div>
    //             <h5><b>Those with * are obligatory</b></h5>
    //         </div>
    //     <form onSubmit={(e) =>{handleSubmit(e)}}>
    //         <button type="submit">Create videogame</button>
    //         <div>
    //             <div>
    //                 <label>Name * </label>
    //                 <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
    //             </div> 
    //             <div>
    //                 <label>Description * </label>
    //                 <input type='text' value={input.description} name='description' onChange={(e) => handleChange(e)} />
    //             </div>
    //             <div>
    //                 <label>Image (link) </label>
    //                 <input type='text' value={input.image} name='image' onChange={(e) => handleChange(e)} />
    //             </div> 
    //             <div>
    //                 <label>Release date </label>
    //                 <input type='text' value={input.releaseDate} name='releaseDate' onChange={(e) => handleChange(e)} />
    //             </div>
    //             <div>
    //                 <label>Rating </label>
    //                 <input type='number' value={input.rating} name='rating' onChange={(e) => handleChange(e)} />
    //             </div>
    //         </div>
    //         <div>
    //         {allGenres?
    //             <div>
    //                 <label>Genres</label>
    //                     <select onChange={e => handleSelect(e)}>
    //                         {allGenres.map((genres) => {
    //                         return <option value={genres.name}>{genres.name}</option>
    //                         })}
    //                     </select>
    //                     <div >
    //                     {
    //                         input.genres.map(d =>
    //                             <div>
    //                                 <p>{d}</p>
    //                                 <button onClick={(e) => handleDelete(e, d)}>X</button>
    //                             </div>)
    //                     }
    //                 </div>
    //             </div>
    //             : <p>Loading Genres...</p>
    //             }
    //         </div>    
    //         <div>
    //             <label>Platforms</label>
    //             <div>
    //                 {
    //                     platforms.map((platform,i) =>{
    //                         return (
    //                             <div key={i}>
    //                                 <input type='checkbox'
    //                                 id={`${i}`}
    //                                 checked= {isChecked[i]}
    //                                 name={platform}
    //                                 value={platform}
    //                                 onChange={(e) => handleCheckbox(e)}
    //                                 />
    //                                 <span>{platform}</span>
    //                             </div>    
    //                         )
    //                     })
    //                 }  
    //             </div>    
    //         </div>  
    //     </form>
    // </div>
)


};