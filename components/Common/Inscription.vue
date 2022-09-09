<template>
  <section id="page-inscription" class="flex items-center justify-center">
    <div class="w-full max-w-[600px] p-12 overflow-hidden md:bg-white rounded-md">
      <div class="flex flex-col items-center justify-center mx-auto text_center">
        <base-use-svg id="vroom" size="logo-xl" class="vroom" color="pink" />
        <h1 class="mb-10 text-3xl text-center">{{ titre }}</h1>
      </div>

      <form
        action="post"
        class="mt-8"
        data-success="Thanks for your enquiry, we'll be in touch shortly."
        data-error="Please fill in all fields correctly."
        @submit.prevent="register"
      >

        <div class="grid px-8 md:px-12 md:py-12 md:gap-8">
          <b-notification v-if="error" type="is-warning" class="vroom_alert">
            {{ error }}
          </b-notification>
        </div>

        <div class="grid px-8 md:px-12 md:grid-cols-2 md:gap-8">
          <base-input-text
            type="text"
            namefor="firstname"
            label="Prénom"
            placeholder=" "
            :required="true"
            class="border-b-2 md:mr-8 border-primary-vert1"
            v-model="firstname"
          />
          <base-input-text
            type="text"
            namefor="lastname"
            label="Nom"
            placeholder=" "
            :required="true"
            v-model="lastname"
            class="border-b-2 border-primary-vert1"
          />
        </div>
        <div class="grid px-8 md:px-12 md:gap-8">
          <base-input-text
            type="email"
            namefor="email"
            label="Adresse e-mail"
            placeholder=" "
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
            :required="true"
            class="border-b-2 md:mr-8 border-primary-vert1"
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
          <base-input-text
            type="text"
            namefor="phone"
            label="Téléphone"
            placeholder=" "
            :required="true"
            v-model="phone"
            value="oui"
            class="border-b-2 md:mr-8 border-primary-vert1"
          />
        </div>

        <div class="flex justify-between py-8 mt-8 bg-transparent border-t border-gray-100 rounded-b md:px-12 bg-grey-light">
          <t-button type="submit" variant="primary" class="w-full py-3 transitions-colors vroom_bg_color vroom_uppercase">
            <span class="text-md text-white">S'inscrire</span>
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

export default {
  name: "Inscription",
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
      default: "/",
    },
  },
  computed: {},
  data() {
    return {
      showModal: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      error: "",
      success: "",
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: "inscription",
      },
    };
  },
  methods: {
    async register() {
      axios
        .post('/api/customer/signup', { 
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          phone: this.phone
        })
        .then((response) => {
          if (response && response.data && response.data.message) {
            this.error = response.data.message;
          }
          else {
            this.error = "Enregisté";
          }
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
            this.error = error.response.data.message;
          }
          else {
            this.error = "Erreur";
          }
          window.scrollTo(0, 0);
        });
    }
  }
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