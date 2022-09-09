<template>
  <section id="page-childrens" class="">
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
              <h3 class="vroom_text_color">Ajouter d'un enfant</h3>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/" class="nuxt-link-active">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="/childrens" class="nuxt-link-active">Enfant</a></li>
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
              type="date"
              namefor="birthday"
              label="Date de naissance"
              placeholder=" "
              :required="true"
              v-model="birthday"
              class="border-b-2 md:mr-8 border-primary-vert1"
            />
            <base-input-text
              type="text"
              namefor="parentId"
              label="Parent"
              placeholder=" "
              :required="true"
              v-model="parentId"
              value="oui"
              class="border-b-2 md:mr-8 border-primary-vert1"
            />
          </div>
          <div class="grid px-8 md:px-12 md:grid-cols-3 md:gap-8">
            <div>
              <label class="form-label vroom_label" for="image">
                Image du enfant<br><br>
                <img src="https://hetic-vroom-api.one-website.com/images/default.png" id="image_image" class="vroom_image" alt="image"><br>
              </label>
              <input type="file" id="image" name="image">
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
  name: "childrens",

  data() {
    return {
      error: "",
      firstname: "",
      lastname: "",
      birthday: "",
      parentId: "",
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: "childrens",
      },
    };
  },
  methods: {
    async create() {
      if (localStorage.getItem("token")) {
        const form_data = new FormData();
        form_data.append('firstname', this.firstname);
        form_data.append('lastname', this.lastname);
        form_data.append('birthday', this.birthday);
        form_data.append('parentId', this.parentId);
        form_data.append('image', document.getElementById('image').files[0]);
        axios.post('/api/childrens/create/', form_data, { headers: { 'Content-Type': 'multipart/form-data' } })
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
      document.getElementById("image").addEventListener('change', function (event) {
        document.getElementById("image_image").src = URL.createObjectURL(document.getElementById("image").files[0]);
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