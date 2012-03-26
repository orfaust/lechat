var Users = require('../models/users').Users;

exports.index = index;

var messages = [];

function index(req, res)
{
    if(req.session.user)
    {
        var query = {_id: req.session.user.id};
        Users.findOne(query, function(err, result)
        {
            if(err) throw err;
            else
            {
                locals = {
                    user: result
                  , messages: messages
                };
                res.render('chat/index', locals);
            }
        });
    }
    else
    {
        res.redirect('/users/login');
    }
};