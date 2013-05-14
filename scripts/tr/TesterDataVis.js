/**
 * Created with JetBrains WebStorm.
 * User: grahamcapham
 * Date: 11/03/2013
 * Time: 17:30
 * To change this template use File | Settings | File Templates.
 */
TesterDataVis = function(){
t= this

    this.onStateChange = function(e){
        console.log("ON STATE CHANGE IN CHILD id = "+ e.data.id)
    }

    this.addListener(CONSTANTS.STATE_CHANGE, this.onStateChange, this )
    }


DataVisClass.extendDv(TesterDataVis, 'TesterDataVis')