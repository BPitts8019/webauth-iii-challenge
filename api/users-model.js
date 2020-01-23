const bcrypt = require("bcryptjs");
const db = require("../data/db-obj");
const users_db = db.bind(db, "users");

//helper functions
const findAll = () => {
   return users_db();
};
const findBy = filter => {
   return users_db()
      .select()
      .where(filter);
};
const findById = id => {
   return findBy({id})
      .first();
};
const add = async newUser => {
   try {
      newUser.password = bcrypt.hashSync(newUser.password, 14);
      const [id] = await users_db().insert(newUser);
      return findById(id);
   } catch (error) {
      return Promise.reject(error);
   }
};

//export helper module
module.exports = {
   findAll,
   findBy,
   findById,
   add
};