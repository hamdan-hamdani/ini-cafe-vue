<template>
    <div class="left-bar">
        <div>
            <router-link class="rtr-li" to="/update"></router-link>
            <router-link class="rtr-li2" to="/history"></router-link>
            <img v-on:click="addItem" src="../../../assets/img/add.png" alt="" srcset="">
            <div @click="rtrli3" class="rtr-li3"></div>
        </div>
        <ModalAddUpdate/>
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ModalAddUpdate from '../modal/modalAddUpdate'
export default {
  name: 'Sidebar',
  data () {
    return {
      categories: [],
      isActiveAddItem: false,
      data2: {
        idCategory: 0,
        nameProduct: '',
        price: 0,
        image: '',
        qty: 0
      }

    }
  },
  components: {
    ModalAddUpdate
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  computed: {
    ...mapGetters(['getlastpage'])
  },
  methods: {
    ...mapMutations(['mutActive', 'mutActiveAddUpdate']),
    ...mapActions(['actAddProduct', 'actAllProducts', 'actNextPage']),
    selectFile () {
      this.data2.image = this.$refs.file.files[0]
    },
    rtrli3 () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    getCategory () {
      axios.get('https://api-inicafe.fwdev.online/api/v1/categories')
        .then((res) => {
          this.categories = res.data.result
        })
        .catch(err => console.log(err))
    },
    addItem: function () {
      this.mutActiveAddUpdate(true)
    },
    sendDataItem: function () {
      const dataItem = {
        idCategory: this.data2.idCategory,
        nameProduct: this.data2.nameProduct,
        price: this.data2.price,
        image: this.data2.image,
        qty: this.data2.qty
      }
      axios.post('https://api-inicafe.fwdev.online/api/v1/products', dataItem)
        .then((res) => {
          this.data2.idCategory = ''
          this.data2.nameProduct = ''
          this.data2.price = 0
          this.data2.image = ''
          this.data2.qty = 0
        })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getCategory()
  }
}
</script>

<style scoped>
.rtr-li3 {
    display: block;
    width: 25px;
    height: 25px;
    background-image: url('../../../assets/img/signout.png');
    background-size: cover;
    box-sizing: border-box;
    margin-top: 25px;
}
.rtr-li2 {
    display: block;
    width: 25px;
    height: 25px;
    background-image: url('../../../assets/img/clipboard.png');
    background-size: cover;
    box-sizing: border-box;
    margin-top: 25px;
}
.rtr-li {
    display: block;
    width: 25px;
    height: 25px;
    background-image: url('../../../assets/img/fork.png');
    background-size: cover;
    box-sizing: border-box;
    margin-top: 25px
}
.left-bar {
    grid-area: left-bar;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.left-bar img {
    display: block;
    margin-top: 25px;
}

/* add-item */
.container-chekcout {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.container-chekcout .modal-add-item {
    width: 35%;
    min-width: 450px;
    height: 500px;
    max-height: 500px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
}

.modal-add-item div {
    flex: 100%;
}

.modal-add-item span {
    font-weight: 600;
}

.modal-add-item .add-item-checkout {
    display: flex;
    flex-wrap: wrap;
}

.add-item-checkout span {
    flex: 1;
}

.add-item-checkout span:nth-child(2) {
    flex: .7;
    justify-self: end;
}

.modal-add-item .add-item-name {
    display: grid;
    grid-template-areas: "name price";
    grid-template-columns: minmax(150px, .5fr) minmax(150px, 1fr);
    grid-template-rows: .5fr;
}

.modal-add-item .add-item-name label,
.modal-add-item .add-item-name input,
.modal-add-item .add-item-name select {
    display: block;
    margin-top: 10px;
    font-weight: 600;
    padding: 10px;
    box-sizing: border-box;
}

.modal-add-item .add-item-name input {
    width: 288px;
}

.add-item-name select {
    color: #CECECE;
}

.add-item-name .name {
    grid-area: name;
}

.add-item-name .price {
    grid-area: price;
    justify-self: end;
}

.add-item-name .total {
    grid-area: total;
    align-self: start;
    justify-self: end;
}

.add-item-button {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}

.add-item-button button {
    padding: 10px;
    color: #ffffff;
    width: 107px;
    border: none;
    border-radius: 5px;
    background: #57CAD5;
}

.add-item-button span:nth-child(3) {
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
}

.add-item-button button:first-of-type {
    background: #F24F8A;
    margin-right: 10px;
}

.price input, .price select {
    background: #FFFFFF;
border: 1px solid #CECECE;
box-sizing: border-box;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
border-radius: 5px;
}
</style>
