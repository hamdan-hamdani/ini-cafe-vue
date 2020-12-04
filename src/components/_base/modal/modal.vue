<template>
    <div v-if="activ" class="container-modal">
          <div class="modal">
            <p class="title">Sorry</p>
            <p> {{msg}} </p>
            <div class="container-btn">
              <button class="btnOk" @click="btnOk">Ok</button>
              <button v-if="activBtnCancel" class="btnOk" @click="btnCancel">Cancel</button>
            </div>
          </div>
        </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Modal',
  props: ['dData'],
  data () {
    return {
      isActivv: false
    }
  },
  computed: {
    ...mapGetters({
      msg: 'getMessage',
      activ: 'getActiv',
      activBtnCancel: 'getActivBtnCancel',
      getActivBtnOK: 'getActivBtnOK'
    })
  },
  methods: {
    ...mapMutations(['mutActive', 'mutActivBtnCancel', 'mutActivBtnOk']),
    btnOk () {
      if (this.activBtnCancel) {
        this.dData()
      }
      this.mutActive(false)
      this.mutActivBtnCancel(false)
    },
    btnCancel () {
      this.mutActive(false)
      this.mutActivBtnCancel(false)
    }
  }
}
</script>

<style scoped>
.container-modal {
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
.modal {
  position: relative;
  width: 30%;
  text-align: center;
  border: 1px solid;
  background: white;
  display: block;
  border-radius: 8px;
  padding: 32px;
  box-shadow: none;
  box-sizing: border-box;
}
.container-btn {
  display: flex;
  justify-content: space-between;
}
.title {
    font-size: 18px;
    font-weight: 800;
    font-family: nunito sans,sans-serif;
    color: rgba(49,53,59,.96);
    line-height: 1.33;
    padding: 0 0 8px;
    margin: 0;
}

.btnOk {
    margin-top: 30px;
    border: 0;
    background: #F24F8A;
    color: #fff;
    font-size: 13px;
    display: inline-block;
    padding: 10px 0px;
    border-radius: 8px;
    font-weight: 600;
    outline: 0;
    width: 45%;
    max-width: 145px;
    }

@media only screen and ( max-width: 576px) {
  .container-modal {
        padding: 20px;
    }

    .modal {
        width: 100%;
    }

}
</style>
