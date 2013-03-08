/**
 * Created with JetBrains WebStorm.
 * User: grahamcapham
 * Date: 07/03/2013
 * Time: 15:15
 * To change this template use File | Settings | File Templates.
 * This is the base class for all the UI widgets.
 * It has model, view and controller obhects.
 * 'model': stores data
 * 'view' stores any display elenemts (eg: html)
 * 'controller' stores any private functions not exposed via the api
 */
function Core(){
    console.log("new Core - constructor = "+ this.constructor)
};

Core.prototype={ model:{data1:"DATA ONE"}, view:{},  controller:{} }

/* Core functions to be inherited here */
Core.prototype.func2=function(val){
    alert(val)
}

Core.prototype.get = function(id){
    return this.model[id];
}

Core.prototype.set = function(id, value){
        try{
            this.model[id]=value;
            this.dispatchEvent(Core.dispEvt( 'stateChange', {id:id, value:value}) )
        }catch(e){
            console.log(e)
        }

}




/* Static funtions here */
Core.extend = function(classType,construc){
    classType.prototype = new Core();
    classType.prototype.constructor=construc;
}

Core.dispEvt = function(_name, _data){
    e = new CustomEvent(
        _name,
        {
            detail: _data,
            bubbles: true,
            cancelable: true
        }
    );
    return e;
}