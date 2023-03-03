<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 mt-3">
                <div class="ps-2">
                    <p class="fs-2 text-success">Upcoming Events</p>
                </div>

                <div class="d-flex justify-content-center">
                    <div class=" d-flex">
                        <img id="ticket-img"
                            src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60"
                            alt="">
                        
                        <div class="d-flex">
                            <div class="bg-dark-lighten px-4" id="ticket-body">
                                <div class="h-75">
                                    <p class="fs-2 pt-3">Event Name</p>
                                    <p class="fs-4 text-info pt-3">Convert<br>03/05/2022</p>
                                </div>
                                <div class="h-25 d-flex justify-content-center align-items-center">
                                    <div>
                                        <button class="btn btn-danger btn-lg">Shred Ticket</button>
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
export default {
    setup() {
        return {}
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
    transform: translateX(-5px);
}
</style>