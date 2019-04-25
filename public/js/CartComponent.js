Vue.component('cart', {
  props: ['module'],
  data() {
    return {
      cartUrl: '/api/cart',
      itemsList: [],
      // modules: ['Main', 'Block'],
    };
  },
  provide() {
    return {
      getTotalSum: this.getTotalSum,
      addProductItem: this.addProductItem,
      setProductQty: this.setProductQty,
      removeProductItem: this.removeProductItem,
      removeProduct: this.removeProduct,
      clearCart: this.clearCart,
    }
  },
  template: `
      <component
        :is="useComponent" :items-list="itemsList">
      </component>
  `,
  computed: {
    useComponent() {
      return 'cart-' + this.module.toLowerCase();
    },
  },
  methods: {
    getTotalSum() {
      return this.itemsList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    addProductItem(product) {
      const item = this.itemsList.find(el => el.id_product === product.id_product);
      if (item) {
        this.$parent.putJSON(`/api/cart/${item.id_product}`, {quantity: 1})
          .then(data => {
            if (data.result) {
              item.quantity++;
            }
          })
      } else {
        const newItem = Object.assign({quantity: 1}, product);
        this.$parent.postJSON(`/api/cart`, newItem)
          .then(data => {
            if (data.result) {
              this.itemsList.push(newItem);
            }
          })
      }
    },
    setProductQty(product, newQty) {
      // console.log(product.quantity);
      // this.newQty = event.target.value;
      this.$parent.putJSON(`/api/cart/${product.id_product}`, {quantity: newQty - product.quantity})
        .then(data => {
          if (data.result) {
            product.quantity = newQty;
          }
        })

      // if (newQty > 0) {
      //   if ((newQty - product.quantity) === 1) {
      //     this.addProductItem(product);
      //   } else if ((newQty - product.quantity) === -1) {
      //     this.removeProductItem(product);
      //   } else {
      //     // const item = this.itemsList.find(el => el.id_product === product.id_product);
      //     // newQty -= product.quantity;
      //     this.$parent.putJSON(`/api/cart/${product.id_product}`, {quantity: newQty - product.quantity})
      //       .then(data => {
      //         if (data.result) {
      //           product.quantity = newQty;
      //         }
      //       })
      //   }
      //   // this.validQty = this.newQty;
      // } else {
      //   // this.setProductQty(this.item, this.validQty);
      // }



    },
    removeProductItem(product) {
      // const item = this.itemsList.find(el => el.id_product === product.id_product);
      if (product.quantity > 1) {
        this.$parent.putJSON(`/api/cart/${product.id_product}`, {quantity: -1})
          .then(data => {
            if (data.result) {
              product.quantity--;
            }
          })
      } else {
        this.removeProduct(product);
      }
    },
    removeProduct(product) {
      this.$parent.deleteJSON(`/api/cart/${product.id_product}`)
        .then(data => {
          if (data.result) {
            this.itemsList.splice(this.itemsList.indexOf(product), 1);
          }
        })
    },
    clearCart() {
      this.$parent.deleteJSON(`/api/cart`)
        .then(data => {
          if (data.result) {
            this.itemsList = [];
          }
        })
    },
  },
  mounted() {
    this.$parent.getJSON(`${this.cartUrl}`)
      .then(data => {
        for (const item of data) {
          this.itemsList.push(item);
        }
      })
  },
});

Vue.component('cartMain', {
  inject: ['clearCart'],
  props: ['itemsList'],
  template: `
    <div id="cartMain">
      <header class="header">
        <div class="container header__container">
          <div class="header__panel-left">
            <a href="index.html" class="logo">
              <img src="img/logo.png" alt="logo" class="logo__img">
              <span class="logo__title">BRAN<span class="logo__title_mark">D</span></span>
            </a>
            <form action="#" class="search-form header__search-form">
              <div class="search-form__btn search-form__btn-drop">
                <span class="caret-down search-form__btn-drop-caret">Browse</span>
                <div class="sub-menu search-form__sub-menu">
                  <span class="sub-menu__arrow sub-menu__arrow_search-form"></span>
                  <div class="sub-menu__col">
                    <h3 class="sub-menu__h3">Women</h3>
                    <ul class="sub-menu__ul">
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Dresses</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Tops</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Blazers</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Denim</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Leggings/Pants</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Skirts/Shorts</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Accessories</a></li>
                    </ul>
                    <h3 class="sub-menu__h3">men</h3>
                    <ul class="sub-menu__ul">
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Tees/Tank tops</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Shirts/Polos</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Sweaters</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Sweatshirts/Hoodies</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Blazers</a></li>
                      <li class="sub-menu__li"><a href="#" class="sub-menu__link">Jackets/vests</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <input type="text" class="input input__search" placeholder="Search for Item..." required>
              <button type="submit" class="btn search-form__btn search-form__btn-submit"><i class="fas fa-search"></i>
              </button>
            </form>
          </div>
          <div class="header__panel-right">
            <cart-block :items-list="itemsList"></cart-block>
            <button class="btn btn__primary btn__primary_my-account">
              <span class="caret-down btn__primary_my-account-caret">My Account</span></button>
          </div>
        </div>
      </header>
      <nav class="navigation">
        <div class="container navigation__container">
          <ul class="top-menu">
            <li class="top-menu__item"><a href="index.html" class="top-menu__link">Home</a></li>
            <li class="top-menu__item"><a href="products.html" class="top-menu__link">Man</a>
              <div class="sub-menu top-menu__sub-menu_left">
                <span class="sub-menu__arrow top-menu__sub-menu_arrow-left"></span>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Blazers</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Denim</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Leggings/Pants</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Skirts/Shorts</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Accessories</a></li>
                  </ul>
                </div>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                  </ul>
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                  </ul>
                </div>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                  </ul>
                  <a href="#" class="sub-menu__banner">
                    <img src="img/super_sale.png" alt="Super Sale">
                    <span class="sub-menu__banner-text">Super<br>sale!</span></a>
                </div>
              </div>
            </li>
            <li class="top-menu__item"><a href="products.html" class="top-menu__link">Women</a>
              <div class="sub-menu top-menu__sub-menu_left">
                <span class="sub-menu__arrow top-menu__sub-menu_arrow-left"></span>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Blazers</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Denim</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Leggings/Pants</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Skirts/Shorts</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Accessories</a></li>
                  </ul>
                </div>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                  </ul>
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="top-menu__item"><a href="products.html" class="top-menu__link">Kids</a>
              <div class="sub-menu top-menu__sub-menu_left">
                <span class="sub-menu__arrow top-menu__sub-menu_arrow-left"></span>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                  </ul>
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                  </ul>
                </div>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                  </ul>
                  <a href="#" class="sub-menu__banner">
                    <img src="img/super_sale.png" alt="Super Sale">
                    <span class="sub-menu__banner-text">Super<br>sale!</span></a>
                </div>
              </div>
            </li>
            <li class="top-menu__item"><a href="products.html" class="top-menu__link">Accoseriese</a>
              <div class="sub-menu top-menu__sub-menu_right">
                <span class="sub-menu__arrow top-menu__sub-menu_arrow-right"></span>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                  </ul>
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="top-menu__item"><a href="products.html" class="top-menu__link">Featured</a>
              <div class="sub-menu top-menu__sub-menu_right">
                <span class="sub-menu__arrow top-menu__sub-menu_arrow-right"></span>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Blazers</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Denim</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Leggings/Pants</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Skirts/Shorts</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Accessories</a></li>
                  </ul>
                </div>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                  </ul>
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                  </ul>
                </div>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                  </ul>
                  <a href="#" class="sub-menu__banner">
                    <img src="img/super_sale.png" alt="Super Sale">
                    <span class="sub-menu__banner-text">Super<br>sale!</span></a>
                </div>
              </div>
            </li>
            <li class="top-menu__item"><a href="products.html" class="top-menu__link">Hot Deals</a>
              <div class="sub-menu top-menu__sub-menu_right">
                <span class="sub-menu__arrow top-menu__sub-menu_arrow-right"></span>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Blazers</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Denim</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Leggings/Pants</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Skirts/Shorts</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Accessories</a></li>
                  </ul>
                </div>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                  </ul>
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                  </ul>
                </div>
                <div class="sub-menu__col">
                  <h3 class="sub-menu__h3">Women</h3>
                  <ul class="sub-menu__ul">
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Dresses</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Tops</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Sweaters/Knits</a></li>
                    <li class="sub-menu__li">
                      <a href="#" class="sub-menu__link">Jackets/Coats</a></li>
                  </ul>
                  <a href="#" class="sub-menu__banner">
                    <img src="img/super_sale.png" alt="Super Sale">
                    <span class="sub-menu__banner-text">Super<br>sale!</span></a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="breadcrumbs-section">
        <div class="container breadcrumbs-section__container">
          <h3 class="breadcrumbs-section__h3">New Arrivals </h3>
          <ul class="breadcrumbs">
            <li class="breadcrumbs__item"><a href="index.html" class="breadcrumbs__link">Home</a>&nbsp;/&nbsp;</li>
            <li class="breadcrumbs__item"><a href="products.html" class="breadcrumbs__link">Men</a>&nbsp;/&nbsp;</li>
            <li class="breadcrumbs__item"><span class="breadcrumbs__current">New Arrivals</span></li>
          </ul>
        </div>
      </div>
      <div class="shopping-cart">
        <div class="container shopping-cart__container">
          <cart-table :items-list="itemsList"></cart-table>
          <div class="shopping-cart__buttons">
            <a href="#" class="btn btn__secondary btn__shopping-cart_big" @click.prevent="clearCart">cLEAR SHOPPING CART</a>
            <a href="products.html" class="btn btn__secondary btn__shopping-cart_big">cONTINUE sHOPPING</a>
          </div>
          <div class="shopping-cart__misc">
            <section class="shopping-cart__section">
              <h3 class="shopping-cart__misc-h3">Shipping Adress</h3>
              <input list="country" class="shopping-cart__datalist" placeholder="Country">
              <datalist id="country">
                <option value="Bangladesh"></option>
                <option value="France"></option>
                <option value="Germany"></option>
                <option value="Russia"></option>
                <option value="Ukraine"></option>
              </datalist>
              <input type="text" class="shopping-cart__input-text" placeholder="State">
              <input type="text" class="shopping-cart__input-text" placeholder="Postcode/Zip">
            </section>
            <section class="shopping-cart__section">
              <h3 class="shopping-cart__misc-h3">coupon discount</h3>
              <p class="shopping-cart__coupon-hint">Enter your coupon code if you have one</p>
              <input type="text" class="shopping-cart__input-text" placeholder="State">
              <button class="btn btn__secondary btn__shopping-cart_small btn__shopping-cart_coupon">Apply coupon</button>
            </section>
            <section class="shopping-cart__section shopping-cart__misc_checkout">
              <div class="shopping-cart__total">
                <h4 class="shopping-cart__misc-h4 shopping-cart__sub-total">Sub total <span
                  class="dollar shopping-cart__total-price-margin">{{ this.$parent.getTotalSum() }}</span></h4>
                <h3 class="shopping-cart__misc-h3">GRAND TOTAL 
                  <span class="dollar shopping-cart__total-price-margin 
                               shopping-cart__total-highlight">{{ this.$parent.getTotalSum() }}</span>
                </h3>
              </div>
              <a href="checkout.html" class="btn btn__primary btn__shopping-cart_checkout">proceed to checkout</a>
            </section>
          </div>
          <button class="btn btn__secondary btn__shopping-cart_small btn__shopping-cart_coupon">get a quote</button>
        </div>
      </div>
      <div class="subscribe">
        <div class="container subscribe__container">
          <div class="subscribe__panel subscribe__panel-reviews">
            <div class="reviews">
              <div class="reviews__avatar">
                <img src="img/avatar.png" alt="avatar">
              </div>
              <div class="reviews__box">
                <div class="reviews__msg"><span class="reviews__msg_italic">“Vestibulum quis porttitor dui! Quisque 
                  viverra nunc mi, a pulvinar purus condimentum a. Aliquam condimentum mattis neque sed pretium”</span>
                  <h3 class="reviews__name">Bin Burhan</h3>
                  <span class="reviews__country">Dhaka, Bd</span>
                </div>
                <div class="reviews__toggle">
                  <a href="#" class="reviews__btn"></a>
                  <a href="#" class="reviews__btn reviews__btn_active"></a>
                  <a href="#" class="reviews__btn"></a>
                </div>
              </div>
            </div>
          </div>
          <div class="subscribe__panel subscribe__panel-form">
            <div class="subscribe__form">
              <h3 class="subscribe__form-title">SUBSCRIBE</h3>
              FOR OUR NEWLETTER AND PROMOTION
              <form action="#">
                <input type="email" class="input subscribe__input" placeholder="Enter Your Email" required>
                <button type="submit" class="btn btn__primary btn__subscribe">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-menu">
        <div class="container bottom-menu__container">
          <div class="bottom-menu__panel-left">
            <a href="index.html" class="logo">
              <img src="img/logo.png" alt="logo" class="logo__img">
              <span class="logo__title">BRAN<span class="logo__title_mark">D</span></span>
            </a>
            <p class="bottom-menu__par">
              Objectively transition extensive data rather than cross functional solutions. Monotonectally syndicate
              multidisciplinary materials before go forward benefits. Intrinsicly syndicate an expanded array of
              processes and cross-unit partnerships.</p>
            <p class="bottom-menu__par">Efficiently plagiarize 24/365 action items and focused infomediaries.
              Distinctively seize superior initiatives for wireless technologies. Dynamically optimize.</p>
          </div>
          <div class="bottom-menu__panel-right">
            <div class="bottom-menu__col">
              <h3 class="bottom-menu__h3">COMPANY</h3>
              <ul class="bottom-menu__ul">
                <li class="bottom-menu__li">
                  <a href="index.html" class="bottom-menu__link">Home</a></li>
                <li class="bottom-menu__li">
                  <a href="#" class="bottom-menu__link">Shop</a></li>
                <li class="bottom-menu__li">
                  <a href="#" class="bottom-menu__link">About</a></li>
                <li class="bottom-menu__li">
                  <a href="#" class="bottom-menu__link">How It Works</a></li>
                <li class="bottom-menu__li">
                  <a href="#" class="bottom-menu__link">Contact</a></li>
              </ul>
            </div>
            <div class="bottom-menu__col">
              <h3 class="bottom-menu__h3">INFORMATION</h3>
              <ul class="bottom-menu__ul">
                <li class="bottom-menu__li">
                  <a href="#" class="bottom-menu__link">Tearms & Condition</a></li>
                <li class="bottom-menu__li">
                  <a href="#" class="bottom-menu__link">Privacy Policy</a></li>
                <li class="bottom-menu__li">
                  <a href="#" class="bottom-menu__link">How to Buy</a></li>
                <li class="bottom-menu__li">
                  <a href="#" class="bottom-menu__link">How to Sell</a></li>
                <li class="bottom-menu__li">
                  <a href="#" class="bottom-menu__link">Promotion</a></li>
              </ul>
            </div>
            <div class="bottom-menu__col">
              <h3 class="bottom-menu__h3">SHOP CATEGORY</h3>
              <ul class="bottom-menu__ul">
                <li class="bottom-menu__li">
                  <a href="products.html" class="bottom-menu__link">Men</a></li>
                <li class="bottom-menu__li">
                  <a href="products.html" class="bottom-menu__link">Women</a></li>
                <li class="bottom-menu__li">
                  <a href="products.html" class="bottom-menu__link">Child</a></li>
                <li class="bottom-menu__li">
                  <a href="products.html" class="bottom-menu__link">Apparel</a></li>
                <li class="bottom-menu__li">
                  <a href="products.html" class="bottom-menu__link">Brows All</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer footer__margin">
        <div class="container footer__container">
          <div class="footer__copy">&copy; 2017 Brand All Rights Reserved.</div>
          <div class="socials">
            <a href="#" class="socials__btn socials__btn_enabled">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="socials__btn socials__btn_enabled">
              <i class="fab fa-twitter"></i>
            </a>
            <div class="socials__btn socials__btn_disabled">
              <i class="fab fa-linkedin-in"></i>
            </div>
            <a href="#" class="socials__btn socials__btn_enabled">
              <i class="fab fa-pinterest-p"></i>
            </a>
            <a href="#" class="socials__btn socials__btn_enabled">
              <i class="fab fa-google-plus-g"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  `,
});

Vue.component('cartTable', {
  props: ['itemsList'],
  template: `
    <table class="product-table shopping-cart__table">
      <tr>
        <th class="product-table__title product-table__column-wide product-table__row_border">Product Details
        </th>
        <th class="product-table__title product-table__column-normal product-table__row_border">unite Price</th>
        <th class="product-table__title product-table__column-narrow product-table__row_border">Quantity</th>
        <th class="product-table__title product-table__column-normal product-table__row_border">shipping</th>
        <th class="product-table__title product-table__column-narrow product-table__row_border">Subtotal</th>
        <th class="product-table__title product-table__column-narrow product-table__row_border">ACTION</th>
      </tr>
      <cart-table-item v-for="item in itemsList"
                       :item="item"
                       :key="item.id_product"
       ></cart-table-item>
    </table>
  `,
});

Vue.component('cartTableItem', {
  inject: ['addProductItem', 'setProductQty', 'removeProductItem', 'removeProduct'],
  props: ['item'],
  data() {
    return {
      validQty: this.item.quantity,
      tempImg: 'https://placehold.it/100x115',
    };
  },
  template: `
    <tr>
      <td class="product-table__cell product-table__column-wide product-table__row_border">
        <a href="single.html" class="product-table__product-link">
          <img :src="tempImg" alt="Mango T-Shirt" class="product-table__product-img">
        </a>
        <h3 class="product-table__h3">
          <a href="single.html" class="product-table__product-link">{{ item.product_name }}</a>
        </h3>
        <p class="product-table__product-desc">
          Color: <span class="product-table__product-desc_highlight">Red</span><br>
          Size: <span class="product-table__product-desc_highlight">XL</span>
        </p>
      </td>
      <td class="product-table__cell product-table__row_border"><span class="dollar">{{ item.price }}</span></td>
      <td class="product-table__cell product-table__row_border">
        <input type="number"
               class="product-table__input-quantity"
               min="1" max="99"
               :value="item.quantity"
               @input="setQty()"             
               >
      </td>
      <td class="product-table__cell product-table__text_uppercase product-table__row_border">FREE</td>
      <td class="product-table__cell product-table__row_border">
        <span class="dollar">{{ item.price * item.quantity }}</span>
      </td>
      <td class="product-table__cell product-table__row_border">
        <a href="#" class="cart__item-remove" @click.prevent="removeProduct(item)"></a>
      </td>
    </tr>
  `,
  methods: {
    setQty() {
      const newQty = +event.target.value;
      if (newQty > 0) {
        if ((newQty - this.item.quantity) === 1) {
          this.addProductItem(this.item);
        } else if ((newQty - this.item.quantity) === -1) {
          this.removeProductItem(this.item);
        } else {
          this.setProductQty(this.item, newQty);
        }
      } else {
        event.target.value = this.item.quantity;
      }
    }
  },
});

Vue.component('cartBlock', {
  inject: ['getTotalSum'],
  props: ['itemsList'],
  data() {
    return {
      isVisible: false,
    };
  },
  template: `
    <div class="cart cart__pos">
      <button type="button" class="cart__main-btn" @click="isVisible = !isVisible">
        <img src="img/cart.svg" alt="Cart">
        <span v-if="itemsList.length" class="cart__qty cart__qty_pos">{{ itemsList.length }}</span>
      </button>
      <div v-show="isVisible" class="cart__block cart__sub-menu">
        <span class="cart__block-arrow"></span>
        <div class="cart__column">
          <ul class="cart__list">
            <cart-block-item 
              v-for="item in itemsList"
              :item="item"
              :key="item.id_product"
             >
            </cart-block-item>
          </ul>
          <div v-if="itemsList.length" class="cart__total-block">
            <div>TOTAL</div>
            <div class="dollar cart__total-sum">{{ getTotalSum() }}</div>
          </div>
          <div v-else class="cart__empty">Cart Is Empty</div>
          <a href="checkout.html" class="btn btn__secondary cart__btn">Checkout</a>
          <a href="cart.html" class="btn btn__secondary cart__btn">Go to cart</a>
        </div>
      </div>
    </div>
  `,
});

Vue.component('cartBlockItem', {
  inject: ['removeProductItem'],
  props: ['item'],
  data() {
    return {
      tempImg: 'https://placehold.it/72x85',
    };
  },
  template: `
    <li class="cart__item">
      <a href="single.html">
        <img :src="tempImg" :alt="item.product_name"></a>
      <div class="cart__item-desc">
        <a href="single.html" class="cart__item-title">{{ item.product_name }}</a>
        <img src="img/rating_4-5.png" alt="rating_4-5_stars">
        <p class="cart__item-total">
          <span class="cart__item-qty">{{ item.quantity }}</span> x
          <span class="dollar cart__item-sum">{{ item.price }}</span>
        </p>
      </div>
      <a href="#" class="cart__item-remove" @click.prevent="removeProductItem(item)"></a>
    </li>
  `,
});