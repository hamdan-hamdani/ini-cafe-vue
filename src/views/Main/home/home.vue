<template>
    <div class="container">
      <Navbar/>
      <Cart/>
      <SideBar v-on:clicked-item="aData"/>
      <Mainmenu v-bind:kmn="dd"/>
    </div>
</template>

<script>
import Navbar from '../../../../src/components/_base/navbar/navbar'
import Cart from '../../../../src/components/_base/navbar/cart'
import SideBar from '../../../../src/components/_base/sidebar/sidebar'
import Mainmenu from '../../../../src/components/_base/mainmenu/mainmenu'
import { mapMutations } from 'vuex'
export default {
  name: 'Home',
  components: {
    Navbar,
    Cart,
    SideBar,
    Mainmenu
  },
  mounted () {
    this.mutNavTitle('Foods Item')
  },
  data: function () {
    return {
      products: [],
      dd: ''
    }
  },
  methods: {
    ...mapMutations(['mutNavTitle']),
    aData: function (data) {
      this.dd = data
      console.log(this.dd)
      console.log(data + ' ayam')
    }
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
}

.container {
    display: grid;
    grid-template-areas:
        "header header cart"
        "left-bar main main";
    grid-template-columns: 0.13fr 2fr 1.1fr;
    font-size: 15px;
}

.container img {
    width: 25px;
    height: 25px;
}

/* responsive  */

@media (max-width : 768px) {
    .container {
        display: grid;
        grid-template-areas:
            "header header header"
            "left-bar main main";
        grid-template-columns: 0.13fr 2fr 1.5fr;
        font-size: 15px;
    }

    .cart {
        display: none;
    }

    .your-cart {
        display: none;
    }
}

@media (max-width : 576px) {
    .container {
        display: grid;
        grid-template-areas:
            "header header"
            "main main";
        grid-template-columns: 0.13fr 2fr;
    }

    .cart {
        display: none;
    }

    .left-bar {
        display: none;
    }

    .your-cart {
        display: none;
    }

    main .card-main {
        display: inline-block;
        width: 50% !important;
        margin-bottom: 10px;
    }

    .container main img {
        width: 95%;
        height: 160px;
        max-height: 160px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

}
</style>
