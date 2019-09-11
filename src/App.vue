<template>
  <div id="app">

    <transition name="router-anim" enter-active-class="animated fade-in-bottom">
      <router-view />
    </transition>
    <AppNav /> 
  </div>
</template>

<script>
import AppNav from "@/cmps/AppNav.vue";
export default {
  name: "app",
  components: {
    AppNav
  }
};
</script>


<style lang="scss">
// @import "assets/css/main.scss";
.fade-in-bottom {
  animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
/**
 * ----------------------------------------
 * animation css fade-in-bottom
 * ----------------------------------------
 */

@keyframes fade-in-bottom {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}


$base-color: #1143ff; //#0078e7

*,
::after,
::before,
html {
  text-align: right;
  box-sizing: border-box;
}
html,body {
  height: 100%;
}
button,
input,
select,
textarea {
  margin: 0;
}

button {
  display: inline-block;
  line-height: normal;
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  user-select: none;
  font-family: inherit;
  font-size: 100%;
  padding: 0.5em 1em;
  border: none transparent;
  text-decoration: none;
  border-radius: 2px;
}

input {
  background-color: transparent;
  border: none;
  height: auto;
  padding: 0.8rem 0;
  border-bottom: 1px solid #c9cbcf;

  &.rtl {
    text-align: right;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #22cbff;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  direction: rtl;
  height: 100%;

  h1 {
    font-family: almoni-neue-dl, arial, sans-serif;
    font-size: 2rem;
  }
}
</style>
