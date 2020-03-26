var express = require('express');
var app = express();
var handlebars = require('express-handlebars');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var Contact = require('./models/Contact');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

app.get('/', (req, res )=>{
    Contact.find({}).lean()
    .exec((err, contacts) =>{
        if(contacts.length){
        res.render('index' , { layout: 'main', contacts: contacts, contactsExist: true });
        } else {
        res.render('index' , { layout: 'main', contacts: contacts, contactsExist: false }); //send this info to/
    }})
});

app.post('/addContact', (req, res) =>{
    const { name, email, number } = req.body;
    var contact = new Contact({
          name,
          email,
          number 
    });
    contact.save();
    res.redirect('/');
})

app.get('/about', (req, res )=>{
    res.render('about', { layout: 'main'});
});

mongoose.connect('mongodb://localhost:27017/handlebars' , {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then (() => {
    console.log('Connected to the DB')
})
.catch((err) => {
    console.log('Not Connected to the DB : ' + err);
});


//listening for requests on port 3000
app.listen(3000, ()=>{
    console.log('server listening on port 3000');
});