const axios = require('axios');
require("dotenv").config();
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const getAllApi = async function () {
    const apiGet1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`);
    const apiGet2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`);
    const apiGet3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`);
    const allApiVideogames = apiGet1.data.results.concat(apiGet2.data.results, apiGet3.data.results);
    
    const mapedApiVg = await allApiVideogames.map(e => {
        return {
        id : e.id,
        name : e.name,
        description: e.description,
        releaseDate: e.released,
        rating: e.rating,
        platform: e.platforms.map(e => e.platform.name),
        image: e.background_image,
        genres: e.genres.map(e => e.name)
    }});
    
    return mapedApiVg;
};

const getAllDb = async function (){
    const genres = await Videogame.findAll(
        {
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    }
    );
   
    //   ghg  
    const allDbGames = genres.map (e => {
        return {
            id : e.id,
            name : e.name,
            description: e.description,
            releaseDate: e.released,
            rating: e.rating,
            platform: e.platforms,
            image: e.background_image,
            genres: e.genres.map(e => e.name)
    }})
    ;

    // const prueba = await Genre.findAll();
   
    return allDbGames;
};

// const paginatedVideoGames = async function () {
//     const apiInfo = await getAllApi();
//     const dbInfo = await getAllDb ();
//     const totalGames = apiInfo.concat(dbInfo);

//     let paginatedGames = [];
//     const pageNumber = Math.ceil(totalGames.length/15);
//     let pageCounter = 1;
    

    
//     for (let i = 0; i<=pageNumber - 1; i++) {
//         const indexLastGame = pageCounter * 15;
//         const indexFirstGame = indexLastGame - 15;
//         paginatedGames[i] = totalGames.slice(indexFirstGame, indexLastGame);
//         pageCounter++;
//     };

//     return paginatedGames;


// }

const getApiGamesByName = async function (name) {
    const apiGet = await axios.get (`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    const apiGamesByname = await apiGet.data.results.map (e => {
        return {
            id : e.id,
            name : e.name,
            description: e.description,
            releaseDate: e.released,
            rating: e.rating,
            platform: e.platforms.map(e => e.platform.name),
            image: e.background_image,
            genres: e.genres.map(e => e.name)
        }
    })
    return apiGamesByname;
};

const getDbGamesByName = async function (name) {
    const allDbGames = await getAllDb();
    const matchDbGames = allDbGames.filter (e => e.name.toLowerCase().includes(name));
    return matchDbGames;
};

const getAllVideoGames = async function (genre) {
    const apiGames = await getAllApi();
    const dbGames = await getAllDb();
    const totalGames = apiGames.concat(dbGames);
    if (!genre) {
        return totalGames;
    } else {
        const filteredGames = await totalGames.filter(e => e.genres.includes(genre));
        return filteredGames;
    }
}

const getApiGameById = async function (id) {

    const apiResult = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const apiGameById =  {
           
            name : apiResult.data.name,
            description: apiResult.data.description,
            releaseDate: apiResult.data.released,
            rating: apiResult.data.rating,
            platform: apiResult.data.platforms.map(e => e.platform.name),
            image: apiResult.data.background_image,
            genres: apiResult.data.genres.map(e => e.name)
    }

    return apiGameById
};

const getDbGameById = async function (id) {
    const dbVideogameById = await Videogame.findByPk(id, {
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    return dbVideogameById;
};

const getApiGenres = async function () {
    const getApiGenres = await axios.get (`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const apiGenres = getApiGenres.data.results.map (e => e.name);
    apiGenres.forEach(e => {
        Genre.findOrCreate({
            where: { name: e }
        });
    })
    const dbGenres = Genre.findAll();
    return dbGenres;
};

const createGame = async function (name, description, releaseDate, rating, platforms) {
    let createdGame = await Videogame.create({name, description, releaseDate, rating, platforms});
    return "OK";
}




module.exports = {getAllApi, getAllDb, getApiGamesByName, getDbGamesByName, getApiGameById, getDbGameById, getApiGenres, createGame, getAllVideoGames}