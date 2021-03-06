Template.teacherDashboardLayout.onCreated(function(){
  this.subscribe("teacherThreads");
  Meteor.subscribe('files.images.all');
});

Template.teacherDashboardLayout.onRendered(function(){
  IonSideMenu.snapper.settings({touchToDrag: false});
});

Template.teacherDashboardLayout.events({
  "click #sideHome": function(event){
    event.preventDefault();
    Router.go('teacherDashboardHome');
  },
  "click #sideMessenger": function(event){
    event.preventDefault();
    Router.go('teacherDashboardMessenger');
  },
  "click #sideClass": function(event){
    event.preventDefault();
    Router.go('teacherDashboardClass');
  },
  "click #sideSettings": function(event){
    event.preventDefault();
    Router.go('teacherDashboardSettings');
  },
  "click #sideAbout": function(event){
    event.preventDefault();
    Router.go('teacherDashboardAbout');
  },
  "click #sideLogout": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('login');
  }
});
Template.teacherDashboardLayout.helpers({
  uploadedFiles: function () {
    return Images.find({userId:Meteor.userId()});
  },
  unread: function(){
    Meteor.subscribe("studentMessages");
    return threads.find({seenByTeacher: false}).count();
  }
});
