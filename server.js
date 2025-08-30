const express = require('express')
const {MongoClient} = require('mongodb')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/assets'))
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
  res.render('./pages/index.ejs', {drivers: result})
})

app.get('/grandprix', async(req,res)=>{
  let result = await db.collection('drivers').find().toArray()
  res.render('./pages/grandprix.ejs', {drivers: result})
})

app.get('/constructors', async(req,res)=>{
  let result = await db.collection('drivers').find().toArray()
  res.render('./pages/constructors.ejs', {drivers: result})
})

app.get('/drivers', async(req,res)=>{
  let result = await db.collection('drivers').find().toArray()
  res.render('./pages/drivers.ejs', {drivers: result})
})

app.get('/circuits', async(req,res)=>{
  let result = await db.collection('drivers').find().toArray()
  res.render('./pages/circuits.ejs', {drivers: result})
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