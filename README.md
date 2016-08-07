# serialize-access

Simple module for resource access serialization (synchronization). Useful to prevent concurrent access to a resource that can't handle multiple requests at the same time.

[![Build Status](https://travis-ci.org/iefserge/serialize-access.svg?branch=master)](https://travis-ci.org/iefserge/serialize-access)
[![Coverage Status](https://coveralls.io/repos/github/iefserge/serialize-access/badge.svg?branch=master)](https://coveralls.io/github/iefserge/serialize-access?branch=master)

## Usage

```js
import serialize from 'serialize-access';
import Promise from 'bluebird';
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

// 4 workers trying to access the same resource
// at the same time (concurrently)
Promise.all([
  getDataSerial(),
  getDataSerial(),
  getDataSerial(),
  getDataSerial()
]).then(() => {
  console.log('ok');
});
```

outputs:

```
fetching...
data
done
fetching...
data
done
fetching...
data
done
fetching...
data
done
ok
```

## API

**lock = createLock()** - create a new resource access lock. Returns `lock`.

**lock.acquire()** - acquire access to the resource.

**lock.release()** - release access to the resource.

## License

MIT
