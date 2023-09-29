<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="app-header">
    <img alt="Panoramas of the bay" class="app-header__logo" src="@/assets/logo.svg"/>

    <nav class="app-header__nav">
      <RouterLink class="app-header__nav-link" to="/">Home</RouterLink>
      <RouterLink class="app-header__nav-link" to="/owners">Owners</RouterLink>
      <RouterLink class="app-header__nav-link" to="/flats">Flats</RouterLink>
      <RouterLink class="app-header__nav-link" to="/voting">Voting</RouterLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  display: grid;
  grid-template-columns: 50px auto;
  column-gap: 2em;
  align-items: end;
  padding: 1em 0 0;
  height: 65px;

  &__logo {
    width: 50px;
  }

  &__nav {
    &-link {
      margin-right: 10px;

      &.router-link-active {
        text-decoration: underline;
      }
    }
  }
}
</style>
