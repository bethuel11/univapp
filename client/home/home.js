if(Meteor.isCordova){
	document.addEventListener("backbutton", onBackButtonDown, false);
	function onBackButtonDown(event) {
	  event.preventDefault();
	  event.stopPropagation();
		var route_name = Router.current().route.getName();

		if(route_name == "login" || route_name == "register" || route_name == "dashboard"){
			navigator.app.exitApp();
		}else{
			navigator.app.backHistory();
		}
	}
}

Meteor.autorun(function () {
    var stat;
    if (Meteor.status().status === "connected") {
        stat = 'connected'
    }
    else if (Meteor.status().status === "connecting") {
        stat = 'connecting'
    }
    else {
        stat = 'disconnected';
    }
    Session.set('status',stat);
});

Template.login.events({
  "click .home_btn": function(event){

    var id = $('.home_id').val();
    var pw = $('.home_pw').val();

    if(id == "" || pw == ""){

			if(Meteor.isCordova){
				navigator.notification.alert('ID or password is empty.',function(){},'ERROR','OK');
			}else{
				IonPopup.show({
					title: "ERROR",
					template: "<div class='title_prompt'>ID or password is empty.<br>Please Try Again.</div>",
					buttons: [{
						text: 'OK',
						type: 'button-assertive',
						onTap: function() {
							IonPopup.close();
						}
					}]
				});
			}
    }else{

      Meteor.loginWithPassword(id, pw, function(error){
        if(error){
          if(error.reason = "User not found"){
						if(Meteor.isCordova){
							navigator.notification.alert("The ID you've entered doesn't match any account. Sign up for an account.",function(){},'ERROR','OK');
						}else{
							IonPopup.show({
								title: "ERROR",
								template: "<div class='title_prompt'>Incorrect username or password.</div>",
								buttons: [{
									text: 'OK',
									type: "button button-assertive",
									onTap: function() {
										IonPopup.close();
									}
								}]
							});
						}
          }
        }else{
          Router.go('dashboard');
        }
      });
    }
  }
});

Template.body.helpers({
	connected: function(){
		status = Session.get('status');
		if(status == "connected"){
			if(Meteor.isCordova){
				window.plugins.toast.showWithOptions({message: "CONNECTED", duration: "short", position: "bottom", addPixelsY: -80});
				SpinnerPlugin.activityStop();
			}else{
				toastr.success("", "connected").css("width","140px");
			}
		}else{
			if(Meteor.isCordova){
				var options = { dimBackground: true };
				SpinnerPlugin.activityStart("connecting..", options);
			}else{
				toastr.warning("", "connecting").css("width","140px");
			}
		}
	}
});
