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
    alert("HELLOOOO")
    init_tests();
}
//
function init_tests(){

     _testPie1 = new Comp_pie(_pieData);

}
