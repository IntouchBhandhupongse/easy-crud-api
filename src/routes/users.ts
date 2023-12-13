import express, { Router } from 'express'
import { v4 as uuidv4 } from 'uuid';

const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.MANGO_URL;
const router = Router();

// Get List User
router.get('/list', async (req, res) => {
  const client = new MongoClient(uri);
  await client.connect();
  const users = await client.db('myeasycruddb').collection('users').find({}).toArray();
  await client.close();
  res.status(200).send(users);
})

// Post Create User
router.post('/create', async (req, res) => {
  const user = req.body;
  try {
    const client = new MongoClient(uri);

    let _id = uuidv4();
    await client.connect();
    await client.db('myeasycruddb').collection('users').insertOne({
      id: _id,
      full_name: user.first_name + " " + user.last_name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      tel: user.tel,
      department: user.department
    });
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "User with ID = " + _id + " is created"
    });
  }
  catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Put Update User
router.put('/update', async (req, res) => {
  const user = req.body;
  const id = user.id;

  try {
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('myeasycruddb').collection('users').updateOne({ 'id': id }, {
      "$set": {
        id: user.id,
        full_name: user.first_name + " " + user.last_name,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        tel: user.tel,
        department: user.department
      }
    });
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "User with ID = " + id + " is updated",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('myeasycruddb').collection('users').deleteOne({ id: id });
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "User with ID = " + id + " is deleted"
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/delete', async (req, res) => {
  const ids = req.body.ids;

  try {
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('myeasycruddb').collection('users').deleteMany({ id: { $in: ids }, });
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "User with ID = " + ids + " is deleted"
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }

})

export default router;