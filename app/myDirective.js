(function () {
    var app = angular.module("myDirective", []);
    app.directive("myWysiwyg", function () {
        return {
            restrict: "EA",
            replace: true,
            template: "<textarea></textarea>",
            link: function (scope, el, attr) {
                el.wysihtml5();
            }
        }
    });

    app.directive("myDatePicker", function(){
        return {
            restrict: "EA",
            replace : true,
            template : "<input type='text' data-date-format='dd-mm-yyyy'/>",
            link : function(scope,el, attr){
                el.datepicker({
                    //autoclose: true,
                    //format: "dd MM yyyy"
                    //todayHighlight: true,
                    //todayBtn: "linked",
                    //calendarWeeks: true
                    //viewMode:"year"
                });
            }
        }
    });


}());
