<template>
  <div id="nav">
    <div class="tiny">
      debug :
      <router-link to="/login">Login</router-link>&nbsp; | &nbsp;
      <router-link to="/user-info">User Info</router-link>&nbsp; | &nbsp;
      <router-link to="/">Home</router-link>&nbsp; | &nbsp;
    </div>
  </div>
</template>

<script>
import Logo from "@/cmps/Logo.vue";

export default {
  name: "app-header",
  components: {
    Logo
  }
};
</script>

<style lang="scss">
.tiny {
  font-size: 0.6rem;
}
#nav {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0;
  margin: 0;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
    &.logo {
      margin-left: auto;
    }
  }
}
</style>