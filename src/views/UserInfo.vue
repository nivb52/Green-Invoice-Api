<template>
  <section>
    <h1>פרטי משתמש</h1>
    <h2>{{getUserFirstName}}</h2>
    <h3>{{getBusinessesName}}</h3>
  </section>
</template>

<script>
export default {
  name: "user-info",
  data() {
    return {
      user: null
    };
  },
  async created() {
    const user = await this.$store.getters.getUser;
    // IF NO USER REUTRN HIM TO LOGIN PAGE
    if (!user) return this.$router.push('/login')

    // ELSE - CONTINUE LOADING :
    this.user = JSON.parse(JSON.stringify(user));
    console.log(user);
    // return user;
  },
  computed: {
    getUserFirstName() {
      if (this.user && this.user.firstName) return this.user.firstName || null;
    },
    getBusinessesName() {
      if (this.user && this.user.businesses)
        return this.user.businesses[0].name || null;
    }
  }
};
</script>


<style>
</style>