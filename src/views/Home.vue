<template>
  <section class="home">
    <h1>  {{getUserFirstName}} שלום </h1>
    <!-- <Welcome firstName="Rami" bussinesName="Rami-Levi" /> -->

    <h2>  דף העסק :   {{getBusinessesName}}  </h2>
    
  </section>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/cmps/Welcome.vue";

export default {
  name: "home",
  components: {
    Welcome
  },
  data() {
    return {
      user: null
    };
  },
  async created() {
    const user = await this.$store.getters.getUser
    // IF NO USER REUTRN HIM TO LOGIN PAGE
    if (!user) return this.$router.push('/login')
    
    // ELSE - CONTINUE LOADING :
    this.user = JSON.parse(JSON.stringify(user));
  },
  computed: {
    getUserFirstName() {
      if (this.user && this.user.firstName) return this.user.firstName || null;
    },
   
    getBusinessesName() {
      if (this.user && this.user.businesses)  return this.user.businesses[0].name || null;
    },
  }
};
</script>
