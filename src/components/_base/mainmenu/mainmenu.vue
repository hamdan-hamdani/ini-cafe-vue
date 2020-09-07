<template>
<div class="main">
    <!-- <div class="sort">
      <select @change="sorting" name="sort" id="sort" v-model="sorti" >
        <option v-for="(sort, index) in sorts" :key="index" v-bind:value="sort">{{sort}}</option>
      </select>
    </div> -->
    <main>
      <div class="sort">
      <select @change="sorting" name="sort" id="sort" v-model="sorti" >
        <option v-for="(sort, index) in sorts" :key="index" v-bind:value="sort">{{sort}}</option>
      </select>
      </div>
      <div class="card-main" v-for="(item, index) in getProductsAll" :key="item.id" v-on:click="currentItem(item.image,item.nameProduct,item.price, index, item.id)">
        <img v-bind:src="item.image" alt="">
        <p>{{item.nameProduct }}</p>
        <p>{{`Rp. ${item.price}`}}</p>
      </div>
      <ButtonPagination/>
      <Modal/>
      <!-- <div class="container-nav">
        <div class="prev"> Prev </div>
        <div v-for="(page, index) in getlastpage" :key="index">
          <span @click="nextPage(page)">{{page}}</span>
        </div>
        <div class="next">Next</div>
      </div> -->
    </main>
    <div class="your-cart">
        <div class="container-your-cart" v-if="currentproduct.length === 0">
            <img src="../../../assets/img/food.png" alt="" srcset="">
            <span>Your cart is empty </span>
            <span>Please add some items from the menu</span>
        </div>
        <div v-else>
        <div class="item-cart" v-for="(nproduct, index) in currentproduct" :key="nproduct.index">
          <img class="img" :src="nproduct.image" alt="" srcset="">
          <span class="item-name">{{ nproduct.nProduct }}  {{nproduct.index}} <span @click="delItem(index, nproduct.index)">X</span></span>
          <div class="button">
              <button v-on:click="buttonMin(nproduct.index, nproduct.pp)">-</button><input type="text" v-model="qtys[nproduct.index]"><button v-on:click="buttonAdd(nproduct.index, nproduct.pp)">+</button>
          </div>
          <span class="item-price">Rp. {{ qtys[nproduct.index] * nproduct.pp }}</span>
        </div>
        <div class="bottom">
          <div class="total">
              <span>Total</span>
              <span>Rp. {{ttop }} *</span>
              <span>*Belum termasuk ppn</span>
          </div>
          <div class="button-bottom">
              <button v-on:click="checkout">Checkout</button>
              <button v-on:click="cancel">Cancel</button>
          </div>
        </div>
        </div>
    </div>
    <div v-if="isActive" class="container-chekcout">
      <div class="modal-checkout">
        <div class="item-checkout">
          <span>Checkout <br>Cashier : Pevita Pearce</span>
          <span>Receipt no: #010410919</span>
        </div>
        <div class="item-name" v-for="(nproduct, index) in currentproduct" :key="index">
          <div class="name">
            <span>{{nproduct.nProduct}}</span>
          </div>
          <div class="price">
            <span>{{ qtys[nproduct.index] * nproduct.pp }}</span>
          </div>
        </div>
        <div class="total">
          <span>Total : Rp. {{ttop }}</span>
        </div>
        <div class="item-button">
          <span>Payment: Cash</span>
          <button v-on:click="print">Print</button>
          <span>Or</span>
          <button>Send Email</button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import Modal from '../modal/modal'
import ButtonPagination from '../button/buttonPagination'
import axios from 'axios'
import navbar from '../navbar/navbar'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Mainmenu',
  components: {
    ButtonPagination,
    Modal
  },
  // props: [
  //   'kmn'
  // ],
  mixins: [navbar],
  data () {
    return {
      products: [],
      currentproduct: [],
      qty: 1,
      indexCard: 1,
      qtys: [],
      total: [],
      ttop: 0,
      isActive: false,
      // teangKata: '',
      totalCart: [],
      sorti: '',
      sorts: ['A - Z', 'Z - A', 'Price A-Z', 'Price Z-A']
    }
  },
  computed: {
    // filterProduct: function (value) {
    //   console.log(value)
    //   console.log(this.teangKata)
    //   const carib = this.products.filter(res => res.nameProduct.match(this.getSearch))
    //   console.log(carib)
    //   return carib
    // },
    ...mapGetters(['gettotalCart, getSearch', 'getProductsAll', 'getPage', 'getLimit', 'getTotalProducts', 'getlastpage'])
  },
  methods: {
    sorting () {
      // let sort = ''
      if (this.sorti === 'A - Z') {
        axios.get('http://localhost:4000/api/v1/products/?sort=nameProduct&order=asc')
          .then(res => {
            this.setProduct(res.data.result)
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this.sorti === 'Z - A') {
        axios.get('http://localhost:4000/api/v1/products/?sort=nameProduct&order=desc')
          .then(res => {
            this.setProduct(res.data.result)
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this.sorti === 'Price A-Z') {
        axios.get('http://localhost:4000/api/v1/products/?sort=price&order=asc')
          .then(res => {
            this.setProduct(res.data.result)
          })
          .catch(err => {
            console.log(err)
          })
      } else if (this.sorti === 'Price Z-A') {
        axios.get('http://localhost:4000/api/v1/products/?sort=price&order=desc')
          .then(res => {
            this.setProduct(res.data.result)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    ...mapMutations(['settotalCart', 'setProduct']),
    ...mapActions(['actAllProducts', 'actNextPage']),
    nextPage (page) {
      alert('Page berikutnya ' + page)
      this.actNextPage(page)
    },
    getData () {
      axios.get(process.env.VUE_APP_PRODUCT)
        .then((res) => {
          this.products = res.data.result
        })
        .catch(err => alert(err))
    },
    delItem (index, id) {
      alert('hapus item ' + index + ' ' + id)
      this.currentproduct.splice(index, 1)
      alert(this.qtys[id])
      for (let i = 1; i <= this.qtys[id]; i++) {
        this.totalCart.pop()
        this.$store.commit('settotalCart', this.totalCart.length)
      }
      alert(id + ' id')
      this.total.splice(id, 1)
      this.qtys.splice(id, 1, undefined)
      console.log(this.total)
      console.log('yaya')
      console.log(this.total.length)
      const ttop = this.total.reduce((ind1, ind2) => {
        console.log(ind1 + ' ' + ind2 + ' ind1 ind2')
        if (ind1 !== 'empty' && ind2 !== 'empty') return ind1 + ind2
        return 0
      })
      this.ttop = ttop
    },
    currentItem: function (img, name, price, index, id) {
      const hsl = this.totalCart.find(e => e === id)
      console.log(hsl, ' hasl id')
      if (hsl) {
        this.qtys[index] = this.qtys[index] + 1
        console.log(`qtys[${id}]` + this.qtys[index])
        console.log('sebelum total ')
        console.log(this.total)
        const nana = this.qtys[index] * price
        this.total[index] = nana
        console.log('sesudah total ')
        console.log(this.total)
        const ttop = this.total.reduce((ind1, ind2) => ind1 + ind2)
        this.ttop = ttop
        this.totalCart.push(id)
        this.$store.commit('settotalCart', this.totalCart.length)
      } else {
        this.qtys[index] = 1
        this.totalCart.push(id)
        this.$store.commit('settotalCart', this.totalCart.length)
        if (this.total.length !== 0) {
          console.log('sebelum push')
          console.log(this.total)
          this.total[index] = price
          console.log('sesudah push')
          console.log(this.total)
          const ttop = this.total.reduce((ind1, ind2) => ind1 + ind2)
          this.ttop = ttop
          console.log('jumlah ada')
          console.log(this.ttop)
        } else {
          console.log(' else sebelum total')
          console.log(this.total)
          this.ttop += price
          this.total[index] = this.ttop
          console.log('else sesudah total push')
          console.log(this.total)
          console.log('jumlah else')
          console.log(this.ttop)
        }
        console.log(this.qtys[index])
        const dt = { image: img, nProduct: name, pp: price, id: id, index: index }
        this.currentproduct.push(dt)
        console.log(this.currentproduct)
        console.log('length')
        console.log(this.currentproduct.length)
      }
      console.log('index card ' + index)
    },
    buttonAdd: function (id, price) {
      this.qtys[id] = this.qtys[id] + 1
      console.log(`qtys[${id}]` + this.qtys[id])
      console.log('sebelum total ')
      console.log(this.total)
      const nana = this.qtys[id] * price
      this.total[id] = nana
      console.log('sesudah total ')
      console.log(this.total)
      const ttop = this.total.reduce((ind1, ind2) => ind1 + ind2)
      this.ttop = ttop
      this.totalCart.push(id)
      this.$store.commit('settotalCart', this.totalCart.length)
    },
    buttonMin: function (id, price) {
      if (this.qtys[id] > 1) {
        this.qtys[id] = this.qtys[id] - 1
        const nana = this.qtys[id] * price
        this.total[id] = nana
        const ttop = this.total.reduce((ind1, ind2) => ind1 + ind2)
        this.ttop = ttop
        this.totalCart.pop()
        this.$store.commit('settotalCart', this.totalCart.length)
      }
    },
    checkout: function () {
      this.isActive = true
    },
    cancel: function () {
      for (let i = 0; i <= this.currentproduct.length; i++) {
        this.currentproduct.pop()
        i = 0
      }
      for (let i = 0; i <= this.totalCart.length; i++) {
        this.totalCart.pop()
        i = 0
      }
      for (let i = 0; i <= this.qtys.length; i++) {
        this.qtys.pop()
        this.total.pop()
        i = 0
      }
      this.ttop = 0
      this.$store.commit('settotalCart', this.totalCart.length)
      console.log(this.currentproduct)
      console.log('length')
      console.log(this.currentproduct.length)
    },
    print: function () {
      const kirimData = {
        invoice: 30022,
        cashier: 'hamdan',
        amount: this.ttop
      }
      axios.post(process.env.VUE_APP_HISTORY, kirimData)
        .then((res) => {
          alert('saving sukses')
          this.isActive = false
        })
        .catch(err => console.log(err))
      this.cancel()
    }
  },
  mounted () {
    this.getData()
    this.actAllProducts()
  },
  created () {
    // this.$root.$on('newSearch', teang => {
    //   this.teangKata = teang
    //   console.log(this.teangKata)
    // })
  }
}
</script>

<style scoped>
.sort {
      width: 100%;
    margin-bottom: 16px;
}
.main {
      grid-area: main;
      /* border: 1px solid red; */
      box-sizing: border-box;
      display: grid;
    grid-template-areas:
        "main your-cart";
    grid-template-columns: 1.82fr 1fr;
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
    overflow: auto;
}

main .card-main {
    display: inline-block;
    width: 30% !important;
    margin-bottom: 10px;
}

.card-main p:nth-child(3) {
    font-weight: 600;
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

/* .container-nav {
    width: 100%;
    margin-top: 10px;
}

.container-nav div{
  width: 25px;
    padding: 8px;
    text-align: center;
        background-color: #57CAD5;
            display: inline-block;
} */

</style>
