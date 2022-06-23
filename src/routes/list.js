'use strict';

const express = require('express');
const db = require('../models/index.js');
const authenticateBearer = require('../auth/middleware/bearer')
const router = express.Router();



router.post('/listitem', authenticateBearer, create)
router.get('/listitem', authenticateBearer, getAll);
router.get('/listitem/:itemId', authenticateBearer, getOne);
router.put('/listitem/:itemId', authenticateBearer, update);
router.delete('/listitem/:itemId', authenticateBearer, remove);
router.delete('/:userId', authenticateBearer, removeAllById);

// async function create(req, res) {
//   // body expects: name, quantity, category, price, notes, image, completed
//   // console.log('request body 🍕', request.body)
//   // console.log('request user 🥩', request.user)
//   const { productName, quantity, category, price, notes, image, completed } = req.body
//   console.log({ productName, quantity, category, price, notes, image, completed })
//   const newList = await db.list.create({ userId: req.user.id, productName, quantity, category, price, notes, image, completed })
//   console.log('new list: ', newList)

//   res.status(200).send({ success: true, data: newList, message: true ? 'Created!' : 'Error Creating!' });
// }


// == this new create func is now allowing BULK create == //
async function create(req, res) {
  console.log('REC DOT BODY IS: ', req.body)
  const listItems = req.body.map(item => {
    return { userId: req.user.id, ...item }
  });
  console.log('LIST ITEMS: ', listItems);
  // const { productName, quantity, category, price, notes, image, completed } = req.body
  const newList = await db.list.bulkCreate(listItems);
  console.log('NEW LIST IS: ', newList)
  res.status(200).send({ success: true, data: newList, message: true ? 'Created!' : 'Error Creating!' });
}


async function getAll(req, res) {
  // console.log(db.list)
  // === === dataValues not necessary anymore because it's added to bearer.js (validuser.dataValues) === === //
  // console.log('logged in user ID is: ', req.user.dataValues.id)
  console.log('logged in user ID is: ', req.user.id)
  // === === dataValues not necessary anymore because it's added to bearer.js (validuser.dataValues) === === //
  // const allLists = await db.list.findAll({ where: { userId: req.user.dataValues.id } });
  const allLists = await db.list.findAll({ where: { userId: req.user.id } });
  // console.log(allLists)

  res.status(200).send({ success: true, data: allLists })
}


async function getOne(req, res) {
  const { itemId } = req.params
  console.log('REQ DOT USER: ', req.user)
  const singleItem = await db.list.findOne({ where: { id: itemId, userId: req.user.id } });

  res.status(200).send({ success: true, data: singleItem })
}


async function update(req, res) {
  const { itemId } = req.params
  const { productName, quantity, category, price, notes, image, completed } = req.body
  const oneItem = await db.list.findOne({ where: { id: itemId, userId: req.user.id } });
  if (!oneItem) {
    return res.status(409).send({ success: false, data: [], message: 'Item Doesn\'t Exist' })
  }

  const updatedList = await oneItem.update({ productName, quantity, category, price, notes, image, completed }, { where: { id: itemId, userId: req.user.id } })
  console.log('updated list: ', updatedList)

  res.status(200).send({ success: true, data: updatedList })
}


async function remove(req, res) {
  const { itemId } = req.params
  console.log(itemId, 'IS THE ITEM ID')
  const deletedItem = await db.list.destroy({ where: { id: itemId, } });

  res.status(200).send({ success: true, data: deletedItem })
}


async function removeAllById(req, res) {
  const { userId } = req.params
  console.log(userId, 'IS THE USER ID')
  // const deletedItems = await db.list.destroy({ where: { userId: req.user.id } });
  const deletedItems = await db.list.destroy({ where: { userId: userId } });


  res.status(200).send({ success: true, data: deletedItems })
}

module.exports = router;
