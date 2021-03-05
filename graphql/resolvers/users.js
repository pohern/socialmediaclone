const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserInputError } = require('apollo-server')
const { validateRegisterInput } = require('../../util/validators')

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
    ) {
        //  Validate User Data
        const { valid, errors } = validateRegisterInput(
          username,
          email,
          password,
          confirmPassword
        )
        if(!valid){
            throw new UserInputError('Errors', { errors })
        }
        // make sure user doesnt already exist 
        const user = await User.findOne({ username })
        if(user){
            throw new UserInputError('Username is taken', {
                errors: {
                    username: 'This username is taken'
                }
            })
        }
        //hash passsword and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1hr" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
