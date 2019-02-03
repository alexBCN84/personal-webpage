var keystone = require('keystone');


// Getting our project model
var Project = keystone.list('Project');

// Creating the API end point
exports.list = function (req, res) {
    // Querying the data this works similarly to the Mongo db.collection.find() method
    Project.model.find(function (err, items) {
        // Make sure we are handling errors
        if (err) return res.apiError('database error', err);
        res.apiResponse({
            // Filter project by 
            project: items,
        });

        // Using express req.query we can limit the number of projects returned by setting a limit property in the link
        // This is handy if we want to speed up loading times once our project collection grows
    }).limit(Number(req.query.limit));
};

// Getting our cv model
var Cv = keystone.list('Cv');

// Creating the API end point
exports.list = function (req, res) {
    // Cv.model.findOne().populate('author')
    // .where('_id', req.params.id)
    // .exec(function (err, item) {
    //     if (err) return res.apiError('database error', err);
    //     res.apiResponse({
    //         store: item,
    //     });
    // });
    // Querying the data this works similarly to the Mongo db.collection.find() method

    Cv.model.find(function (err, items) {
        // Make sure we are handling errors
        if (err) return res.apiError('database error', err);
        res.apiResponse({
            // Filter cv by 
            cv: items,
        });
        console.log(items);

        // Using express req.query we can limit the number of cvs returned by setting a limit property in the link
        // This is handy if we want to speed up loading times once our cv collection grows
    }).populate('author job_experience volunteer_experience trainings education').limit(Number(req.query.limit));
};