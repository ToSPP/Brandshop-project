Vue.component('catalog', {
  data() {
    return {
      catalogUrl: 'catalog.json',
    };
  },
  template: `
    <div class="container catalog__container">
      <catalog-menu :catalog-url="catalogUrl"></catalog-menu>
      <!--<div class="catalog">
        <div class="catalog__filters">
          <div class="filter">
            <h3 class="filter__h3">Trending now</h3>
            <ul class="filter__list filter__trending">
              <li class="filter__item">
                <a href="#" class="filter__link">Bohemian</a>
              </li>
              <li>|</li>
              <li class="filter__item">
                <a href="#" class="filter__link">Floral</a>
              </li>
              <li>|</li>
              <li class="filter__item">
                <a href="#" class="filter__link">Lace</a>
              </li>
              <li class="row-divider"></li>
              <li class="filter__item">
                <a href="#" class="filter__link">Floral</a>
              </li>
              <li>|</li>
              <li class="filter__item">
                <a href="#" class="filter__link">Lace</a>
              </li>
              <li>|</li>
              <li class="filter__item">
                <a href="#" class="filter__link">Bohemian</a>
              </li>
            </ul>
          </div>
          <div class="filter">
            <h3 class="filter__h3">Size</h3>
            <div class="filter__sizes">
              <label class="filter__checkbox">
                <input type="checkbox" id="filter_size_xxs">
                <span class="filter__checkbox-title">XXS</span></label>
              <label class="filter__checkbox">
                <input type="checkbox" id="filter_size_xs">
                <span class="filter__checkbox-title">XS</span></label>
              <label class="filter__checkbox">
                <input type="checkbox" id="filter_size_s">
                <span class="filter__checkbox-title">S</span></label>
              <label class="filter__checkbox">
                <input type="checkbox" id="filter_size_m">
                <span class="filter__checkbox-title">M</span></label>
              <div class="trend_row_divider"></div>
              <label class="filter__checkbox">
                <input type="checkbox" id="filter_size_l">
                <span class="filter__checkbox-title">L</span></label>
              <label class="filter__checkbox">
                <input type="checkbox" id="filter_size_xl">
                <span class="filter__checkbox-title">XL</span></label>
              <label class="filter__checkbox">
                <input type="checkbox" id="filter_size_xxl">
                <span class="filter__checkbox-title">XXL</span></label>
            </div>
          </div>
          <div class="filter">
            <h3 class="filter__h3">pRICE</h3>
            <form oninput="priceShow.value=priceRange.value">
              <input type="range" class="price_range" value="1" name="priceRange" min="1" max="700">
              <output class="dollar" name="priceShow">1</output>
            </form>
          </div>
        </div>
        <div class="catalog__sort">
          <div>
            <span class="sort__block sort__title">Sort By</span>
            <div class="sort__block sort__options">
            <span id="sortBy" class="sort__value caret-down"
                  data-sortby="name">Name</span>
              <ul class="sort__list">
                <li class="sort__item" data-sortby="name">Name</li>
                <li class="sort__item" data-sortby="price">Price</li>
                <li class="sort__item" data-sortby="rating">Rating</li>
              </ul>
            </div>
          </div>
          <div>
            <span class="sort__block sort__title">Show</span>
            <div class="sort__block sort__options">
            <span id="showBy" class="sort__value caret-down"
                  data-showby="9">09</span>
              <ul class="sort__list">
                <li class="sort__item" data-showby="3">03</li>
                <li class="sort__item" data-showby="6">06</li>
                <li class="sort__item" data-showby="9">09</li>
                <li class="sort__item" data-showby="12">12</li>
                <li class="sort__item" data-showby="15">15</li>
              </ul>
            </div>
          </div>
        </div>
        <products :catalog-url="catalogUrl"></products>
        <div class="pagination__wrap">
          <ul class="pagination">
            <li>
            <span class="pagination__link_disabled">
              <i class="fas fa-angle-left"></i></span>
            </li>
            <li>
              <a href="#" class="pagination__link pagination__link_active">1</a>
            </li>
            <li>
              <a href="#" class="pagination__link">2</a></li>
            <li>
              <a href="#" class="pagination__link">3</a></li>
            <li>
              <a href="#" class="pagination__link">4</a></li>
            <li>
              <a href="#" class="pagination__link">5</a></li>
            <li>
              <a href="#" class="pagination__link">6.....20</a></li>
            <li>
              <a href="#" class="pagination__link">
                <i class="fas fa-angle-right"></i></a></li>
          </ul>
          <a href="#" class="btn__primary_inverse btn__view-all">View All</a>
        </div>
      </div>-->
    </div>
  `,
});

Vue.component('catalog-menu', {
  props: ['catalogUrl'],
  data() {
    return {
      url: this.catalogUrl,
      menuItems: [],
    };
  },
  template: `
    <div class="catalog-menu">
      <div class="catalog-menu__block"
           v-for="(item, i) in menuItems"
           :key="i">
        <catalog-menuitem :item="item" ref="menuitem"></catalog-menuitem>
      </div>
    </div>
  `,
  methods: {
    splitToItems(data) {
      const items = {
        category: {},
        brand: {},
        designer: {},
      };

      for (const item of data) {
        if (item.category) items.category[item.category] = '';
        if (item.brand) items.brand[item.brand] = '';
        if (item.designer) items.designer[item.designer] = '';
      }

      for (let key in items) {
        const item = {};
        item[key] = Object.keys(items[key]);
        this.menuItems.push(item);
      }
    },
  },
  mounted() {
    this.$root.getJSON(`${API + this.url}`)
      .then(data => {
        this.splitToItems(data);
      });
  },
});

Vue.component('catalog-menuitem', {
  props: ['item'],
  data() {
    return {
      isVisible: false,
    };
  },
  template: `
    <div>
      <h3 class="catalog-menu__title"
          @click="showList"
       >{{ getTitleItem(item) }}</h3>
      <ul class="catalog-menu__list"
          v-show="isVisible"
       >     
        <li class="catalog-menu__item"
            v-for="(value, j) in Object.values(item)[0]"
            :key="j">
          <a href="#" class="catalog-menu__link">{{ value }}</a>
        </li>
      </ul>
    </div>
  `,
  methods: {
    getTitleItem(obj) {
      let title = Object.keys(obj)[0];
      return title.charAt(0).toUpperCase() + title.slice(1);
    },
    showList() {
      if (this.isVisible) {
        this.isVisible = false;
      } else {
        for (const item of this.$parent.$refs.menuitem) {
          item.isVisible = false;
        }
        this.isVisible = true;
      }
    }
  },
});

Vue.component('catalog-filters', {

});

Vue.component('catalog-sort', {

});