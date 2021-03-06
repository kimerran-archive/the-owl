const test = require('ava');

const { store } = require('../../../redux');
const { createDocForTests } = require('../../../__helpers__');
const { writeMarkdown } = require('../write-markdown');

// TODO: maybe remove this and use the fixture object
test.before('creating a "doc" object on store', t => {
  // Specify our own "doc" object instead of using the DEFAULT provided by
  // the helper function, in order to make snapshot testing deterministic.
  const doc = {
    id: '1b42d891-41d1-4066-b458-61d1d901adcb',
    testName: '(500) returns an error if the given user doesnt exist',
    req: {
      get: (key) => (key === 'host' ? 'localhost' : ''),
      method: 'get',
      path: '/users/999',
      headers: {
        'x-request-header': 'not important value',
      },
      _originalPath: '/users/:id',
      originalUrl: '/users/999',
      protocol: 'http',
      query: {
        sort: 'desc',
        page: 1,
      },
    },
    res: {
      body: { code: 'USER_NOT_FOUND', message: `User "1b42d891-41d1-4066-b458-61d1d901adcb" not found!` },
      headers: null,
      statusCode: 500,
    }
  };

  createDocForTests(doc);
});

test('(snapshot) must match snapshot', t => {
  const state = store.getState();
  const docs = Object.values(state.docs.byId);
  const markdown = writeMarkdown(docs);

  t.snapshot(markdown);
});
