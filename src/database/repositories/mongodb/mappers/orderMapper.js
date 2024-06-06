/* eslint-disable no-underscore-dangle */
import * as productMapper from './productMapper';

export const toSchema = (order) => {
  // Verifica se a propriedade existe,
  // se sim deixa tudo em maiúsculo,
  // se não seto o valor default PENDING
  order.payment_status = order.payment_status ? order.payment_status.toUpperCase() : 'PENDING';

  return {
    _id: order.id,
    id_customer: order.id_customer,
    product: productMapper.toSchema(order.product),
    dt_register: order.dt_register,
    dt_last_edit: order.dt_last_edit,
    user_register: order.user_register,
    last_user_edit: order.last_user_edit,
    dt_start: order.dt_start,
    dt_finish: order.dt_finish,
    payment_status: order.payment_status,
    is_active: order.is_active,
  };
};

export const toEntity = (orderDb) => {
  return {
    id: orderDb._id.toString(),
    id_customer: orderDb.id_customer,
    product: productMapper.toEntity(orderDb.product),
    dt_register: orderDb.dt_register,
    dt_last_edit: orderDb.dt_last_edit,
    user_register: orderDb.user_register,
    last_user_edit: orderDb.last_user_edit,
    dt_start: orderDb.dt_start,
    dt_finish: orderDb.dt_finish,
    payment_status: orderDb.payment_status.toUpperCase(),
    is_active: orderDb.is_active,
  };
};
