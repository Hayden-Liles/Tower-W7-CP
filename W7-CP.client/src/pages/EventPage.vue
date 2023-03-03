<template>
    <div class="container" v-if="curEvent">
        <!-- SECTION The event -->
        <div class="row">
            <div class="col-12 event-img img-fluid d-flex align-items-end my-4 p-0"
                :style="{ backgroundImage: 'url(' + curEvent.coverImg + ')' }" id="event-card">
                <div class="row event-info m-0 w-100 text-light">
                    <div class="col-5 d-flex align-items-center justify-content-center">
                        <img :src="curEvent.coverImg" id="event-img" alt="" class="ps-2">
                    </div>
                    <div class="col-7 py-5 h-100">
                        <div class="dropdown h10 text-end">
                            <button class="btn btn-info py-0" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="mdi mdi-dots-horizontal fs-5"></i>
                            </button>
                            <ul class="dropdown-menu bg-dark-lighten">
                                <li @click="editEvent(curEvent)">
                                    <p class="ps-3 py-2 selectable text-info"><i class="mdi mdi-pencil pe-1"></i>edit event
                                    </p>
                                </li>
                                <li @click="cancelEvent()">
                                    <p v-if="!curEvent.isCanceled" class="ps-3 py-2 selectable text-danger"><i
                                            class="mdi mdi-cancel pe-1"></i>cancel
                                        event</p>
                                    <p v-else class="ps-3 py-2 selectable text-danger"><i
                                            class="mdi mdi-check-circle pe-1"></i>Uncancel event</p>
                                </li>
                            </ul>
                        </div>
                        <div class="h80">
                            <div class="d-flex justify-content-between pe-2">
                                <div class="fw-semibold">
                                    <p class="fs-3">{{ curEvent.name }}</p>
                                    <p class="fs-5 text-info text-capitalize">{{ curEvent.type }}</p>
                                </div>
                                <p class="fs-5 text-info">{{ curEvent.startDate }}</p>
                            </div>
                            <p class="mt-4" id="desc-text">{{ curEvent.description }}</p>
                        </div>
                        <div class="text-end h10 d-flex justify-content-between"
                            v-if="!curEvent.isCanceled && curEvent.capacity> 0">
                            <div class="d-flex align-items-center fs-4 text-info">
                                <p><b>{{ curEvent.capacity }}</b></p>
                                <p class="ps-2 fs-3">Spots Left</p>
                            </div>
                            <div v-if="curEvent.tickets">
                                <button v-if="!curEvent.tickets.find(e => e.accountId == account.id)" @click="attendEvent()" class="btn btn-lg bg-warning fs-4"><i class="mdi mdi-account-group-outline"></i>
                                    Attend</button>
                                <button v-else @click="dontAttendEvent()" class="btn btn-lg bg-danger fs-4"><i class="mdi mdi-account"></i>
                                    Leave</button>
                            </div>
                        </div>
                        <div class="text-end h10 d-flex justify-content-center bg-danger align-items-center"
                            v-else-if="curEvent.isCanceled">
                            <p class="fs-3 text-center"><b>Canceled</b></p>
                        </div>
                        <div class="text-end h10 d-flex justify-content-between bg-danger align-items-center"
                            v-else-if="curEvent.capacity <= 0 && (curEvent.tickets.find(e => e.accountId == account.id))">
                            <p class="fs-3 text-center"><b>At Capacity</b></p>
                            <div>
                                <button @click="dontAttendEvent()" class="btn btn-sm bg-danger fs-4"><i class="mdi mdi-account"></i>
                                        Leave</button>
                            </div>
                        </div>
                        <div class="text-end h10 d-flex justify-content-center bg-danger align-items-center"
                            v-else-if="curEvent.capacity <= 0">
                            <p class="fs-3 text-center"><b>At Capacity</b></p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- SECTION Attendee's -->
        <div class="row" v-if="curEvent.tickets.length > 0">
            <div class="col-12">
                <p class="text-text pb-1">See who is attending </p>
                <div class="d-flex bg-dark-lighten">
                    <img v-for="attendee in curEvent.tickets" :src="attendee.profile.picture" id="attendee-picture" class="p-1" :title="attendee.profile.name">
                </div>
            </div>
        </div>
        <!-- SECTION The Comments -->
        <div class="row">
            <div class="col-9 m-auto mt-5 mb-5">
                <p class="text-text pb-1">What are people saying</p>
                <div class="bg-dark-lighten px-5 py-4">
                    <p class="text-end pb-2 text-success">Join the conversation</p>
                    <!-- STUB Comment Form -->
                    <form @submit.prevent="createComment()">
                        <textarea v-model="editable.body" id="comment" class="form-control"
                            placeholder="Share your thoughts.." minlength="10" required></textarea>
                        <div class="text-end">
                            <button type="submit" class="btn btn-lg btn-success mt-3" style="border-radius: 0;">Post
                                Comment</button>
                        </div>
                    </form>
                    <!-- STUB Where the comments go -->
                    <div v-for="comment in curEvent.comments">
                        <div class="d-flex mt-3 align-items-center">
                            <img :src="comment.creator.picture" class="rounded-circle" id="creator-img">
                            <div class="bg-info rounded p-2 ms-3">
                                <div class="d-flex justify-content-between fs-3">
                                    <p class="fs-3 fw-semibold text-capitalize">{{ comment.creator.name }}</p>
                                    <i @click="deleteComment(comment.id)" class="mdi mdi-trash-can selectable" v-if="account.id == comment.creator.id"></i>
                                </div>
                                <p class="px-1">{{ comment.body }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { router } from '../router';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService';

export default {
    setup() {
        const editable = ref({})
        const route = useRoute()
        async function getCurEvent() {
            try {
                const eventId = route.params.eventId
                await eventsService.getCurEvent(eventId)
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        }
        onMounted(() => {
            getCurEvent()
        })
        onUnmounted(() => {
            AppState.curEvent = null
        })
        return {
            editable,
            curEvent: computed(() => AppState.curEvent),
            account: computed(() => AppState.account),

            async createComment() {
                try {
                    logger.error("Not yet done CREATE COMMENT")
                    const formData = editable.value
                    formData.eventId = AppState.curEvent.id
                    await commentsService.createComment(formData)
                    editable.value = {}
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }

            },

            async editEvent(theEvent) {
                try {
                    AppState.curEvent = theEvent
                    router.push({ name: 'EditEvent', params: { eventId: theEvent.id } })
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }

            },

            async cancelEvent() {
                try {
                    const eventId = route.params.eventId
                    const popConf = await Pop.confirm("Are you sure you would like to cancel this event?")
                    if (!popConf) {
                        Pop.toast('Event Cancel Averted', "info")
                    }
                    await eventsService.cancelEvent(eventId)
                    Pop.toast("event status changed", "warning")
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            },

            async deleteComment(commentId){
                try {
                    const popConf = await Pop.confirm("Are you sure you would like to delete this comment?")
                    if (!popConf) {
                        Pop.toast('Comment Deletion Averted', "info")
                    }
                    await commentsService.deleteComment(commentId)
                    Pop.toast("Comment Deleted", "warning")
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            },

            async attendEvent(){
                try {
                    await eventsService.attendEvent()
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            },

            async dontAttendEvent(){
                try {
                    await eventsService.dontAttendEvent()
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
textarea {
    height: 150px;
    resize: none;
    overflow-y: auto;
}

p {
    margin: 0;
}

.h10 {
    height: 10%;
}

.h80 {
    height: 80%;
}

.c {
    height: 20%;
}

#event-card {
    height: 600px;
}

#desc-text {
    font-size: 18px;
}

#event-img {
    height: 500px;
    width: 100%;
}

#creator-img {
    height: 100px;
    widows: 100px;
}

#attendee-picture{
    height: 40px;
    width: 40px;
}

.event-img {
    background-size: cover;
    background-position: center;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.65);
}

.event-info {
    background: rgba(36, 109, 142, 0.6);
    border: 1px solid rgba(204, 243, 253, 0.2);
    backdrop-filter: blur(15px);
    backdrop-filter: blur(7px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 3px;
    height: 100%;
}

.event-info-text {
    color: #CCF3FD;
}
</style>