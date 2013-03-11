/**
 * Created with JetBrains WebStorm.
 * User: grahamcapham
 * Date: 07/03/2013
 * Time: 13:15
 * To change this template use File | Settings | File Templates.
 */
DataVisClass = function(){
    var t = this;
    t.model={
        width:100,
        height:100,
        ident:'DataVisClass-ident'
    }
    t.controller.onStateChange = function(e){
        //console.log("THERE HAS BEEN A STATE CHANGE TO: "+ e.data.id+" -- ident "+ t.model.ident)
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
    t.addListener('stateChange', t.controller.onStateChange )


    init = function(){
        /*
            for(vars in t ){
                console.log("VARS : "+vars+" : "+t[vars])
            }
        */
    }
    init()
}
Core.extend(DataVisClass, 'DataVisClass');

var ttt = new DataVisClass()
