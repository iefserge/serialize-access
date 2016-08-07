import Promise from 'bluebird';
import serialize from './lib';

const lock = serialize();

function fetchData() {
  console.log('data');
  return Promise.resolve();
}

function getDataSerial() {
  return lock.acquire()
    .then(() => console.log('fetching...'))
    .then(() => fetchData())
    .then(() => console.log('done'))
    .finally(lock.release);
}

// 4 workers trying to access the resource at the same time
Promise.all([
  getDataSerial(),
  getDataSerial(),
  getDataSerial(),
  getDataSerial(),
]).then(() => {
  console.log('ok');
});
