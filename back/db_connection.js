const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://ixionlegrandmonarque:ixionlegrandmonarque@192.168.99.100:3270/ixionlegrandmonarque');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Serie = sequelize.define('series', {
    name: {
        type: Sequelize.STRING
    },
    code: {
        type: Sequelize.STRING
    },
    note: {
        type: Sequelize.INTEGER
    },

}, { freezeTableName: true , timestamps: false});

// force: true will drop the table if it already exists
Serie.sync({force: true}).then(() => {
    // Table created
    return Serie.create({
        name: 'DBZ25',
        code: 'DBZZZZ',
        node: '7.5'
    });
});
Serie.findAll().then(users => {
    console.log(users)
})