Template.teacherDashboardHome.onCreated(function(){
  this.subscribe('teacherNews');
});

Template.teacherDashboardHome.helpers({
  news: function(){
    return news.find({}, {sort:{createdAt: -1}}).fetch();
  },
  day: function(){
    return moment(this.createdAt).format('MMMM Do YYYY');
  },
  time: function(){
    return moment(this.createdAt).format('h:mm a');
  }
});
