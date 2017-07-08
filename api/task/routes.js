const TaskController = require('./controller/task.controller');

module.exports = [{
  path: '/tasks/{user_id}',
  method: 'GET',
  config: TaskController.getAllTask
},{
  path: '/tasks/{user_id}/task/{_id}',
  method: 'GET',
  config: TaskController.getTask
},{
  path: '/tasks/{user_id}/task',
  method: 'POST',
  config: TaskController.addTask
},{
  path: '/tasks/{user_id}/task/{_id}',
  method: 'PUT',
  config: TaskController.updateTask
},{
  path: '/tasks/{user_id}/task/{_id}',
  method: 'DELETE',
  config: TaskController.deleteTask
}];