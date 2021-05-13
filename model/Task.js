const mysqlConnection = require('../config/database');

class Task {
    constructor(taskName, userId, creationDate) {
        this.taskName = taskName;
        this.userId = userId;
        this.creationDate = creationDate;
    }

    createTask(task) {
        const newTask = {
            task_name: task.taskName,
            user_id: task.userId,
            creation_date: task.creationDate
        }
        return new Promise ((resolve, reject) => {
            mysqlConnection.query('INSERT INTO task SET ?', newTask, (error) => {
                if(!error) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    }
}

module.exports = Task;