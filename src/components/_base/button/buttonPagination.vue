<template>
    <div class="container-nav">
            <div class="prev"> Prev </div>
            <div v-for="(page, index) in getlastpage" :key="index">
                <span @click="nextPage(page)">{{page}}</span>
            </div>
            <div class="next">Next</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ButtonPagination',
  computed: {
    ...mapGetters(['getlastpage'])
  },
  methods: {
    ...mapActions(['actNextPage']),
    nextPage (page) {
      this.actNextPage(page)
    }
  }
}
</script>

<style scoped>
.container-nav {
    width: 100%;
    margin-top: 10px;
    text-align: center;
}

.container-nav div{
  width: 25px;
    padding: 8px;
    text-align: center;
        background-color: #57CAD5;
            display: inline-block;
}

</style>
