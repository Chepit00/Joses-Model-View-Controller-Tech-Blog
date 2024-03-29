const { User } = require('../models');

const userData =
    [
        {
            "username": "TechGuru1",
            "email": "TechGuru1@hotmail.com",
            "password": "pTechGuru1"
        },
        {
            "username": "TechGuru2",
            "email": "TechG2@email.com",
            "password": "pTechGuru2"
        },
        {
            "username": "TechGuru3",
            "email": "Guru3@gmail.com",
            "password": "pTechGuru3"
        },
        {
            "username": "TechGuru4",
            "email": "techGuru44@aol.com",
            "password": "pTechGuru4"
        }
    ];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;