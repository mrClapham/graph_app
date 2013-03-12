/**
 * This is the base class for all the UI widgets. It is not a class to be used in its own right but to be extended.
 * It has model, view and controller Objects.
 * 'model': stores data, eg: width, height, text colour, graph data etc.
 * 'view' stores any display elements (eg: html), ideally returned via a function.
 * eg getHead:function(){return '<h1>The Head</h1>'}. The text could be bound to a value in the Model
 * 'controller' stores any private functions not exposed via the api.
 *
 */


function Core(){
    var t = this
    this.STATE_CHANGE=function(){return 'stateChange'};

    t.onStateChange=function(e){
        alert("State has changed")
    }
    //alert("INIT CORE")
}
/**
 *
 * @type {{constructor: string, _listeners: {}, STATE_CHANGE: string, addListener: Function, fire: Function, removeListener: Function, model: {data1: string}, view: {}, controller: {}}}
 */
Core.prototype={
    constructor: 'Core',
    _listeners: {},

    addListener: function(type, listener, scope){
        scope._listeners = {};

        if (scope._listeners== "undefined"){
            scope._listeners = {};
        }

            if (typeof scope._listeners[type] == "undefined"){
            scope._listeners[type] = [];
        }
        scope._listeners[type].push(listener);
    },

    fire: function(event, data){
        if (typeof event == "string"){
            event = { type: event };
        }
        if (typeof data == "object" && typeof event == "object"){
            event.data = data;
        }
        if (!event.target){
            event.target = this;
        }
        if (!event.type){  //falsy
            throw new Error("Event object missing 'type' property.");
        }
        if (this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++){
                listeners[i].call(this, event);
            }
        }
    },

    removeListener: function(type, listener, scope){
        if (scope._listeners[type] instanceof Array){
            var listeners = scope._listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    },
    init:function(){
        //-- not used yet
    },
    model:{data1:"DATA ONE"}, view:{},  controller:{}
}

Core.prototype.setEventHandlers = function(){
    alert("setEventHandlers CALLED")
}


/* Core functions to be inherited here */

Core.prototype.onModelChanged = function(e){
    console.log("onModelChanged called with fire func")
}
/**
 * The 'set' function sets a value in the 'model'.
 * When a property is changed an Event is dispatched, this allows an object inheriting from Core to respond to a dispatched Event.
 * The 'id' and 'value' parameters are sent in the Event's 'data' Object so changes to specific properties and values may have specific functions to respond to them.
 *
 * @param id
 * @param value
 */
Core.prototype.set = function(id, value){
    console.log("this.model[id] = "+this.model[id]);
    console.log('SET has been called id = '+id+" value = "+value );
        try{
            if(this.get(id) != value){
                this.model[id]=value;
                this.fire('stateChange', {id:id, value:value})
            }
        }catch(e){
            console.log(e)
        }
}

/**
 * The 'get' function is used to retrieve a value from the 'model'.
 * @param id
 * @returns {*}
 */
Core.prototype.get = function(id){
    return this.model[id];
}

/* Static funtions here */
Core.extend = function(classType,construc){
    classType.prototype = new Core();
    classType.prototype.constructor=construc;
}


