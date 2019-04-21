const routes = {
  '/Brandshop-project/public/index.html': true,
};

Vue.component('products', {
  props: ['catalogUrl', 'featured'],
  data() {
    return {
      url: this.catalogUrl || 'catalog.json',
      productsList: [],
      filteredProducts: [],
      isFeatured: !!this.featured,
    };
  },
  template: `
    <div :class="[ isFeatured ? 'products__catalog' : 'catalog__wrap' ]">
      <product v-for="product in filteredProducts"
               :product="product"
               :featured="isFeatured"
               :key="product.id_product"
      ></product>
    </div>
  `,
  methods: {
    getFeaturedProducts() {
      const find = this.productsList.filter(product => product.rating > 4);
      return this.filteredProducts = find.splice(0, 8);
    },
  },
  mounted() {
    this.$root.getJSON(`${API + this.url}`)
      .then(data => {
        for (const product of data) {
          this.productsList.push(product);
          this.filteredProducts.push(product);
        }
        if (this.isFeatured) {
          this.getFeaturedProducts();
        }
      });
  },
});

Vue.component('product', {
  props: ['product', 'featured'],
  template: `
    <div class="product">
      <a href="#" class="product__add">
        <img src="img/cart_w.svg" class="cart_w" alt="cart">Add to Cart</a>
      <a v-if="!featured" href="#" class="product__retweet">
        <img src="img/retweet.svg" alt="retweet"></a>
      <a v-if="!featured" href="#" class="product__like">
        <img src="img/like.svg" alt="like"></a>
      <a href="single.html">
        <img :src="'img/' + product.img" class="product__img" :alt="product.product_name"></a>
      <div class="product__desc">
        <a href="single.html" class="product__desc-link">
          <h3 class="product__desc-h3">{{ product.product_name }}</h3></a>
        <div class="product__desc-row">
          <span class="product__price dollar color-pink">{{ product.price }}</span>
          <img src="img/rating_4.png" class="product__rating" alt="rating_4_stars">
        </div>
      </div>
    </div>
  `,
});