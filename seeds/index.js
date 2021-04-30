const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array=> array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<cities.length ; i++){
        let price = Math.floor(Math.random()*20)*100+99;
        const location = `${cities[i].city}, ${cities[i].state}`;
        const camp = new Campground({
            author: '608a1ecf436d1416d03c205c',
            location,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[i].longitude,
                    cities[i].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvmezr2sd/image/upload/v1619773412/YelpCamp/nyb3cujgqysnlid5vsru.jpg',
                    filename: 'YelpCamp/nyb3cujgqysnlid5vsru'
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price

        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});