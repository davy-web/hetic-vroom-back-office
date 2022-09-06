<template lang="">
  <bloc-messages-inbox
    title="Les dernières questions parents reçues"
    :seeMore="false"
  >
    <base-message-item-details
      v-for="data in datasQuestion"
      v-bind:key="data._id"
      :idQuestion="deleteQuestion(data._id)"
      :clientLastname="data.name"
      :clientFirstname="data.lastname"
      :clientMail="data.mail"
      :clientPhone="data.phone"
      :clientMessage="data.text"
      :clientDate="$moment(data.date).format('MMM Do')"
    />
  </bloc-messages-inbox>
</template>
<script>
import axios from "axios";

export default {
  name: "questions",
  data() {
    return {
      datasQuestion: "",
    };
  },
  methods: {
    deleteQuestion(id) {
      axios
        .delete("/api/questions/delete/" + id)
        .then((response) => (this.datas = response.data));

      console.log("/api/questions/delete/" + id);
    },
  },
  mounted() {
    axios
      .get("/api/questions/get")
      .then((response) => (this.datasQuestion = response.data));
  },
};
</script>
<style lang="css"></style>
