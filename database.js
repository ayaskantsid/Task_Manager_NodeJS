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

module.exports = {
    db,
    Tasks,
    Notes
}