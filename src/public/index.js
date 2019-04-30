import '@babel/polyfill';
import 'whatwg-fetch';
import appMain from './js/main.js';
import './css/normalize.css';
import './css/brand-bem.css';
// import cartImage from './img/cart.svg';
//
// (function setCartImg() {
//   const el = document.querySelector('.cart__main-btn');
//   const cartImg = new Image();
//   cartImg.src = cartImage;
//   el.appendChild(cartImg);
// })();

const app = new Vue(appMain);