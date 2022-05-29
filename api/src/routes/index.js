const { Router } = require('express');
const axios = require('axios')
const {getApiGameById, getDbGameById, getApiGenres, getAllVideoGames, getFilteredBySource, getFilteredByGenre, getAllGamesByName, filter} = require('./controllers')
const {Videogame, Genre} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/videogames", async function (req, res){
    let {name, genre, source} = req.query
    
    try {
        if (name) {
            name = name.toLowerCase();
            const allGamesByName = await getAllGamesByName(name);
            if (allGamesByName.length >= 1) {
                if (genre || source) {
                    const filteredGames = await filter(allGamesByName, source, genre);
                    return res.status(200).send(filteredGames);
            } else 
                return res.status(200).send(allGamesByName);
        } else {
            res.status(404).send("No se han encontrados juegos que coincidan con la búsqueda")
        }
    };
        if (genre || source) {
        const allGames = await getAllVideoGames ();
        const filteredGames = await filter(allGames, source, genre);
        return res.status(200).send(filteredGames);  
    };
        const allGames = await getAllVideoGames ();
        res.status(200).send(allGames);
    } catch (e) {
        console.log(e)
    };
});



// router.get("/videogames", async function (req, res) {
//     const {name} = req.query;
//     const {genre, source} = req.params
//     try {
       
//         if (name) {
//             name = name.toLowerCase()
//             const allGamesByName = getAllGamesByName (name);
//             if (allGamesByName.length >= 1) {
//                 return res.status(200).send(allGamesByName)
//                 } else
//                 return res.status(400).send("No se han encontrados juegos que coincidan con la búsqueda");
//         }
//         else 
//         if (source){
//                 if (genre) {
                    
//                 }
//                 const filtBySource = await getFilteredBySource(source);
//                 res.status(200).send(filtBySource);
//         }
//         else 
//         if (genre){
//                 const filtByGenre = await getFilteredByGenre(genre);
//                 res.status(200).send(filtByGenre);
//         }
//         else {
//                 const totalGames = await getAllVideoGames();
//                 res.status(200).send(totalGames);
//             }
//     } catch(error){
//         console.log(error);
//         res.status(404).send(error);
//     }
// });

router.get("/videogame/:id", async function (req, res){
    let {id} = req.params;
    id = id.toString();
    
    try {

        if (Number(id)) {
            const apiGameById = await getApiGameById(id);
            apiGameById?
            res.status(200).send(apiGameById)
            : res.status(400).send("No existe un juego con dicho id.")
        } else {
            const dbGameById = await getDbGameById(id);
            dbGameById?
            res.status(200).send(dbGameById)
            : res.status(400).send("No existe un juego con dicho ID") 
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).send("No existe un juego con dicho ID");
    }
    
});

router.get ("/genres", async function (req, res){
    try {
    const allGenres = await getApiGenres();
    res.status(200).send(allGenres);
} catch(error){
    console.log(error);
}
    
});

router.post("/videogame", async function (req, res){
    const {name, description, releaseDate, rating, genres, platforms } = req.body;

    const created = await Videogame.create({name, description,releaseDate, rating, platforms});
    const genresDb = await Genre.findAll({
        where: {name: genres}
    });

    created.addGenre(genresDb);
    return res.status(200).send("Juego creado exitosamente");
    // res.send({name, description, releaseDate, rating, platforms})
})


module.exports = router;
