import { User } from '../models';

function createEndpoint(router) {
  router.post('/log_in', (req, res) => {

  });

  console.log('Endpoints for authentication created');
}

export default createEndpoint;
