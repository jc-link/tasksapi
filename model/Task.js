const mysqlConnection = require('../config/database')

class Task {
    constructor(taskName, userId, creationDate) {
        this.taskName = taskName
        this.userId = userId
        this.creationDate = creationDate
    }

    createTask(task) {
        const newTask = {
            task_name: task.taskName,
            user_id: task.userId,
            creation_date: task.creationDate
        }
        return new Promise ((resolve, reject) => {
            mysqlConnection.query('INSERT INTO task SET ?', newTask, (error, result) => {
                if(!error) {

                    const taskSchedule = { 
                        task_id: result.insertId,
                        completed: false
                    }

                    mysqlConnection.query('INSERT INTO task_schedule SET ?', taskSchedule, (error) => {
                        if(error == null) {
                            resolve(true)
                        }
                        else {
                            reject(error)
                        }
                    })
                    
                } else {
                    reject(false)
                }
            })
        })
    }

    getTasks({ userId, completed }) {
        return new Promise ((resolve, reject) => {
            mysqlConnection.query('SELECT * FROM task t JOIN task_schedule ts ON t.task_id = ts.task_id WHERE user_id = ? AND ts.completed = ?', [userId, completed], (error, rows) => {
                if(error == null) {
                    resolve(rows)
                } else {
                    reject(error)
                }
            })
        })
    }

    completeTask({ taskId, userId }, task) {
        
        return new Promise((resolve, reject) => {
            mysqlConnection.query('SELECT ts.task_schedule_id FROM task_schedule ts JOIN task t ON ts.task_id = t.task_id WHERE ts.task_id = ? AND t.user_id = ? AND completed = false', [taskId, userId], (error, rows) => {
                if(error == null) {
                    if(rows.length > 0) {
                        mysqlConnection.query('UPDATE task_schedule SET ? WHERE task_id = ?', [task, taskId], (error) => {
                            if(error == null) {
                                resolve(true)
                            } else {
                                reject(error)
                            }
                        })
                    } else {
                        reject("error, already completed!")
                    }
                } else {
                    reject(error)
                }
            })
        })
    }

    deleteTask({ taskId }) {

        return new Promise((resolve, reject) => {

            mysqlConnection.beginTransaction((err) => {

                if(err) {throw err }
                mysqlConnection.query('DELETE FROM task_schedule WHERE task_id = ?', [taskId], (error, results) => {
                    if(error) {
                        return mysqlConnection.rollback(() => {
                            throw error
                        })
                    }

                    if(results.affectedRows > 0) {
                        mysqlConnection.query('DELETE FROM task WHERE task_id = ?', [taskId], (error) => {
                            if(error) {
                                return mysqlConnection.rollback(() => {
                                    throw error
                                })
                            }

                            mysqlConnection.commit((error) => {
                                if(error) {
                                    return mysqlConnection.rollback((error) => {
                                        throw error
                                    })
                                }
                                resolve("completed")
                            })
                        })

                    } else {
                        reject("the id doesn't exist!")
                    }
                })
            })
        })
    }




}


module.exports = Task