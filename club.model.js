module.exports = (sequelize, Sequelize) => {
    const Club = sequelize.define("club", {
        name: {
            type: Sequelize.STRING
        }
    });

    return Club;
}