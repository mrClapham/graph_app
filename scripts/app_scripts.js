/**
 * Created with JetBrains WebStorm.
 * User: grahamcapham
 * Date: 04/03/2013
 * Time: 13:58
 * To change this template use File | Settings | File Templates.
 */

// test persistant vars

var _pieModel
var _pieController
var _pieData =
    [
        {"age": "<5", "population": "9704659"},
        {"age": "5-13", "population": "4499890"},
        {"age": "14-17", "population": "2159981"},
        {"age": "18-24", "population": "3853788"},
        {"age": "25-44", "population": "14106543"},
        {"age": "45-64", "population": "8819342"},
        {"age": "≥65", "population": "612463"},
    ];

$(document).ready(function(){
    init();
})


function init(){
    init_tests();
    // Set a callback to run when the Google Visualization API is loaded.
}
//
function init_tests(){
    // The Google Chating
  //  google.load('visualization', '1.0', {'packages':['corechart'], 'callback':initCharts});


//d3 -- simple svg circle test...
    $("#circ_btt").click(
        function(e){
            e.preventDefault();
            window.location.href = "#/"
            testCircleScript();
            return false;
        }
    );
}
//
function initCharts(){
    _pieModel = Backbone.Model.extend({});
    _pieController = Backbone.Collection.extend({});

    drawPieChart()
}

//
function drawPieChart(){
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ]);

    // Set chart options -
    var options = {'title':'How Much Pizza I Ate Last Night',
        'width':400,
        'height':300,
        'colors': ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        'backgroundColor' : '#666666'
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
//
function testCircleScript(){

   var  svg = d3.select('.little')
   var  circle = d3.selectAll("circle").transition()
       .duration(750)
       .delay(100)
       .attr("r", 30)
       .style("fill", "red");
       ;
}


function testPie1(){

}
