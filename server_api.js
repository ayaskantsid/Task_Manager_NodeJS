const express = require('express')
const app = express()
const {db,Todos,notes} = require('./database')

app.use(express.json())

app.use('/',express.static(__dirname+'/public'))

app.set( 'port', ( process.env.PORT || 5880 ));

db.sync()
    .then(()=>{
        app.listen(app.get( 'port' ))
    })
    .catch((err)=>{
        console.log(err)
    })

app.get('/todo', (req,res)=>{
    Todos.findAll({
        attributes:['id','title','description','due','priority','status']
    })
        .then((todos)=>res.send(todos))
})

app.get('/todo/:id', (req,res)=>{
    if (isNaN(Number(req.params.id))) {
        res.status(400).send({
            error: 'todo id must be an integer',
        })
        return
    }
    Todos.findOne({
        attributes:['id','title','description','due','priority','status'],
        where:{'id':req.params.id}
    }).then((data)=>res.send(data))
})

app.post('/todo', (req,res)=>{
    let data = req.body
    Todos.create(data)
    .then((retVal)=>{
        if(data.note!=''){
            let noteContent={
                note:data.note,
                TodoId:retVal.dataValues.id
            }
            notes.create(noteContent)
                .then(()=>{
                    res.send("")
                })
        }
        else{
            res.send("")
        }
    })
})

app.get('/todo/:id/notes', (req,res)=>{
    id=req.params.id
    notes.findAll({
        attributes:['note'],
        where:{
            todoId:id
        }
    })
    .then((data)=> res.send(data))
})

app.post('/todo/:id/notes',(req,res)=>{
    id = req.params.id
    data = req.body
    data.TodoId = Number(id)
    Todos.findAll({
        attributes:['id']
    })
    .then((list)=>{
        for(let item of list){
            if(item.id==id){
                notes.create(data)
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

app.patch('/todo/:id',(req,res)=>{
    let Taskid = req.params.id
    let data = req.body
    Todos.findOne({
        where:{
            id:Taskid
        }
    })
    .then((todo)=>{
        todo.due = data.due
        todo.priority = data.priority
        todo.status = data.status
        todo.save().then(()=>res.send(""))
    })
})