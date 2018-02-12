<template>
  <div>
       <!--TAB 1-->
       <router-link class="md-primary add"  tag="md-button" to="/tasks/Create">Create</router-link>
       <div class="tags">
        <md-button @click="showSidepanel = true" class="white">Tags</md-button>
      </div>
       <md-field class="search"><md-input placeholder="Search by name..." type="search" v-model.trim.lazy="search" @keyup.enter="searchOnCards" @keyup.delete="clearSearch" @input="clearSearch"/></md-field>
    <md-tabs class="md-transparent" md-alignment="fixed" md-sync-route >
      <md-tab id="tab-undone" md-label="Undone">
        
        <md-card  md-with-hover v-if="!task.isDone" v-for="(task,index) in filteredList" :key="task.taskId" >
        <md-ripple v-bind:class="classObject(task.deadLine, task.isDone)">
          <md-card-header>
            <div class="md-title">{{task.name}}</div>
          </md-card-header>
  
          <md-card-content  > 
            <p class="ellipsis">{{task.description}}</p>
            <p>DeadLine: {{new Date(task.deadLine).toLocaleDateString("ru-RU")}}</p>
            <div>
            <p class="inlineBlock">Change:</p>
            <md-checkbox  v-model="task.isDone" @change="changeMark(index)"></md-checkbox>
            </div>
            <div>
              <md-button class="md-raised tag" v-for="tag in filteredList[index].tags" :key="tag">{{tag}}</md-button>
            </div>
            
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
          <md-card  md-with-hover v-if="task.isDone" v-for="(task,index) in filteredList" :key="task.taskId"  >
              <md-ripple v-bind:class="classObject(task.deadLine, task.isDone)">
                <md-card-header>
                  <div class="md-title">{{task.name}}</div>
                </md-card-header>
        
                <md-card-content class="ellipsis"> 
                  <p class="ellipsis">{{task.description}}</p>
                  <p>DeadLine: {{new Date(task.deadLine).toLocaleDateString("ru-RU")}}</p>
                  <div>
                    <p class="inlineBlock">Change:</p>
                    <md-checkbox  v-model="task.isDone" @change="changeMark(index)"></md-checkbox>
                  </div>
                  <div>
                    <md-button class="md-raised tag" v-for="tag in filteredList[index].tags" :key="tag">{{tag}}</md-button>
                  </div>
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
        <md-dialog-title>{{preView.Name}}</md-dialog-title>

        <md-tabs md-dynamic-height>
          <md-tab md-icon="reorder">
              <p>{{preView.Description}}</p>
              <p>DeadLine: {{new Date(preView.DeadLine).toLocaleDateString("ru-RU")}}</p>
              <div>
                <p class="inlineBlock">Mark as done:</p>
                <md-checkbox disabled v-model="preView.IsDone"></md-checkbox>
                </div>
                <div>
                  <md-button class="md-raised tag" v-for="tag in preView.Tags" :key="tag">{{tag}}</md-button>
                </div>
          </md-tab>
          <md-tab  md-icon="edit">
              <md-field>
                  <label>Name</label>
                  <md-input v-model="preView.Name"></md-input>
                </md-field>
                <md-field>
                    <label>Description</label>
                    <md-textarea v-model="preView.Description"></md-textarea>
                  </md-field>

                    <label>DeadLine: </label>
                    <md-datepicker v-model="preView.DeadLine" />
                    <div>
                    <p class="inlineBlock">Mark as done:</p>
                    <md-checkbox v-model="preView.IsDone"></md-checkbox>
                    <md-field>
                      <label>Tags (space separated)</label>
                      <tag-input v-model="preView.Tags" ></tag-input>
                      <tag-list v-model="preView.Tags" style="padding: 5px 0"></tag-list>
                    </md-field>
                    <md-button class="md-primary inlineBlock right" @click="Save">Save</md-button>
                    </div>
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
      <md-drawer class="md-right" :md-active.sync="showSidepanel">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">Tags</span>
        </md-toolbar>
  
        <md-list>
            <md-list-item>
                <span class="md-list-item-text">
                  <md-button @click="clearSearch">All</md-button>
                </span>
              </md-list-item>
          <md-list-item v-for="(tag,index) in TagList" :key="tag.tagId">
            <span class="md-list-item-text">
              <md-button @click="tagSearch(index)">{{tag.name}}</md-button>
            </span>
          </md-list-item>
        </md-list>
      </md-drawer>
  </div>
</template>

<script>
  import taskService from 'services/tasks'
 // import { _ } from 'lodash'
 import tagInput from 'components/Tasks/tag-input.vue'
  import tagList from 'components/Tasks/tag-list.vue'

  export default {
    name: 'TabRouter',
    components: {
       tagInput, tagList
    },
    data: ()=>({
      search:'',
       // debouncedInput: '',
      tasks: null,
      searchResult: null,
      // tagResult:null,
      cardView: false,
      currentIndex: '',
      deleteSync: false,
      showSidepanel: false,
      TagList:null,
      preView:{
        TaskId: '',
        Name: '',
        Description: '',
        DeadLine: null,
        IsDone: '',
        Tags: []
      },
      options:{
        hour: 'numeric',
        minute: 'numeric'
      }
    }),
    methods: {
      changeMark (index) { // opposite mark
        taskService.oppositeMark(this.tasks[index])
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
        this.preView.TaskId = this.tasks[index].taskId
        this.preView.Name = this.tasks[index].name
        this.preView.Description = this.tasks[index].description
        this.preView.DeadLine = this.tasks[index].deadLine
        this.preView.IsDone = this.tasks[index].isDone
        this.preView.Tags = this.tasks[index].tags
        console.log(this.TagList)
      },
      drop (index){// before delete
        this.currentIndex = index
        this.deleteSync = true
      },
      onCancel () {
      },
      onConfirm () { // delete
        taskService.delete(this.tasks[this.currentIndex].taskId)
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
        this.preView.Tags = taskService.tagsFilter(this.preView.Tags)
        taskService.edit(this.preView)
              .catch(err => {
                this.$toast.error({
                title: err.response.data.Message,
                message: err.response.data.ModelState
              })
            })
            this.tasks[this.currentIndex].name = this.preView.Name
            this.tasks[this.currentIndex].description = this.preView.Description
            this.tasks[this.currentIndex].deadLine = this.preView.DeadLine
            this.tasks[this.currentIndex].isDone = this.preView.IsDone
            this.tasks[this.currentIndex].tags = this.preView.Tags
            this.cardView = false
      },
      classObject (deadline, isDone){// set css class to task
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
          taskService.search(this.search.toLowerCase())
              .then(response => {
              this.searchResult = response.data
              })
        },
        clearSearch (){
          this.searchResult =null
        },
        tagSearch (index){
          taskService.searchByTag(this.TagList[index].name)
          .then(response => {
              this.searchResult = response.data
              console.log(this.tasks)
              })
        }
    },
    computed: {
                filteredList () {
                        if(this.searchResult !==null){
                          return this.searchResult  
                          // return this.tasks.filter(task => task.name.toLowerCase().includes(this.search.toLowerCase()))
                        }
                        return this.tasks
                }
            },
    created (){
      taskService.list()
            .then(response => {
              this.tasks = response.data
            //   for(let i=0; i<this.tasks.length; i+=1){
            //    this.tasks[i].deadLine = new Date(this.tasks[i].deadLine).toLocaleDateString("ru-RU",this.options);
            //  }
            })
            taskService.getTags()
            .then(response => {
              this.TagList = response.data
            })
             
          }

  }
</script>
<style scoped >
.right{
  float: right;
}
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
  .tag{
    height: 20px;
    min-width: 10px;
    font-size: smaller;
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
    display: inline-block;
    position: absolute;
  }
  .inlineBlock{
    display: inline-block;
  }
  .md-checkbox-container{
    display: inline-block;
  }
  .md-card-header{
    padding: 5px 0 0 15px;
  }
  .tags{
    position:absolute;
    top: 8px;
    right: 0px;
  }
  .white{
    color:white;
    font-size: 15px;
  }
</style>