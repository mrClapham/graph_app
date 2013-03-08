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
        height:100
    }
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
ttt.func2("TESTING ")