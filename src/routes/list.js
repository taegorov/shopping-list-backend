'use strict';

const express = require('express');
const db = require('../models/index.js');
// const authenticateBearer = require('../auth/middleware/bearer')

// const data = require('../models/index.js');
// const { QueryTypes } = require('sequelize');
const router = express.Router();


// === === routers === === //
// --- comment these back in when bearer/auth is functional --- //
// router.post('/lists', authenticateBearer, create)
// router.get('/lists', getAll);
// router.get('/lists/:listsId', getOne);
// router.put('/lists/:listsId', authenticateBearer, update);
// router.delete('/lists/:listsId', authenticateBearer, remove);

router.post('/listitem', create)
router.get('/listitem', getAll);
router.get('/listitem/:itemId', getOne);
router.put('/listitem/:itemId', update);
router.delete('/listitem/:itemId', remove);


async function create(req, res) {
  // body expects: name, quantity, category, price, notes, image
  // console.log('request body 🍕', request.body)
  // console.log('request user 🥩', request.user)
  const { productName, quantity, category, price, notes, image } = req.body
  console.log({ productName, quantity, category, price, notes, image })
  const newList = await db.list.create({ userId: 1, productName, quantity, category, price, notes, image })
  console.log('new list: ', newList)

  res.status(200).send({ success: true, data: newList, message: true ? 'Created!' : 'Error Creating!' });
}

async function getAll(req, res) {
  console.log(db.list)
  const allLists = await db.list.findAll();
  console.log(allLists)

  res.status(200).send({ success: true, data: allLists })
}

async function getOne(req, res) {
  const { itemId } = req.params
  const singleItem = await db.list.findOne({ id: itemId });

  res.status(200).send({ success: true, data: singleItem })
}

async function update(req, res) {
  const { itemId } = req.params
  const { productName, quantity, category, price, notes, image } = req.body
  const oneItem = await db.list.findOne({ where: { id: itemId } });
  if (!oneItem) {
    return res.status(409).send({ success: false, data: [], message: 'Item Doesn\'t Exist' })
  }

  const updatedList = await oneItem.update({ productName, quantity, category, price, notes, image }, { where: { id: itemId } })
  console.log('updated list: ', updatedList)

  res.status(200).send({ success: true, data: updatedList })
}

async function remove(req, res) {
  const { itemId } = req.params
  const deletedItem = await db.list.destroy({ where: { id: itemId } });

  res.status(200).send({ success: true, data: deletedItem })
}

module.exports = router;
