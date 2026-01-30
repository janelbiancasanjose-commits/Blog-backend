const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      email,
      username,
      password: hashedPassword
    })

    res.status(201).json({ message: "User registered successfully" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET_KEY
    )

    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
