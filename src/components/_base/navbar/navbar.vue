<template>
    <div class="header">
        <header>
            <div v-on:click="humMenu"><img src="../../../assets/img/menu.png" alt="menu"></div>
            <div v-if="getActiveHumMenu" class="hum-menu">
              <ul>
                <li><router-link to="/">Home</router-link></li>
                <li v-on:click="addItem">Insert Data</li>
                <li><router-link class="rtr-li" to="/update">Update Data</router-link></li>
                <li><router-link class="rtr-li2" to="/history">History</router-link></li>
              </ul>
            </div>
            <h1>Foods Items</h1>
            <div class="shopping-cart" v-on:click="checkout">
              <span class="badge">{{gettotalCart}}</span>
              <img src="../../../assets/img/shopping-cart-solid.svg" alt="" srcset="">
            </div>
            <img class="search-menu" v-show="search" v-on:click="searchbtn" src="../../../assets/img/search.png" alt="search">
            <div class="search-menu" v-show="!search"><input type="text" v-model="wordsearch" @keyup="searchNavbar" name="" id=""></div>
        </header>
        <ModalAddUpdate/>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ModalAddUpdate from '../modal/modalAddUpdate'
export default {
  name: 'Navbar',
  data () {
    return {
      search: true,
      wordsearch: ''
      // ishumMenu: false
    }
  },
  components: {
    ModalAddUpdate
  },
  methods: {
    ...mapMutations(['mutActiveAddUpdate', 'mutHumMenu', 'mutHumMenu', 'mutIsActiveCartNavbar']),
    checkout: function () {
      this.mutIsActiveCartNavbar(true)
    },
    addItem: function () {
      this.mutHumMenu(false)
      this.mutActiveAddUpdate(true)
    },
    humMenu: function () {
      if (this.getActiveHumMenu === true) {
        this.mutHumMenu(false)
      } else if (this.getActiveHumMenu === false) {
        this.mutHumMenu(true)
      }
    },
    searchbtn: function () {
      this.search = false
    },
    searchNavbar () {
      this.actSearch(this.wordsearch)
    },
    ...mapActions(['actSearch'])
  },
  computed: {
    ...mapGetters(['getSearch', 'getActiveHumMenu', 'gettotalCart'])
  }
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

.hum-menu {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  background: #fff;
  width: 50%;
  position: absolute;
  top: 40px;
}

.hum-menu ul {
  list-style-type: none;
}

.hum-menu ul li {
  padding: 10px;
}

.hum-menu ul li a {
  text-decoration: none;
  color: #000;
}

.badge {
    font-size: 10px;
    background-color: #57CAD5;
    color: #ffffff;
    border-radius: 50%;
    padding: 1%;
    display: inline-block;
    width: 10px;
    height: 10px;
    text-align: center;
    line-height: 10px;
    position: absolute;
    top: 10px;
    right: 10px;
}
.shopping-cart {
  display: none;
}

@media only screen and (max-width: 576px) {
  .search-menu {
    display: none;
  }
  .shopping-cart {
    display: inline-block;
    width: 25px;
    height: 25px;
  }
  .shopping-cart img {
    object-fit: cover;
    object-position: center;
  }
}
</style>
