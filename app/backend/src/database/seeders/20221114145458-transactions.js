module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'transactions',
      [
        {
          debitedAccountId: 1 ,
          creditedAccountId: 2,
          value: 100.00,
        },
        {
          debitedAccountId: 2,
          creditedAccountId: 1,
          value: 200.00,
        },
        {
          debitedAccountId: 1,
          creditedAccountId: 2,
          value: 100.00,
        },     
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
