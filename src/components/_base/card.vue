<template>
    <div class="card-main">
        <div v-for="item in products" :key="item.id" >
            <img src='../../assets/img/foods/food1.jpg' alt="">
            <p>{{item.nameProduct}}</p>
            <p>{{`Rp. ${item.price}`}}</p>
            <p>{{item.id}}</p>
            <button v-on:click="editData(item.id,item.idCategory,item.nameProduct,item.price,item.image,item.qty)">Edit</button>
            <button v-on:click="deleteData(item.id)">Delete</button>
        </div>
        <input type="text" v-model="task" @keypress.enter="addNewTask()">
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
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Card',
  props: ['name', 'url', 'id'],
  data () {
    return {
      products: [],
      isActiveEdit: false,
      task: ''
    }
  },
  methods: {
    addNewTask () {
      this.$root.$emit('newTask', this.task)
      this.task = ''
    },
    getData () {
      axios.get('https://api-inicafe.fwdev.online/api/v1/products')
        .then((res) => {
          this.products = res.data.result
        })
        .catch(err => console.log(err))
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
      axios.delete('https://api-inicafe.fwdev.online/api/v1/products/' + id)
        .then((res) => {
          this.isActiveEdit = false
          this.getData()
        })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
.card {
    margin: 10px !important
}
</style>
