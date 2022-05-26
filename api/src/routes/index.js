const { Router } = require('express');
const axios = require('axios')
const {getAllApi, getAllDb, getApiGamesByName, getDbGamesByName, getApiGameById, getDbGameById, getApiGenres, createGame, paginatedVideoGames} = require('./controllers')
const {Videogame, Genre} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get("/videogames", async function (req, res) {
    let {name} = req.query;
    try {
        
        // const apiInfo = await getAllApi();
        // const dbInfo = await getAllDb ();
        // const totalGames = apiInfo.concat(dbInfo);

        const paginatedVg = await paginatedVideoGames();
       
        if (name) {
            name = name.toLowerCase()
            const apiGamesByName = await getApiGamesByName(name);
            // res.status(200).send(apiGamesByName);
            const dbGamesByName = await getDbGamesByName(name);
            const allGamesByName = apiGamesByName.concat(dbGamesByName);
            if (allGamesByName.length >= 1) {
                return res.status(200).send(allGamesByName)
                } else
                return res.status(400).send("No se han encontrados juegos que coincidan con la búsqueda");
        }
            else {
                res.status(200).send(paginatedVg);
            }
    } catch(error){
        console.log(error);
        res.status(404).send(error);
    }
    
    // return res.status(200).send(totalGames);
});

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
