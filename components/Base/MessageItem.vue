<template>
  <div class="col-span-12 row-span-1 px-8 py-4 border-b cursor-pointer media hover:bg-grey-lighter ">
    <label :for="namefor" class="grid w-full grid-cols-12 mb-0 email-chek">
      <div class="flex items-center justify-between col-span-12">
        <div class="items-center justify-start w-[90%] flex">
          <div
            class="flex items-center w-[30%] max-w-[180px] h-7 col-span-3 mb-0 mr-4 text-xs font-bold text-pink"
          >
            <span class="flex items-center h-full gap-x-2">
              <input
                :id="namefor"
                :type="type"
                :name="namefor"
                value="2"
                class="mb-[6px] text-transparent transition duration-100 ease-in-out border-transparent rounded shadow-sm checkbox_animated focus:border-transparent focus:ring-0 focus:ring-transparent focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </span>
            <span class="h-full mr-1">{{ clientFirstname }}</span>
            <span class="h-full">{{ clientLastname }}</span>
          </div>
          <p
            class="w-[70%] h-7 col-span-7 ml-3 mb-0 overflow-hidden text-xs font-medium"
          >
            {{ clientMessage }}
          </p>
        </div>
        <span class="h-7 w-[10%] col-span-1 mb-0 text-xs text-right">{{
          clientDate
        }}</span>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: "MessageItem",
  props: {
    id: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    namefor: {
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
};
</script>

<style lang="scss"></style>
