<template>
    <router-link :to="{name: 'Event', params:{eventId: curEvent.id}}">
        <div :style="{ backgroundImage: 'url(' + curEvent.coverImg + ')' }"
            class="event-img img-fluid d-flex align-items-end mt-4" id="event-card">
            <div class="event-info w-100 text-light">
                <div class="ps-1">
                    <p class="fs-4 fw-semibold text-capitalize">{{ curEvent.name }}</p>
                    <p class="event-info-text fs-5 text-capitalize">{{ curEvent.type }}<br>{{ curEvent.startDate }}</p>
                </div>
                <div class="d-flex text-end fs-5 justify-content-end pe-2"
                    v-if="!curEvent.isCanceled && curEvent.capacity != 0">
                    <p class="event-info-text">{{ curEvent.capacity }}</p>
                    <p class="ps-1">spots left</p>
                </div>
                <div v-else-if="curEvent.isCanceled" class="bg-danger w-100 p-0 m-0 text-center">
                    <p class="fw-bold">Cancelled</p>
                </div>
                <div v-else-if="curEvent.capacity <= 0" class="bg-danger w-100 p-0 m-0 text-center">
                    <p class="fw-bold">At Capacity</p>
                </div>
            </div>
        </div>
    </router-link>
</template>


<script>
import { logger } from '../utils/Logger';

export default {
    props: {
        curEvent: { type: Object, required: true }
    },
    setup() {
        return {
        }
    }
}
</script>


<style lang="scss" scoped>
p {
    margin: 0;
}

#event-card {
    height: 300px;
}

#event-card:hover {
    opacity: .7;
    cursor: pointer;
}

.event-img {
    background-size: cover;
    background-position: center;
    width: 100%;
    border: 3px solid #474C61;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.382);
}

.event-info {
    background: rgba(0, 0, 0, 0.52);
    border: 1px solid rgba(86, 199, 251, 0.2);
    backdrop-filter: blur(16px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 3px;
}

.event-info-text {
    color: #CCF3FD;
}
</style>