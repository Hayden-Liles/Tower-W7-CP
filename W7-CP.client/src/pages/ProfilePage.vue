<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="ps-2">
                    <p class="fs-2 text-success">Upcoming Events</p>
                </div>
            </div>
            <div class="col-12 mt-3 mb-5" v-for="ticket in tickets">

                <div class="d-flex justify-content-center">
                    <div class=" d-flex">
                        <img id="ticket-img"
                            src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60"
                            alt="">
                        
                        <div class="d-flex">
                            <div class="bg-dark-lighten px-4" id="ticket-body">
                                <div class="h-75">
                                    <p class="fs-2 pt-3">{{ ticket.event.name }}</p>
                                    <p class="fs-4 text-info pt-3">{{ ticket.event.type }}<br>{{ ticket.event.startDate }}</p>
                                </div>
                                <div class="h-25 d-flex justify-content-center align-items-center">
                                    <div>
                                        <button @click="shredTicket(ticket.id)" class="btn btn-danger btn-lg">Shred Ticket</button>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div id="ticket-punch" class="rounded-circle bg-dark">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
import { onMounted, computed } from 'vue';
import { accountService } from '../services/AccountService';
import { ticketsService } from '../services/TicketsService'
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';

export default {
    setup() {
        async function getAccountsTickets(){
            try {
                await accountService.getAccountsTickets()
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }

        }

        onMounted(()=>{
            getAccountsTickets()
        })
        return {
            tickets: computed(() => AppState.tickets),

            async shredTicket(ticketId){
                try {
                    const check = await Pop.confirm("Are you sure you would like to shred this ticket")
                    if(!check){
                        Pop.toast("Ticket Shredding Averted", "info")
                        return
                    }
                    await ticketsService.shredTicket(ticketId)
                    getAccountsTickets()
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
p {
    margin: 0;
}

#ticket-img {
    height: 350px;
    width: 350px;
}

#ticket-body {
    width: 600px;
}

#ticket-punch{
    height: 200px;
    width: 200px;
    transform: translateX(-108px);
}
</style>