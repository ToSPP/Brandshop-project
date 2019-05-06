import cart_white_svg from '../img/cart_w.svg';
import retweet_svg from '../img/retweet.svg';
import like_svg from '../img/like.svg';
import rating_4_png from '../img/rating_4.png';

const productCard = {
  props: ['product', 'full'],
  data() {
    return {
      cartImage_white: cart_white_svg,
      retweetImg: retweet_svg,
      likeImg: like_svg,
      rating4Img: rating_4_png,
    };
  },
  template: `
    <div class="product">
      <a href="#" class="product__add" @click.prevent="$root.$refs.cart.addProductItem(product)">
        <img :src="cartImage_white" class="cart_w" alt="cart">Add to Cart</a>
      <a v-if="full" href="#" class="product__retweet">
        <img :src="retweetImg" alt="retweet"></a>
      <a v-if="full" href="#" class="product__like">
        <img :src="likeImg" alt="like"></a>
      <a href="single.html">
        <img :src="'img/products/' + product.img" class="product__img" :alt="product.product_name"></a>
      <div class="product__desc">
        <a href="single.html" class="product__desc-link">
          <h3 class="product__desc-h3">{{ product.product_name }}</h3></a>
        <div class="product__desc-row">
          <span class="product__price dollar color-pink">{{ product.price }}</span>
          <img :src="rating4Img" class="product__rating" alt="rating_4_stars">
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