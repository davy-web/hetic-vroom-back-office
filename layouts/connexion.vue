<template lang="">
  <main>
    <c-svg-icons />

    <!-- Loader starts-->
    <div class="loader-wrapper">
      <div class="theme-loader">
        <div class="loader-p"></div>
      </div>
    </div>
    <!-- Loader ends-->
    <div class="page-wrapper bg-pink-light" id="pageWrapper">
      <transition name="fade">
        <nuxt class="page-content " />
      </transition>
    </div>
  </main>
</template>
<script>
export default {};
</script>
<style lang=""></style>
