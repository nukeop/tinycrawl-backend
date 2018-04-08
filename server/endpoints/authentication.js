import bcrypt from 'bcrypt';
import { User } from '../models';
import { BadRequest } from '../errors';
import { checkRequiredParams } from '../utils';

function createEndpoint(router) {
  router.post('/log_in', (req, res) => {
    if (!checkRequiredParams(req, res, ['username', 'password'])) {
      return;
    }


    let user = db.get('users').find({username: req.body.username}).value();
    if (!user) {
      BadRequest(res, `Either the user ${username} does not exist, or the password is incorrect`);
      return;
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      console.error(err);
      console.log(result);

      if (err || !result) {
        BadRequest(res, `Either the user ${username} does not exist, or the password is incorrect`);
        return;
      } else {
        // Generate an auth token and send it
        return;
      }
    });
  });

  console.log('Endpoints for authentication created');
}

export default createEndpoint;
