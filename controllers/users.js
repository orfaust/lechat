var Users = require('../models/users').Users;

exports.index = function(req, res)
{
    Users.find(function(err, results)
    {
        if(err) console.log(err);
        else
        {
            res.render('users/index', {locals: {users: results}});
        }
    });
}

exports.loginGet = function(req, res)
{
    res.render('users/login');
}

exports.loginPost = function(req, res)
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

exports.create = function(req, res)
{
    var locals = {
        action: '/users'
      , method: 'put'
      , user: {name: '', email: '', role: ''}
    };
    res.render('users/form', {locals: locals});
}

exports.insert = function(req, res)
{
    Users.create(req.body.user, function(err, data)
    {
        if(err) console.log(err);
        res.redirect('/');
    });
}