<template>
  <div class="container-fluid">
    <div class="row mt-5">
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
