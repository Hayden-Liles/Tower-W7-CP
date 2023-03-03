<template>
  <span class="navbar-text">
    <button class="btn selectable text-dark bg-success fw-semibold text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown dropstart my-2 my-lg-0">
        <div type="button" class="" data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <div class="btn text-info selectable text-uppercase">
              my profile
            </div>
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown">
          <div class="list-group bg-dark-lighten">
            <router-link :to="{ name: 'Profile' }">
              <div class="list-group-item dropdown-item selectable bg-dark-lighten">
                View Profile
              </div>
            </router-link>
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item selectable bg-dark-lighten">
                Manage Account
              </div>
            </router-link>
            <div class="selectable list-group-item dropdown-item list-group-item-action text-danger bg-dark-lighten" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.list-group-item:last-child{
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.list-group, .dropdown-menu{
  border-radius: 0;
}
.selectable:hover{
  opacity: .9;
}
</style>
