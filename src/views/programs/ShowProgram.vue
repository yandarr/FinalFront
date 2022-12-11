<template>
    <div class="container">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>Show Program</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <form v-on:submit.prevent="editProgram">
                            <div class="form-group">
                                <label for="">Name:</label>
                                <input type="text" class="form-control" readonly name="name" v-model="program.name">
                            </div>
                            <div class="text-center pt-5">
                                <router-link :to="{ name: 'programs' }" class="btn btn-light">Cancel</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            program: [],
            errorMsg: ''

        }
    },
    created: function () {
        this.getProgram();
        this.getUser();
    },
    methods: {
        getUser(){
            var token =localStorage.getItem('token')
            if(!token){
                this.$router.push('/login');
            }
        },
        getProgram() {
            fetch("http://127.0.01:8000/api/programs/" + this.$route.params.id, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ localStorage.getItem('token')
                    },
                })
                .then((response) => response.json())
                .then((dataResponse) => {
                    console.log(dataResponse)
                    if(dataResponse.status){
                        this.$router.push('/login');
                    }
                    this.program=dataResponse.program
                })
            }
    }
}
</script>