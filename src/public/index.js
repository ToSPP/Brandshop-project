import '@babel/polyfill';
import 'whatwg-fetch';
import appMain from './js/main.js';
import './css/normalize.css';
import './css/brand-bem.css';

const app = new Vue(appMain);