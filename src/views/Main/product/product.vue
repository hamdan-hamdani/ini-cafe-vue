<template>
    <div class="container">
        <div>Halo</div>
        <div v-for="item in products" :key="item.id">
            <!-- <card :name="item.title" :url="item.url" :id="item.id" v-on:toggle-event="clickBtn"> -->
        </div>
    </div>
</template>

<script>
// import Card from '../../../components/_base/card'
import Axios from 'axios'
export default {
  name: 'Product',
  components: {
    // Card
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    clickBtn (val) {
      this.products = this.products.filter((item) => {
        return item.id !== val
      })
    }
  },
  getData () {
    Axios.get('http://localhost:4000/api/v1/products')
      .then((res) => {
        this.products = res.data
      })
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
