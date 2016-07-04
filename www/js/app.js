// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.factories'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

      .state('start', {
          url: '/start',
          templateUrl: 'templates/start.html',
          controller: 'StartCtrl'
      })

    .state('app', {
    url: '/app',
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
  })

      .state('app.explore', {
        url: '/explore',
        views: {
          'menuContent': {
            templateUrl: 'templates/explore.html',
            controller: 'ExploreCtrl'
          }
        }
      })

      .state('app.map', {
        url: '/explore/map/:mapId',
        views: {
          'menuContent': {
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
          }
        }
      })

  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })


	.state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })


    })
    .state('app.gallery', {
      url: '/gallery',
      views: {
        'menuContent': {
          templateUrl: 'templates/gallery.html',
          controller: 'GalleryCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
	
	.state('app.contact',{
		url: '/contact',
		views:{
			'menuContent':{
				templateUrl: 'templates/contactus.html',
				controller: 'ContactCtrl'
			}
		}
	})

  .state('app.favourites', {
    url: '/favourites',
    views: {
      'menuContent': {
        templateUrl: 'templates/favourites.html',
        controller: 'FavouritesCtrl'
      }
    }
  })

    .state('app.favourite', {
    url: '/favourites/:favouritesId',
    views: {
      'menuContent': {
        templateUrl: 'templates/favourite.html',
        controller: 'FavouriteCtrl'
      }
    }
  });
>>>>>>>>> Temporary merge branch 2
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');
});
