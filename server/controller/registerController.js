const { userModel } = require("../model/userModel");

const registerController = {
    addUser: async (req, res) => {
        const { email } = req.body;
       
        const checkUseremail = await userModel.findOne({ email });
        if (checkUseremail)
            return res.status(400).json({ message: "This email is already available!" });

        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        newUser.save();
        res.send(newUser);
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        userModel.findByIdAndDelete(id)
            .then(() => {
                res.send("Delete User!");
            }).catch((err) => {
                res.status(500).json(err);
            });
    }
};

module.exports = {
    registerController
};
