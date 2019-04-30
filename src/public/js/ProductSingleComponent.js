const productSingle = {
  template: `
    <div class="description container">
      <div class="description__container">
        <h3 class="collection__name">WOMEN COLLECTION</h3>
        <div class="names-separator"></div>
        <h3 class="product__name">Moschino Cheap And Chic</h3>
        <p class="description__text">Compellingly actualize fully researched processes before proactive outsourcing.
          Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel
          core competencies rather than exceptional portals. </p>
        <div class="product-properties">
          <div class="property">
            <span class="text_grey">MATERIAL:</span> COTTON
          </div>
          <div class="property">
            <span class="text_grey">DESIGNER:</span> BINBURHAN
          </div>
          <div class="property-price dollar">561</div>
          <div class="product-options">
            <div class="option">CHOOSE COLOR
              <div class="option__block">
                <div class="attr-color-red option__color-chosen" data-color="red">Red</div>
                <i class="fas fa-angle-down"></i>
                <ul class="option__dropdown">
                  <li class="option__item attr_color_green" data-color="green">Green</li>
                  <li class="option__item attr_color_cyan" data-color="cyan">Cyan</li>
                  <li class="option__item attr_color_yellow" data-color="yellow">Yellow</li>
                </ul>
              </div>
            </div>
            <div class="option">CHOOSE SIZE
              <div class="option__block">
                <div class="option__current-size" data-size="xxl">XXL</div>
                <i class="fas fa-angle-down"></i>
                <ul class="option__dropdown">
                  <li class="option__item" data-size="xl">XL</li>
                  <li class="option__item" data-size="l">L</li>
                  <li class="option__item" data-size="m">M</li>
                  <li class="option__item" data-size="s">S</li>
                  <li class="option__item" data-size="xs">XS</li>
                </ul>
              </div>
            </div>
            <div class="option">QUANTITY
              <input class="option__input" type="number" value="1" min="1" max="99">
            </div>
          </div>
          <button type="button" class="btn btn__primary_inverse btn__options_submit">
            <span class="cart_r">Add to Cart</span></button>
        </div>
      </div>
    </div>
  `,
};

export default productSingle;