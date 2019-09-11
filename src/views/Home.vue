<template>
  <section class="home">
    <h1>{{getUserFirstName}} שלום</h1>
    <h2>דף העסק : {{getBusinessesName}}</h2>
    <!-- <Welcome firstName="Rami" bussinesName="Rami-Levi" /> -->
    <div class="card">
      <router-link to="/user-info">פרטים נוספים</router-link>
    </div>
    <br />
    <div class="card">
      <button class="btn btn-logout" @click="doLogout">logout</button>
    </div>
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
    const user = await this.$store.getters.getUser;
    // IF NO USER REUTRN HIM TO LOGIN PAGE
    if (!user) return this.$router.push("/login");

    // ELSE - CONTINUE LOADING :
    this.user = JSON.parse(JSON.stringify(user));
  },
  computed: {
    getUserFirstName() {
      if (this.user && this.user.firstName) return this.user.firstName || null;
    },

    getBusinessesName() {
      if (this.user && this.user.businesses)
        return this.user.businesses[0].name || null;
    }
  },
  methods: {
    async doLogout() {
      try {
        this.$store.dispatch({ type: "logout", loggedUser: this.user });
        this.$router.push("/login");
      } catch (err) {
        console.log("Could not log out err:", err);
      }
    }
  }
};
</script>

<style lang="scss" scope>
@import "@/assets/css/var.scss";
.home {
  padding: 5%;
}

.card {
  margin: 2rem;
  padding: 2rem;
}
.btn {
  font-size: $small-font;
  line-height: 1.6rem;
  border-radius: 22px;
}
.btn-logout {
  background-color: rgba($base-color, 0.8);
  color: $white-color;
  width: 54%;
}
</style>
