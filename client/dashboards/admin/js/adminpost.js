Template.adminDashboardPost.events({
  "click .btn_cancel": function(event){
    event.preventDefault();

    $('.txtTitle').val('');
    $('.txtContent').val('');

    IonPopup.show({
      title: 'CANCELLED',
      template: '<div class="title_prompt">Nothing was sent.</div>',
      buttons: [{
        text: 'OK',
        type: 'button-balanced',
        onTap: function() {
          IonPopup.close();
        }
      }]
    });
  },
  "click .btn_send": function(event){
    event.preventDefault();

    title = $('.txtTitle').val();
    content = $('.txtContent').val();


    if(title == "" || content == ""){
      IonPopup.show({
        title: "ERROR!",
        template: "<div class='title_prompt'>Title and content should not be empty.</div>",
        buttons: [{
          text: 'OK',
          type: 'button-assertive',
          onTap: function() {
            IonPopup.close();
          }
        }]
      });
    }else{
      IonPopup.confirm({
        title: 'The news will be sent',
        template: '<div class="title_prompt">Are you sure?</div>',
        onOk: function() {
          Meteor.call('adminpost', title, content, function(error){
            if(!error){
              IonLoading.show({
                customTemplate: '<h4>SUCCESS</h4><p>News posted!</p>',
                duration: 5000
              });
            }
          });
        },
        onCancel: function() {
        }
      });
    }
  }
});
