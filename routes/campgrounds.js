const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampgrounds} = require('../middleware');
const campground = require('../models/campground');

router.get('/', catchAsync( async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}));

router.get('/new', isLoggedIn, (req,res) =>{
    res.render('campgrounds/new');
});

router.post('/', isLoggedIn, validateCampgrounds, catchAsync(async(req,res)=>{
    //if(!req.body.campground) throw new ExpressError('Invalid Campground Data');
    
    const camp= new Campground(req.body.campground);
    camp.author = req.user._id;
    await camp.save();
    req.flash('success', 'Sucessfully made a new campground!');
    res.redirect(`/campgrounds/${camp._id}`);
}));

router.get('/:id', catchAsync(async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(campground);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error', 'Cannot find that campground!!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit',{campground});
}));

router.put('/:id', isLoggedIn, isAuthor, validateCampgrounds, catchAsync(async(req,res)=>{
    const {id} = req.params;    
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    req.flash('success', 'Successfully updated the campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}));

module.exports = router;