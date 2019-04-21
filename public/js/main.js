const API = "../server/db/";

const app = new Vue({
  el: '#app',
  methods: {
    getJSON(src) {
      return fetch(src)
        .then(response => response.json());
    },
  },
});