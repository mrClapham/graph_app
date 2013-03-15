/**
 * Created with JetBrains WebStorm.
 * User: grahamcapham
 * Date: 04/03/2013
 * Time: 13:58
 * To change this template use File | Settings | File Templates.
 */

// test persistant vars


var _pieModel;
var _pieController;
var _pieData =
    [
        {"label": "First item", "value": "700"},
        {"label": "Second", "value": "200"},
        {"label": "Third", "value": "300"},
        {"label": "Fourth", "value": "400"},
        {"label": "Fifth", "value": "500"},
        {"label": "Sixth", "value": "100"},
        {"label": "Last", "value": "150"}
    ];

var _pieData2 =
    [
        {"label": "XX First item", "value": "200"},
        {"label": "XX Second", "value": "400"},
        {"label": "XX Third", "value": "300"},
        {"label": "XX Fourth", "value": "200"},
        {"label": "XX Fifth", "value": "500"},
        {"label": "XX Sixth", "value": "200"},
        {"label": "XX Last", "value": "150"}
    ];

var _testPie1

$(document).ready(function(){
    init();
})


function init(){
    init_tests();
}
//
function init_tests(){

     _testPie1 = new Comp_pie(generateDummyPieDate());

}

function generateDummyPieDate(){
    console.log("DUMMY DATA")
    var controller = {
        generateRandom:function(min, max){
            return Math.random() * (max - min) + min;

        }
    }
    var _pieData =
        [
            {"label": "First item", "value": controller.generateRandom(80, 900)},
            {"label": "Second item", "value": controller.generateRandom(80, 900)},
            {"label": "Third item", "value": controller.generateRandom(80, 900)},
            {"label": "Fourth item", "value": controller.generateRandom(80, 900)},
            {"label": "Fifth item", "value": controller.generateRandom(80, 900)},
            {"label": "Sixth item", "value": controller.generateRandom(80, 900)},
            {"label": "Seventh item", "value": controller.generateRandom(80, 900)},

        ];
    return _pieData
}

var _timer1 = 0
initTimedData();

function initTimedData(targ){
    _timer = self.setInterval(function(){_testPie1.setData( generateDummyPieDate() )}, 3000);

}
