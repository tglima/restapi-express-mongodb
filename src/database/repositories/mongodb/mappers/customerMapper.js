/* eslint-disable no-underscore-dangle */
export const toSchema = (customer) => {
  return {
    _id: customer.id,
    name: customer.name,
    gender: customer.gender.toUpperCase(),
    dt_birth: customer.dt_birth,
    nu_document: customer.nu_document,
    email: customer.email,
    nu_phone: customer.nu_phone,
    user_register: customer.user_register,
    last_user_edit: customer.last_user_edit,
    dt_register: customer.dt_register,
    dt_last_edit: customer.dt_last_edit,
    is_active: customer.is_active,
  };
};

export const toEntity = (customerDB) => {
  return {
    id: customerDB._id.toString(),
    name: customerDB.name,
    gender: customerDB.gender,
    dt_birth: customerDB.dt_birth,
    nu_document: customerDB.nu_document,
    email: customerDB.email,
    nu_phone: customerDB.nu_phone,
    user_register: customerDB.user_register,
    last_user_edit: customerDB.last_user_edit,
    dt_register: customerDB.dt_register,
    dt_last_edit: customerDB.dt_last_edit,
    is_active: customerDB.is_active,
  };
};
