<template>
<div class="container">
  <div class="row">
    <div class="col-12">
      <!-- SECTION Event Cards -->
      <div class="row" v-if="events">
        <div class="col-3" v-for="event in events">
          <EventCard :curEvent="event"/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { eventsService } from '../services/EventsService'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import EventCard from '../components/EventCard.vue'
import { AppState } from '../AppState';

export default {
  setup() {

    async function getAllEvents(){
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }

    onMounted(() => {
      getAllEvents()
    })
    
    return {
      events: computed(() => AppState.events)
    }
  },
  components: { EventCard }

}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
