<template>
    <div class="left-bar">
        <div>
            <router-link class="rtr-li" to="/update"></router-link>
            <router-link class="rtr-li2" to="/history"></router-link>
            <!-- <img src="../../../assets/img/clipboard.png" alt="" srcset=""> -->
            <img v-on:click="addItem" src="../../../assets/img/add.png" alt="" srcset="">
        </div>
        <div v-if="isActiveAddItem" class="container-chekcout">
            <div class="modal-add-item">
                <div class="add-item-checkout">
                    <span>Add Item</span>
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
                            <option v-for="category in categories" :key="category.id" v-bind:value="category.id">{{category.nameCategory}} {{data2.idCategory}}</option>
                        </select>
                    </div>
                </div>
                <div class="add-item-button">
                    <button v-on:click="cancel">Cancel</button>
                    <button v-on:click="send">Send Add</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <main>
            <div class="card-main" v-for="item in products" :key="item.id">
                <img src="../../../assets/img/foods/food1.jpg" alt="">
                <p>{{item.nameProduct}}</p>
                <p>{{`Rp. ${item.price}`}}</p>
            </div>
        </main>
        <div class="your-cart">
            <div class="container-your-cart">
                <img src="../../../assets/img/food.png" alt="" srcset="">
                <span>Your cart is empty</span>
                <span>Please add some items from the menu</span>
            </div>
        </div> -->
    <!-- </div> -->
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
    //   products: [],
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
  methods: {
    // getData () {
    //   axios.get('http://localhost:4000/api/v1/products')
    //     .then((res) => {
    //       alert('getdata')
    //       this.products = res.data.result
    //     })
    //     .catch(err => alert(err))
    // },
    getCategory () {
      axios.get('http://localhost:4000/api/v1/categories')
        .then((res) => {
          this.categories = res.data.result
        })
        .catch(err => alert(err))
    },
    addItem: function () {
      this.isActiveAddItem = true
    },
    cancel: function () {
      this.isActiveAddItem = false
    },
    sendDataItem: function () {
      const dataItem = {
        idCategory: this.data2.idCategory,
        nameProduct: this.data2.nameProduct,
        price: this.data2.price,
        image: this.data2.image,
        qty: this.data2.qty
      }
      axios.post('http://localhost:4000/api/v1/products', dataItem)
        .then((res) => {
          this.data2.idCategory = ''
          this.data2.nameProduct = ''
          this.data2.price = 0
          this.data2.image = ''
          this.data2.qty = 0
          alert('Saving success')
        //   this.isActiveAddItem = false
        })
        .catch(err => console.log(err))
    },
    send: function () {
      this.$root.$emit('SenndingData', this.sendDataItem)
      alert('sav')
      this.isActiveAddItem = false
    }
  },
  mounted () {
    this.getCategory()
  }
}
</script>

<style scoped>
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

.price input, .price select {
    background: #FFFFFF;
border: 1px solid #CECECE;
box-sizing: border-box;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
border-radius: 5px;
}
</style>
