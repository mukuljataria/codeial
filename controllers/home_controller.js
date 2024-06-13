module.exports.home = function(req,res){
    return res.end('<h1>Express is up for Codeial</h1>');
}

module.exports.index = function(req,res){
    return res.end('<h1>Index page</h1>');
}