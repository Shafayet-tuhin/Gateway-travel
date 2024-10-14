const User = require('../Model/usermodel');

exports.createUser = async (req, res) => {
    const { name, email, password, image } = req.body;

    let newUser = null;  // Use 'let' instead of 'const'

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try {
        const searchEmail = await User.findOne({ email });

        if (searchEmail) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        if (!image) {  // Check if image is null or undefined
            newUser = new User({
                username: name,  // Change `name` to `username`
                email,
                password,
            });
        } else {
            newUser = new User({
                username: name,  // Change `name` to `username`
                email,
                password,
                profilePicture: image,  // Add profilePicture if image is provided
            });
        }

        const result = await newUser.save();  // Use save() to persist the newUser
        res.status(201).json({ user: result, message: 'User created successfully' });

    } catch (error) {
        console.error('Error in createUser:', error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.getOneUser = async (req, res) => {
    try {
        const email = req.query.email; // Use req.query.email to get the email
        const result = await User.findOne({ email: email });  // Use findOne() to get a single user

        if (!result) {
            return res.status(404).json({ error: 'User not found!' });
        }  // Check if result is null or undefined

        res.status(200).json({ user: result, message: 'User fetched successfully' });
    }
    catch (error) {
        console.error('Error in getOneUser:', error.message);
        res.status(500).json({ error: error.message });
    }
}


exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        const { username, email, password, profilePicture } = req.body;

        const result = await User.updateOne({ _id: id }, { username, email, password, profilePicture });

        res.status(200).json({ message: 'User updated successfully', result });
    }
    catch (error) {
        console.error('Error in updateUser:', error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.allUsers = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)

       const role = await User.findOne({ _id: id })

        if (role.role === 'GUEST') {
            return res.status(403).json({ error: 'You are not authorized to view all users' });
        }

        const result = await User.find();

        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error in allUsers:', error.message);
        res.status(500).json({ error: error.message });
    }
}

exports.changeRole = async (req, res) => {
    try{
        const id = req.params.id;
        const { role } = req.body;

       await User.updateOne({ _id: id }, { role });

       const result = await User.find()

         res.status(200).json({ message: 'Role changed successfully', result });
    }
    catch(error){
        console.error('Error in changeRole:', error.message);
        res.status(500).json({ error: error.message });
    }
}