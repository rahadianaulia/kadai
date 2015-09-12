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



}());
