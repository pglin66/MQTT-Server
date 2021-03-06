module.exports = function(app) {
    const authentication = require('../controller/authenticationMiddleware');
    const users = require('../controller/controller.user');
    //creat a new user
    app.post('/users', users.creat);
    //find all user
    // app.get('/users', authentication.authenticationMiddleware, users.findAll);
    //find one user
    app.get('/info', authentication.authenticationMiddleware, users.findOne);
    // Update a User with useId
    app.put('/info', authentication.authenticationMiddleware, users.update);
    //delete user
    app.delete('/users/:userId', users.delete);
    //add view
    app.get('/info/:userId/view/:thingId', users.handleAddView);
    //find view
    app.get('/info/view', users.handleFindAllView);
};