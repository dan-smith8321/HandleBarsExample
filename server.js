var express = require('express');
var app = express();

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

//requires the handlebar express package
var handlebars = require('express-handlebars');
var bcrypt = require('bcryptjs');

const Contact = require('./models/Contact');
const User = require('./models/User');

app.use(express.static('public'));

app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    res.render('login', { layout: 'main' });
})

app.get('/dashboard', (req, res )=>{
    Contact.find({}).lean()
    .exec((err, contacts) =>{
        if(contacts.length){
        res.render('dashboard' , { layout: 'main', contacts: contacts, contactsExist: true });
        } else {
        res.render('dashboard' , { layout: 'main', contacts: contacts, contactsExist: false }); //send this info to/
    }})
});

app.post('/signup', async (req, res) =>{
    const { username, password } = req.body;
    try{ //try this and if this doesn't this work then catch and provide an error
    let user = await User.findOne({ username });

    if(user){
        res.status(400).render('login', { layout: 'main', userExist: true });
    }
    user = new User({
          username,
          password
    });
//Salt Generation
    const salt = await bcrypt.genSalt(10);
//Password Encryption using password and salt
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).render('login', {layout:'main', userDoesNotExist: true });
} catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
}
})

app.post('/addContact', (req, res) =>{
    const { name, email, number } = req.body;

    let contact = new Contact({
          name,
          email,
          number 
    });

    contact.save();
    res.redirect('/dashboard');
})

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