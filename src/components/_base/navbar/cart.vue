<template>
    <div class="cart">
        <span class="title">Cart</span>
        <span class="badge">{{gettotalCart}}</span>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['gettotalCart'])
  }
}
</script>

<style scoped>
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
    padding: 1%;
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    position: relative;
    top: -1px;
    left: 5px;
}
</style>
