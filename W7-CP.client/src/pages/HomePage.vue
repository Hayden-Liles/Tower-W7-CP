<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-11 m-auto mt-4">
      <div class="bg-dark-lighten rounded d-flex justify-content-around my-shadow">
          <button @click="changeFilterCategory('')" class="btn text-info h-100 w-20 text-center selectable py-3 noround rounded-left">All</button>
          <button @click="changeFilterCategory('concert')" class="btn text-info h-100 w-20 text-center selectable py-3 noround">Concert</button>
          <button @click="changeFilterCategory('sport')" class="btn text-info h-100 w-20 text-center selectable py-3 noround">Sport</button>
          <button @click="changeFilterCategory('convention')" class="btn text-info h-100 w-20 text-center selectable py-3 noround">Convention</button>
          <button @click="changeFilterCategory('digital')" class="btn text-info h-100 w-20 text-center selectable py-3 noround rounded-right">Digital</button>
        </div>
    </div>
    <div class="col-11 m-auto">
      <!-- SECTION Event Cards -->
      <div class="row" v-if="events">
        <div class="col-md-3" v-for="event in events">
          <EventCard :curEvent="event"/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { eventsService } from '../services/EventsService'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import EventCard from '../components/EventCard.vue'
import { AppState } from '../AppState';

export default {
  setup() {

    const filterCategory = ref('')
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

      events: computed(() => {
        if (!filterCategory.value) {
          return AppState.events
        }
        else {
          return AppState.events.filter(e => e.type == filterCategory.value)
        }
      }),

      changeFilterCategory(type) {
        filterCategory.value = type
      }
    }
  },
  components: { EventCard }

}
</script>

<style scoped lang="scss">
.noround{
  border-radius: 0;
}
.rounded-right{
  border-bottom-right-radius: .375rem;
  border-top-right-radius: .375rem;
}
.rounded-left{
  border-top-left-radius: .375rem;
  border-bottom-left-radius: .375rem;
}
.filter-btn:hover{
  border-bottom: 2px solid var(--bs-info);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.my-shadow{
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.65);
}
.w-20{
  width: 20%;
}
</style>
