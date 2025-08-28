const express = require('express')
const {MongoClient} = require('mongodb')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true})) 

let db
const uri = 'mongodb+srv://admin:admin250058@cluster0.yiplwlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

new MongoClient(uri).connect().then((client)=>{
  console.log('[#] Database is successfully connected!')
  db = client.db('f1wiki')

  app.listen(3000, ()=>{
    console.log('[#] Server is running on http://localhost:3000')
  })
}).catch((err)=>{
  console.log(err)
})

app.get('/', async(req,res)=>{
  let result = await db.collection('drivers').find().toArray()
  res.render('index.ejs', {drivers: result})
})

app.get('/post', async(req,res)=>{
  res.render('post.ejs')
})

app.post('/add', async(req,res)=>{
  try {
      if(req.body.driver_name == ''){
    res.send('Invalid Driver Name')
  } else {
    await db.collection('drivers').insertOne({
      driver_name: req.body.driver_name,
      driver_number: req.body.driver_number,
      nationality: req.body.nationality,
      current_team: req.body.current_team
      
    })
    res.redirect('/')
  }
  } catch(err) {
    console.log(err)
    res.status(500).end('error')
  }
})