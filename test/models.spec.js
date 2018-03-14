import { expect } from 'chai';

import Model from '../server/models/model';


describe('Model tests', () => {
  it('tests the validation method', () => {
    Model.validateRequiredParams(
      {
        abc: 'def',
        ghi: 'jkl'
      },
      [
        'abc',
        'ghi'
      ],
      'test'
    );
  });

  it('tests the exception thrown by the validation method', () => {
    expect(() => Model.validateRequiredParams(
      {
        abc: 'def',
        ghi: 'jkl'
      },
      [
        'abc',
        'ghi',
        'qwe'
      ],
      'test'
    )).to.throw();
  });
});
