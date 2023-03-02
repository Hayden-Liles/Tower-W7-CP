<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div>
          <CreateEventForm/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateEventForm from '../components/CreateEventForm.vue'
export default {
  setup() {
    return {
    }
  },
  components: { CreateEventForm }

}
</script>
