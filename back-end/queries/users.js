const db = require("../db/dbConfig.js");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
};

const getUser = async (id) => {
  try {
    const oneUser = await db.one("SELECT * FROM users WHERE id=$1", id);
    return oneUser;
  } catch (err) {
    return err;
  }
};

const createUser = async (user) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (firstName, lastName, userName, password, email) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [user.firstName, user.lastName, user.userName, user.password, user.email]
    );
    return newUser;
  } catch (err) {
    return err;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      id
    );
    return deletedUser;
  } catch (err) {
    return err;
  }
};

const updateUser = async (id, user) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET firstName=$1, lastName=$2, userName=$3, password=$4, email=$5 WHERE id=$6 RETURNING *",
      [
        user.firstName,
        user.lastName,
        user.userName,
        user.password,
        user.email,
        id,
      ]
    );
    return updatedUser;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
