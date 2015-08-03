/* use strict */

var mouseX;
var mouseY;

$('#model_container').mousemove(function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});


modeler.directive("wfNodeInstanceState", [function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "/src/resources/js/partial_view/modeler_node_instance_state.html",
        link: function (scope, elem, attrs) {
          //  debugger;
          //  $(elem).draggable({container: $('#model_container')});
            $(elem).css('left', attrs.left+'px');
            $(elem).css('top', attrs.top+'px');
            $(elem).attr('id',attrs.id);
            instance.draggable(jsPlumb.getSelector('.wf_node_instance'), {grid: [2, 2]});
        }
    };
}]);
var makeNodeTag = function ($compile, scope,id, nodeType) {
    console.log('<wf-node-instance-' + nodeType + '>');
   // debugger;
    var $newElem = $compile('<wf-node-instance-' + nodeType + ' id='+id+'  left=' + mouseX + ' top=' + mouseY + '>')(scope);
    return $newElem;
};
var addElementToContainer = function (scope, $newElement) {
    $newElement.appendTo($('#model_container'));


};
function generateNumber(s) {
var n= s+Math.ceil(Math.random()*1000);
    console.log('generated'+n);
    return n;
}
var addNewNodeToProcessNodes = function (scope,id, nodeType) {
    var newNode = new ProcessNode(id, "state2", nodeType);
    scope.process_nodes.push(newNode);
    return newNode;
};


modeler.directive("wfProcessNode", ['$compile', function ($compile) {
    return {
        restrict: "E",
        replace: true,
        templateUrl: function (scope, elem) {
            console.log(elem.nodeType);
            return "/src/resources/js/partial_view/modeler_item_" + elem.nodeType + ".html";
        },
        link: function (scope, elem, attrs) {
            $(elem).draggable({
                cursor: "move",
                cursorAt: {top: -12, left: -20},
                stop: function () {
                 //   debugger;
                    var newId=generateNumber("state_");
                    var $newElement = makeNodeTag($compile, scope,newId, attrs.nodeType);
                    addNewNodeToProcessNodes(scope,newId, attrs.nodeType);
                    addElementToContainer(scope, $newElement);

                    console.log("new item added...");
                    console.log(scope.process_nodes.length);
                },
                helper: function (event) {
                    return $("<div class='panel'>" + attrs.nodeType + ' drop here!' + "</div>");
                }
            });
            /*elem.on("mousedown",function(event){
             $('.wf_designbox').on('mouseup',function(){
             alert('mouse is up');

             });

             });*/

        }
    };
}]);
modeler.directive("wfItemSettingPart", [function () {
    return {
        restrict: "E",
        replace:true,
        templateUrl: "/src/resources/js/partial_view/modeler_item_setting_part.html",
        link: function (scope, elem, attrs) {
            elem.click(function() {
                    console.log('setting part ...5');
                    if (firstNode == null)
                    {
                        firstNode = elem.parents()[1];
                    }
                    else {
                        debugger;
                        secondNode = elem.parents()[1];
                        instance.connect({
                            target: secondNode.id,
                            source: firstNode.id
                        }, commonConnector);
                        instance.draggable(jsPlumb.getSelector('.wf_node_instance'), {grid: [2, 2]});
                        firstNode = null;
                        secondNode = null;
                    }
                    ;
                }
            );

         //   elem.click(function(){alert('kjdh2');});
        }
    };
}]);
modeler.directive('myDialog', [function () {
    return {
        restrict: 'E',
        template: '<input />',
        link: function (scope, element) {
            element.on("mouseover", function () {
                scope.process = "process changed";
            })
        }
    };
}]);
