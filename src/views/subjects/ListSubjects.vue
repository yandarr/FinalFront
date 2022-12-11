<template>
    <div class="container" style="
    overflow-x: auto;
    white-space: nowrap;">
        <div class="card" style="margin-top:20px">
            <div class="card-header text-center">
                <h6>Listado de materias</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12" style="padding-bottom:20px">
                        <router-link :to="{ name: 'create subjects', params: { id: this.$route.params.id } }"
                            class="btn btn-success">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Nueva materia
                        </router-link>
                    </div>
                    <div class="col-lg-12">
                        <div class="row">
                            <div v-for="i in 10" :key="i">
                                <div class="card" style="width: 18rem;">
                                    <div class="card-header" style="padding:10px">
                                        <h6 class="card-title">Semestre{{ i }}</h6>
                                    </div>
                                    <div class="card-body" style="padding:5px">
                                        <div v-for="subject in subjects" :key="subject.id" class="col-lg-4">
                                            <div v-if="subject.semester === i">
                                                <div class="card" style="width: 16rem;">
                                                    <div class="card-body" style="padding:10px">
                                                        <h6>{{ subject.name }}</h6>
                                                        <div><!-- 
                                                            <ul>
                                                                <li><small><strong>Créditos:</strong></small></li>
                                                                {{ subject.credits }}
                                                                <li><small><strong>Prerequisito:</strong></small></li>
                                                                {{ subject.prerequisite_subject }}
                                                                <li><small><strong>Trabajo autonomo:</strong></small>
                                                                </li>
                                                                {{ subject.autonomous_work }} Horas
                                                                <li><small><strong>Trabajo dirigido:</strong></small>
                                                                </li>
                                                                {{ subject.directed_work }} Horas
                                                                <li><small><strong>Profesor:</strong></small></li>
                                                                {{ subject.teacher }}
                                                            </ul> -->
                                                        </div>
                                                        <div class="text-center">
                                                            <button data-toggle="modal" class="btn btn-success btn-sm" data-target="#exampleModal" @click.prevent="showModal">
                                                                <i class="fa fa-list-alt"></i>
                                                            </button>
                                                            &nbsp;
                                                            <router-link
                                                                :to="{ name: 'show subjects', params: { id: subject.id } }"
                                                                class="btn btn-warning btn-sm">
                                                                <i class="fa fa-eye" aria-hidden="true">

                                                                </i>
                                                                &nbsp;
                                                            </router-link>
                                                            &nbsp;
                                                            <router-link
                                                                :to="{ name: 'edit subjects', params: { id: subject.id } }"
                                                                class="btn btn-primary btn-sm">
                                                                <i class="fa fa-pencil-square-o" aria-hidden="true">

                                                                </i>
                                                                &nbsp;
                                                            </router-link>
                                                            &nbsp;
                                                            <button class="btn btn-danger btn-sm"
                                                                v-on:click="deleteSubject(subject.id)">
                                                                <i class="fa fa-trash-o" aria-hidden="true">

                                                                </i>
                                                                &nbsp;
                                                            </button>
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
                </div>
            </div>
        </div>
    </div>
    <!-- Modal containing dynamic form for adding/updating user details. -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true"
    role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Detalles de la materia</h5>
                <button type="button" class="close" aria-label="Close" onclick="closeModal()">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="">
                    <div class="form-group">
                                <label for="">Nombre:</label>
                                <input type="text" class="form-control" name="name">
                            </div>
                            <div class="form-group">
                                <label for="">Semestre:</label>
                                <input type="number" class="form-control" min="0" name="name"
                                    >
                            </div>
                            <div class="form-group">
                                <label for="">Creditos:</label>
                                <input type="number" class="form-control" min="0" name="name">
                            </div>
                            <div class="form-group">
                                <label for="">Materia de prerequisito:</label>
                                <input type="number" class="form-control" min="0" name="name"
                                    >
                            </div>
                            <div class="form-group">
                                <label for="">Horas de trabajo autonomo:</label>
                                <input type="number" class="form-control" min="0" name="name"
                                    >
                            </div>
                            <div class="form-group">
                                <label for="">Horas de trabajo dirigido:</label>
                                <input type="number" class="form-control" min="0" name="name"
                                    >
                            </div>
                            <div class="form-group">
                                <label for="">Profesor:</label>
                                <input type="text" class="form-control" min="0" name="name">
                            </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<div class="modal-backdrop fade show" id="backdrop" style="display: none;"></div>
</template>

<script>

export default {
    data() {
        return {
            subjects: [],
        };
    },

    created: function () {
        this.getSubjects();
        this.getUser();
    },
    methods: {
        getUser() {
            var token = localStorage.getItem('token')
            if (!token) {
                this.$router.push('/login');
            }
        },
        getSubjects() {
            fetch("http://127.0.01:8000/api/subjects/?program_id=" + this.$route.params.id, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
                .then((response) => response.json())
                .then((dataResponse) => {
                    console.log(dataResponse.subjects)
                    if (dataResponse.status) {
                        this.$router.push('/login');
                    }
                    this.subjects = dataResponse.subjects;
                })
        },
        deleteSubject(id) {
            if (confirm("Are you sure to delete the subject?")) {
                fetch("http://127.0.01:8000/api/subjects/" + id, {
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
                        window.location.href = 'subjects'
                    })
            }
        },
        showModal() {
            document.getElementById("backdrop").style.display = "block"
    document.getElementById("exampleModal").style.display = "block"
    document.getElementById("exampleModal").classList.add("show")
            
      },
    },
};
</script>