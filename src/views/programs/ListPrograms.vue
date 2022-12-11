<template>
    <div class="container">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>Listado de Programas</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12" style="padding-bottom:20px">
                        <router-link :to="{ name: 'create programs' }" class="btn btn-success">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Nuevo programa
                        </router-link>
                    </div>
                    <div class="col-lg-12">
                        <div class="row">
                            <div v-for="program in programs" :key="program.id" class="col-lg-4">
                                <div class="card" style="width: 18rem;">
                                    <div class="card-body" style="padding:10px">
                                        <h5 class="card-title">{{ program.name }}</h5>
                                        <p class="card-text">Programa de {{ program.name }}</p>
                                        <br>
                                        <div class="text-center">
                                        <router-link :to="{ name: 'show programs', params: { id: program.id } }"
                                            class="btn btn-warning btn-sm">
                                            <i class="fa fa-eye" aria-hidden="true">
                                                
                                            </i>
                                            &nbsp;Ver
                                        </router-link>
                                        &nbsp;
                                        <router-link :to="{ name: 'edit programs', params: { id: program.id } }"
                                            class="btn btn-primary btn-sm">
                                            <i class="fa fa-pencil-square-o" aria-hidden="true">
                                                
                                            </i>
                                            &nbsp;Editar
                                        </router-link>
                                        &nbsp;
                                        <button class="btn btn-danger btn-sm" v-on:click="deleteProgram(program.id)">
                                            <i class="fa fa-trash-o" aria-hidden="true">
                                                
                                            </i>
                                            &nbsp;Eliminar
                                        </button>
                                    </div>
                                        <br>
                                        <div class="text-center">
                                            <router-link :to="{ name: 'list subjects', params: { id: program.id } }"
                                             class="btn btn-success btn-sm">Malla Curricular</router-link>
                                        </div>
                                    </div>
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
    data() {
        return {
            programs: [],
        };
    },

    created: function () {
        this.getPrograms();
        this.getUser();
    },
    methods: {
        getUser() {
            var token = localStorage.getItem('token')
            if (!token) {
                this.$router.push('/login');
            }
        },
        getPrograms() {
            fetch("http://127.0.01:8000/api/programs", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
                .then((response) => response.json())
                .then((dataResponse) => {
                    console.log(dataResponse.programs)
                    if (dataResponse.status) {
                        this.$router.push('/login');
                    }
                    this.programs = dataResponse.programs;
                })
        },
        deleteProgram(id) {
            if (confirm("Are you sure to delete the program?")) {
                fetch("http://127.0.01:8000/api/programs/" + id, {
                    method: "Delete",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                })
                    .then((response) => response.json())
                    .then((dataResponse) => {
                        console.log(dataResponse);
                        if (dataResponse.status) {
                            this.$router.push('/login');
                        }
                        window.location.href = 'programs'
                    })
            }
        }
    },
};
</script>