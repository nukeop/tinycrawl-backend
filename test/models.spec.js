import { expect } from 'chai';

import Model from '../server/models/model';


describe('Model tests', () => {
  it('tests the validation method', () => {
    let result = Model.validateRequiredParams(
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
    expect(result).to.be.an('Object').that.has.all.keys('result', 'missing');
    expect(result.result).to.equal(true);
  });

  it('tests the exception thrown by the validation method', () => {
    let result = Model.validateRequiredParams(
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
    );

    expect(result.result).to.equal(false);
    expect(result.missing).to.be.an('Array');
    expect(result.missing[0]).to.equal('qwe');
  });
});
