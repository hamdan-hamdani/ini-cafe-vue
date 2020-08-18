<template>
    <div class="cart">
        <span class="title">Cart</span>
        <span class="badge">0</span>
    </div>

</template>

<script>
export default {

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
}
</style>
