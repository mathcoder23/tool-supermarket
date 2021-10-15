import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
FastClick.attach(document.body);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
