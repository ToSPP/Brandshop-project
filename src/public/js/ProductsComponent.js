const productCard = {
  props: ['product', 'full'],
  template: `
    <div class="product">
      <a href="#" class="product__add" @click.prevent="$root.$refs.cart.addProductItem(product)">
        <img src="img/cart_w.svg" class="cart_w" alt="cart">Add to Cart</a>
      <a v-if="full" href="#" class="product__retweet">
        <img src="img/retweet.svg" alt="retweet"></a>
      <a v-if="full" href="#" class="product__like">
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
};

const products = {
  props: ['catalogUrl', 'className'],
  components: {
    "product-card": productCard,
  },
  data() {
    return {
      url: this.catalogUrl || '/api/catalog',
      productsList: [],
      filteredProducts: [],
      classes: {
        catalog: 'catalog__wrap',
        featured: 'products__catalog',
        other: 'products-other__catalog',
      }
    };
  },
  template: `
    <div :class="classes[className]">
      <product-card v-for="product in filteredProducts"
               :product="product"
               :full="!(className === 'featured')"
               :key="product.id_product"
      ></product-card>
    </div>
  `,
  methods: {
    getAllProducts() {
      return this.filteredProducts = this.productsList;
    },
    getCatalogProducts() { // заглушка
      return this.filteredProducts = this.productsList.slice(5, 14);
    },
    getFeaturedProducts() { // заглушка
      const find = this.productsList.filter(product => product.rating > 4);
      return this.filteredProducts = find.slice(0, 8);
    },
    getOtherProducts() { // заглушка
      const find = this.productsList.filter(product => product.rating === 3);
      return this.filteredProducts = find.slice(0, 4);
    }
  },
  mounted() {
    this.$root.getJSON(`${this.url}`)
      .then(data => {
        for (const product of data) {
          this.productsList.push(product);
          this.filteredProducts.push(product);
        }
        if (this.className === 'catalog') { // заглушка
          this.getCatalogProducts();
        }
        if (this.className === 'featured') { // заглушка
          this.getFeaturedProducts();
        }
        if (this.className === 'other') { // заглушка
          this.getOtherProducts();
        }
      });
  },
};

export default products;