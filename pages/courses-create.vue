<template>
  <section id="page-courses" class="">
    <div class="overflow-hidden">
      <div class="mx-auto">

        <form
          action="post"
          class="mt-8"
          data-success="Thanks for your enquiry, we'll be in touch shortly."
          data-error="Please fill in all fields correctly."
          @submit.prevent="create"
        >

          <div class="grid px-8 md:px-12 md:gap-8">
            <div>
              <h3 class="vroom_text_color">Ajouter un course pour {{ parentFirstname }}</h3>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/" class="nuxt-link-active">Dashboard</a></li>
                <li class="breadcrumb-item"><nuxt-link :to="'customers'" class="nuxt-link-active">Liste parents</nuxt-link></li>
                <li class="breadcrumb-item"><nuxt-link :to="'customers-update?id=' + parentId + '&firstname=' + parentFirstname" class="nuxt-link-active">Parent</nuxt-link></li>
                <li class="breadcrumb-item">Ajouter course</li>
              </ol>
            </div>
          </div>

          <div class="grid px-8 md:px-12 md:gap-8">
            <b-notification v-if="error" type="is-warning" class="vroom_alert">
              {{ error }}
            </b-notification>
          </div>

          <div class="grid px-8 md:px-12 md:pt-12 md:grid-cols-2 md:gap-8">
            <div class="block_adress">
              <base-input-text
                type="text"
                namefor="adress_aller"
                label="Adresse d'aller"
                placeholder=" "
                :required="true"
                class="border-b-2 md:mr-8 border-primary-vert1"
                v-model="adress_aller"
                v-on:input="function_search_adress_aller"
              />
              <div class="select_adress w-full">
                <a class="option_adress" href="">oui</a>
                <a class="option_adress" href="">oui</a>
              </div>
            </div>
            <base-input-text
              type="date"
              namefor="date_aller"
              label="Date d'aller"
              placeholder=" "
              :required="true"
              v-model="courses.dates[0].aller"
              class="border-b-2 border-primary-vert1"
            />
          </div>
          <div class="grid px-8 md:px-12 md:pt-12 md:grid-cols-2 md:gap-8">
            <base-input-text
              type="text"
              namefor="adress_retour"
              label="Adresse de retour"
              placeholder=" "
              :required="true"
              class="border-b-2 md:mr-8 border-primary-vert1"
              v-model="adress_retour"
              v-on:input="function_search_adress_retour"
            />
            <base-input-text
              type="date"
              namefor="date_retour"
              label="Date de retour"
              placeholder=" "
              :required="true"
              v-model="courses.dates[0].retour"
              class="border-b-2 border-primary-vert1"
            />
          </div>
          <div class="grid px-8 md:px-12 md:gap-8">
            <div style="transform: translateY(-20px);">
              <label class="form-label vroom_label">Enfant(s)</label>
              <select class="form-select vroom_select" v-model="courses.passengerIds" aria-label="Default select example">
                <option v-for="children in childrens" :value="children._id" :key="children._id">
                  {{ children.firstname }} {{ children.lastname }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex justify-between py-8 mt-8 bg-transparent border-t border-gray-100 rounded-b md:px-12 bg-grey-light">
            <t-button type="submit" variant="primary" class="px-5 py-3 transitions-colors vroom_center vroom_bg_color vroom_uppercase">
              <span class="text-md text-white">Ajouter</span>
            </t-button>
          </div>

        </form>

      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "courses",

  data() {
    return {
      error: "",
      courses: {
        "customerId": "",
        "passengerIds": [],
        "dates" : [
          {
            "aller" : "",
            "retour" : "",
            "typeTrajet": "ALLER SIMPLE"
          }
        ],
        "frequency": "REGULAR",
        "pickUp": {
          "address1": "",
          "address2": "",
          "postalCode": 0,
          "city": "",
          "country": "",
          "lon": 0,
          "lat": 0
        },
        "dropOff": {
          "address1": "",
          "address2": "",
          "postalCode": 0,
          "city": "",
          "country": "",
          "lon": 0,
          "lat": 0
        }
      },
      childrens: "",
      parentId: "",
      parentFirstname: "",
      adress_aller: "",
      adress_retour: "",
      search_adress_aller: [],
      search_adress_retour: [],
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: "courses",
      },
    };
  },
  methods: {
    async function_search_adress_aller() {
      if (this.adress_aller.length >= 3) {
        axios
        .post('/api/ride/searchAddress', {
          "query": this.adress_aller
        })
        .then((response) => {
          console.log("response");
          if (response.data && response.data.results) {
            this.search_adress_aller = response.data.results
            console.log(response.data.results);
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
      }
    },
    async function_search_adress_retour() {
      axios
      .post('/api/ride/searchAddress', {
        "query": this.adress_retour
      })
      .then((response) => {
        console.log("response");
        if (response.data && response.data.results) {
          console.log(response.data.results);
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
    },
    async create() {
      axios
      .put('/api/ride/getOffers', courses)
      .then((response) => {
        console.log("response");
        console.log(response);
        if (response && response.data && response.data.message) {
          this.error = response.data.message;
        }
        else {
          this.error = "Enregisté";
        }
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message;
        }
        else {
          this.error = "Erreur";
        }
        window.scrollTo(0, 0);
      });
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      if (this.$route.query.id) {
        this.parentId = this.$route.query.id;
        this.courses.customerId = this.$route.query.id;
        axios
          .get('/api/child/parent/' + this.$route.query.id)
          .then((response) => {
            this.childrens = response.data;
          })
          .catch((error) => {
            console.log("error");
            console.log(error);
          });
      }
      if (this.$route.query.firstname) {
        this.parentFirstname = this.$route.query.firstname;
      }
    }
    else {
      window.location.href = "/login";
    }
  },
};
</script>

<style>
.vroom_select {
  border: 2px solid #20D8D2;
  text-transform: capitalize;
}
.vroom_label {
  color: #2C2C2C;
  font-size: 11px;
  font-weight: 600;
}
.vroom_center {
  margin: 0 auto;
}
.vroom_image {
  border-radius: 4px;
}
.vroom_alert {
  color: #007e49;
  background-color: #ccf6e4;
  border: 0.5px solid #b3f2d7;
  padding: 12px 18px;
  border-radius: 4px;
}
.vroom_hidden {
  opacity: 0;
}
.block_adress {
  position: relative;
}
.select_adress {
  position: absolute;
  margin-top: -27px;
  border: 2px solid #20D8D2;
  background: white;
  width: 100%;
  border-radius: 4px;
  padding: 0 8px;
}
.option_adress {
  display: block;
}
</style>