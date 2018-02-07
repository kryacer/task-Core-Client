<template>
  <div>
       <!--TAB 1-->
       <router-link class="md-dense md-primary add"  tag="md-button" to="/tasks/Create">Create</router-link>
       <md-field class="search"><md-input placeholder="Search by name..." v-model.trim="search" @keyup.enter="searchOnCards" /></md-field>
    <md-tabs class="md-transparent" md-alignment="fixed" md-sync-route >
      <md-tab id="tab-undone" md-label="Undone">
        
        <md-card  md-with-hover v-if="!task.isDone" v-for="(task,index) in tasks" :key="task.id" >
        <md-ripple v-bind:class="classObject(task.deadLine, task.isDone)">
          <md-card-header>
            <div class="md-title">{{task.name}}{{search}}</div>
          </md-card-header>
  
          <md-card-content  > 
            <p class="ellipsis">{{task.description}}</p>
            <p>DeadLine: {{new Date(task.deadLine).toLocaleDateString("ru-RU")}}</p>
            Mark as done:
            <md-checkbox style="display:inline-flex;" v-model="task.isDone" @change="changeMark(index)"></md-checkbox>
          </md-card-content>
          
          <md-card-actions>
              <md-button  @click="cardLook(index)">View</md-button>
            <md-button @click="drop(index)">Delete</md-button>
          </md-card-actions>
        </md-ripple>
        
        
      </md-card>
    </md-tab>
        <!--TAB 2-->
      <md-tab id="tab-done" md-label="Done">
          <md-card  md-with-hover v-if="task.isDone" v-for="(task,index) in tasks" :key="task.id"  >
              <md-ripple v-bind:class="classObject(task.deadLine, task.isDone)">
                <md-card-header>
                  <div class="md-title">{{task.name}}</div>
                </md-card-header>
        
                <md-card-content class="ellipsis"> 
                  <p class="ellipsis">{{task.description}}</p>
                  <p>DeadLine: {{new Date(task.deadLine).toLocaleDateString("ru-RU")}}</p>
                  Mark as done:
                  <md-checkbox style="display:inline-flex;" v-model="task.isDone" @change="changeMark(index)"></md-checkbox>
                </md-card-content>
                
                <md-card-actions>
                    <md-button @click="cardLook(index)">View</md-button>
                  <md-button @click="drop(index)">Delete</md-button>
                </md-card-actions>
              </md-ripple>
              
            </md-card>
      </md-tab>
      <!-- <md-tab id="tab-posts" md-label="Empty"></md-tab>
      <md-tab id="tab-favorites" md-label="Empty"></md-tab> -->
    </md-tabs>
    
    

    <!--Dialogs-->
    <md-dialog :md-active.sync="cardView">
        <md-dialog-title>{{preView.name}}</md-dialog-title>

        <md-tabs md-dynamic-height>
          <md-tab md-icon="reorder">
              <p>{{preView.description}}</p>
              <p>DeadLine: {{new Date(preView.deadLine).toLocaleDateString("ru-RU")}}</p>
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
              <md-button class="md-primary" @click="Save">Save</md-button>
            </md-tab-actions>
          </md-tab>
        </md-tabs>
      </md-dialog>
    <md-dialog-confirm
      :md-active.sync="deleteSync"
      md-title="Are you sure to delete?"
      md-content=" "
      md-confirm-text="Ok"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
  import tasks from 'services/tasks'
  import debounce from 'deb'

  export default {
    name: 'TabRouter',
    data: ()=>({
      search:'',
      //debouncedInput: '',
      tasks: [],
      cardView: false,
      currentIndex: '',
      deleteSync: false,
      preView:{
        id: '',
        name: '',
        description: '',
        deadLine: null,
        isDone: ''
      },
      options:{
        hour: 'numeric',
        minute: 'numeric'
      }
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
      cardLook (index) {// view task
        this.cardView = true;
        this.currentIndex = index
        this.preView.id = this.tasks[index].id
        this.preView.name = this.tasks[index].name
        this.preView.description = this.tasks[index].description
        this.preView.deadLine = this.tasks[index].deadLine
        this.preView.isDone = this.tasks[index].isDone
        console.log(this.tasks)
      },
      drop (index){// before delete
        this.currentIndex = index
        this.deleteSync = true
      },
      onCancel () {
      },
      onConfirm () { // delete
        tasks.delete(this.tasks[this.currentIndex].id)
              .catch(err => {
                this.$toast.error({
                title: err.response.data.Message,
                message: err.response.data.ModelState
              })
            })
            this.tasks.splice(this.currentIndex, 1)
      },
      dateSub (date1)// subtract
      {  
        return new Date(date1).getTime() - new Date().getTime();
      },
      Save (){// update task
        tasks.edit(this.preView)
              .catch(err => {
                this.$toast.error({
                title: err.response.data.Message,
                message: err.response.data.ModelState
              })
            })
            this.tasks[this.currentIndex].name = this.preView.name
            this.tasks[this.currentIndex].description = this.preView.description
            this.tasks[this.currentIndex].deadLine = this.preView.deadLine
            this.tasks[this.currentIndex].isDone = this.preView.isDone
            this.cardView = false
      },
      classObject (deadline, isDone){// set class to task
        const attribut = {Expired: false, DeadLine: false, EnoughTime: false, Done:false};
        if(isDone){
          attribut.Done = true
          return attribut
        }
        const sub = this.dateSub(deadline);
        if(sub < 0){// Expired (1day = 86400000 ms)
          attribut.Expired = true
        }
        if(sub < 604800000){// DeadLine less than 7 days 
          attribut.DeadLine = true
        }
        if(sub> 604800000 && sub < 1209600000){// EnoughTime between 7 and 14 days
          attribut.EnoughTime = true
        }
        return attribut
        },
        searchOnCards (){
          if(this.search !=='')
          tasks.search(this.search.toLowerCase())
              .then(response => {
              this.tasks = response.data
              })
        }
    },
  //   watch: {
  //       search: debounce(newVal => {
  //     this.debouncedInput = newVal
  //   }, 500)
  // },
    created (){
      tasks.list()
            .then(response => {
              this.tasks = response.data
            //   for(let i=0; i<this.tasks.length; i+=1){
            //    this.tasks[i].deadLine = new Date(this.tasks[i].deadLine).toLocaleDateString("ru-RU",this.options);
            //  }
            })
             
          }

  }
</script>
<style scoped >

  .search{
    position: relative;
    z-index: 3;
    float: right;
    width: 12%;
  }
  .add{
    position: relative;
    float: left;
    z-index: 3;
  }
  .DeadLine{
    background-color: rgb(236, 49, 49);
    color: white;
  }
  .Expired{
    background-color: rgb(58, 59, 58);
    color: white;
  }
  .EnoughTime{
    background-color: rgb(230, 190, 53);
    color: white;
  }
  .Done{
    background-color: green;
    color: white;
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; 
     width: 280px; 
}
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .md-checkbox {
    display: flex;
  }
</style>