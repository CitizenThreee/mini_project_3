"use strict";
const Models = require("../models");

//Get all the plants if no params passed, or get the requested plants based off the passed params
const getPlants = (req, res) => {
    const { name, scientific_name, cycle, watering, sunlight, default_image } = req.query;
    const queryParams = {};

    if(name) queryParams.name = name;
    if(scientific_name) queryParams.scientific_name = scientific_name;
    if(cycle) queryParams.cycle = cycle;
    if(watering) queryParams.watering = watering;
    if(sunlight) queryParams.sunlight = sunlight;
    if(default_image) queryParams.default_image = default_image;

    Models.Plant.find(queryParams)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

//Get a plant with the id of the id query param
const getPlant = (req, res) => {
    Models.Plant.findById(req.params.id)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

//Update a plant with the id of the id query param
const updatePlant = (req, res) => {
    console.log(req.body)
    Models.Plant.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

//Add a new plant based off the passed data
const addPlant = (data, res) => {
    new Models.Plant(data).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

//Delete the plant with the id of the id query param
const removePlant = (req, res) => {
    Models.Plant.findByIdAndDelete(req.params.id)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

module.exports = {
    getPlants, addPlant, getPlant, updatePlant, removePlant
}