/**
 * The DataVisClass is the base class for all the Data Visualisation components.
 *
 */
DataVisClass = function(){
    var t = this;
    t.model={
        width:100,
        height:100,
        ident:'DataVisClass-ident'
    }
    /**
     * onStateChange responds to the Event dispatched when a paramater is changed via the 'set' function of the SuperClass 'Core'.
     * @param e
     */
    t.controller.onStateChange = function(e){
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
    try{
    t.addListener('stateChange', t.controller.onStateChange, t )
    }catch(e){
        console.log("ERROOR _______"+e)
    }


}
Core.extend(DataVisClass, 'DataVisClass');