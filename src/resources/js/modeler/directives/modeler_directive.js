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
            debugger;
            $(elem).draggable({container: $('#model_container')});
            $(elem).css('left', attrs.left+'px');
            $(elem).css('top', attrs.top+'px');
        }
    };
}]);
var makeNodeTag = function ($compile, scope, nodeType) {
    console.log('<wf-node-instance-' + nodeType + '>');
    debugger;
    var $newElem = $compile('<wf-node-instance-' + nodeType + ' left=' + mouseX + ' top=' + mouseY + '>')(scope);
    return $newElem;
};
var addElementToContainer = function (scope, $newElement) {
    $newElement.appendTo($('#model_container'));


};
var addNewNodeToProcessNodes = function (scope, nodeType) {
    var newNode = new ProcessNode(123, "state2", nodeType);
    scope.process_nodes.push(newNode);
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
                    var $newElement = makeNodeTag($compile, scope, attrs.nodeType);
                    addElementToContainer(scope, $newElement);
                    addNewNodeToProcessNodes(scope, attrs.nodeType);
                    console.log("new item added...");
                    console.log(scope.process_nodes.length);
                },
                helper: function (event) {
                    return $("<div class='panel'>" + attrs.nodeType + 'here' + "</div>");
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
        templateUrl: "/src/resources/js/partial_view/modeler_item_setting_part.html",
        link: function (scope, elem, attrs) {

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
