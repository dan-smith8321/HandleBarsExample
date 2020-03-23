var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}))

app.get('/', (req, res )=>{
    res.render('index' , { layout: 'main'});
});


app.get('/about', (req, res )=>{
    res.render('about me', { layout: 'main'})
});

//listening for requests on port 3000
app.listen(3000, ()=>{
    console.log('server listening on port 3000');
});