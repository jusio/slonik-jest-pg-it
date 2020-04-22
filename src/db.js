const { createPool } = require('slonik');

const pool = createPool('postgres://postgres@localhost:5432/postgres');

exports.fakePool = async () => {
  let rollback;
  const commitPromise = new Promise((resolve, reject) => {
    rollback = reject;
  });
  let sharedTransactionEndPromise;
  const sharedConnection = await new Promise(resolve => {
    sharedTransactionEndPromise = pool.transaction(connection => {
      resolve(connection);
      return commitPromise;
    });
  });
  return {
    connect: async callback => {
      return callback(sharedConnection);
    },
    transaction: async callback => {
      return callback(sharedConnection);
    },
    query: async sql => sharedConnection.query(sql),
    end: async () => {
      rollback();
      return sharedTransactionEndPromise.catch(() => ({}));
    },
  };
};

exports.executeQuery = async query =>
  pool.connect(async connection => connection.query(query));
exports.pool = pool;
