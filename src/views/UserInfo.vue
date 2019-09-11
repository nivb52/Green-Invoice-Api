<template>
  <section>
    <h1>
    <span class="subtitle">   פרטי העסק    </span>
      <span>{{getBusinessName}}</span>
    </h1>
    <!-- IF THERE IS MORE THEN 1 BUSINESS WE WILL WANT TO USE LIST-CMP BEFORE PREVIEW-CMP -->
    <BusinessesList :businesses="businessToShow" />
  </section>
</template>

<script>
import BusinessesList from "@/cmps/BusinessesList.vue";

export default {
  name: "user-info",
  components: {
    BusinessesList
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
    // console.log(user);
    this.user = JSON.parse(JSON.stringify(user));
  },
  computed: {
    getUserFirstName() {
      if (this.user && this.user.firstName) return this.user.firstName || null;
    },
    getBusinessName() {
      if (this.user && this.user.businesses)
        return this.user.businesses[0].name || null;
    },
    businessToShow() {
      if (this.user && this.user.businesses) {
        const { businesses } = this.user;
        // TODO ? : function for all businesses exits with user
        // Get Business into array
        const myBusinesses = Object.keys(businesses[0]).map(key =>
          businesses[0][key] ? `${key} : ${businesses[0][key]}` : null
        );
        return myBusinesses;
      } else return null;
    }
  }
};
</script>


<style  lang="scss" scope>
.subtitle {
  font-size: 1.5rem;
  margin-inline-end: 2rem;
}
</style>