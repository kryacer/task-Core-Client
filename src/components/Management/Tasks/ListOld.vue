<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="General">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        </md-tab>

        <md-tab md-label="Activity">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        </md-tab>

        <md-tab md-label="Account">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button>
    
    <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
    <md-table>
      <md-table-row md-card md-fixed-header>
        <md-table-head>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Gender</md-table-head>
        <md-table-head>Job Title</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in users" :key="item.id">
        <md-table-cell>{{item.id}}</md-table-cell>
        <md-table-cell>{{item.name}}</md-table-cell>
        <md-table-cell>{{item.email}}</md-table-cell>
        <md-table-cell>{{item.gender}}</md-table-cell>
        <md-table-cell>{{item.title}}</md-table-cell>
      </md-table-row>

    </md-table>
  </div>
</template>

<script>

  export default {
    name: 'DialogCustom',
    data: () => ({
      showDialog: false,
      
      // users: [
      //   {
      //     id: 1,
      //     name: "Shawna Dubbin",
      //     email: "sdubbin0@geocities.com",
      //     gender: "Male",
      //     title: "Assistant Media Planner"
      //   },
      //   {
      //     id: 2,
      //     name: "Odette Demageard",
      //     email: "odemageard1@spotify.com",
      //     gender: "Female",
      //     title: "Account Coordinator"
      //   },
      //   {
      //     id: 3,
      //     name: "Vera Taleworth",
      //     email: "vtaleworth2@google.ca",
      //     gender: "Male",
      //     title: "Community Outreach Specialist"
      //   },
      //   {
      //     id: 4,
      //     name: "Lonnie Izkovitz",
      //     email: "lizkovitz3@youtu.be",
      //     gender: "Female",
      //     title: "Operator"
      //   },
      //   {
      //     id: 5,
      //     name: "Thatcher Stave",
      //     email: "tstave4@reference.com",
      //     gender: "Male",
      //     title: "Software Test Engineer III"
      //   },
      //   {
      //     id: 6,
      //     name: "Karim Chipping",
      //     email: "kchipping5@scribd.com",
      //     gender: "Female",
      //     title: "Safety Technician II"
      //   },
      //   {
      //     id: 7,
      //     name: "Helge Holyard",
      //     email: "hholyard6@howstuffworks.com",
      //     gender: "Female",
      //     title: "Internal Auditor"
      //   },
      //   {
      //     id: 8,
      //     name: "Rod Titterton",
      //     email: "rtitterton7@nydailynews.com",
      //     gender: "Male",
      //     title: "Technical Writer"
      //   },
      //   {
      //     id: 9,
      //     name: "Gawen Applewhite",
      //     email: "gapplewhite8@reverbnation.com",
      //     gender: "Female",
      //     title: "GIS Technical Architect"
      //   },
      //   {
      //     id: 10,
      //     name: "Nero Mulgrew",
      //     email: "nmulgrew9@plala.or.jp",
      //     gender: "Female",
      //     title: "Staff Scientist"
      //   },
      //   {
      //     id: 11,
      //     name: "Cybill Rimington",
      //     email: "crimingtona@usnews.com",
      //     gender: "Female",
      //     title: "Assistant Professor"
      //   },
      //   {
      //     id: 12,
      //     name: "Maureene Eggleson",
      //     email: "megglesonb@elpais.com",
      //     gender: "Male",
      //     title: "Recruiting Manager"
      //   },
      //   {
      //     id: 13,
      //     name: "Cortney Caulket",
      //     email: "ccaulketc@cbsnews.com",
      //     gender: "Male",
      //     title: "Safety Technician IV"
      //   },
      //   {
      //     id: 14,
      //     name: "Selig Swynfen",
      //     email: "sswynfend@cpanel.net",
      //     gender: "Female",
      //     title: "Environmental Specialist"
      //   },
      //   {
      //     id: 15,
      //     name: "Ingar Raggles",
      //     email: "iragglese@cbc.ca",
      //     gender: "Female",
      //     title: "VP Sales"
      //   },
      //   {
      //     id: 16,
      //     name: "Karmen Mines",
      //     email: "kminesf@topsy.com",
      //     gender: "Male",
      //     title: "Administrative Officer"
      //   },
      //   {
      //     id: 17,
      //     name: "Salome Judron",
      //     email: "sjudrong@jigsy.com",
      //     gender: "Male",
      //     title: "Staff Scientist"
      //   },
      //   {
      //     id: 18,
      //     name: "Clarinda Marieton",
      //     email: "cmarietonh@theatlantic.com",
      //     gender: "Male",
      //     title: "Paralegal"
      //   },
      //   {
      //     id: 19,
      //     name: "Paxon Lotterington",
      //     email: "plotteringtoni@netvibes.com",
      //     gender: "Female",
      //     title: "Marketing Assistant"
      //   },
      //   {
      //     id: 20,
      //     name: "Maura Thoms",
      //     email: "mthomsj@webeden.co.uk",
      //     gender: "Male",
      //     title: "Actuary"
      //   }
      // ]
      }
    )
   
      
      
  }
</script>

<style>
.md-dialog {
    max-width: 768px;
  }
</style>
