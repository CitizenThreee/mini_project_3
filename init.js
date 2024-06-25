"use strict";
const Models = require("./models");
const axios = require('axios');

InitializeDatabase();

//If the database is empty, fetch the data from the external api and store it in the database using the relevant parameters.
async function InitializeDatabase() {
    let plantCount = await Models.Plant.countDocuments();

    if(plantCount) { console.log('Plant data already available'); return; }

    let initPlants = [];
    let pageCount = 2;
    //await axios.get('https://perenual.com/api/species-list?key=sk-ffIl656827c3479f93205').then(res => res.data.last_page);
    
    for(let i = 0; i < pageCount; i++){
        let newData = await axios.get(`https://perenual.com/api/species-list?key=sk-ffIl656827c3479f93205&page=${i+1}`).then(res => res.data.data);
        let formatedData = newData.map(plant => ({
            name: plant.common_name,
            scientific_name: plant.scientific_name[0],
            cycle: plant.cycle,
            watering: plant.watering,
            sunlight: plant.sunlight,
            default_image: plant.default_image && plant.default_image.original_url ? plant.default_image.original_url : ""
        }))

        initPlants.push(...formatedData);
    }
    
    console.log(initPlants);
    Models.Plant.insertMany(initPlants)
}
