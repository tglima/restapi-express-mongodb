export const toEntity = (productSchema) => {
  return {
    id_product: productSchema.id_product,
    nm_product: productSchema.nm_product,
    vl_month_price: productSchema.vl_month_price,
    nm_videoQuality: productSchema.nm_videoQuality,
    nm_resolution: productSchema.nm_resolution,
    qt_simultaneous_screens: productSchema.qt_simultaneous_screens,
    is_active: productSchema.is_active ? productSchema.is_active : true,
  };
};

export const toSchema = (product) => {
  return {
    id_product: product.id_product,
    nm_product: product.nm_product,
    vl_month_price: product.vl_month_price,
    nm_videoQuality: product.nm_videoQuality,
    nm_resolution: product.nm_resolution,
    qt_simultaneous_screens: product.qt_simultaneous_screens,
    is_active: product.is_active ? product.is_active : true,
  };
};
