<template>
    <form class="w-50 m-auto">
        <div class="form-group row pt-3">
            <label for="name" class="col-sm-3 col-form-label text-info text-sm-end">Name</label>
            <div class="col-sm-9">
                <input required v-model="editable.name" type="text" class="form-control" id="name" placeholder="Name">
            </div>
        </div>
        <div class="form-group row pt-3">
            <label for="description" class="col-sm-3 col-form-label text-info text-sm-end">Description</label>
            <div class="col-sm-9">
                <input required v-model="editable.description" type="text" class="form-control" id="description"
                    placeholder="Description">
            </div>
        </div>
        <div class="form-group row pt-3">
            <label for="coverImage" class="col-sm-3 col-form-label text-info text-sm-end">Background Image</label>
            <div class="col-sm-9">
                <input required v-model="editable.coverImage" type="url" class="form-control" id="coverImage"
                    placeholder="https://example.com/image">
            </div>
        </div>
        <div class="form-group row pt-3">
            <label for="location" class="col-sm-3 col-form-label text-info text-sm-end">Location</label>
            <div class="col-sm-4">
                <input required v-model="editable.location" type="text" class="form-control" id="location"
                    placeholder="100">
            </div>
            <label for="capacity" class="col-sm-2 col-form-label text-info text-sm-center">Capacity</label>
            <div class="col-sm-3">
                <input required v-model="editable.capacity" type="number" class="form-control" id="capacity"
                    placeholder="100">
            </div>
        </div>
        <div class="form-group row pt-3">
            <label for="type" class="col-sm-3 col-form-label text-info text-sm-end">Type</label>
            <div class="col-sm-4">
                <select v-model="editable.type" class="form-select" id="type" required>
                    <option value="concert">Concert</option>
                    <option value="convention">Convention</option>
                    <option value="sport">Sport</option>
                    <option value="digital">Digital</option>
                </select>
            </div>
            <label for="startDate" class="col-sm-2 col-form-label text-info text-sm-center">Start Date</label>
            <div class="col-sm-3">
                <input required v-model="editable.startDate" type="date" class="form-control" id="startDate">
            </div>
        </div>
    </form>
</template>


<script>
import { ref } from 'vue';
export default {
    setup() {
        const editable = ref({})
        return {
            editable,
        }
    }
}
</script>


<style lang="scss" scoped></style>