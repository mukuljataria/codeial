module.exports.home = function(req,res){
    return res.render('home', {
        title: "Home"
    })
}

module.exports.index = function(req,res){
    return res.end('<h1>Index page</h1>');
}