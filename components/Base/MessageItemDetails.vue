<template>
  <div
    class="col-span-12 row-span-1 px-8 py-4 border-b cursor-pointer media hover:bg-grey-lighter group"
  >
    <div class="flex items-center justify-between w-full col-span-12">
      <div
        class="md:items-center justify-start w-[80%] md:w-[90%] flex flex-col md:flex-row"
      >
        <div
          class="flex items-center w-[30%] max-w-[180px] h-7 col-span-3 mb-0 mr-4 text-xs font-bold text-pink"
        >
          <base-use-svg
            id="close"
            class="hidden mr-3 group-hover:block"
            color="pink"
            typeColor="pink"
            size="sm"
            @click="idQuestion"
          />
          <span class="h-full mr-1">{{ clientFirstname }}</span>
          <span class="h-full">{{ clientLastname }}</span>
        </div>
        <p
          class="w-[90%] md:w-[70%] col-span-7 ml-3 my-3 md:my-0 text-xs font-medium"
        >
          {{ clientMessage }}
        </p>
        <a
          :href="'mailto:' + clientMail"
          class="col-span-7 my-2 ml-3 text-xs font-thin text-black md:my-0 h-7 hover:text-pink"
        >
          {{ clientMail }}
        </a>
        <a
          :href="'tel:' + clientPhone"
          class="col-span-7 my-2 ml-3 text-xs font-thin text-black md:my-0 h-7 hover:text-pink"
        >
          {{ clientPhone }}
        </a>
      </div>
      <span class="h-7 w-[15%] md:w-[10%] col-span-1 mb-0 text-xs text-right">{{
        clientDate
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageItemDetails",
  props: {
    id: {
      type: String,
      required: false,
    },
    idQuestion: {
      type: String,
      required: false,
    },
    clientLastname: {
      type: String,
      required: false,
    },
    clientFirstname: {
      type: String,
      required: false,
    },
    clientMessage: {
      type: String,
      required: false,
    },
    clientMail: {
      type: String,
      required: false,
    },
    clientPhone: {
      type: String,
      required: false,
    },
    clientDate: {
      type: String,
      required: false,
    },
  },

  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {

  },
};
</script>

<style lang="scss"></style>
