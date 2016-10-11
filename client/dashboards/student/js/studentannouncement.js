Template.studentDashboardClassAnnouncement.onCreated(function(){
  this.subscribe("studentClass");
});

Template.studentDashboardClassAnnouncement.helpers({
  classid: function(){
    return students.find({}).fetch();
  },
  announcement: function(classId){
    Meteor.subscribe("studentAnnouncement", classId);
    return announcement.find({}, {sort:{createdAt: -1}}).fetch();
  },
  teacherName: function(senderId){
    id = senderId;
    Meteor.subscribe("teacherName", id);
    return Meteor.users.find({_id: id}).fetch();
  }
});
