export default function toEntity(productSchema) {
  return {
    id_product: productSchema.id_product,
    nm_product: productSchema.nm_product,
    vl_month_price: productSchema.vl_month_price,
    nm_videoQuality: productSchema.nm_videoQuality,
    nm_resolution: productSchema.nm_resolution,
    qt_simultaneous_screens: productSchema.qt_simultaneous_screens,
  };
}
