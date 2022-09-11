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
              <div id="select_adress_aller" class="select_adress" v-if="search_adress_aller.length">
                <a class="option_adress" v-for="search_an_adress_aller in search_adress_aller" :key="search_an_adress_aller._id" @click="set_adress_aller(search_an_adress_aller.address1, search_an_adress_aller.postalCode, search_an_adress_aller.city, search_an_adress_aller.country, search_an_adress_aller.lon, search_an_adress_aller.lat)">
                  {{ search_an_adress_aller.address1 }}
                </a>
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
            <div class="block_adress">
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
              <div id="select_adress_retour" class="select_adress" v-if="search_adress_retour.length">
                <a class="option_adress" v-for="search_an_adress_retour in search_adress_retour" :key="search_an_adress_retour._id" @click="set_adress_retour(search_an_adress_retour.address1, search_an_adress_retour.postalCode, search_an_adress_retour.city, search_an_adress_retour.country, search_an_adress_retour.lon, search_an_adress_retour.lat)">
                  {{ search_an_adress_retour.address1 }}
                </a>
              </div>
            </div>
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
              <select class="form-select vroom_select" v-model="courses.passengerIds[0]" aria-label="Default select example">
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

        <div v-if="offers.length" class="grid px-8 md:px-12 md:pt-12 md:grid-cols-3 md:gap-8 block_offres">
          <a v-for="offer in offers" :key="offer.id" @click="select_offer(offers_uid, offer.id)" class="block_offre">
            <img :src="offer.url" class="image_offre">
            <h1 class="titre_offre">
              {{ offer.libelle }}<br>
            </h1>
            <p class="text_offre">
              <strong>{{ offer.price }} {{ offer.devise }}</strong><br>
              {{ offer.description }}<br>
              {{ offer.maxPassenger }} place(s) disponible<br>
            </p>
          </a>
        </div>

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
      offers: [],
      offers_uid: 0,
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
      let select_adress_aller = document.getElementById("select_adress_aller");

      if (this.adress_aller.length >= 3) {
        axios
        .post('/api/ride/searchAddress', {
          "query": this.adress_aller
        })
        .then((response) => {
          if (response.data && response.data.results) {
            this.search_adress_aller = response.data.results;
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });

        if (select_adress_aller) {
          select_adress_aller.style.display = "block";
        }
      }
      else {
        if (select_adress_aller) {
          select_adress_aller.style.display = "none";
        }
      }
    },
    async function_search_adress_retour() {
      let select_adress_retour = document.getElementById("select_adress_retour");

      if (this.adress_retour.length >= 3) {
        axios
        .post('/api/ride/searchAddress', {
          "query": this.adress_retour
        })
        .then((response) => {
          if (response.data && response.data.results) {
            this.search_adress_retour = response.data.results;
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });

        if (select_adress_retour) {
          select_adress_retour.style.display = "block";
        }
      }
      else {
        if (select_adress_retour) {
          select_adress_retour.style.display = "none";
        }
      }
    },
    async set_adress_aller(address1, postalCode, city, country, lon, lat) {
      let select_adress_aller = document.getElementById("select_adress_aller");

      this.courses.pickUp.address1 = address1;
      this.courses.pickUp.postalCode = postalCode;
      this.courses.pickUp.city = city;
      this.courses.pickUp.country = country;
      this.courses.pickUp.lon = lon;
      this.courses.pickUp.lat = lat;
      this.adress_aller = address1;
      if (select_adress_aller) {
        select_adress_aller.style.display = "none";
      }
    },
    async set_adress_retour(address1, postalCode, city, country, lon, lat) {
      let select_adress_retour = document.getElementById("select_adress_retour");

      this.courses.dropOff.address1 = address1;
      this.courses.dropOff.postalCode = postalCode;
      this.courses.dropOff.city = city;
      this.courses.dropOff.country = country;
      this.courses.dropOff.lon = lon;
      this.courses.dropOff.lat = lat;
      this.adress_retour = address1;
      if (select_adress_retour) {
        select_adress_retour.style.display = "none";
      }
    },
    async create() {
      axios
      .post('/api/ride/getOffers', this.courses)
      .then((response) => {
        if (response && response.data && response.data.offers) {
          this.offers = response.data.offers;
          this.offers_uid = response.data.uid;
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
        console.log("error");
        console.log(error);
        window.scrollTo(0, 0);
      });
    },
    async select_offer(offer_uid, offer_offerId) {
      axios
      .post('/api/ride/requestRide', {
        uid: offer_uid,
        offerId: offer_offerId
      })
      .then((response) => {
        window.location.href = "/customers-update?id=" + this.parentId + "&firstname=" + this.parentFirstname;
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message;
        }
        else {
          this.error = "Erreur";
        }
        console.log("error");
        console.log(error);
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
  z-index: 10;
}
.option_adress {
  display: block;
  color: #2C2C2C;
  cursor: pointer;
  padding: 0 8px;
}
.option_adress:hover {
  background-color: #dedede;
}
.block_offre {
  overflow: hidden;
  color: #2C2C2C;
  background: white;
  box-shadow: 0 0 10px #eee;
  border-radius: 8px;
}
.block_offre:hover {
  color: #2C2C2C;
  box-shadow: 0 0 10px #ccc;
}
.titre_offre {
  padding: 24px 24px 0 24px;
  margin: 0;
}
.text_offre {
  padding: 12px 24px 24px 24px;
  margin: 0;
}
.image_offre {
  box-shadow: 0px 0px 10px #eee;
}
</style>