/**
 * The DataVisClass is the base class for all the Data Visualisation components.
 *
 */
function DataVisClass(){
    var t = this;
    this.controller={}
    t.model={
        width:100,
        height:100,
        ident:'DataVisClass-ident'

    }
    /**
     * onStateChange responds to the Event dispatched when a paramater is changed via the 'set' function of the SuperClass 'Core'.
     * @param e
     */
    this.onStateChange = function(e){
        console.log("THERE HAS BEEN A STATE CHANGE TO: "+ e.data.id+" -- ident "+ t.model.ident)
        var _id= e.data.id;
        var _value= e.data.value;
        switch(_id){
            case 'ident' :
                console.log("onStateChange IDENT CALLED")
            break;
            case 'width' :
                console.log("onStateChange WIDTH CALLED")
            break;
            case 'height' :
                console.log("onStateChange HEIGHT CALLED")
            break;
            default :
                console.log("onStateChange DEFAULT CALLED")
            break;
        }

    }

    this.testInherit =function(e){
        alert("TEST INHERIT PARENT INBUILT")
    }


    try{
    this.addListener(CONSTANTS.STATE_CHANGE, this.onStateChange, this )
    }catch(e){
        //----
    }
}


DataVisClass.prototype.testInherit = function(){
    alert("TEST INHERIT PARENT PROTOTYPE...")
}


Core.extend(DataVisClass, 'DataVisClass');

DataVisClass.extendDv = function(classType,construc){
    Core.extend(DataVisClass, 'DataVisClass');
    classType.prototype = new DataVisClass();
    classType.prototype.constructor=construc;
}
