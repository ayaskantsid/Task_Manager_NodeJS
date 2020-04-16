const express = require('express')
const app = express()
const {db,Tasks,Notes} = require('./database')

app.use(express.json())

app.use('/',express.static(__dirname+'/public'))

//app.set('port',(process.env.PORT || 5850))
db.sync()
    .then(()=>{
        app.listen(5779)
    })
    .catch((err)=>{
        console.log(err)
    })

//--> url:/task/
app.get('/task', (req,res)=>{
    Tasks.findAll()
        .then((tasks)=>res.send(tasks))
})

//--> url:/task/id
app.get('/task/:id', (req,res)=>{
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'todo id must be an integer',
        })
    }
    Tasks.findOne({
        attributes:['id','title','description','dueDate','priority','status'],
        where:{'id':req.params.id}
    }).then((data)=>res.send(data))
})

//--> url:/task/POST
app.post('/task', (req,res)=>{
    Tasks.create(req.body)
        .then((val)=>{
            if(req.body.note!=''){
                let noteContent={
                    note:req.body.note,
                    taskId:val.dataValues.id
                }
                Notes.create(noteContent)
                    .then(()=>{
                        res.send("")
                    })
            }
            else{
                res.send("")
            }
        })
})

app.get('/task/:id/notes', (req,res)=>{
    id=req.params.id
    Notes.findAll({
        attributes:['note'],
        where:{
            taskId:id
        }
    })
    .then((val)=> res.send(val))
})

app.post('/task/:id/notes',(req,res)=>{
    id = req.params.id
    data = req.body
    data.taskId = Number(id)
    Tasks.findAll({
        attributes:['id']
    })
    .then((list)=>{
        for(let item of list){
            if(item.id==id){
                Notes.create(data)
                    .then(()=>res.send(""))
                return
            }
        }
        res.status(404)
        res.send({
            error:'Id is Invalid'
        })
    })
    
})

app.patch('/task/:id',(req,res)=>{
    Tasks.findByPk()
        .then((taks)=>{
            task.dueDate = req.params.dueDate
            task.priority = req.params.priority
            task.status = req.params.status
            task.save().then(()=>res.send(""))
        })
})