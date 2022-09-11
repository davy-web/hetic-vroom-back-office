<template class="home">
  <div id="page-home" class="px-6 lg:px-0">
    <div class="grid grid-cols-12 gap-8 overflow-hidden grid-rows-12">
      <div
        class="col-span-12 row-span-2 row-start-1 lg:row-span-4 lg:col-span-6 lg:col-start-1 lg:col-end-7 box"
      >
        <bloc-welcome />
      </div>
      <div
        class="col-span-12 col-start-1 row-span-2 row-start-5 gap-8 lg:row-span-4 lg:col-span-2 lg:col-start-7 lg:row-start-1 box"
      >
        <bloc-card
          subtitle="Chauffeurs en course"
          color="#F4DFF8"
          number="1"
          class=""
          icons="parents"
        ></bloc-card>
      </div>
      <div
        class="col-span-12 col-start-1 row-span-2 row-start-7 lg:row-span-4 lg:col-span-2 lg:col-start-9 lg:row-start-1 box"
      >
        <bloc-card
          imageUrl="/assets/images/logo/logo-vroom-light.png"
          color="#F4DFF8"
          subtitle="Parents inscrits"
          number="2"
          class=""
          icons="drivers"
        ></bloc-card>
      </div>
      <div
        class="col-span-12 col-start-1 row-span-2 lg:row-span-4 lg:col-span-2 lg:col-start-11 row-start-10 lg:row-start-1 box"
      >
        <bloc-card
          subtitle="Enfants vroomés"
          number="2"
          class=""
          color="#F4DFF8"
          icons="childs"
        ></bloc-card>
      </div>
      <div
        class="col-span-12 col-start-1 row-span-6 lg:col-end-7 row-start-10 box"
      >
        <bloc-messages-inbox
          title="Les dernières questions parents reçues"
          :seeMore="true"
        >
          <base-message-item
            v-for="data in datasQuestion.slice(0, 3)"
            v-bind:key="data._id"
            type="checkbox"
            :namefor="data._id"
            :clientLastname="data.name"
            :clientFirstname="data.lastname"
            :clientMessage="data.text"
            :clientDate="$moment(data.date).format('MMM Do')"
          />
        </bloc-messages-inbox>
      </div>
      <div
        class="col-span-12 col-start-1 row-span-6 lg:col-end-13 lg:col-start-7 box"
      >
        <bloc-messages-inbox
          title="Les dernières candidatures chauffeurs"
          :seeMore="true"
        >
          <base-message-item
            v-for="data in datasQuestion.slice(0, 3)"
            v-bind:key="data._id"
            type="checkbox"
            :namefor="data._id"
            :clientLastname="data.name"
            :clientFirstname="data.lastname"
            :clientMessage="data.text"
            :clientDate="$moment(data.date).format('MMM Do')"
          />
        </bloc-messages-inbox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Home",

  props: {},
  computed: {
    ...mapGetters({
      isHome: "global/getIsHome",
      header: "global/getGlobal",
      screen: "global/getScreen",
    }),
  },

  data() {
    return {
      currentSlug: "home",
      page: this.$route.name,
      datasQuestion: "",
      dateConverted: ""
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: "homepage",
      },
    };
  },
  methods: {
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  },
};
</script>

<style>
</style>
