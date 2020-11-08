<template>
    <div class="your-cart">
    <div>
        <div class="container-your-cart" v-if="currentproduct.length === 0">
            <img src="../../../assets/img/food.png" alt="" srcset="">
            <span>Your cart is empty </span>
            <span>Please add some items from the menu</span>
        </div>
        <div v-else>
        <div class="item-cart" v-for="(nproduct, index) in currentproduct" :key="index">
          <img class="img" src="../../../assets/img/foods/food2.jpg" alt="" srcset="">
          <span class="item-name">{{ nproduct.nProduct }} - {{ index }}</span>
          <div class="button">
              <button v-on:click="buttonMin(index, nproduct.pp)">- {{index}}</button><input type="text" v-model="qtys[index]"><button v-on:click="buttonAdd(index, nproduct.pp)">+</button>
          </div>
          <span class="item-price">Rp. {{ qtys[index] * nproduct.pp }}</span>
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
            <span>{{ qtys[index] * nproduct.pp }}</span>
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

export default {

}
</script>

<style scoped>
.your-cart {
    grid-area: your-cart;
    margin-top: 55px;
}

.container-your-cart {
    width: 50%;
    margin: auto;
    text-align: center;
}

.your-cart img {
    width: 50%;
    min-width: 118px;
    height: 125px;
    max-height: 125px;
    margin: 0 auto;
}

.your-cart span {
    display: block;
    font-size: 20px;
}

.your-cart span:nth-child(3) {
    font-size: 12px;
    color: #CECECE;
}
</style>
