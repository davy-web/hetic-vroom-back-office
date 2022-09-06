<template>
  <div class="w-full h-full vroom_bg_gradient_light">
    <connexion
      titre="Connexion"
      bouton_submit="Se connecter"
      lien="Inscription"
      url_lien="register"
      class="h-screen"
    />
  </div>
</template>

<script>
export default {
  name: "login",
  layout: "connexion",
  middleware: "log",
};
</script>

<style>
.vroom_bg_gradient_light {
  background-image: linear-gradient(45deg, #e3faf9, #f4e3fa);
}
</style>
