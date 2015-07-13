/* use strict */
modeler.directive("ngModelItem",[function()
{
    return{
        restrict:"E",
        templateUrl:"/src/resources/js/partial_view/modeler_item_state.html",
        link:function(scope,elem,attrs)
        {
            console.log('element:');

            console.log(elem);
            console.log('attr:');
            console.log(attrs);
            console.log(attrs.type);
            console.log('end..............................................');

            $(elem).draggable({
                cursor: "move",
                cursorAt: { top: -12, left: -20 },
                helper: function( event ) {
                    return $( "<div class='panel'>I'm a custom helper</div>" );
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
modeler.directive('myDialog', [function() {
    return {
        restrict: 'E',
        template: '<input />',
        link: function (scope, element) {
            element.on("mouseover",function(){scope.process="process changed";})
        }
    };
}]);
