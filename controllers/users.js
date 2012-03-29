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
    res.render('users/login', {locals: {errors: false, values: {email: '', password: ''}}});
}

var validationMessages = {
    EMAIL_REQUIRED: {param: 'email', msg: 'Email is required'}
  , EMAIL_NOT_VALID: {param: 'email', msg: 'Insert a valid email address'}
  , PASSWORD_REQUIRED: {param: 'password', msg: 'Password is required'}
};

function handleErrors(req)
{
    req.onValidationError(function(msg)
    {
        var errorData = validationMessages[msg];

        if(! req.validationErrors) req.validationErrors = {};
        req.validationErrors[errorData.param] = errorData.msg;
        return this;
    });
}

exports.loginPost = function(req, res)
{
    req.validationErrors = false;
    handleErrors(req);

    req.assert('email', 'EMAIL_NOT_VALID').isEmail();
    req.assert('email', 'EMAIL_REQUIRED').notEmpty();
    req.assert('password', 'PASSWORD_REQUIRED').notEmpty();

    var errors = req.validationErrors;
    if(errors)
    {
        //console.log(errors);
        res.render('users/login', {locals: {errors: errors, values: req.body}});
        return;
    }

    errors = {email: false, password: false};

    var email = req.param('email');
    var password = req.param('password');

    query = {email: email};

    Users.findOne(query, function(err, result)
    {
        if(err) throw err;

        if(result)
        {
            // user found

            if(result.password == password)
            {
                // login
                req.session.user = {id: result.id, name: result.name};
                res.redirect('/');
            }
            else
            {
                //errors.password = 'Wrong password';
                res.render('users/login', {locals: {errors: errors, values: req.body}});
            }
        }
        else
        {
            // redirect to registration form
            email = new Buffer(email).toString('base64');
            res.redirect('/users/create/' + email);
        }
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

exports.logout = function(req, res)
{
    req.session.destroy();
    res.redirect('/');
}