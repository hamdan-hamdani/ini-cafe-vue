<template>
    <div class="container">
        <div>Halo</div>
        <div v-for="item in products" :key="item.id">
        </div>
    </div>
</template>

<script>
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
    Axios.get('http://api-inicafe.fwdev.online/api/v1/products')
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
