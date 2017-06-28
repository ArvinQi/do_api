'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Task = require('../entity/task');
// const Jwt = require('jsonwebtoken');
// const Parameters = require('../../../config/parameters');
// const Bcrypt = require('bcrypt');
// const Moment = require('moment');

// const _privateKey = Parameters.key.privateKey;

exports.getAllTask = {
  description: 'Get tasks of user.',
  auth: 'jwt',
  validate: {
    headers: Joi.object({
      'authorization': Joi.string().required()
    }).unknown(),
    params: {
      user_id: Joi.string().required()
    }
  },
  tags: ['api'],
  handler: (request, reply) => {
    let userId = request.params.user_id;
    Task.find({
      userId: userId
    }, (err, tasks) => {
      if (err) {
        return reply(Boom.internal('Error getting tasks.'));
      }
      return reply(tasks);
    });
  }
};
exports.getTask = {
  description: 'Get task by _id.',
  auth: 'jwt',
  validate: {
    headers: Joi.object({
      'authorization': Joi.string().required()
    }).unknown(),
    params: {
      user_id: Joi.string().required(),
      _id: Joi.string().required()
    }
  },
  tags: ['api'],
  handler: (request, reply) => {
    let _id = request.params._id;
    let userId = request.params.user_id;
    Task.find({
      _id: _id,
      userId: userId
    }, (err, tasks) => {
      if (err) {
        return reply(Boom.internal('Error getting tasks.'));
      }
      return reply(tasks);
    });
  }
};

exports.addTask = {
  description: 'Add tasks for user.',
  auth: 'jwt',
  validate: {
    headers: Joi.object({
      'authorization': Joi.string().required()
    }).unknown(),
    payload: {
      title: Joi.string().required(),
      details: Joi.string(),
      estimate: Joi.number(),
      type: Joi.string()
    },
    params: {
      user_id: Joi.string().required()
    }
  },
  tags: ['api'],
  handler: (request, reply) => {
    let userId = request.params.user_id;
    let title = request.payload.title;
    let details = request.payload.details;
    let estimate = request.payload.estimate;
    let type = request.payload.type;

    let task = new Task({
      userId: userId,
      title: title,
      details: details,
      estimate: estimate,
      type: type
    });
    task.save((err, task) => {
      if (!err) {
        return reply(task);
      } else {
        return reply(Boom.forbidden(err));
      }
    });
  }
};

exports.updateTask = {
  description: 'Update tasks for user.',
  auth: 'jwt',
  validate: {
    headers: Joi.object({
      'authorization': Joi.string().required()
    }).unknown(),
    payload: {
      title: Joi.string().required(),
      details: Joi.string(),
      estimate: Joi.number(),
      type: Joi.string(),
      isFinished: Joi.string(),
      // isShared: Joi.string(),
      // finishedByWho: Joi.string(),
      isAssign: Joi.boolean(),
      order: Joi.number()
    },
    params: {
      user_id: Joi.string().required(),
      _id: Joi.string().required()
    }
  },
  tags: ['api'],
  handler: (request, reply) => {
    let _id = request.params._id;
    let userId = request.params.user_id;
    let title = request.payload.title;
    let details = request.payload.details;
    let estimate = request.payload.estimate;
    let type = request.payload.type;
    let isFinished = request.payload.isFinished;
    // let isShared = request.payload.isShared;
    // let finishedByWho = request.payload.finishedByWho;
    let isAssign = request.payload.isAssign;
    let order = request.payload.order;

    Task.findOne({
      _id: _id,
      userId: userId
    }, (err, task) => {
      if (err) {
        return reply(Boom.internal());
      } else if (!task) {
        return reply(Boom.badRequest('Error update task.'));
      } else {
        if (title) {
          task.title = title;
        }
        if (details) {
          task.details = details;
        }
        if (estimate) {
          task.estimate = estimate;
        }
        if (type) {
          task.type = type;
        }
        if (isFinished) {
          task.isFinished = isFinished;
        }
        // if (isShared) {
        //   task.isShared = isShared;
        // }
        // if (finishedByWho) {
        //   task.finishedByWho = finishedByWho;
        // }
        if (isAssign) {
          task.isAssign = isAssign;
        }
        if (order) {
          task.order = order;
        }

        task.save((err, taskAfterUpdate) => {
          if (!err) {
            return reply(taskAfterUpdate);
          } else {
            return reply(Boom.forbidden(err));
          }
        });
      }
    });
  }
};

exports.deleteTask = {
  description: 'Delete tasks for user.',
  auth: 'jwt',
  validate: {
    headers: Joi.object({
      'authorization': Joi.string().required()
    }).unknown(),
    params: {
      user_id: Joi.string().required(),
      _id: Joi.string().required()
    }
  },
  tags: ['api'],
  handler: (request, reply) => {
    let _id = request.params._id;
    let userId = request.params.user_id;
    Task.deleteOne({
      _id: _id,
      userId: userId
    }, (err, task) => {
      if (err) {
        return reply(Boom.internal());
      } else if (!task) {
        return reply(Boom.badRequest('Error update task.'));
      } else {
        return reply({});
      }
    });
  }
};