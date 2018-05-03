import mongoose from 'mongoose';

let definitionTypes = {
  abilities: 'Ability',
  environmentalfeatures: 'EnvironmentalFeature',
  environments: 'Environment',
  equipmentslots: 'EquipmentSlot',
  heroclasses: 'HeroClass',
  moves: 'Move',
  traits: 'Trait'
};

function createEndpoint(router) {
  router.get('/definitions', (req, res) => {


    res.status(200).json({ definitions: db.get('definitions').value() });
  });

  _.forEach(definitionTypes, (modelName, resourceName) => {
    router.get(`/definitions/${resourceName}`, (req, res) => {
      mongoose.model(modelName).find({}).then(items => {
        res.status(200).json({
          [`${resourceName}`]: _.map(items, item => item.serialize())
        });
      });
    });
  });

  // _.forEach(db.get('definitions').value(),(table, key) => {
  //   router.get(`/definitions/${key}`, (req, res) => {
  //     res
  //     .status(200)
  //     .json({
  //       [`${key}`]: db.get(`definitions.${key}`).value()
  //     });
  //   });
  //
  //   router.get(`/definitions/${key}/:name`, (req, res) => {
  //     res
  //     .status(200)
  //     .json({
  //       [`${key}`]: db.get(`definitions.${key}`).filter({name: req.params.name}).value()
  //     });
  //   });
  //
  //   console.log(`Endpoint for definition ${key} registered`);
  // });

  console.log('All endpoints for definitions registered');
}

export default createEndpoint;
