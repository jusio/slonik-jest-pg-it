const db = require('./db');
const { sql } = require('slonik');
beforeAll(async () => {
  await db.pool.query(
    sql`CREATE TABLE IF NOT EXISTS my_table(id uuid,data jsonb)`
  );
});
describe('dbtests2', () => {
  describe('fast test using transaction rollback', () => {
    let pool;
    beforeEach(async () => {
      pool = await db.fakePool();
    });

    afterEach(async () => {
      await pool.end();
    });
    for (let i = 0; i < 100; i++) {
      test('insert works ' + i, async () => {
        await pool.query(
          sql`insert into MY_TABLE(id, data)
              VALUES ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null)
              `
        );
        expect(
          (await pool.query(sql`select count(*) from my_table`)).rows[0].count
        ).toBe(10);
      });
    }
  });

  describe.skip('slowtest using autocommit', () => {
    const pool = db.pool;
    beforeEach(async () => {
      await pool.query(sql`TRUNCATE MY_TABLE`);
    });
    for (let i = 0; i < 100; i++) {
      test('slow insert works ' + i, async () => {
        await pool.query(
          sql`insert into MY_TABLE(id, data)
              VALUES ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null),
                     ('e2fa6de7-b23c-4daf-bfca-3e34b521af37', null)`
        );

        expect(
          (await pool.query(sql`select count(*) from my_table`)).rows[0].count
        ).toBe(10);
      });
    }
    afterEach(async () => {
      await pool.query(sql`TRUNCATE MY_TABLE`);
    });
  });
});