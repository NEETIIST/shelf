var app = angular.module('preview', ['ngResource','ngRoute']);




app.config(function($routeProvider, $httpProvider) {
    $routeProvider
        .when('/:id', {
            template: '<div viewer></div>',
            controller: 'previewController'
        });

});

app.controller('previewController', function($scope, $routeParams,$resource,$rootScope) {

	$scope.content = {};
	$scope.content.filetype = "pdf";

	$scope.images = [
      'http://thefappening2015.com/wp-content/uploads/2015/10/nicole-scherzinger-nude-photos-3.jpg',
      'http://i.dailymail.co.uk/i/pix/2014/06/13/article-0-1EBB069500000578-730_634x423.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIMOiI1x4BtE6SS0BudKlNoSBDleyfPlGHvaXFi9eXlhpCAMT_jg',
      'http://media.new.mensxp.com/media/photogallery/2014/Jan/nicolescherzinger17_1388647491.jpg',
      'http://i-cdn.phonearena.com/images/articles/158961-image/78c8dff1.jpg'
    ];
	
	// Document
	var Document = $resource('/api/docs/:docid',{docid:'@docid'});
	Document.get({docid:$routeParams.id}, function(doc) {
			
			$rootScope.title = doc.name;
			$rootScope.$broadcast('titleAdded');
  			
			$scope.content.filename = "http://shelf.n1z.pt/js/vendor/pdf/web/viewer.html?pdf=/content/"+doc.content[0].local;
	});


});

app.directive('viewer', function ($compile) {

    var getTemplate = function(contentType) {
        var template = '';

        switch(contentType) {
            case 'pdf':
                template = '<iframe ng-src="{{content.filename}}" width="100%" height="100%" frameborder="0"></iframe>';
                break;
            case 'images':
                template = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" style="position:static;"><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar" style="background:none;"><div class="pswp__counter"></div><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>';
                break;
            case 'other':
                template = 'Other';
                break;
        }
        return template;
    };

    var linker = function(scope, element, attrs) {

        element.html(getTemplate(scope.content.filetype)).show();

        $compile(element.contents())(scope);
    };

    return {
        restrict: "E",
        link: linker,
        scope: {
            content:'='
        }
    };

});

app.controller('routePreview', function($scope, $routeParams,$rootScope) {

	$rootScope.$on('titleAdded', function () {
        $scope.title = $rootScope.title;
    });

});








// Gallery
function gallery(){

    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
        {
            src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
            w: 964,
            h: 1024
        },
        {
            src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
            w: 1024,
            h: 683
        }
    ];
    
    // define options (if needed)
    var options = {
			 // history & focus options are disabled on CodePen        
      	history: false,
      	focus: false,
      	modal: false, 
      	closeOnScroll: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
        
    };
    
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};

