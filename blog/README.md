Your first backend app
======

This is the shell code for the backend to our simple blogging platform. 

To get set up:
------

1. Clone this repository
2. `cd` into this (blog) folder
3. Install the correct modules by just running `npm install`. When running
    that command, npm knows to look for `package.json` and install all modules
    that are required. 
4. Download, install, and run [postgres.app](postgresapp.com). Once that's running,
    run `createdb blog` on the terminal. 
5. From this directory, running `nodemon app.js` should run the app.
    

Your job:
------
There are various TODO comments throughout the app. Your job is to fill them in. 

Essentially, you are just creating the comments model and then the methods for
creating comments returning the associated data when retrieving a post. It should
be relatively little code overall. You'll definitely have to read the [sequelize docs](http://docs.sequelizejs.com/en/latest/docs). 
