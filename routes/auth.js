const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const validations = require('../validations')

router.post('/register', async (req, res) => {

    // Validate the user data
    const { value, error } = validations.registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({ Message: 'Email already exists!' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (error) {
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {

    const { value, error } = validations.loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: 'Email is not registered' });

    const passMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passMatch) return res.status(400).send({ message: 'Invalid password' });

    // Create and assign token
    const token = jwt.sign({ email: user.email, _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

    res.header('auth-token', token).send(token);
});



module.exports = router;