'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Todos', [
      {
        title: 'Buy groceries',
        description: 'Milk, Bread, and Eggs',
        done: false,
      },
      {
        title: 'Read a book',
        description: 'Finish reading "1984" by George Orwell',
        done: false,

      },
      {
        title: 'Workout',
        description: 'Go to the gym and do a full-body workout',
        done: false,

      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null, {});
  },
};
