const { userModel } = require("../model/userModel");

const loginController = {
    getUsers: (req, res) => {
        userModel.find()
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    getUser: (req, res) => {
        const { email, password } = req.body;

        userModel.findOne({ email })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not Found !' });
                    return;
                }
                if (user.password !== password) {
                    res.status(401).json({ message: 'incorrect password !' });
                    return;
                }
                res.json(user);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    changeChatId: (req, res) => {
        const id = req.params.id;
        const { socketId } = req.body;

        userModel.findByIdAndUpdate(id, { socketId }, { new: true })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found!' });
                    return;
                }
                res.json(user);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        userModel.findById(id)
            .then((data) => {
                res.json(data);
            }).catch((err) => {
                res.status(500).json(err);
            });
    }
};

module.exports = {
    loginController
};
