<template>
    <div class="container">
        <!-- <header>
            <img src="../../../assets/img/menu.png" alt="menu">
            <h1>Foods Items</h1>
            <img src="../../../assets/img/search.png" alt="search">
        </header> -->
        <Navbar/>
        <Cart/>
        <Sidebar/>
        <!-- <Main/> -->
        <!-- <div class="cart">
            <span class="title">Cart</span>
            <span class="badge">0</span>
        </div> -->
        <!-- <div> -->
            <!-- <div>
                <div>
                <router-link class="rtr-li" to="/update"></router-link>
                </div>
                <img src="../../../assets/img/clipboard.png" alt="" srcset="">
                <img v-on:click="addItem" src="../../../assets/img/add.png" alt="" srcset="">
            </div> -->
            <div v-if="isActiveEdit" class="container-chekcout">
                <div class="modal-add-item">
                    <div class="add-item-checkout">
                        <span>Edit Item</span>
                    </div>
                    <div class="add-item-name">
                        <div class="name">
                            <label for="name">Name</label>
                            <label for="image">Image</label>
                            <label for="price">Price</label>
                            <label for="qty">Qty</label>
                            <label for="category">Category</label>
                        </div>
                        <div class="price">
                            <input type="text" v-model="data2.nameProduct" name="name" id="name">
                            <input type="text" v-model="data2.image" name="image" id="image">
                            <input type="number" v-model="data2.price" name="price" id="price">
                            <input type="text" v-model="data2.qty" id="qty">
                            <select name="category" id="category" v-model="data2.idCategory" >
                                <option v-for="category in categories" :key="category.id" v-bind:value="category.id"> {{category.nameCategory}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="add-item-button">
                        <button v-on:click="cancelEdit">Cancel</button>
                        <button v-on:click="sendEdit">Edit</button>
                    </div>
                </div>
            </div>
        <!-- </div> -->
        <div class="main">
            <main>
              <div class="card-main" v-for="item in products" :key="item.id" >
                    <img src='../../../assets/img/foods/food1.jpg' alt="">
                    <p>{{item.nameProduct}}</p>
                    <p>{{`Rp. ${item.price}`}}</p>
                    <!-- <p>{{item.id}}</p> -->
                    <div class="btn">
                    <button v-on:click="editData(item.id,item.idCategory,item.nameProduct,item.price,item.image,item.qty)">Edit</button>
                    <button v-on:click="deleteData(item.id)">Delete</button>
                    </div>
                </div>
<!-- <Card/> -->
            </main>
            <!-- <div class="your-cart">
            </div> -->
    </div>
    </div>
</template>

<script>

import axios from 'axios'
// import Card from '../../../components/_base/card'
import Navbar from '../../../components/_base/navbar/navbar'
import Cart from '../../../components/_base/navbar/cart'
import Sidebar from '../../../components/_base/sidebar/sidebar'
require('dotenv').config()
// import Main from '../../../components/_base/mainmenu/mainmenu'
export default {
  name: 'Update',
  components: {
    // Card,
    Navbar,
    Cart,
    Sidebar
    // Main
  },
  data () {
    return {
      products: [],
      categories: [],
      currentproduct: [],
      //   qty: 1,
      //   indexCard: 1,
      qtys: [],
      total: [],
      ttop: 0,
      isActive: false,
      data2: {
        id: 0,
        nameProduct: '',
        image: '',
        price: 0,
        qty: 0,
        idCategory: 0
      },
      isActiveAddItem: false,
      isActiveEdit: false
    }
  },
  methods: {
    addItem: function () {
      this.isActiveAddItem = true
    },
    getCategory () {
      axios.get('http://localhost:4000/api/v1/categories')
        .then((res) => {
          this.categories = res.data.result
        })
        .catch(err => console.log(err))
    },
    getData () {
      axios.get('http://localhost:4000/api/v1/products')
        .then((res) => {
          this.products = res.data.result
        })
        .catch(err => alert(err))
      this.getCategory()
    },
    editData (id, idCategory, nameProduct, price, image, qty) {
      this.data2.nameProduct = nameProduct
      this.data2.idCategory = idCategory
      this.data2.price = price
      this.data2.image = image
      this.data2.qty = qty
      this.data2.id = id
      this.isActiveEdit = true
    },
    deleteData (id) {
    //   alert('Yakin mau menghapus ?')
      axios.delete('http://localhost:4000/api/v1/products/' + id)
        .then((res) => {
        //   this.categories = res.data.result
          alert('Delete success' + this.data2.id)
          this.isActiveEdit = false
          this.getData()
        })
        .catch(err => console.log(err))
    },
    cancelEdit () {
      this.isActiveEdit = false
    },
    sendEdit () {
      const dataEdit = {
        idCategory: this.data2.idCategory,
        nameProduct: this.data2.nameProduct,
        price: this.data2.price,
        image: this.data2.image,
        qty: this.data2.qty
      }
      //   console.log(process.env.SEND_EDIT)
      axios.patch('http://localhost:4000/api/v1/products/' + this.data2.id, dataEdit)
        .then((res) => {
        //   this.categories = res.data.result
        // 'http://localhost:4000/api/v1/products/'
          alert('Edit success' + this.data2.id)
          this.isActiveEdit = false
          this.getData()
        })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getData()
  },
  created () {
    this.$root.$on('newTask', task => {
      alert(task)
    })
  }
}
</script>

<style scoped>
.rtr-li {
    display: block;
    width: 25px;
    height: 25px;
    background-image: url('../../../assets/img/fork.png');
    background-size: cover;
    box-sizing: border-box;
}
.container {
    display: grid;
    grid-template-areas:
        "header header cart"
        "left-bar main main";
    grid-template-columns: 0.13fr 2fr 1.5fr;
    font-size: 15px;
}

.container img {
    width: 25px;
    height: 25px;
}

/* header */
/* .header {
    grid-area: header;
} */
header {
    grid-area: header;
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

/* cart */
.cart {
    grid-area: cart;
    padding-top: 20px;
    text-align: center;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
}

.cart span {
    font-size: 20px;
    font-weight: 200;
}

.cart .badge {
    font-size: 15px;
    background-color: #57CAD5;
    color: #ffffff;
    border-radius: 50%;
}

/* left bar || side bar */
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
    /* border: 1px solid red; */
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
    /* display: block; */
    padding: 10px;
    /* width: 100%; */
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
    /* margin-top: 10px; */
}

main {
      grid-area: main;
      /* border: 1px solid red; */
      box-sizing: border-box;
      /* display: grid;
    grid-template-areas:
        "main your-cart";
    grid-template-columns: 1.34fr 1fr ; */
}

main {
    background: rgba(190, 195, 202, 0.3);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* width: 57.2%; */
    box-sizing: border-box;
}

main .card-main {
    display: inline-block;
    width: 30% !important;
    margin-bottom: 10px;
    background-color: #ffffff;
    padding: 5px;
    box-sizing: border-box;
}

.card-main p {
    margin-top: 5px;
}

.card-main p:nth-child(3) {
    font-weight: 600;
    margin-bottom: 5px;
}

.card-main .btn {
    display: flex;
    justify-content: space-between;
}

.card-main button {
    padding: 5px 30px;
    background-color: #57CAD5;
    border: none;
    border-radius: 3px;
    color: #fff;
}

.container main img {
    width: 100%;
    height: 160px;
    max-height: 160px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.your-cart {
    grid-area: your-cart;
    margin-top: 55px;
    /* display: inline-block; */
    /* border: 1px solid black; */
    box-sizing: border-box;
}

.container-your-cart {
    width: 50%;
    margin: auto;
    text-align: center;
}

.your-cart .container-your-cart img {
    width: 50%;
    min-width: 118px;
    height: 125px;
    max-height: 125px;
    margin: 0 auto;
}

.your-cart {
    width: 100%;
    /* margin: 0 auto; */
    margin-top: 10px;
    /* border: 1px solid; */
    box-sizing: border-box;
    text-align: left;
}

.your-cart .item-cart {
    padding: 15px;
    /* border: 1px solid red; */
    box-sizing: border-box;
    display: grid;
    grid-template-areas:
        "img item-name item-name"
        "img button item-price";
    grid-template-columns: .5fr 2fr 1.5fr;
}

.your-cart .item-cart img {
    grid-area: img;
    width: 100%;
    /* min-width: 118px; */
    /* border: 1px solid; */
    height: 60px;
    max-height: 60px;
}

.your-cart .item-cart .item-name {
    grid-area: item-name;
    margin-left: 10px;
}

.your-cart .item-cart .button {
    grid-area: button;
    margin-left: 10px;
    justify-self: start;
    align-self: end;
    /* background-color: rgba(130, 222, 58, 0.2); */
}

.your-cart .item-cart .item-price {
    grid-area: item-price;
    justify-self: end;
    align-self: end;
}

.item-cart .button button {
    width: 25px;
    height: 25px;
    color: #82DE3A;
    border: none;
    font-size: 20px;
    background-color: rgba(130, 222, 58, 0.2);
    ;
}

.item-cart .button input {
    width: 50px;
    height: 25px;
    color: #82DE3A;
    background-color: rgba(130, 222, 58, 0.2);
    ;
    border: none;
    text-align: center;
}

.your-cart span {
    display: block;
    font-size: 20px;
}

.your-cart .item-cart .button input {
    display: inline-block;
    font-size: 21px;
    /* width: 20px; */
}

.your-cart span:nth-child(3) {
    font-size: 12px;
    color: #CECECE;
}

.your-cart .bottom {
    padding: 15px;
    /* border: 1px solid red; */
    box-sizing: border-box;
    margin-top: 157px !important;
}

.bottom .total {
    display: flex;
    flex-wrap: wrap;
    /* border: 1px solid green; */
    box-sizing: border-box;
}

.bottom .total span:first-of-type {
    flex: 1;
}

.bottom .total span:nth-child(3) {
    flex: 100%;
    color: #000000;
}

.bottom .button-bottom button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
    box-sizing: border-box;
    color: #ffffff;
    font-size: 17px;
    background-color: #F24F8A;
}

.bottom .button-bottom button:first-of-type {
    background-color: #57CAD5;
}

/* checkout */
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

.container-chekcout .modal-checkout {
    width: 50%;
    min-width: 450px;
    height: 500px;
    max-height: 500px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    /* border: 1px solid red; */
}

.modal-checkout div {
    flex: 100%;
}

.modal-checkout span {
    font-weight: 600;
}

.modal-checkout .item-checkout {
    display: flex;
    flex-wrap: wrap;
}

.item-checkout span {
    flex: 1;
}

.item-checkout span:nth-child(2) {
    flex: .7;
    justify-self: end;
}

.modal-checkout .item-name {
    display: grid;
    grid-template-areas: "name price";
        /* "total total"; */
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    grid-template-rows: .5fr;
}

.modal-checkout .item-name span {
    display: block;
    margin-top: 10px;
}

.item-name .name {
    grid-area: name;
}

.item-name .price {
    grid-area: price;
    justify-self: end;
}

/* .item-name */
 .total {
    /* grid-area: total; */
    /* align-self: start;
    justify-self: end; */
    text-align: right;
}

.item-button button {
    display: block;
    padding: 20px;
    width: 100%;
    border: none;
    border-radius: 5px;
    background: #57CAD5;
}

.item-button span:nth-child(3) {
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
}

.item-button button:first-of-type {
    background: #F24F8A;
    margin-top: 10px;
}

/* responsive  */

@media (max-width : 768px) {
    .container-admin {
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
    .container-admin {
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

    .container-admin main img {
        width: 95%;
        height: 160px;
        max-height: 160px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

}
</style>
