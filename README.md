# YelpCamp

YelpCamp is a website where users can create and review campgrounds.
In order to review or create a campground and review, you have to login/register.
This project was part of Colt Steele's Web Developer Bootcamp on Udemy.

The project was created using Node.js, Express, MongoDB, and Bootstrap. <br />
Also Passport.js is used to handle authentication. <br />
Cloudinary is used for cloud image storage. <br />
MapboxGL is used to represent all the campgrounds all over the country. <br />
Helmetjs is used to strengthen the security. <br />
## Snapshots of the website
* HomePage
![HomePage](https://github.com/shahketan1810/YelpCamp/blob/main/Snapshots/home.png)
***
* Index Page - to Search for campgrounds
![AllCampgrounds](https://github.com/shahketan1810/YelpCamp/blob/main/Snapshots/index.png)
***
![Searching via Map](https://github.com/shahketan1810/YelpCamp/blob/main/Snapshots/search.png)
***
* Show Page - to view info about Campgrounds, also you can add reviews and create Campgrounds once you've logged in.
![ShowPage](https://github.com/shahketan1810/YelpCamp/blob/main/Snapshots/show.png)
***
## Features
* Users can create, update, and delete the campgrounds
* Users can review campgrounds, and edit or delete their reviews.
* Campgrounds can be searched via the Mapbox and viewed.
* Can upload multiple images for a campground.
## To run the Website locally
* Install [Mongodb](https://www.mongodb.com/) and [NodeJS](https://nodejs.org/en/) on your device.
* Create a account on [Cloudinary](https://cloudinary.com/) and [Mapbox](https://www.mapbox.com/) and get the API key.
* Create a .env file in the root of the project and add this:
```
CLOUDINARY_CLOUD_NAME=<Cloudinary name>
CLOUDINARY_KEY=<Cloudinary Key>
CLOUDINARY_SECRET=<Cloudinary Secret>
MAPBOX_TOKEN=<Your mapbox API key>
```
* Clone the repository, install all the dependencies and that's it.
```
git clone https://github.com/shahketan1810/YelpCamp.git
cd YelpCamp
npm install
nodemon app.js
```

Will try to make a few changes sooner :)
