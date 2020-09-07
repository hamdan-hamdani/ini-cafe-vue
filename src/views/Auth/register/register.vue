<template>
    <div class="container-menu">
        <form>
            <h3>Create Account</h3>
            <label class="lbl" for="email">Email : </label>
            <input class="inp" @click="coba" v-focus @keypress.tab="isActiv" v-model="email" type="email" id="email">
            <p class="msg">{{warning}}</p>
            <label class="lbl" @click="isActiv" for="password">Password : </label>
            <input class="inp" @click="isActiv" v-model="password" type="password" id="password">
            <p v-if="passWarning" class="msg">{{warningMessPass}}</p>
            <label class="lbl" for="roleId">Role Id : </label>
            <input class="inp" type="text" id="roleId" v-model="roleId">
            <label class="lbl" for="firstName">FirstName : </label>
            <input class="inp" type="text" id="firstName" v-model="firstName">
            <label class="lbl" for="lastName">LastName : </label>
            <input class="inp" type="text" id="lastName" v-model="lastName">
            <button class="btn" @click="handlelogin">Send</button>
            <p class="rgtr">Already have an account? <router-link class="rtr" to="/login">Sign In</router-link></p>
        </form>
        <Modal />
    </div>
</template>

<script>
import Modal from '../../../components/_base/modal/modal'
import login from '../login/login'
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'Register',
  components: {
    Modal
  },
  data () {
    return {
      email: '',
      password: '',
      roleId: '',
      firstName: '',
      lastName: '',
      isActivv: false
    }
  },
  mixins: [login, Modal],
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    },
    activ: {
      inserted: function (el) {
        el.style.setProperty = 'disabled'
      }
    }
  },
  methods: {
    ...mapActions(['send']),
    ...mapMutations(['mutActive']),
    handlelogin (e) {
      e.preventDefault()
      if (this.password === '') {
        this.passWarning = true
        this.actMessage('Password is required')
        this.warningMessPass = this.msg
        return this.warningMessPass
      }
      const data = {
        email: this.email,
        password: this.password,
        roleId: this.roleId,
        firstName: this.firstName,
        lastName: this.lastName
      }
      this.send(data)
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {
          this.mutActive(true)
        })
    }
  }
}
</script>

<style scoped>
.container-menu {
    border: 1px solid #e0e0e0;
    border-radius: 3px!important;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.1)!important;
    height: 100%;
    width: 400px;
    margin: 50px auto;
    padding: 24px 40px 32px;
    box-sizing: border-box;
    color: rgba(0,0,0,.7);
}
h3 {
    margin-bottom: 30px;
}
.lbl {
  display: block;
    margin-bottom: 7px;
    font-size: 12px;
    line-height: 1.33;
    color: rgba(0,0,0,.54);
}
.msg {
    font-size: 12px;
    line-height: 1.3;
    color: rgba(0,0,0,.38);
    margin-bottom: 20px;
}
.inp {
  display: block;
    width: 100%;
    max-height: 40px;
    margin-bottom: 4px;
    padding: 10px 14px;
    font-size: 14px;
    font-family: open sans,tahoma,sans-serif;
    color: rgba(0,0,0,.7);
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: none;
    line-height: normal;
    transition: border .2s linear;
}
.btn {
  display: block;
    width: 100%;
    border: 0;
    background: #F24F8A;
    color: #fff;
    font-size: 13px;
    height: 40px;
    line-height: 24px;
    border-radius: 8px;
    font-weight: 600;
    outline: 0;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    box-sizing: border-box;
    transition: all .3s ease;
    margin-top: 35px;
}
.rgtr {
    margin-top: 3px;
    text-align: center;
    font-size: 13px!important;
}
.rtr {
    color: #F24F8A;
    text-decoration: none;
}
</style>
