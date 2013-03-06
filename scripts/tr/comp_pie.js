/**
 * Created with JetBrains WebStorm.
 * User: grahamcapham
 * Date: 06/03/2013
 * Time: 09:04
 * To change this template use File | Settings | File Templates.
 */

function Comp_pie(data){
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
                //var __data = scope.model.data;
                //var __pie = scope.model.pie;
                scope.model.arcs = scope.model.svg.selectAll('g.arc');
            },
            initArcs:function(){
                scope.model.arcs = scope.model.svg.selectAll(".arc")
                    .data(scope.model.pie(scope.model.data))
                    .enter().append("g")
                    .attr("class", "arc");

                scope.model.arcs.append("path")
                    .attr("d", scope.model.arc)
                    .style("fill", function(d) { return scope.model.arcColors(d.data.label); });

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