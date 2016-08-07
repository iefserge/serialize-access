import Promise from 'bluebird';

module.exports = () => {
  const waiting = [];
  let taken = false;

  return {
    acquire() {
      return new Promise(resolve => {
        if (!taken) {
          taken = true;
          resolve();
          return;
        }

        waiting.push(resolve);
      });
    },
    release() {
      if (!taken) {
        return;
      }

      if (waiting.length > 0) {
        const resolve = waiting.shift();
        resolve();
      } else {
        taken = false;
      }
    },
  };
};
