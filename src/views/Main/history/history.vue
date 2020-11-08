<template>
    <div class="container">
        <Navbar/>
        <Cart/>
        <Sidebar/>
        <main class="main">
            <div class="income">
                <span>
                    <p>Today’s Income</p>
                    <p>Rp. 1.000.000</p>
                    <p>+2% Yesterday</p>
                    <div></div>
                    <div></div>
                    <div></div>
                </span>
                <span>
                    <p>Orders</p>
                    <p>3.270</p>
                    <p>+5% Last Week</p>
                    <div></div>
                    <div></div>
                    <div></div>
                </span>
                <span>
                    <p>This Year’s Income</p>
                    <p>Rp. 100.000.000.000</p>
                    <p>+10% Last Year</p>
                    <div></div>
                    <div></div>
                    <div></div>
                </span>
            </div>
            <div class="revenue">
                <span>Revenue</span>
                <span><select name="month" id="month">
                        <option value="month">Month</option>
                    </select></span>
                <Chart/>
            </div>
            <div class="recent-order">
                <span>Recent Order</span>
                <span><select name="month" id="month">
                        <option value="month">Month</option>
                    </select></span>
                <div>
                    <span>INVOICES</span>
                    <span>CASHIER</span>
                    <span>DATE</span>
                    <span>AMOUNT</span>
                </div>
                <div v-for="tmp in tmpArray" :key="tmp.id">
                    <span>{{tmp.invoice}}</span>
                    <span>{{tmp.cashier}}</span>
                    <span>{{tmp.date}}</span>
                    <span>{{tmp.amount}}</span>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Navbar from '../../../components/_base/navbar/navbar'
import Cart from '../../../components/_base/navbar/cart'
import Sidebar from '../../../components/_base/sidebar/sidebar'
import Chart from '../../../components/_base/chart/chart.vue'
import axios from 'axios'
export default {
  name: 'History',
  data () {
    return {
      tmpArray: ''
    }
  },
  components: {
    Navbar,
    Cart,
    Sidebar,
    Chart
  },
  methods: {
    getHistory () {
      axios.get('https://api-inicafe.fwdev.online/api/v1/histories/')
        .then(res => {
          console.log(res.data.result)
          this.tmpArray = res.data.result
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getHistory()
  }
}

</script>

<style scoped>

main {
    grid-area: main;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

main .income {
    flex: 100%;
    display: flex;
    justify-content: space-between;
}

main .income span {
    height: 150px;
    max-height: 150px;
    width: 33%;
    min-width: 10%;
    padding: 20px;
    border-radius: 10px;
    align-self: center;
    box-sizing: border-box;
}

main .income span:first-of-type {
    background: linear-gradient(285.38deg, #FBB2B4 30.05%, rgba(255, 143, 178, 0) 133.19%);
    filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
}

main .income span:nth-child(2) {
    background: linear-gradient(285.38deg, #29DFFF 30.05%, rgba(41, 223, 255, 0) 133.19%);
    filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
}

main .income span:nth-child(3) {
    background: linear-gradient(285.38deg, #AB84C8 30.05%, rgba(241, 201, 236, 0) 133.19%);
    filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
}

main .income span p:nth-child(2) {
    font-size: 1.8vw;
    margin-top: 10px;
    margin-bottom: 10px;
}

.income span div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 12px;
    right: 32px;
    box-sizing: border-box;
    background: rgba(253, 211, 228, 0.3);
}

.income span div:first-of-type,
.income span:nth-child(2) div:first-of-type,
.income span:nth-child(3) div:first-of-type {
    top: 30px;
    right: 50px;
}

.income span div:nth-child(5),
.income span:nth-child(2) div:nth-child(5),
.income span:nth-child(3) div:nth-child(5) {
    top: 50px;
    right: 66px;
}

.income span:nth-child(2) div {
    background: rgba(207, 246, 253, 0.3);
}

.income span:nth-child(3) div {
    background: rgba(241, 201, 236, 0.3);
}

main .revenue,
main .recent-order {
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    box-sizing: border-box;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}

.revenue span select,
.recent-order span select {
    color: #4F4E4E;
    background: #CECECE;
    border-radius: 10px;
}

main .revenue span,
main .recent-order span {
    flex: 1;
}

main .revenue span:nth-child(2),
main .recent-order span:nth-child(2) {
    text-align: right;
    padding-right: 20px;
}

main .revenue div {
    flex: 100%;
    border: 1px solid black;
    margin-top: 20px;
    padding: 115px;
}

main .recent-order div {
    flex: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
}

.recent-order div span {
    flex: 1;
}

.recent-order div:nth-child(4) span {
    color: #CECECE;
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

</style>
