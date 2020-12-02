<template>
    <div class="container-menu">
        <form>
            <h3>Sign In</h3>
            <label class="lbl" for="email">Email : </label>
            <input class="inp" v-focus @click="coba" v-model="email" type="email" id="email">
            <p class="msg">{{warning}}</p>
            <label class="lbl" @click="isActiv" for="password">Password : </label>
            <input class="inp" @click="isActiv" v-model="password" type="password" id="password">
            <p v-if="passWarning" class="msg">{{warningMessPass}}</p>
            <button class="btn" @click="handlelogin">Sign In</button>
            <p class="rgtr">don't have an account yet? <router-link class="rtr" to="/register">Register</router-link></p>
        </form>
        <Modal />
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Modal from '../../../components/_base/modal/modal'
export default {
  name: 'Login',
  components: {
    Modal
  },
  data () {
    return {
      email: '',
      warning: 'Example: email@xyz.com',
      warningMessPass: '',
      password: '',
      isActivv: false,
      passWarning: false
    }
  },
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
    ...mapMutations(['mutActive']),
    coba () {
      this.warning = 'Example: email@xyz.com'
    },
    btnOk () {
      this.isActivv = false
    },
    isActiv () {
      this.warningMessPass = ''
      if (this.email === '') {
        this.actMessage('email is required')
        this.warning = this.msg
        return this.warning
      }
      // eslint-disable-next-line no-useless-escape
      const rr = this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      console.log(rr)
      if (rr === null) {
        return this.actMessage('Format email salah')
      }
      this.actMessage('')
    },
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
        password: this.password
      }
      this.login(data)
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          this.mutActive(true)
          console.log(err)
        })
    },
    ...mapActions(['login', 'actMessage'])
  },
  computed: {
    ...mapGetters({
      msg: 'getMessage'
    })
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
.btnOk {
  margin-top: 30px;
  border: 0;
  background:#F24F8A;
  color: #fff;
  font-size: 13px;
    height: 40px;
    line-height: 24px;
    display: inline-block;
    padding: 0 64px;
    border-radius: 8px;
    font-weight: 600;
    outline: 0;
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

@media only screen and (max-width: 576px) {
            .container-menu {
              width: 90%;
            }
        }
</style>
