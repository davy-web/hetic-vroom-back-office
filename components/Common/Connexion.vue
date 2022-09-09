<template>
  <section id="page-connexion" class="flex items-center justify-center">
    <div class="w-full max-w-[600px] p-12 overflow-hidden md:bg-white rounded-md" >
      <div class="flex flex-col items-center justify-center mx-auto text_center" >
        <base-use-svg id="vroom" size="logo-xl" class="vroom" color="pink" />
        <h1 class="mb-0 text-3xl text-center">{{ titre }}</h1>
      </div>

      <form
        action="post"
        class="mt-8"
        data-success="Thanks for your enquiry, we'll be in touch shortly."
        data-error="Please fill in all fields correctly."
        @submit.prevent="login"
      >
        <div class="flex flex-col md:py-12 md:px-12">
          <b-notification v-if="error" type="is-warning" class="vroom_alert">
            {{ error }}
          </b-notification>
        </div>

        <div class="flex flex-col md:py-12 md:px-12">
          <base-input-text
            type="text"
            namefor="name"
            label="E-mail"
            placeholder=" "
            :required="true"
            class="mb-12 border-b-2 md:mr-8 border-primary-vert1"
            v-model="email"
          />
          <base-input-text
            type="password"
            namefor="password"
            label="Mot de passe"
            password-reveal
            placeholder=" "
            :required="true"
            v-model="password"
            class="border-b-2 md:mr-8 border-primary-vert1"
          />
        </div>

        <div class="flex justify-between py-8 mt-8 bg-transparent border-t border-gray-100 rounded-b md:px-12 bg-grey-light" >
          <t-button type="submit" variant="primary" class="w-full py-3 transitions-colors vroom_bg_color vroom_uppercase">
            <span class="text-md text-white">Se connecter</span>
          </t-button>
        </div>
      </form>

      <div class="mx-auto text-center">
        <nuxt-link class="inline-blok t-link" :to="url_lien">
          {{ lien }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  name: "Connexion",
  props: {
    titre: {
      type: String,
      default: "Formulaire",
    },
    bouton_submit: {
      type: String,
      default: "Valider",
    },
    lien: {
      type: String,
      default: "Accueil",
    },
    url_lien: {
      type: String,
      default: "/inscription",
    },
  },
  computed: {},
  data() {
    return {
      showModal: false,
      isLogin: true,
      email: "",
      password: "",
      error: "",
      success: "",
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: "connexion",
      },
    };
  },
  methods: {
    async login() {
      axios
        .post('/api/customer/login', {
            email: this.email,
            password: this.password
        })
        .then((response) => {
          if (response && response.data) {
            let decoded = jwt_decode(response.data.token);
            if (decoded.roles && decoded.roles[0] == "ROLE_ADMIN") {
              localStorage.setItem("id", response.data.id);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              window.location.href = "/";
            }
            else {
              this.error = "Non autorisé";
            }
          }
        })
        .catch((error) => {
          if (error && error.response && error.response.data && error.response.data.message) {
            this.error = error.response.data.message; 
          }
          else {
            this.error = "Erreur";
          }
        });
    }
  },
  mounted() {
  },
};
</script>

<style>
.vroom_alert {
  color: #007e49;
  background-color: #ccf6e4;
  border: 0.5px solid #b3f2d7;
  padding: 12px 18px;
  border-radius: 4px;
}
</style>