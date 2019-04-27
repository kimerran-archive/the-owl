import * as docsTypes from './types';

// const stateShape = {
//   docs: {
//     byId: {
//       '123': {
//         id: '123',
//         testTitle: '(200) The actual test name',
//         request: {
//           body: {},
//           headers: { content-type: "text/json" },
//           originalPath: '/users/:id',
//           method: 'get',
//           path: '/users/1',
//           queryParameters: {},
//           url: 'http://localhost:8080/users/1'
//         },
//         response: {
//           body: { /* ... */ },
//           headers: { /* ... */ },
//           statusCode: 200,
//         }
//       }
//     }
//   },
// };

// TODO: test?
export const collectRequestInformation = (state, action) => {
  const { id, request } = action.payload;

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        request,
      },
    },
  };
};

// TODO: test?
export const collectResponseInformation = (state, action) => {
  const { id, response } = action.payload;

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        response,
      },
    },
  };
};

// TODO: test?
export const createDoc = (state, action) => {
  const { id, testName } = action.payload;

  return {
    byId: {
      ...state.byId,
      [id]: { id, testName },
    },
    allIds: [...state.allIds, id],
  };
};

// TODO: test?
const defaultState = {
  byId: {},
  allIds: [],
};
export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case docsTypes.COLLECT_REQUEST_INFORMATION: return collectRequestInformation(state, action);
    case docsTypes.COLLECT_RESPONSE_INFORMATION: return collectResponseInformation(state, action);
    case docsTypes.CREATE_DOC: return createDoc(state, action);
    default: {
      return state;
    };
  }
};
