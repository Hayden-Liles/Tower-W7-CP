<template>
<div class="container">
  <div class="row">
    <div class="col-12">
      <!-- SECTION Event Cards -->
      <div class="row">
        
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { onMounted } from 'vue';
import { eventsService } from '../services/EventsService'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

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
      
    }
  }
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
