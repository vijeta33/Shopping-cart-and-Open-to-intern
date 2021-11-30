const express = require('express');
var bodyParser = require('body-parser');
const moment = require('moment')
const route = require('./routes/route.js');

const app = express();  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const logDataOnConsole = function(req,res,next){
//     let date = moment.utc().format('YYY-MM-DD HH:mm:ss');
//     let stillUtc = moment.utc(date).toDate();
//     let local = moment(stillUtc).local().format('YYY-MM-DD HH:mm:ss');
//     console.log(local);
//     console.log(req.ip);
//     console.log(req.url);
//     next();
// }
// app.use(logDataOnConsole)
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/TEAM-IRS-DB?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

    

    

    

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});