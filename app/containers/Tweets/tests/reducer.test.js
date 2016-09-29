import expect from 'expect';
import tweetsReducer from '../reducer';
import { fromJS } from 'immutable';

describe('tweetsReducer', () => {
  it('returns the initial state', () => {
    expect(tweetsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
