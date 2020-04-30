//Organization is IMPORTANT
//https://medium.com/@sesitamakloe/how-we-structure-our-express-js-routes-58933d02e491


// I had all the folders and stuff but could not get it to work, will look at later
module.exports = function(app) {
    app.use('/group', require('./group'));
    app.use('/user', require('./user'));
    app.use('/comment', require('./comment')); // will need to be moved to group once route set up so: /group/:id/comment/newComment for example
    app.use('/task', require('./task')); // will need to be moved to group
    app.use('/meeting', require('./meeting')); // will need to be moved to group
}
