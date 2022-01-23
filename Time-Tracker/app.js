var express = require('express'); 
var app = express();

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.get("/",function(req,res)
{
    res.sendFile( __dirname + "/public/templates/" + "index.html" );
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});