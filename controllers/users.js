var Users = require('../models/users').Users;

exports.loginGet = loginGet;
exports.loginPost = loginPost;

function loginGet(req, res)
{
    res.render('users/login');
}

function loginPost(req, res)
{
    query = {email: req.body.email};

    Users.findOne(query, function(err, result)
    {
        if(err) throw err;

        if(result)
        {
            if(result.password == req.body.password)
            {
                req.session.user = {id: result.id, name: result.name};
                res.redirect('/');
            }
            else res.render('users/login');
        }
        else res.redirect('/users/create');
    });
}