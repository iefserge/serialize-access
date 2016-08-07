import test from 'tape';
import Promise from 'bluebird';
import createPool from '../lib';

test('lock', t => {
  const pool = createPool();

  Promise.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], v => Promise.resolve()
    .then(() => {
      t.pass(`trying to acquire #${v}`);
    })
    .then(() => pool.acquire())
    .then(() => {
      t.pass(`work with the resource #${v}`);
      return Promise.delay(100);
    })
    .then(() => pool.release())
    .then(() => {
      t.pass(`released #${v}`);
    })
  )
  .then(() => {
    t.end();
  })
  .catch(err => {
    t.error(err);
  });
});

test('double release', t => {
  const pool = createPool();

  pool.acquire()
    .then(() => pool.release())
    .then(() => pool.release())
    .then(() => {
      t.end();
    })
    .catch(err => {
      t.error(err);
    });
});
