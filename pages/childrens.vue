<template>
  <section id="page-childrens" class="">
    <div class="overflow-hidden">
      <div class="mx-auto">
        
        <div class="grid mt-8 px-8 md:px-12 md:gap-8">
          <div>
            <h3 class="vroom_text_color">La liste des enfants</h3>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/" class="nuxt-link-active">Dashboard</a></li>
              <li class="breadcrumb-item">Enfant</li>
            </ol>
          </div>
        </div>

        <div v-if="childrens.length" class="flex justify-between py-8 mt-6 bg-transparent border-t border-gray-100 rounded-b md:px-12 bg-grey-light">
          <table>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Anniversaire</th>
              <th>Action</th>
            </tr>
            <tr v-for="children in childrens" :key="children._id">
              <td>{{ children.firstname }}</td>
              <td>{{ children.lastname }}</td>
              <td>{{ children.birthday.split('T')[0] }}</td>
              <td><nuxt-link :to="'#'" class="vroom_pointer"><svg class="icon_svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg></nuxt-link> <a class="vroom_pointer"><svg class="icon_svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg></a></td>
            </tr>
          </table>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Childrens",

  data() {
    return {
      childrens: ""
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
  },
  mounted() {
    if (localStorage.getItem("token")) {
      axios
        .get('/api/child/allChildren')
        .then((response) => {
          if (response.data) {
            this.childrens = response.data;
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
    else {
      window.location.href = "/login";
    }
  },
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #bbbbbb;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
.icon_svg {
  display: inline-block;
  font-size: inherit;
  overflow: visible;
  vertical-align: -0.125em;
  width: 1.125em;
  height: 1em;
  color: #333333;
}
.icon_svg:hover {
  color: #666666;
}
.vroom_pointer {
  cursor: pointer;
}
</style>