import { clone } from 'ramda';


export default function reducers(state = {elements: []}, action) {
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
    console.log('started');

  default:
    return state;
  }
}
