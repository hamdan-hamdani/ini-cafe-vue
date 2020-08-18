<template>
    <div class="header">
        <header>
            <img src="../../../assets/img/menu.png" alt="menu">
            <h1>Foods Items</h1>
            <img v-show="search" v-on:click="searchbtn" src="../../../assets/img/search.png" alt="search">
            <div v-show="!search"><input type="text" v-model="wordsearch" @keypress.enter="searchNavbar()" name="" id=""></div>
        </header>
    </div>
</template>

<script>
// import axios from 'axios'

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
      this.$root.$emit('newSearch', this.wordsearch)
      this.wordsearch = ''
    }
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
