import 'babel-polyfill';
import chai, { expect } from 'chai';
import spies from 'chai-spies';

import User from '../server/models/user';
import { authentication } from '../server/middleware';

chai.use(spies);

describe('Custom middleware tests', () => {
  it('tests the authentication middleware rejection in case of missing auth info', () => {
    let req = {
      header: () => null
    };
    let next = chai.spy();
    authentication(req, null, next);

    expect(next).to.have.been.called();
  });
});
