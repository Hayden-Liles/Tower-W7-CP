<template>
  <nav class="navbar navbar-expand-lg px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <i class="mdi mdi-chess-rook fs-2 text-light">Tower</i>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div v-if="account.id">
      <router-link :to="{ name: 'Home' }" class="btn text-info selectable text-uppercase">
        new event
      </router-link>
    </div>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto d-flex justify-content-center flex-grow-1">
        <li class="me-2">
          <router-link :to="{ name: 'Home' }" class="btn text-info selectable text-uppercase">
            Home
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import Login from './Login.vue'
export default {
  setup() {
    return {
      account: computed(()=> AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

nav {
  background: linear-gradient(0deg, #474C61 0%, rgba(71, 76, 97, 0) 100%);
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-info);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
