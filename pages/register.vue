<template>
  <div class="w-full h-full bg-pink-light vroom_bg_gradient_light">
    <inscription
      titre="Inscription"
      bouton_submit="S'inscrire'"
      lien="Se connecter"
      url_lien="login"
      class="h-screen "
    />
  </div>
</template>

<script>
export default {
  name: "register",
  layout: "connexion",
};
</script>

<style>
.vroom_bg_gradient_light {
  background-image: linear-gradient(45deg, #e3faf9, #f4e3fa);
}
</style>