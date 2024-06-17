module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user_id', 89);
    return res.render('home', {
        title: "Home"
    })
}

module.exports.index = function(req,res){
    return res.end('<h1>Index page</h1>');
}