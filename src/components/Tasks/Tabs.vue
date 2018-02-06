<template>
  <div>
      
    <md-tabs class="md-transparent" md-alignment="fixed" md-sync-route >
      <md-tab id="tab-undone" md-label="Undone">
        <router-link class="md-dense md-primary"  tag="md-button" to="/tasks/Create">Create</router-link>
        <md-card  md-with-hover v-for="(task,index) in tasks" :key="task.id" v-if="!task.isDone" >
        <md-ripple>
          <md-card-header>
            <div class="md-title">{{task.name}}</div>
          </md-card-header>
  
          <md-card-content style="display: inline-block;" > 
            <p>{{task.description}}</p>
            <p>DeadLine: {{task.deadLine}}</p>
            Mark as done:
            <md-checkbox style="display:inline-flex;" v-model="task.isDone" v-on:change="changeMark(index)"></md-checkbox>
          </md-card-content>
          
          <md-card-actions>
              <md-button v-on:click="cardLook(index)">View</md-button>
            <md-button>Delete</md-button>
          </md-card-actions>
        </md-ripple>
        <md-dialog :md-active.sync="cardView">
            <md-dialog-title>{{preView.name}}</md-dialog-title>
      
            <md-tabs md-dynamic-height>
              <md-tab md-icon="reorder">
                  <p>{{preView.description}}</p>
                  <p>DeadLine: {{preView.deadLine}}</p>
                  Mark as done:
               <md-checkbox style="display:inline-flex;" v-model="preView.isDone"></md-checkbox>
                
              </md-tab>
              <md-tab  md-icon="edit">
                  <md-field>
                      <label>Name</label>
                      <md-input v-model="preView.name"></md-input>
                    </md-field>
                    <md-field>
                        <label>Description</label>
                        <md-textarea v-model="preView.description"></md-textarea>
                      </md-field>

                        <label>DeadLine: </label>
                        <md-datepicker v-model="preView.deadLine" />
                        <label for="IsDone" style="display:inline-flex;">Mark as done:</label>
                        <md-checkbox style="display:inline-flex;" v-model="preView.isDone"></md-checkbox>
               <md-tab-actions>
                  <md-button class="md-primary" @click="cardView = false">Save</md-button>
                </md-tab-actions>
              </md-tab>
            </md-tabs>
          </md-dialog>
      </md-card>
    </md-tab>
        <!--TAB 2-->
      <md-tab id="tab-done" md-label="Done">
          <md-card  md-with-hover v-for="(task,index) in tasks" :key="task.id" v-if="task.isDone" >
              <md-ripple>
                <md-card-header>
                  <div class="md-title">{{task.name}}</div>
                </md-card-header>
        
                <md-card-content style="display: inline-block;" > 
                  <p>{{task.description}}</p>
                  <p>DeadLine: {{task.deadLine}}</p>
                  Mark as done:
                  <md-checkbox style="display:inline-flex;" v-model="task.isDone" v-on:change="changeMark(index)"></md-checkbox>
                </md-card-content>
                
                <md-card-actions>
                    <md-button @click="cardLook(index)">View</md-button>
                  <md-button>Delete</md-button>
                </md-card-actions>
              </md-ripple>
              <md-dialog :md-active.sync="task.cardView">
                  <md-dialog-title>{{task.name}}</md-dialog-title>
            
                  <md-tabs md-dynamic-height>
                    <md-tab md-icon="reorder">
                        <p>{{task.description}}</p>
                        <p>DeadLine: {{task.deadLine}}</p>
                        Mark as done:
                     <md-checkbox style="display:inline-flex;" v-model="task.isDone"></md-checkbox>
                      
                    </md-tab>
                    <md-tab  md-icon="edit">
                        <md-field>
                            <label>Name</label>
                            <md-input v-model="task.name"></md-input>
                          </md-field>
                          <md-field>
                              <label>Description</label>
                              <md-textarea v-model="task.description"></md-textarea>
                            </md-field>
      
                              <label>DeadLine: </label>
                              <md-datepicker v-model="task.deadLine" />
                              <label for="IsDone" style="display:inline-flex;">Mark as done:</label>
                              <md-checkbox style="display:inline-flex;" v-model="task.isDone"></md-checkbox>
                     <md-tab-actions>
                        <md-button class="md-primary" @click="task.cardView = false">Save</md-button>
                      </md-tab-actions>
                    </md-tab>
                  </md-tabs>
            
                  <!-- <md-dialog-actions>
                    <md-button class="md-primary" @click="task.cardView = false">Close</md-button>
                    <md-button class="md-primary" @click="task.cardView = false">Save</md-button>
                  </md-dialog-actions> -->
                </md-dialog>
            </md-card>
      </md-tab>
      <md-tab id="tab-posts" md-label="Empty"></md-tab>
      <md-tab id="tab-favorites" md-label="Empty"></md-tab>
    </md-tabs>
    <!-- <md-field >
        <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
    </md-field> -->
  </div>
</template>

<script>
  import tasks from 'services/tasks'

  export default {
    name: 'TabRouter',
    data: ()=>({
      tasks: [],
      cardView: false,
      preView:{
        id: '',
        name: '',
        description: '',
        deadline: '',
        isDone: ''
      }
      // options:{
      //   hour: 'numeric',
      //   minute: 'numeric'
      // }
    }),
    methods: {
      changeMark (index) {
        tasks.oppositeMark(this.tasks[index])
              .catch(err => {
              this.$toast.error({
                title: err.response.data.Message,
                message: err.response.data.ModelState
              })
            })
      },
      cardLook (index) {
        this.cardView = true;
        this.preView.id = this.tasks[index].id
        this.preView.name = this.tasks[index].name
        this.preView.description = this.tasks[index].description
        this.preView.deadline = this.tasks[index].deadline
        this.preView.isDone = this.tasks[index].isDone
      },
    },
    created (){
      tasks.list()
            .then(response => {
              this.tasks = response.data
            })
            
          }
  }
</script>
<style scoped >
/*   
  @import "~vue-material/theme/engine";

  @include md-register-theme("green-card", (
    primary: md-get-palette-color(green, 500)
  ));

  @include md-register-theme("black-card", (
    primary: md-get-palette-color(black, 500)
  ));

  @include md-register-theme("purple-card", (
    primary: md-get-palette-color(purple, 500)
  ));

  @include md-register-theme("orange-card", (
    primary: md-get-palette-color(orange, 500)
  ));

  @import "~vue-material/base/theme";
  @import "~vue-material/components/MdCard/theme"; */
  /* .md-dense{
    position: absolute;
  } */
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    
  }
  /* .md-field{
    width: 12%;
    z-index: 3;
    position: absolute;
  } */
  .md-checkbox {
    display: flex;
  }
  /* .md-card*{
    background-color: rgb(103, 224, 103) !important;
  } */
</style>