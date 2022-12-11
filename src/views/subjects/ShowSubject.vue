<template>
    <div class="container">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>Detalles materia</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div v-for="(errorArray, idx) in errorMsg" :key="idx">
                            <div v-for="(allErrors, idx) in errorArray" :key="idx">
                                <span class="text-danger">{{ allErrors }} </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <form v-on:submit.prevent="editSubject">
                            <div class="form-group">
                                <label for="">Nombre:</label>
                                <input type="text" class="form-control" name="name" v-model="subject.name">
                            </div>
                            <div class="form-group">
                                <label for="">Semestre:</label>
                                <input type="number" class="form-control" min="0" name="name"
                                    v-model="subject.semester">
                            </div>
                            <div class="form-group">
                                <label for="">Creditos:</label>
                                <input type="number" class="form-control" min="0" name="name" v-model="subject.credits">
                            </div>
                            <div class="form-group">
                                <label for="">Materia de prerequisito:</label>
                                <input type="number" class="form-control" min="0" name="name"
                                    v-model="subject.prerequisite_subject">
                            </div>
                            <div class="form-group">
                                <label for="">Horas de trabajo autonomo:</label>
                                <input type="number" class="form-control" min="0" name="name"
                                    v-model="subject.autonomous_work">
                            </div>
                            <div class="form-group">
                                <label for="">Horas de trabajo dirigido:</label>
                                <input type="number" class="form-control" min="0" name="name"
                                    v-model="subject.directed_work">
                            </div>
                            <div class="form-group">
                                <label for="">Profesor:</label>
                                <input type="text" class="form-control" min="0" name="name" v-model="subject.teacher">
                            </div>
                            <div class="text-center pt-5">
                                <!--   <router-link :to="{name: 'subjects'}" class="btn btn-light">Cancel</router-link> -->
                                <button class="btn btn-light" @click="goBack">
      Cancel
    </button>
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
            subject: [],
            errorMsg: ''

        }
    },
    created: function () {
        this.getSubject();
        this.getUser();
    },
    methods: {
        goBack() {
        this.$router.go(-1)
      },
        getUser(){
            var token =localStorage.getItem('token')
            if(!token){
                this.$router.push('/login');
            }
        },
        getSubject() {
            fetch("http://127.0.01:8000/api/subjects/" + this.$route.params.id, {
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
                    this.subject=dataResponse.subject
                })
        }
    }
}
</script>