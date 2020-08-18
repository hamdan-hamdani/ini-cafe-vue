<template>
  <div class="home">
    <h1>{{firstName + ' ' + lastName + ` ${fullname}`}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: 'Home',
  data () {
    return {
      firstName: 'Hamdan',
      lastName: 'Hamdani',
      fullname: 'Hamdan Hamdani'
    }
  }
}
</script>
