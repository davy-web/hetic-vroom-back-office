<template>
  <section class="py-8 card email-body">
    <p class="px-8 mb-5 text-xl font-bold">{{ title }}</p>

    <div class="email-profile">
      <div>
        <div class="grid grid-cols-12 inbox">
          <slot />
        </div>
      </div>
    </div>
    <div class="flex justify-end w-full px-8 pt-8">
      <nuxt-link
        v-if="seeMore"
        to="/questions"
        class="inline-flex text-md t-link"
        >Voir plus
      </nuxt-link>
    </div>
  </section>
</template>
<script>
import axios from "axios";

export default {
  name: "MessagesInbox",
  props: {
    color: {
      type: String,
      required: false,
      default: "#FF0000",
    },
    imageUrl: {
      type: String,
      required: false,
      default: "@/assets/images/logo/logo-vroom-light.png",
    },
    number: {
      type: String,
      required: false,
      default: "88,9",
    },
    title: {
      type: String,
      required: false,
      default: "Les dernières questions parents reçues",
    },
    seeMore: {
      type: Boolean,
      required: false,
    },
  },
  data: function () {
    return {
      datas: "",
    };
  },
  methods: {},
  mounted() {
    axios
      .get("/api/questions/get")
      .then((response) => (this.datas = response.data));
  },
};
</script>

<style lang="scss"></style>
