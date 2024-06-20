const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const{createJWT} = require('../utils')

const register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name ) {
    throw new CustomError.BadRequestError(
      "Please provide All the required fields"
    );
  }
  const [userEmailExists] = await Promise.all([
    User.findOne({ email }),
  ]);
  if (userEmailExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

    const user = await User.create({email, password, name, role})

    const tokenUser = {
        name: user.name,
        userId: user._id
    }
    const token = createJWT({payload: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser, token})
}

const login = async (req, res) => {
    res.send('login');
}

const logout = async (req, res) => {
    res.send('logout');
}

module.exports = {
    register,
    login,
    logout
}