<template>
  <section id="page-drivers" class="">
    <div class="overflow-hidden">
      <div class="mx-auto">

        <form
          action="post"
          class="mt-8"
          data-success="Thanks for your enquiry, we'll be in touch shortly."
          data-error="Please fill in all fields correctly."
          @submit.prevent="update"
        >

          <div class="grid px-8 md:px-12 md:gap-8">
            <div>
              <h3 class="vroom_text_color">Modifier le chauffeur</h3>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/" class="nuxt-link-active">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="/drivers" class="nuxt-link-active">Chauffeur</a></li>
              <li class="breadcrumb-item">Modifier</li>
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
              namefor="birthday"
              label="Date de naissance"
              placeholder=" "
              :required="true"
              v-model="birthday"
              class="border-b-2 md:mr-8 border-primary-vert1"
            />
          </div>
          <div class="grid px-8 md:px-12 md:grid-cols-3 md:gap-8">
            <div>
              <label class="form-label vroom_label" for="photo_driver">
                Image du chauffeur<br><br>
                <img src="https://localhost:80/images/default.png" id="image_photo_driver" class="vroom_image" alt="photo_driver"><br>
              </label>
              <input type="file" id="photo_driver" name="photo_driver">
            </div>
            <div>
              <label class="form-label vroom_label" for="photo_license">
                Image du permis<br><br>
                <img src="https://localhost:80/images/default.png" id="image_photo_license" class="vroom_image" alt="photo_license"><br>
              </label>
              <input type="file" id="photo_license" name="photo_license">
            </div>
            <div>
              <label class="form-label vroom_label" for="police_record">
                Image du casier judiciaire<br><br>
                <img src="https://localhost:80/images/default.png" id="image_police_record" class="vroom_image" alt="police_record"><br>
              </label>
              <input type="file" id="police_record" name="police_record">
            </div>
          </div>

          <div class="flex justify-between py-8 mt-8 bg-transparent border-t border-gray-100 rounded-b md:px-12 bg-grey-light">
            <t-button type="submit" variant="primary" class="px-5 py-3 transitions-colors vroom_center vroom_bg_color vroom_uppercase">
              <span class="text-md text-white">Modifier</span>
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
      birthday: "",
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
    async update() {
      if (localStorage.getItem("token")) {
        if (this.$route.query.id) {
          const form_data = new FormData();
          form_data.append('firstname', this.firstname);
          form_data.append('lastname', this.lastname);
          form_data.append('email', this.email);
          form_data.append('phone', this.phone);
          form_data.append('birthday', this.birthday);
          form_data.append('images', document.getElementById('photo_driver').files[0]);
          form_data.append('images', document.getElementById('photo_license').files[0]);
          form_data.append('images', document.getElementById('police_record').files[0]);
          axios
            .put('/api/driver/update/' + this.$route.query.id, form_data, { headers: { 'Content-Type': 'multipart/form-data' } })
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
      else {
        window.location.href = "/login";
      }
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      if (this.$route.query.id) {
        axios
          .get('/api/driver/get/' + this.$route.query.id)
          .then((response) => {
            if (response.data && response.data.message) {
              this.error = response.data.message;
              window.scrollTo(0, 0);
            }
            else {
              this.firstname = response.data.firstname;
              this.lastname = response.data.lastname;
              this.email = response.data.email;
              this.phone = response.data.phone;
              this.birthday = response.data.birthday.split('T')[0];
              document.getElementById("image_photo_driver").src = "http://localhost:80/uploads/" + response.data.photo_driver;
              document.getElementById("image_photo_license").src = "http://localhost:80/uploads/" + response.data.photo_license;
              document.getElementById("image_police_record").src = "http://localhost:80/uploads/" + response.data.police_record;
              document.getElementById("photo_driver").value = response.data.photo_driver;
              document.getElementById("photo_license").value = response.data.photo_license;
              document.getElementById("police_record").value = response.data.police_record;
            }
          });
      }

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