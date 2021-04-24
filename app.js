const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.engine('ejs', ejsMate);

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/campgrounds', async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
});

app.get('/campgrounds/new', (req,res) =>{
    res.render('campgrounds/new');
});

app.post('/campgrounds', async(req,res)=>{
    const camp= new Campground(req.body.campground);
    await camp.save();
    res.redirect(`/campgrounds/${camp._id}`);
});

app.get('/campgrounds/:id', async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show',{campground});
});

app.get('/campgrounds/:id/edit', async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit',{campground});
});

app.put('/campgrounds/:id', async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

app.listen(3000, ()=>{
    console.log('Serving on port 3000');
});