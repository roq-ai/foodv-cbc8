import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  customer_name: yup.string().required(),
  address: yup.string().required(),
  total_price: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
