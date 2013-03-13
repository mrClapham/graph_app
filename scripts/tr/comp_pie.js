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
            arcPaths:null,
            pie:null,
            targ:$('#pie1'),
            svg:null,
            arcColors:null,
            sorting:null,
            animated:true
        },
        view:{},
        controller:{
            init:function(){
                scope.model.radius = Math.min(scope.model.width, scope.model.height) / 2;
                scope.controller.initSVG();
                scope.controller.draw();
            },
            clear:function(){
                d3.select("svg").remove()

            },
            draw:function(){
                scope.controller.initColours();
                scope.controller.initPie();
                scope.controller.initArc();
                scope.controller.initArcs();
            },
            initSVG:function(){
                scope.model.svg = d3.select("body").append("svg")
                    .attr("width", scope.model.width)
                    .attr("height", scope.model.height)
                    .data(scope.model.data)
                    .append("g")
                    .attr("transform", "translate(" + scope.model.width / 2 + "," + scope.model.height / 2 + ")");
            },
            initColours:function(){
                scope.model.arcColors = d3.scale.ordinal()
                    .range(['#484848', '#747474','#999999','#15ffad', '#ff4c1a']);
            },
            initPie:function(){
                scope.model.pie = d3.layout.pie()
                    .sort(scope.model.sorting)
                    .value(function(d) { return d.value; });
            },
            initArc:function(){
                scope.model.arc = d3.svg.arc()
                    .outerRadius( scope.model.radius - scope.model.outerOffset )
                    .innerRadius( scope.model.radius - (scope.model.thickness+scope.model.outerOffset) );
            },
            initArcs:function(){
                scope.model.arcs = scope.model.svg.selectAll(".arc")
                    .data(scope.model.pie(scope.model.data))
                    //.transition().duration(750).attrTween("d", 100)
                    .enter().append("g")
                    .attr("class", "arc")
                    .on("mouseover", function(d, i){scope.controller.onSegmentMouseOver(d,i) })

                scope.model.arcs.append("path")
                    .attr("d", scope.model.arc)
                    .style("fill", function(d) { return scope.model.arcColors(d.data.label); })
                    .each(function(d){
                        this._current=d;

                    }) // storing an initial value of 'd' for later tweening;
                ;

                scope.model.arcs.append("text")
                    .attr("transform", function(d) { return "translate(" + scope.model.arc.centroid(d) + ")"; })
                    .attr("dy", ".35em")
                    .style({"text-anchor":  "middle", "color" : "#ff00ff"})
                    .text(function(d) { return d.data.label; });
            },
            onSegmentMouseOver:function(d,i){
                console.log("onSegmentMouseOver d = "+d+"  i "+i)
            },
            // Store the displayed angles in _current.
            // Then, interpolate from _current to the new angles.
            // During the transition, _current is updated in-place by d3.interpolate.
            arcTween:function(a){
                var i = d3.interpolate({value: a._current}, a);
                console.log("arcTween CALLED "+a._current)

                this._current = i(0);

                return function(t) {
                    return scope.model.arc(i(t));
                }
            },
            update:function(){
                console.log("update CALLED");
                scope.model.arcPaths = scope.model.svg.selectAll("path")
                    .transition().duration(750).attrTween("d", scope.controller.arcTween)
                    //.data(scope.model.pie(scope.model.data))
                    .each(function(d){
                        console.log("CURRENT + "+this._current)
                        //this.transition().duration(750).attrTween("d", scope.controller.arcTween(this));
                    });
                    //.transition().duration(750).attrTween("d", scope.controller.arcTween(this));
            },
            change:function(){

            }
        }
    };

    scope.setData=function(value){
       scope.model.data = value;
        scope.controller.clear();
       scope.controller.init();

    }

    scope.controller.init();
    this.setData = function(data){
        scope.model.data = data
        scope.controller.update();
    }

    return scope;

}