<template>
    <div class="row mt-5">
        <div class="col-7" v-if="curEvent">
            <form class="w-75 m-auto" @submit.prevent="editEvent()">
                <div class="form-group row pt-3 align-items-center ps-4">
                    <label for="name" class="col-sm-2 col-form-label text-success fw-semibold text-sm-end">Name</label>
                    <div class="col-sm-9">
                        <input required v-model="editable.name" type="text" class="form-control" id="name"
                            placeholder="Name">
                    </div>
                </div>
                <div class="form-group row pt-3 align-items-center ps-4">
                    <label for="description"
                        class="col-sm-2 col-form-label text-success fw-semibold text-sm-end">Description</label>
                    <div class="col-sm-9">
                        <input required v-model="editable.description" type="text" class="form-control" id="description"
                            placeholder="Description">
                    </div>
                </div>
                <div class="form-group row pt-3 align-items-center ps-4 ps-3">
                    <label for="coverImage" class="col-sm-2 col-form-label text-success fw-semibold text-sm-end">Background
                        Image</label>
                    <div class="col-sm-9">
                        <input required v-model="editable.coverImg" type="url" class="form-control" id="coverImage"
                            placeholder="https://example.com/image">
                    </div>
                </div>
                <div class="form-group row pt-3 align-items-center ps-4">
                    <label for="location"
                        class="col-sm-2 col-form-label text-success fw-semibold text-sm-end">Location</label>
                    <div class="col-sm-4">
                        <input required v-model="editable.location" type="text" class="form-control" id="location"
                            placeholder="100">
                    </div>
                    <label for="capacity"
                        class="col-sm-2 col-form-label text-success fw-semibold text-sm-center">Capacity</label>
                    <div class="col-sm-3">
                        <input required v-model="editable.capacity" type="number" class="form-control" id="capacity"
                            placeholder="100">
                    </div>
                </div>
                <div class="form-group row pt-3 align-items-center ps-4">
                    <label for="type" class="col-sm-2 col-form-label text-success fw-semibold text-sm-end">Type</label>
                    <div class="col-sm-4">
                        <select v-model="editable.type" class="form-select" id="typeForm" typeof="text" required>
                            <option :value="undefined" hidden disabled selected>Select a Type</option>
                            <option value="concert">Concert</option>
                            <option value="convention">Convention</option>
                            <option value="sport">Sport</option>
                            <option value="digital">Digital</option>
                        </select>
                    </div>
                    <label for="startDate" class="col-sm-2 col-form-label text-success fw-semibold text-sm-center">Start
                        Date</label>
                    <div class="col-sm-3">
                        <input required v-model="editable.startDate" type="date" class="form-control" id="startDate">
                    </div>
                    <div class="text-end mt-5">
                        <button type="submit" class="btn btn-primary w-25 fw-bold bg-success" id="formBtn">Save</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-3">
            <div :style="{ backgroundImage: 'url(' + editable.coverImg + ')' }"
                class="event-img img-fluid d-flex align-items-end mt-4" id="event-card">
                <div class="event-info w-100 text-light">
                    <div class="ps-1">
                        <p class="fs-4 fw-semibold text-capitalize">{{ editable.name }}</p>
                        <p class="event-info-text fs-5 text-capitalize">{{ editable.type }}<br>{{ editable.startDate }}</p>
                    </div>
                    <div class="d-flex text-end fs-5 justify-content-end pe-2"
                        v-if="!editable.isCanceled && editable.capacity != 0">
                        <p class="event-info-text">{{ editable.capacity }}</p>
                        <p class="ps-1">spots left</p>
                    </div>
                    <div v-else-if="editable.isCanceled" class="bg-danger w-100 p-0 m-0 text-center">
                        <p class="fw-bold">Cancelled</p>
                    </div>
                    <div v-else-if="editable.capacity <= 0" class="bg-danger w-100 p-0 m-0 text-center">
                        <p class="fw-bold">At Capacity</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { ref, watchEffect, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { router } from '../router';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
    setup() {
        const route = useRoute()
        const editable = ref({...AppState.curEvent});
        let curPath = route.fullPath
        async function getCurEvent() {
            try {
                curPath = route.fullPath
                const eventId = route.params.eventId
                await eventsService.getCurEvent(eventId)
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        }
        onMounted(()=>{
            getCurEvent()      
        })
        onUnmounted(() => {
            AppState.curEvent = null
        })
        watchEffect(() => {
            if (editable.type != undefined) {
                typeForm.style = "";
            }
            if(route.fullPath != curPath){
                getCurEvent()
            }
        });
        return {
            curEvent: computed(()=> AppState.curEvent),
            editable,
            async editEvent() {
                try {
                    if (editable.value.type == undefined) {
                        typeForm.style = "border-color: red; background-color: #ffc6c6;";
                        return;
                    }
                    const eventId = route.params.eventId
                    const formData = editable.value
                    await eventsService.editEvent(formData, eventId)
                    router.push({ name: 'Event', params: { eventId: eventId } })
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }

            }
        };
    }
}
</script>


<style lang="scss" scoped>
form {
    border: 3px solid #575f80;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.65);
    padding: 1em;
    background-color: var(--bs-dark-lighten);
}

p {
    margin: 0;
}

#event-card {
    height: 300px;
}

.event-img {
    background-size: cover;
    background-position: center;
    width: 100%;
    border: 3px solid #474C61;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.65);
}

.event-info {
    background: rgba(204, 243, 253, 0.2);
    border: 1px solid rgba(86, 199, 251, 0.2);
    backdrop-filter: blur(7px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 3px;
}

.event-info-text {
    color: #CCF3FD;
}
</style>