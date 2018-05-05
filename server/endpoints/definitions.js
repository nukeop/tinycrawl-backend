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
    Promise.all(_.map(definitionTypes, (modelName, resourceName) => {
      return mongoose.model(modelName).find({})
      .then(items => {
        return {
          name: resourceName,
          items
        };
      });
    }))
    .then(lists => {
      res.status(200).json({
        definitions: _(lists).groupBy('name').mapValues(list => _.head(list)).mapValues(list => list.items).mapValues(list => _.map(list, item => item.serialize())).value()
      });
    });
  });

  _.forEach(definitionTypes, (modelName, resourceName) => {
    router.get(`/definitions/${resourceName}`, (req, res) => {
      mongoose.model(modelName).find({}).then(items => {
        res.status(200).json({
          [`${resourceName}`]: _.map(items, item => item.serialize())
        });
      });
    });

    console.log(`Endpoint for definition ${resourceName} registered`);
  });

  console.log('All endpoints for definitions registered');
}

export default createEndpoint;
