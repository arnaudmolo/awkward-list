import expect from 'expect';
import instagramReducer from '../reducer';
import { fromJS } from 'immutable';

describe('instagramReducer', () => {
  it('returns the initial state', () => {
    expect(instagramReducer(undefined, {})).toEqual(fromJS({}));
  });
});
