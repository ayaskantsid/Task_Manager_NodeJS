const sequelize = require('sequelize')

const db = new sequelize({
    dialect:'sqlite',
    storage:__dirname+'/TaskManager.db'
})

const Tasks = db.define('Tasks',{
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

    dueDate:{
        type:sequelize.DATEONLY,
        allowNull:false
    },

    status:{
        type:sequelize.BOOLEAN,
        values:['high','medium','low'],
        defaultValue:true,
        allowNull:false
    }
})

const Notes = db.define('notes',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    note:{
        type:sequelize.STRING
    }
})


Tasks.hasMany(Notes)
Notes.belongsTo(Tasks)

module.export = {
    db,
    Tasks,
    Notes
}