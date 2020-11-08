<template>
    <div>
        <Navbar/>
        <SideBar/>
    </div>
</template>

<script>
import Navbar from '../../components/_base/navbar'
import SideBar from '../../components/_base/leftbar'

export default {
  name: 'Main',
  components: {
    Navbar,
    SideBar
  }
}
</script>

<style scoped>
</style>
