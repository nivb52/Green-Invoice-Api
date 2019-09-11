
<template>
  <div class="login-page" :class="{'loading': isAjaxing}">
    <Logo class="logo" logoSize />

    <div class="right-side center-self">
      <h1>התחברות לחשבונית ירוקה</h1>

      <form @submit.prevent>
        <div class="input-container">
          <input class="rtl" placeholder="מייל" type="email" v-model="user.email" />
          <figcaption class="input-describe">כתובת המייל איתה נרשמת לחשבונית ירוקה</figcaption>
        </div>
        <div class="input-container">
          <input
            class="rtl"
            placeholder="סיסמה"
            type="password"
            autocomplete="off"
            v-model="user.password"
          />
          <figcaption class="input-describe forgot-pass" @click="showPass">
            שכחת סיסמה?
            <span v-show="isShowingPass">{{debugPass}}</span>
          </figcaption>
        </div>

        <div class="btn-container">
          <button class="btn btn-login" @click="doLogin">כניסה</button>
          <button class="btn btn-google-login">כניסה עם גוגל</button>
        </div>
      </form>
    </div>

    <div class="left-side">
      <img class="left-side--hero" alt="Woman with flowers" src="../assets/green_login_page.svg" />
    </div>
  </div>
</template>

<script>
import Logo from "@/cmps/Logo.vue";
import Swal from "sweetalert2";

export default {
  name: "login",
  components: {
    Logo
  },
  data() {
    return {
      isAjaxing : false,
      isShowingPass: false,
      debugPass: "12345678",
      user: {
        email: "nivb52@gmail.com",
        password: "12345678"
      }
    };
  },
  computed: {},
  methods: {
    showPass() {
      this.isShowingPass = !this.isShowingPass;
    },
    async doLogin() {
      // get new Obj for user
      const userInput = JSON.parse(JSON.stringify(this.user));
      // loading styling:  
      this.isAjaxing = true;
      // document.getElementsByClassName('btn').style.cursor="wait"

      try {
        let validUser = await this.$store.dispatch({
          type: "login",
          user: userInput
        });
        // IF Cradentitals are correct :
        this.$router.push("/");
      } catch (err) {
        console.log("Could Not Signup err:", err);
        // .. TODO: get correct error from server
        Swal.fire({ type: "error", text: "שם משתמש או סיסמה לא נכונים" });
        this.user.email = "";
        this.user.password = "";
        this.isAjaxing = false;
      }
       
    }
  }
};
</script>

<style lang="scss" scope>
@import "@/assets/css/var.scss";

body {
  overflow: hidden;
}
.logo {
  margin-top: 1rem;
}
.loading{
  cursor: wait;
  opacity: 0.8;
   .btn  {
    cursor: wait;
  }
}
.login-page {
  display: grid;
  grid-template-columns: minmax(20px, 5vw) auto 55%;
  height: 108vh;
  width: 100vw;
  position: relative;
  top: -10px;

  & .right-side {
    grid-column: 2/3;
  }
  & .left-side {
    grid-column: 3;
    background-color: #ffb2c169;
    align-content: center;

    &--hero {
      margin-top: 10%;
      margin-right: -5.5vw;
      //   height: 87%;
    }
  }
  & h1 {
    color: $base-color;
    font-size: 1.7rem;
    margin-top: -4rem;
    margin-bottom: 4rem;
    max-width: $login-width;
    font-weight: 700;
  }
}

.center-self {
  align-self: center;
}

.input-container {
  position: relative;
  margin: 0 0 2rem;

  & .input-describe {
    font-size: 0.7rem;
  }
  .forgot-pass {
    text-decoration-line: underline;
    cursor: pointer;
  }
}

.btn-container {
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  max-width: $login-width;
}

input {
  width: $login-width;
}

.btn {
  font-size: $small-font;
  line-height: 1.6rem;
  border-radius: 22px;
}
.btn-login {
  background-color: rgba($base-color, 0.8);
  color: $white-color;
  width: 54%;
}

.btn-google-login {
  color: rgba($base-color, 0.8);
  background-color: $white-color;
  border: solid 1px rgba($base-color, 0.8);
  width: 40%;
  cursor: not-allowed; // <- there is no onclick at the moment

  // google G icon
  // TODO: SHOW ANY BUTTON WITH ICON USING SLOT
  text-align: right;
  background-image: url("../assets/Google_G.svg");
  background-repeat: no-repeat;
  background-size: 1.8vw;
  background-position: 15% 45%;
}


@media (max-width: 1020px) and (min-width: 925px) {
  .btn-google-login {
    background-size: 1.6vw;
    background-position: 10% 45%;
  }
}

@media (max-width: 924px) {
  .btn-container {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }
  .btn-login {
    margin-bottom: 1rem;
    margin-top: -2rem;
  }
  .btn-login,
  .btn-google-login {
    width: $login-width;
  }
  .btn-google-login {
    text-align: center;
    background-size: 2vw;
    background-position: 6.5vw 45%;
  }
}

@media (max-width: 560px) {
  .btn-google-login {
    text-align: center;
    background-size: 2.4vw;
    background-position: 3vw 48%;
  }
}
</style>