'use strict';
angular.module('gallery', [])
  .directive('simpleImageGallery',
  function () {
    var template =  '<div id="simple-gallery">' +
                      '<div id="simple-gallery" class="col-sm-12 image pimage">' +
                        '<div class="item active">' +
                          '<img ng-src="{{ currentImage || images[0] }}" class="img-responsive">' +
                        '</div>' +
                      '</div>' +
                          '<div id="slider-thumbs">' +
                            '<ul>' +
                              '<li ng-repeat="image in images track by $index">' +
                                '<a ng-click="activateImg($index)" href="">' +
                                  '<img ng-src="{{ image }}" class="img-responsive simple-gallery-thumbnail">' +
                                '</a>' +
                              '</li>' +
                            '</ul>' +
                          '</div>' +
                      '</div>';
    return {
      restrict: 'E',
      scope: {
        images: '='
      },
      template: template,
      controller: function ($scope) {
        $scope.activateImg = function (index) {
          $scope.currentImage = $scope.images[index];
        };
      },
      link: function (scope, element, attrs) {
        scope.currentImage = scope.images[0] || {};
      }
    };
  });
