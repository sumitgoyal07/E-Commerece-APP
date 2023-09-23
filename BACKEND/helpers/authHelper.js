const bcrypt = require('bcrypt');

//hash password;
const hashPassword = async (password) => {
   try {
      const saultRounds = 10;
      const hashedpassword = await bcrypt.hash(password, saultRounds);
      return hashedpassword
   } catch (error) {
      console.log("error");
   }
};

//compare password;
const comparePassword = async (password, hashedpassword) => {
   return await bcrypt.compare(password, hashedpassword);
};

module.exports = {hashPassword,comparePassword};


