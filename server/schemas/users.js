import * as yup from 'yup';

export const putUserSchema = yup.object().shape({
  email: yup.string().email(),
  displayName: yup.string().min(3)
});
