Template.register.events({
  "click .btn_student_reg": function(event){
    event.preventDefault();

    stud_id = $('.reg_id').val();
    firstname = $('.reg_firstname').val();
    middlename = $('.reg_middlename').val();
    lastname = $('.reg_lastname').val();
    pw = $('.reg_pw').val();
    conf_pw = $('.reg_conf_pw').val();

    if(Meteor.Validation.CheckBlankSpace(stud_id) || Meteor.Validation.CheckBlankSpace(firstname) || Meteor.Validation.CheckBlankSpace(middlename) || Meteor.Validation.CheckBlankSpace(lastname) || Meteor.Validation.CheckBlankSpace(pw) || Meteor.Validation.CheckBlankSpace(conf_pw)){
      if(Meteor.isCordova){
        Meteor.startup(function(){
          navigator.notification.alert('Please complete all the fields.',function(){},'ERROR','OK');
        });
      }else{
        title = "ERROR";
        button = "button button-assertive";
        template = "<div class='title_prompt'>Please complete all the fields.</div>";
        Meteor.Messages.dialog(title, template, button);
      }
    }else if(pw != conf_pw){
      if(Meteor.isCordova){
        Meteor.startup(function(){
          navigator.notification.alert('Password does not match.',function(){},'ERROR','OK');
        });
      }else{
        title = "ERROR";
        button = "button button-assertive";
        template = "<div class='title_prompt'>Password does not match.</div>";
        Meteor.Messages.dialog(title, template, button);
      }
    }else{
      IonPopup.prompt({
        title: 'Security Token',
        template: "<div class='title_prompt'>Please enter the token given by the admin.</div>",
        okText: 'Submit',
        inputType: 'password',
        inputPlaceholder: '',
          onOk: function(error, result){
            token = result;
            Meteor.call('registerStudent', token, stud_id, firstname, middlename, lastname, pw, function(error){
              if(error){
                if(error === 'invalid'){
                  error_message = "<h4>ERROR</h4><p>Invalid token. Try again.</p>";
                }else{
                  error_message = error.reason;
                }
                IonLoading.show({
                  customTemplate: error_message,
                  duration: 2500
                });
              }else{
                IonLoading.show({
                  customTemplate: '<h4>SUCCESS</h4><p>You can now login.</p>',
                  duration: 3000
                });
                Router.go('login');
              }//else
            });//meteor call
          }
      });
    }//else
  },//click .btn_reg

  "click .btn_teacher_reg": function(event){
    event.preventDefault();
    teach_id = $('.reg_id').val();
    firstname = $('.reg_firstname').val();
    middlename = $('.reg_middlename').val();
    lastname = $('.reg_lastname').val();
    pw = $('.reg_pw').val();
    conf_pw = $('.reg_conf_pw').val();

    if(Meteor.Validation.CheckBlankSpace(teach_id) || Meteor.Validation.CheckBlankSpace(firstname) || Meteor.Validation.CheckBlankSpace(middlename) || Meteor.Validation.CheckBlankSpace(lastname) || Meteor.Validation.CheckBlankSpace(pw) || Meteor.Validation.CheckBlankSpace(conf_pw)){
      if(Meteor.isCordova){
        Meteor.startup(function(){
          navigator.notification.alert('Please complete all the fields.',function(){},'ERROR','OK');
        });
      }else{
        title = "ERROR";
        button = "button button-assertive";
        template = "<div class='title_prompt'>Please complete all the fields.</div>";
        Meteor.Messages.dialog(title, template, button);
      }
    }else if(pw != conf_pw){
      if(Meteor.isCordova){
        Meteor.startup(function(){
          navigator.notification.alert('Password does not match.',function(){},'ERROR','OK');
        });
      }else{
        title = "ERROR";
        button = "button button-assertive";
        template = "<div class='title_prompt'>Password does not match.</div>";
        Meteor.Messages.dialog(title, template, button);
      }
    }else{
      IonPopup.prompt({
        title: 'Security Token',
        template: "<div class='title_prompt'>Please enter the token given by admin.</div>",
        okText: 'Submit',
        inputType: 'password',
        inputPlaceholder: '',
          onOk: function(error, result){
            token = result;
            Meteor.call('registerTeacher', token, teach_id, firstname, middlename, lastname, pw, function(error){
              if(error){
                if(error === 'invalid'){
                  error_message = "<h4>ERROR</h4><p>Invalid token. Try again.</p>";
                }else{
                  error_message = error.reason;
                }
                IonLoading.show({
                  customTemplate: error_message,
                  duration: 2500
                });
              }else{
                IonLoading.show({
                  customTemplate: '<h4>SUCCESS</h4><p>You can now login.</p>',
                  duration: 3000
                });
                Router.go('login');
              }
            });
          }
      });
    }
  }
});
