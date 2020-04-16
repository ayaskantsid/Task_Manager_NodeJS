const sequelize = require('sequelize')

const db = new sequelize({
    dialect:'sqlite',
    storage:__dirname+'/todos.db'
})

const Todos = db.define('Todos',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    title:{
        type:sequelize.STRING,
        allowNull:false
    },

    description:{
        type:sequelize.STRING
    },

    due:{
        type:sequelize.DATEONLY,
        allowNull:false
    },

    priority:{
        type:sequelize.ENUM,
        values:['high','medium','low'],
        defaultValue:true,
        allowNull:false
    },

    status:{
        type : sequelize.BOOLEAN,
        defaultValue : true
    }
})

const notes = db.define('notes',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    note:{
        type:sequelize.STRING
    }
})


Todos.hasMany(notes)
notes.belongsTo(Todos)

module.exports = {
    db,
    Todos,
    notes
}