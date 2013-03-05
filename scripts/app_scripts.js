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
    var _testPie1 = new testPie1(_pieData);


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


function testPie1(data){
    var scope = {
        model:{
            data:data,
            width:500,
            height:600,
            outerOffset: 10,
            thickness:70,
            radius:null,
            arc:null,
            arcs:null,
            pie:null,
            targ:$('#pie1'),
            svg:null,
            arcColors:null,
            sorting:null
        },
        view:{},
        controller:{
            init:function(){
                scope.model.radius = Math.min(scope.model.width, scope.model.height) / 2;
                scope.controller.initSVG();
                scope.controller.initColours();
                scope.controller.initPie();
                scope.controller.initArc();
                scope.controller.initArcs();
            },
            draw:function(){

            },
            initColours:function(){
                scope.model.arcColors = d3.scale.ordinal()
                    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
            },
            initPie:function(){
                scope.model.pie = d3.layout.pie()
                    .sort(scope.model.sorting)
                    .value(function(d) { return d.value; });
            },
            initSVG:function(){
                scope.model.svg = d3.select("body").append("svg")
                    .attr("width", scope.model.width)
                    .attr("height", scope.model.height)
                    .data(scope.model.data)
                    .append("g")
                    .attr("transform", "translate(" + scope.model.width / 2 + "," + scope.model.height / 2 + ")");
            },
            initArc:function(){
                scope.model.arc = d3.svg.arc()
                    .outerRadius( scope.model.radius - scope.model.outerOffset )
                    .innerRadius( scope.model.radius - (scope.model.thickness+scope.model.outerOffset) );
                var __data = scope.model.data;
                var __pie = scope.model.pie;
                scope.model.arcs = scope.model.svg.selectAll('g.arc');
            },
            initArcs:function(){
                scope.model.arcs = scope.model.svg.selectAll(".arc")
                    .data(scope.model.pie(scope.model.data))
                    .enter().append("g")
                    .attr("class", "arc");

                scope.model.arcs.append("path")
                    .attr("d", scope.model.arc)
                    .style("fill", function(d) { return scope.model.arcColors(d.data.label); })

                scope.model.arcs.append("text")
                    .attr("transform", function(d) { return "translate(" + scope.model.arc.centroid(d) + ")"; })
                    .attr("dy", ".35em")
                    .style({"text-anchor":  "middle", "color" : "#ff00ff"})
                    .text(function(d) { return d.data.label; });
            }
        }
    };

    scope.controller.init();

    return scope;

}
