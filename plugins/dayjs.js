import Vue from 'vue'
import dayjs from 'dayjs'
Vue.filter('date', (value, formater = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(formater)
})