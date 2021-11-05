const express = require('express');
const Router = express.Router();
const fetch = require('node-fetch');
const config = require('../../config');
//getting the restaurant url 
const url = `${config.url.restaurants}`;

Router
    .post('/restaurants', async (req, res, next) => {
        try{
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            res.redirect('/restaurants');
        } catch (error) {
            return next(error);
        }
    })
    .get('/restaurants/create', (req, res, next) => {
        // render the new restaurant form
        res.render('createrestaurant');
      })
    .get('/restaurants', async (req, res, next) => {
        try {
            const response = await fetch(url);
            const restaurants = await response.json();
            res.render('restaurants', { restaurants});
        } catch (error) {
            return next(error);
        };
    })
    .get('/restaurants/:id', async (req, res, next) => {
        try {
            const response = await fetch(`url/${req.params.id}`);
            const restaurant = await response.json();
            res.render('restaurant', { restaurant});
        } catch (error) {
            return next(error);
        };
    })
    .get('/restaurants/:restaurant_id/delete', async (req, res, next) => {
        try{
            const response = await fetch(`url /${req.params.restaurant_id}`);
            const restaurant = await response.json();
            res.render('deleterestaurant', {restaurant})
        } catch (error) {
            return next(error);
        }
    })
    .get("/restaurants/:restaurant_id/edit", async (req,res,next) => {
        try {
            const response = await fetch(`${url}/${req.params.restaurant_id}`);
            const restaurant = await response.json();
            res.render("updaterestaurant", {restaurant});
        } catch (error) {
            return next(error);
        };
    })

    


module.exports = Router;