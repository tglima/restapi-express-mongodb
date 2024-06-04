class Product {
  constructor(
    id_product,
    nm_product,
    vl_month_price,
    nm_videoQuality,
    nm_resolution,
    qt_simultaneous_screens,
    is_active
  ) {
    this.id_product = id_product;
    this.nm_product = nm_product;
    this.vl_month_price = vl_month_price;
    this.nm_videoQuality = nm_videoQuality;
    this.nm_resolution = nm_resolution;
    this.qt_simultaneous_screens = qt_simultaneous_screens;
    this.is_active = is_active;
  }
}

export default Product;
