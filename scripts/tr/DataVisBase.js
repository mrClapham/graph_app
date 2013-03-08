/**
 * Created with JetBrains WebStorm.
 * User: grahamcapham
 * Date: 07/03/2013
 * Time: 12:02
 * To change this template use File | Settings | File Templates.
 */
function DataVisBase(){
    var inst = this
        inst.model={
            datatest:"Dummy data here"
        },
        inst.view={},
        inst.controller={}

    inst.hello=function(){
        console.log("Hello World called in DataVisBase ");
    }
    inst.get = function(id){
        return inst.model[id];
    },
    inst.set = function(id, value){
        try{
            inst.model[id]=value;
        }catch(e){
            console.log(e)
        }

    }
    return inst;
}




DataVisBase.prototype.extend = function(jsClass){
    jsClass.prototype = DataVisBase.prototype
}
DataVisBase.c_event = function(){
    return "NEW EVENT"
}


//var event = new CustomEvent(
//    "newMessage",
//    {
//        detail: {
//            message: "Hello World!",
//            time: new Date(),
//        },
//        bubbles: true,
//        cancelable: true
//    }
//);