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
    var _testPie1 = new Comp_pie(_pieData);


//d3 -- simple svg circle test...
    $("#circ_btt").click(
        function(e){
            e.preventDefault();
            window.location.href = "#/";
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

   var  svg = d3.select('.little');
   var  circle = d3.selectAll("circle").transition()
       .duration(750)
       .delay(100)
       .attr("r", 30)
       .style("fill", "red");
}

