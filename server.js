const express = require('express')
const {MongoClient} = require('mongodb')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true})) 

let db
const uri = 'mongodb+srv://admin:admin0058@cluster0.yiplwlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

new MongoClient(uri).connect().then((client)=>{
  console.log('[#] Database is successfully connected!')
  db = client.db('f1wiki')

  app.listen(8080, () => {
    console.log('[#] Server is running on http://localhost:8080')
  })

}).catch((err)=>{
  console.log(err)
})

app.get('/', async(req,res)=>{
    let result = await db.collection('drivers').find().toArray()
    res.render('index.ejs', {drivers: result})
})

app.get('/write', async(req,res)=>{
    res.render('write.ejs')
})

app.post('/add', async(req,res)=>{
    res.send('작성완료')

    db.collection('drivers').insertOne(req.body), function(err, result){
        console.log('[#] Data was successfully saved')
    }
})