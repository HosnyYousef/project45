// SERVER

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'jobtracker'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',async (request, response)=>{

    db.collection('jobs').find().toArray()
    .then(data => {
        db.collection('jobs').countDocuments({completed: false})
        .then(itemsLeft => {
            response.render('index.ejs', { items: data, left: itemsLeft })
        })
    })
    .catch(error => console.error(error))
})

app.post('/addjob', (request, response) => {
    db.collection('jobs').insertOne({
        job: request.body.jobTitle, 
        role: request.body.jobRole,
        date: request.body.jobDate, 
        status: request.body.jobStatus,
        notes: request.body.jobNotes, 
        spark: request.body.jobSpark,
        completed: false})
    .then(result => {
        console.log('job Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => {
    db.collection('jobs').updateOne({
        job: request.body.jobTitleJS, 
        role: request.body.jobRoleJS,
        date: request.body.jobDateJS, 
        status: request.body.jobStatusJS,
        notes: request.body.jobNotesJS, 
        spark: request.body.jobSparkJS,
    },{
        $set: {
            completed: true
          }

    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')

    })
    .catch(error => console.error(error))
})

app.put('/markUnComplete', (request, response) => {
    db.collection('jobs').updateOne({
        job: request.body.jobTitleJS, 
        role: request.body.jobRoleJS,
        date: request.body.jobDateJS, 
        status: request.body.jobStatusJS,
        notes: request.body.jobNotesJS, 
        spark: request.body.jobSparkJS,
    },{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked UnComplete')
        response.json('Marked UnComplete')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteItem', (request, response) => {
    db.collection('jobs').deleteOne({
        job: request.body.jobTitleJS, 
        role: request.body.jobRoleJS,
        date: request.body.jobDateJS, 
        status: request.body.jobStatusJS,
        notes: request.body.jobNotesJS, 
        spark: request.body.jobSparkJS,
    })
    .then(result => {
        console.log('Job Deleted')
        response.json('Job Deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})