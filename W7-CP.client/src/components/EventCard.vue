<template>
    <div :style="{ backgroundImage: 'url(' + curEvent.coverImg + ')' }" class="event-img img-fluid d-flex align-items-end my-2">
        <div class="event-info w-100 text-light p-1">
            <p class="fs-4 fw-semibold">Event Title</p>
            <p class="event-info-text fs-5">Social event center<br>10th of March</p>
            <div class="d-flex text-end fs-5 justify-content-end">
                <p class="event-info-text">100</p>
                <p class="ps-1">spots</p>
            </div>
        </div>
    </div>
</template>


<script>
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

.event-img {
    background-size: contain;
    background-repeat: none;
    background-position: center;
    height: 250px;
    width: 100%;
    border: 3px solid #474C61;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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