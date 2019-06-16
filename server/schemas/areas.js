import * as yup from 'yup';

export const postAreaSchema = yup.object().shape({
  user: yup.string().required(),
  name: yup.string().required(),
  seed: yup.string().required().matches(/[0-9a-f]{16}/),
  environment: yup.string().required()
});
