/**
 * These are Constant to be used throughout the application for Events, etc.
 * @type {{STATE_CHANGE: string}}
 */
var CONSTANTS ={
    STATE_CHANGE:'stateChange'
}
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

    this.onStateChange=function(e){
        //
        alert("CORE DATA CHANGE...")
    }
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
    //console.log("this.model[id] = "+this.model[id]);
    console.log("_____________________________________________________________");

    console.log('SET has been called id = '+id+" value = "+value );
        try{
            if(this.get(id) != value){
                this.model[id]=value;
                this.fire(CONSTANTS.STATE_CHANGE, {id:id, value:value})
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
/**
 * Extend creates a Class which extends the Core Class via prototyping.
 * It is a shortcut helper class.
 * @param classType
 * @param construc
 */
Core.extend = function(classType,construc){

   // alert("CORE EXTEND CALLED"+classType)
    for(var prop in classType){
        console.log(prop+" : "+ classType[prop])
    }


    classType.prototype = new Core();
    classType.prototype.constructor=construc;
}


//-- for accessing JSONP feeds ---

Core.createXMLHttp = function() {

    console.log('Initializing our object')
    //Initializing our object
    var xmlHttp = null;
    console.log('if XMLHttpRequest is available then creating and returning it')
    //if XMLHttpRequest is available then creating and returning it
    if (typeof(XMLHttpRequest) != undefined) {
        xmlHttp = new XMLHttpRequest;
        return xmlHttp;
        console.log('if window.ActiveXObject is available than the user is using IE...so we have to create the newest version XMLHttp object')
        //if window.ActiveXObject is available than the user is using IE...so we have to create the newest version XMLHttp object
    } else if (window.ActiveXObject) {
        var ieXMLHttpVersions = ['MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 'Microsoft.XMLHttp'];
        console.log('In this array we are starting from the first element (newest version) and trying to create it. If there is an exception thrown we are handling it (and doing nothing ^^)')

        //In this array we are starting from the first element (newest version) and trying to create it. If there is an
        //exception thrown we are handling it (and doing nothing ^^)
        for (var i = 0; i < ieXMLHttpVersions.length; i++) {
            try {
                xmlHttp = new ActiveXObject(ieXMLHttpVersions[i]);
                return xmlHttp;
            } catch (e) {
            }
        }
    }
}

Core.getJson = function(url, callbackFunc){
    var xmlHttp = Core.createXMLHttp();

    xmlHttp.open('get', url, true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                alert(xmlHttp.responseText);
            } else {
                console.log('Error: ' + xmlHttp.responseText);
            }
        } else {
            //still loading
        }
    };
}


// Core.getJson('http://gomashup.com/json.php?fds=geo/international/areacodes/country/Afghanistan', null)


