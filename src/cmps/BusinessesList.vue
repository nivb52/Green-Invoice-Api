<template>
  <div>
  <BusinessesPreview v-for="detail in businesses" v-show="detail !== null" :key="businesses.id" :detail="detail"  />
  </div>
</template>

<script>
import BusinessesPreview from "@/cmps/BusinessesPreview.vue"


export default {
  name: "businessesList",
   components: {
      BusinessesPreview
  },
  props: ["businesses"],

};
</script>

<style>
body {
    overflow: auto;
}
</style>