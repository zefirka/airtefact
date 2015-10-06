'use strict';

import { clone } from 'ramda';
import { initial } from '../app';

let initial = {
  id : 0,
  elements : []
};

export default function reducers(state = initial, action) {
  switch (action.type) {

  case 'ADD':
    state = clone(state);
    state.elements.push({
      id: action.id,
      rules : action.rules
    });

    return state;

  case 'REMOVE':
    state = clone(state);
    state.elements.splice(action.index, 1);
    return state;

  case 'START':
    break;

  default:
    return state;
  }
}
