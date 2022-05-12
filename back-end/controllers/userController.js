const listingController = require("./listingController.js");

const express = require("express");
const users = express.Router();
const { getAllUsers, getUser, createUser, deleteUser, updateUser } = require("../queries/users.js");

users.use("/:userId/listings", listingController);

// INDEX - Ask Greg if we need an index of users?
users.get("/", async (req, res) => {
  try{
    const allUsers = await getAllUsers();
    if(allUsers[0]){
      res.status(200).json(allUsers);
    } else {
      res.status(500).json({ error: "Server error" });
    }
  } catch(err){
    console.log(err);
  }
});

users.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oneUser = await getUser(id);
    if(oneUser.id) {
      res.status(200).json(oneUser);
    } else {
      res.status(500).json({ error: "User not found" })
    }
  } catch(err) {
    console.log(err);
  }
});

users.post("/", async (req, res) => {
  const { body } = req;

  try{
    const createdUser = await createUser(body);
    if(createdUser.id) {
      res.status(200).json(createdUser);
    } else {
      res.status(500).json({ error: "User creation error" });
    }
  } catch(err) {
    console.log(err)
  }
});

users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  if (deletedUser.id) {
    res.status(200).json(deleteUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedUser = await updateUser(id, body);
  if(updatedUser.id){
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = users;