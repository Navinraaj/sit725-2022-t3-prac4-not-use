
var express = require("express")
var app = express()
var cors = require("cors")
let projectCollection;

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//mongodb Connection

const MongoClient = require('mongodb').MongoClient;

//add database connection

const uri = 'mongodb+srv://navin:test@cluster0.ognmqfv.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true})


const createColllection = (collectionName) => {
    client.connect((err,db) => {
    projectCollection = client.db().collection(collectionName);
    if(!err) {
    console.log('MongoDB Connected')
    }
    else {
    console.log("DB Error: ", err);
    process.exit(1);
    }
     })
    }
    
const cardList = [
    {
        title: "Hungry people",
        image: "images/user-image.png",
        link: "About Hungry people",
        desciption: "Demo desciption about Hungry people"
    },
    {
        title: "Food wastage",
        image: "images/Food wastage.jpeg",
        link: "About Food wastage",
        desciption: "Demo desciption about Food wastage"
    }
]

app.get('/api/projects',(req,res) => {
    res.json({statusCode: 200, data: cardList, message:"Success"})
})
var port = process.env.port || 3000;
app.listen(port,()=>{
        console.log("App listening to: http://localhost:"+port)
        createColllection('Homeless People')
})