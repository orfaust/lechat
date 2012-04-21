var chat = require("./controllers/chat");
    users = require("./controllers/users_bk");

exports.init = function(app) {

  // chat
  app.get("/", chat.index);

  // users
  app.get("/users/login", users.loginGet);
  app.get("/users/create", users.create);
  app.put("/users/insert", users.insert);
  app.get("/users", users.index);
  app.post("/users/login", users.loginPost);
  app.get("/users/logout", users.logout);
  app.del("/users/delete/:id", users.remove);
  app.get("/users/edit/:id", users.edit);
  app.post("/users/update/:id", users.update);
};
