const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {campgroundSchema} = require('../schemas.js');

const validateCampgrounds = (req,res,next) => {
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

router.get('/', catchAsync( async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}));

router.get('/new', (req,res) =>{
    res.render('campgrounds/new');
});

router.post('/', validateCampgrounds, catchAsync(async(req,res)=>{
    //if(!req.body.campground) throw new ExpressError('Invalid Campground Data');
    
    const camp= new Campground(req.body.campground);
    await camp.save();
    req.flash('success', 'Sucessfully made a new campground!');
    res.redirect(`/campgrounds/${camp._id}`);
}));

router.get('/:id', catchAsync(async(req,res)=>{
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if(!campground){
        req.flash('error', 'Cannot find that campground!!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{campground});
}));

router.get('/:id/edit', catchAsync(async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error', 'Cannot find that campground!!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit',{campground});
}));

router.put('/:id', validateCampgrounds, catchAsync(async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    req.flash('success', 'Successfully updated the campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', catchAsync(async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}));

module.exports = router;