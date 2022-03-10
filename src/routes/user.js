'use strict';

const express = require('express');

const model = require('../models/index.js');
const router = express.Router();


// === === routers === === //
router.post('/user', create);
router.get('/user', getAll);
router.get('/user/:id', getOne);
router.put('/user/:id', update);
router.delete('/user/:id', remove);


// === === router functions === === //
async function create(request, response) {
  const userObject = request.body;
  console.log('🤖request', request.body);
  const userData = await model.user.create(userObject);
  console.log('🥽userData', userData);

  response.status(200).send(userData);
}

async function getAll(request, response) {
  const allUsers = await model.user.findAll();

  response.status(200).send(allUsers)
}

async function getOne(request, response) {
  const userId = request.params.userId;
  const singleUser = await model.user.findOne({
    where: {
      id: userId,
    }
  });

  response.status(200).send(singleUser);
}

async function update(request, response) {
  const userId = request.params.todoId;
  const userObject = request.body;
  const userData = await model.user.findOne({ where: { id: userId } });
  await userData.update(userObject);

  response.status(200).send(userData);
}

async function remove(request, response) {
  const userId = request.params.userId;
  await model.user.destroy({ where: { id: userId } });

  response.status(204).send('success!');
}

module.exports = router;
