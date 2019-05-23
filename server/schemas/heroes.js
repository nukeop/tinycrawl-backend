import * as yup from 'yup';

export const postHeroSchema = yup.object().shape({
  name: yup.string().required(),
  heroClass: yup.string().required()
});

export const buyTraitSchema = yup.object().shape({
  traitId: yup.string().required()
});
