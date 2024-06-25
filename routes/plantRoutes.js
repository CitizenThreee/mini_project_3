let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

//Get all plants, or pass params to filter
router.get('/', (req, res) => {
    Controllers.plantController.getPlants(req, res);
})

//Get plant with id
router.get('/:id', (req, res) => {
    Controllers.plantController.getPlant(req, res);
})

//Add new plant with json body
router.post('/', (req, res) => {
    Controllers.plantController.addPlant(req.body, res);
})

//Update plant with id
router.put('/:id', (req, res) => {
    Controllers.plantController.updatePlant(req, res);
})

//Delete plant with id
router.delete('/:id', (req, res) => {
    Controllers.plantController.removePlant(req, res);
})

module.exports = router;