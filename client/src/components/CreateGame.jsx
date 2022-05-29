import React from 'react'
import { useState, useEffect } from "react";
import { createGame, getGenres } from "../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
    if (input.name && input.description && input.rating <= 5) {
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
        alert("You should check name, description and rating fields!");
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
    <div>
        <Link to='/home'><button>Back</button></Link>
            <h1>Add your videogame</h1>
            <div>
                <h5><b>Those with * are obligatory</b></h5>
            </div>
        <form onSubmit={(e) =>{handleSubmit(e)}}>
            <button type="submit">Create videogame</button>
            <div>
                <div>
                    <label>Name * </label>
                    <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                </div> 
                <div>
                    <label>Description * </label>
                    <input type='text' value={input.description} name='description' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Image (link) </label>
                    <input type='text' value={input.image} name='image' onChange={(e) => handleChange(e)} />
                </div> 
                <div>
                    <label>Release date </label>
                    <input type='text' value={input.releaseDate} name='releaseDate' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Rating </label>
                    <input type='number' value={input.rating} name='rating' onChange={(e) => handleChange(e)} />
                </div>
            </div>
            <div>
            {allGenres?
                <div>
                    <label>Genres</label>
                        <select onChange={e => handleSelect(e)}>
                            {allGenres.map((genres) => {
                            return <option value={genres.name}>{genres.name}</option>
                            })}
                        </select>
                        <div >
                        {
                            input.genres.map(d =>
                                <div>
                                    <p>{d}</p>
                                    <button onClick={(e) => handleDelete(e, d)}>X</button>
                                </div>)
                        }
                    </div>
                </div>
                : <p>Loading Genres...</p>
                }
            </div>    
            <div>
                <label>Platforms</label>
                <div>
                    {
                        platforms.map((platform,i) =>{
                            return (
                                <div key={i}>
                                    <input type='checkbox'
                                    id={`${i}`}
                                    checked= {isChecked[i]}
                                    name={platform}
                                    value={platform}
                                    onChange={(e) => handleCheckbox(e)}
                                    />
                                    <span>{platform}</span>
                                </div>    
                            )
                        })
                    }  
                </div>    
            </div>  
        </form>
    </div>
)


};