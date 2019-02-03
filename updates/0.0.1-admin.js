var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (done) {
    new User.model({
        name: {
            first: 'alex',
            last: 'gines'
        },
        email: 'admin@alexgines.com',
        password: '39432079M',
        canAccessKeystone: true,
    }).save(done);

};