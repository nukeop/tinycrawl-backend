import mongoose from 'mongoose';

const Hero = mongoose.model('Hero');
const Trait = mongoose.model('Trait');

export async function buyTrait(hero, trait) {
  if(hero.traitPoints < trait.points) {
    throw new Error('Insufficient trait points');
  }

  const hasTrait = await hero.hasTrait(trait.name);
  if(hasTrait) {
    throw new Error('Trait is already present');
  }

  await Promise.all(_.map(trait.excludes, async excluded => {
    console.log(`Removing ${excluded}`);
    const excludedTrait = await Trait.findOne({ name: excluded });
        
    return Hero.where({ _id: hero._id }).updateOne(
      { $pull: { traits: excludedTrait._id } }
    );
  }));  

  hero.traitPoints -= trait.points;
  await hero.save();
  await Hero.findByIdAndUpdate(
    hero._id,
    {
      $push: { traits: trait._id }
    }
  );
}
