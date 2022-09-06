<template>
  <section id="page-drivers" class="">
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
              <h3 class="vroom_text_color">Ajouter d'un chauffeur</h3>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/" class="nuxt-link-active">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="/drivers" class="nuxt-link-active">Chauffeur</a></li>
              <li class="breadcrumb-item">Ajouter</li>
              </ol>
            </div>
          </div>

          <div class="grid px-8 md:px-12 md:gap-8">
            <b-notification v-if="error" type="is-warning" class="vroom_alert">
              {{ error }}
            </b-notification>
          </div>

          <div class="grid px-8 md:px-12 md:pt-12 md:grid-cols-2 md:gap-8">
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
              type="text"
              namefor="phone"
              label="Téléphone"
              placeholder=" "
              :required="true"
              v-model="phone"
              value="oui"
              class="border-b-2 md:mr-8 border-primary-vert1"
            />
            <base-input-text
              type="date"
              namefor="date_of_birth"
              label="Date de naissance"
              placeholder=" "
              :required="true"
              v-model="date_of_birth"
              class="border-b-2 md:mr-8 border-primary-vert1"
            />
            <div style="transform: translateY(-20px);">
              <label class="form-label vroom_label" for="gender">Genre</label>
              <select class="form-select vroom_select" id="gender" name="gender" v-model="gender" aria-label="Default select example">
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>
          <div class="grid px-8 md:px-12 md:grid-cols-3 md:gap-8">
            <div>
              <label class="form-label vroom_label" for="photo_driver">
                Image du chauffeur<br><br>
                <img src="https://hetic-vroom-api.one-website.com/images/default.png" id="image_photo_driver" class="vroom_image" alt="photo_driver"><br>
              </label>
              <input type="file" id="photo_driver" name="photo_driver">
            </div>
            <div>
              <label class="form-label vroom_label" for="photo_license">
                Image du permis<br><br>
                <img src="https://hetic-vroom-api.one-website.com/images/default.png" id="image_photo_license" class="vroom_image" alt="photo_license"><br>
              </label>
              <input type="file" id="photo_license" name="photo_license">
            </div>
            <div>
              <label class="form-label vroom_label" for="police_record">
                Image du casier judiciaire<br><br>
                <img src="https://hetic-vroom-api.one-website.com/images/default.png" id="image_police_record" class="vroom_image" alt="police_record"><br>
              </label>
              <input type="file" id="police_record" name="police_record">
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
  name: "Drivers",

  data() {
    return {
      error: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      date_of_birth: "",
      gender: "",
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: "drivers",
      },
    };
  },
  methods: {
    async create() {
      if (localStorage.getItem("token")) {
        const form_data = new FormData();
        form_data.append('firstname', this.firstname);
        form_data.append('lastname', this.lastname);
        form_data.append('email', this.email);
        form_data.append('phone', this.phone);
        form_data.append('date_of_birth', this.date_of_birth);
        form_data.append('gender', this.gender);
        form_data.append('photo_driver', document.getElementById('photo_driver').files[0]);
        form_data.append('photo_license', document.getElementById('photo_license').files[0]);
        form_data.append('police_record', document.getElementById('police_record').files[0]);
        form_data.append('token', localStorage.getItem("token"));
        axios.post('/api/drivers/create/', form_data, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((response) => {
            if (response.data.message) {
              this.error = response.data.message;
              window.scrollTo(0, 0);
            }
          });
      }
      else {
        window.location.href = "/login";
      }
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      document.getElementById("photo_driver").addEventListener('change', function (event) {
        document.getElementById("image_photo_driver").src = URL.createObjectURL(document.getElementById("photo_driver").files[0]);
      });
      document.getElementById("photo_license").addEventListener('change', function (event) {
        document.getElementById("image_photo_license").src = URL.createObjectURL(document.getElementById("photo_license").files[0]);
      });
      document.getElementById("police_record").addEventListener('change', function (event) {
        document.getElementById("image_police_record").src = URL.createObjectURL(document.getElementById("police_record").files[0]);
      });
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
</style>