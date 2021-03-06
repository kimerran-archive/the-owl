const { TEST_NAME_HEADER, REQ_ORIGINAL_PATH_HEADER } = require('../../../lib/middlewares/headers');

const IGNORED_HEADERS = [
  TEST_NAME_HEADER,
  REQ_ORIGINAL_PATH_HEADER,
  'access-control-allow-origin',
  'cache-control',
  'postman-token',
  'user-agent',
  'accept',
  'host',
  'accept-encoding',
  'content-length',
  'connection',
  'x-powered-by',
];

const filterHeaders = (headers) => {
  if (!headers) return {};

  return Object.keys(headers) // Tranform "headers" object into an array contaning its keys.
    .filter(key => !IGNORED_HEADERS.includes(key)) // Remove all keys that must be ignored.
    .reduce((accumulator, key) => ({ // Transform the "headers" array into an object again.
      ...accumulator,
      [key]: headers[key],
    }), {});
}

const getUrl = (req) => `${req.protocol}://${req.get('host')}${req.originalUrl}`;

module.exports = {
  IGNORED_HEADERS,
  filterHeaders,
  getUrl,
};
