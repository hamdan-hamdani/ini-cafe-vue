<template>
    <div class="header">
        <header>
            <router-link to="/"><img src="../../../assets/img/menu.png" alt="menu"></router-link>
            <h1>Foods Items</h1>
            <img v-show="search" v-on:click="searchbtn" src="../../../assets/img/search.png" alt="search">
            <div v-show="!search"><input type="text" v-model="wordsearch" @keyup="searchNavbar" name="" id=""></div>
        </header>
    </div>
</template>

<script>
// import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Navbar',
  data () {
    return {
      search: true,
      wordsearch: ''
    }
  },
  methods: {
    searchbtn: function () {
      this.search = false
    },
    searchNavbar () {
      // this.$root.$emit('newSearch', this.wordsearch)
      // this.wordsearch = ''
      this.actSearch(this.wordsearch)
    },
    ...mapActions(['actSearch'])
  },
  computed: {
    ...mapGetters(['getSearch'])
  }
  //   data () {
  //     return {
  //       products: []
  //     }
  //   },
  //   methods: {
  //     getData () {
  //     //   axios.get('https://jsonplaceholder.typicode.com/photos')
  //       axios.get('http://localhost:4000/api/v1/products')
  //         .then((res) => {
  //           this.products = res.data.result
  //         })
  //         .catch(err => alert(err))
  //     }
  //   },
  //   mounted () {
  //     this.getData()
  //   }

}
</script>

<style scoped>
.header {
    grid-area: header;
}
header {
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    padding: 20px;
    display: flex;
}

header h1 {
    font-size: 1.5em;
    font-weight: 200;
    flex: 5;
    display: flex;
    justify-content: center;

}
</style>
