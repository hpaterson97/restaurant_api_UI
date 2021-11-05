const express = require('express');
const Router = express.Router();
const fetch = require('node-fetch');
const config = require('../../config');
//getting the restaurant url 
const url = `${config.url.restaurants}`;

Router
    .post('/restaurants', async (req, res, next) => {
        try{
            const response = await fetch(url + "/restaurants", {
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
            const response = await fetch(url+"/restaurants");
            const restaurants = await response.json();
            res.render('restaurants', { restaurants});
        } catch (error) {
            return next(error);
        };
    })
    .get('/restaurants/:id', async (req, res, next) => {
        try {
            const response = await fetch(url + "/restaurants"+`/${req.params.id}`);
            const restaurant = await response.json();
            res.render('restaurant', { restaurant});
        } catch (error) {
            return next(error);
        };
    })
    .get('/restaurants/:restaurant_id/delete', async (req, res, next) => {
        try{
            const response = await fetch(url + "/restaurants"+`/${req.params.restaurant_id}`);
            const restaurant = await response.json();
            res.render('deleterestaurant', {restaurant})
        } catch (error) {
            return next(error);
        }
    })
    .get("/restaurants/:restaurant_id/edit", async (req,res,next) => {
        try {
            const response = await fetch(`${url}/restaurants/${req.params.restaurant_id}`);
            const restaurant = await response.json();
            res.render("updaterestaurant", {restaurant});
        } catch (error) {
            return next(error);
        };
    })

    .post('/restaurants/:restaurant_id/menus', async (req, res, next) => {
        try{
            const response = await fetch(url + "/restaurants"+`/${req.params.restaurant_id}`+'/menus', {
                method: 'POST',
                body: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            res.redirect('/restaurants'+`/${req.params.restaurant_id}`+'/menus');
        } catch (error) {
            return next(error);
        }
    })
    .get('/restaurants/:restaurant_id/menus/create', async (req, res, next) => {
        try {
            const response = await fetch(url+ "/restaurants"+`/${req.params.restaurant_id}`+"/menus");
            const restId= req.params.restaurant_id;
            res.render('createmenu', {restId});
        } catch (error) {
            return next(error);
        }
      })
    .get('/restaurants/:restaurant_id/menus', async (req, res, next) => {
        try {
            const response = await fetch(url+ "/restaurants"+`/${req.params.restaurant_id}`+"/menus");
            const menus = await response.json();
            const restId= req.params.restaurant_id;
            res.render('menus', { menus, restId});
        } catch (error) {
            return next(error);
        }
    })
    .get('/restaurants/:restaurant_id/menus/:menu_id', async (req, res, next) => {
        try {
            const response = await fetch(url+ "/restaurants"+`/${req.params.restaurant_id}`+"/menus"+`/${req.params.menu_id}`);
            const menu = await response.json();
            const restId= req.params.restaurant_id;
            res.render('menu', { menu, restId});
        } catch (error) {
            return next(error);
        }
    })
    .get('/restaurants/:restaurant_id/menus/:menu_id/edit', async (req, res, next) => {
        try{
            const response = await fetch(url+ "/restaurants"+`/${req.params.restaurant_id}`+"/menus"+`/${req.params.menu_id}`);
            const menu = await response.json();
            const restId= req.params.restaurant_id;
            res.render('updatemenu', {menu, restId})
        } catch (error) {
            return next(error);
        }
    })
    .get('/restaurants/:restaurant_id/menus/:menu_id/delete', async (req, res, next) => {
        try{
            const response = await fetch(url+ "/restaurants"+`/${req.params.restaurant_id}`+"/menus"+`/${req.params.menu_id}`);
            const menu = await response.json();
            const restId= req.params.restaurant_id;
            res.render('deletemenu', {menu, restId})
        } catch (error) {
            return next(error);
        }
    })
    .post('/menus/:menu_id/menuitems', async (req, res, next) => {
        try{
            const response = await fetch(url + "/menus"+`/${req.params.menu_id}`+'/menuitems', {
                method: 'POST',
                body: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            res.redirect('/menus'+`/${req.params.menu_id}`+'/menuitems');
        } catch (error) {
            return next(error);
        }
    })
    .get('/menus/:menu_id/menuitems/create', async (req, res, next) => {
        try {
            const response = await fetch(url+ "/menus"+`/${req.params.menu_id}`);
            const menuId= req.params.menu_id;
            res.render('createmenuitems', {menuId});
        } catch (error) {
            return next(error);
        }
      })
    .get('/menus/:menu_id/menuitems', async (req, res, next) => {
        try {
            const response = await fetch("http://localhost:3002/api/menus"+`/${req.params.menu_id}`+ "/menuitems");
            const menuitems = await response.json();
            const menuId= req.params.menu_id;
            res.render('menuitems', { menuitems, menuId});
        } catch (error) {
            return next(error);
        }
    });
    




module.exports = Router;