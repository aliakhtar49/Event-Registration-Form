
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.login = function(req, res){
    console.log("kk");
    res.render('login', { title: 'Express' });
};