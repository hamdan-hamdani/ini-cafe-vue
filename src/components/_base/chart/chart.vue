<template>
    <div class="container-chart">
       <select @change="history" name="category" id="category" v-model="Category" >
                        <option v-for="(category, index) in categories" :key="index" v-bind:value="category">{{category}}</option>
                    </select>
        <LineChart :chart-data="datacollection"></LineChart>
    </div>
</template>

<script>
import axios from 'axios'
import LineChart from './chart.js'
export default {
  name: 'Chart',
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null,
      categories: ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember'],
      Category: '',
      loaded: false,
      // time: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      time: [],
      tmonth: [],
      lmonth: [10, 30, 0, 35, 38, 10, 29, 20, 35],
      tmpArray: ''
    }
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  },
  mounted () {
    this.getHistory()
    // this.fillData()
    // this.getHistory()
  },
  created () {
    // this.getHistory()
  },
  methods: {
    history () {
      this.getHistory()
    },
    // getHis () {
    //   axios.get('http://localhost:4000/api/v1/histories/')
    //     .then(res => {
    //       console.log(res.data.result)
    //       this.tmpArray = res.data.result
    //       for (let i = 0; i < this.tmpArray.length; i++) {
    //         this.tmonth.push(this.tmpArray[i].amount)
    //         this.time.push(this.tmpArray[i].month)
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    getHistory () {
      if (this.Category === 'januari') {
        this.Category = '01'
      } else if (this.Category === 'februari') {
        this.Category = '02'
      } else if (this.Category === 'maret') {
        this.Category = '03'
      } else if (this.Category === 'april') {
        this.Category = '04'
      } else if (this.Category === 'mei') {
        this.Category = '05'
      } else if (this.Category === 'juni') {
        this.Category = '06'
      } else if (this.Category === 'juli') {
        this.Category = '07'
      } else if (this.Category === 'agustus') {
        this.Category = '08'
      } else if (this.Category === 'september') {
        this.Category = '09'
      } else if (this.Category === 'oktober') {
        this.Category = '10'
      } else if (this.Category === 'november') {
        this.Category = '11'
      } else if (this.Category === 'desember') {
        this.Category = '12'
      }
      axios.get('https://api-inicafe.fwdev.online/api/v1/histories/?mo=' + this.Category)
        .then(res => {
          // this.Category = 'agustus'
          console.log(res.data.result)
          this.tmpArray = res.data.result
          this.tmonth = []
          this.time = []
          for (let i = 0; i < this.tmpArray.length; i++) {
            this.tmonth.push(this.tmpArray[i].amount)
            this.time.push(this.tmpArray[i].day)
          }
          this.fillData()
          // const arr = res.data.result
          // const newArr = arr.map(item => {
          //   const date = item.date.split('T')
          //   const month = date.map((item, index) => {
          //     if (index === 0) {
          //       const bln = item.split('-')
          //       return bln
          //     } else {
          //       const jam = item.split(':')
          //       return jam
          //     }
          //   })
          //   const amount = item.amount
          //   return { amount, month }
          // })
          // console.log(arr)
          // const m = []
          // newArr.forEach((element) => {
          //   // console.log('ya')
          //   // console.log(element)
          //   element.month.forEach((element, index) => {
          //     if (index === 0) {
          //       // const ada = m.find(e => {
          //       //   if (e === 'January' || e === 'February' || e === 'Maret' || e === 'April' || e === 'Mei' || e === 'Juni' || e === 'Juli' || e === 'Agustusi' || e === 'September' || e === 'Oktober' || e === 'November' || e === 'Desember') {
          //       //     console.log('la ' + e)
          //       //     return true
          //       //   }
          //       //   return false
          //       // })
          //       // console.log(ada)
          //       switch (element[1]) {
          //         case '01':
          //           // if (ada === undefined) { m.push('January') }
          //           m.push('January')
          //           break
          //         case '02':
          //           // if (ada === undefined) { m.push('February') }
          //           m.push('February')
          //           break
          //         case '03':
          //           // if (ada === undefined) { m.push('Maret') }
          //           m.push('Maret')
          //           break
          //         case '04':
          //           // if (ada === undefined) { m.push('April') }
          //           m.push('April')
          //           break
          //         case '05':
          //           // if (ada === undefined) {
          //           console.log('masuk 005')
          //           m.push('Mei')
          //           // }
          //           console.log('coba')
          //           break
          //         case '06':
          //           // if (ada !== undefined) {
          //           console.log('masuk 006')
          //           m.push('Juni')
          //           // }
          //           break
          //         case '07':
          //           // if (ada === undefined) { m.push('Juli') }
          //           m.push('Juli')
          //           break
          //         case '08':
          //           // alert('08')
          //           // if (ada === undefined) {
          //           m.push('Agustus')
          //           // }
          //           break
          //         case '09':
          //           // if (ada === undefined) {
          //           // alert('mask')
          //           m.push('September')
          //           // }
          //           break
          //         case '10':
          //           // if (ada === undefined) { m.push('Oktober') }
          //           m.push('Oktober')
          //           break
          //         case '11':
          //           // if (ada === undefined) { m.push('November') }
          //           m.push('November')
          //           break
          //         case '12':
          //           // if (ada === undefined) { m.push('Desember') }
          //           m.push('Desember')
          //           break
          //         default:
          //           console.log('Bulan tidak ada')
          //       }
          //     }
          //   })
          // })
          // const tampArr = ['exa']
          // const mm = m.find(e => {
          //   if (e === 'January' || e === 'February' || e === 'Maret' || e === 'April' || e === 'Mei' || e === 'Juni' || e === 'Juli' || e === 'Agustus' || e === 'September' || e === 'Oktober' || e === 'November' || e === 'Desember') {
          //     if (tampArr.find(ex => ex !== e)) {
          //       tampArr.push(e)
          //     } else {
          //       // tampArr.push(e)
          //       console.log('beli')
          //     }
          //   }
          // })
          // console.log(mm)
          // console.log(tampArr)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fillData () {
      this.datacollection = {
        labels: this.time,
        datasets: [
          {
            label: 'This Month',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#FFB8C6',
            pointBackgroundColor: '#FFB8C6',
            borderWidth: 1,
            pointBorderColor: '#FFB8C6',
            data: this.tmonth
          }
          // {
          //   label: 'Last Month',
          //   backgroundColor: 'rgba(0,0,0,0)',
          //   borderColor: '#00F1FF',
          //   pointBackgroundColor: 'red',
          //   borderWidth: 1,
          //   pointBorderColor: 'yellow',
          //   data: this.lmonth
          // }
        ]
      }
    }
  }
}
</script>

<style scoped>
.container-chart {
    width: 100%;
    /* height: 250px; */
    margin: 10px auto;
}
</style>
