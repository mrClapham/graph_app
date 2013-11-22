var Actor = $$({

model:{registeredEvents:[]},
view:{},
controller:{
'create': function(){
	this.onRegister();
},
'destroy': function(){
	try{
		for(var i=0; i<this.getregisteredEvents().length; i++){
				EventBus.unbind(this.getregisteredEvents()[i]);
			}
			this.setregisteredEvents([]);
		}catch(e){
	 		// do nothing
		}
	}
},
onRegister:function(){},
/* GETTERS AND SETTERS */
getregisteredEvents:function(){ return this.model.get('registeredEvents'); },
setregisteredEvents:function(regEv){ this.model.set({registeredEvents:regEv}); },
/* METHODS */
dispatchOnBus:function(event, payload){
	EventBus.trigger(event, payload);
},
addBusListener:function(event, handler){
	EventBus.bind(event, handler);
	this.getregisteredEvents().push(handler);
}

});