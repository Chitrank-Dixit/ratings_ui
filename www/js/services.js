angular.module('starter.services', ['ionic','ngCookies','angular-storage','ionic.rating'])
    .factory('API', function ( $rootScope, $http, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate,$window, $cookies, $timeout, $resource) {
       var base = "http://findnoble.herokuapp.com/"; // while working locally set local node server link
        $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0, 
                template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stoke-width="2" stoker-miterlimit="10" /></svg></div><p>'+text+'</p' 
            });
        };

        //$rootScope.email = '';
        // current user (signed in user data)
        //$rootScope.email = $rootScope.userdata.email;
        //store.message = "Helpshit Help me";
        //console.log(store.message);
        $rootScope.rate = 0;
        $rootScope.max = 5;
        $rootScope.min = 0;
        $cookies.myFavorite = 'oatmeal';
        var favoriteCookie = $cookies.myFavorite;
        console.log(favoriteCookie);
        
        
        //console.log($cookieStore.get('myFavorite'));
        $rootScope.userdata = '';

        $rootScope.hide = function () {
            $ionicLoading.hide();
        };

        $rootScope.logout = function () {
            //console.log("Hii Logout");
            $rootScope.setToken("");
            $window.location.href = '#/app/login';
        };

        $rootScope.notify =function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
              $rootScope.hide();
            }, 1999);
        };

        $rootScope.doRefresh = function (tab) {
            if(tab == 1)
                $rootScope.$broadcast('fetchAll');
            else
                $rootScope.$broadcast('fetchCompleted');
            
            $rootScope.$broadcast('scroll.refreshComplete');
        };

        $rootScope.setToken = function (token) {
            // can also use localstorage for this $window.localStorage.token = token;
            return $window.sessionStorage.token = token;
            
        }

        $rootScope.setUserdata = function(userdata) {
            return $window.localStorage.setItem('userdata', JSON.stringify(userdata));
        }

        $rootScope.getUserdata = function(){
            return $rootScope.userdata;
        }

        // get any field of the user 
        $rootScope.getSpecificUserdata = function(data){
            //var return_data = $window.localStorage.getItem('userdata');
            // got the solution from : http://thejackalofjavascript.com/storing-objects-html5-local-storage/
            var return_data  = JSON.parse($window.localStorage.getItem('userdata'));
            return return_data[data];
        }


        $rootScope.getToken = function () {
            // can also use local storage for this $window.localStorage.token;
            return $window.sessionStorage.token;
        }

        $rootScope.setEmail = function(email) {
            return $rootScope.email = email;
        }
        

        $rootScope.getEmail = function() {
            return $rootScope.email;
        }

        $rootScope.isSessionActive = function () {
            // can also use local storage for this $window.localStorage.token ? true : false;
            return $window.sessionStorage.token ? true : false;
        }

        // all review profiles data

        $rootScope.setAllReviewProfs = function(allrevprof) {
            return $window.localStorage.setItem('allrevprof', JSON.stringify(allrevprof));
        }

        $rootScope.getAllReviewProfs = function() {
            var return_data  = JSON.parse($window.localStorage.getItem('allrevprof'));
            //console.log(return_data['email']);
            return return_data;
        }

        // variable to store all the reviews

        //$rootScope.allreviews = getAllReviewProfs();

        // review profile data

        $rootScope.getSpecificReviewProfs = function(data) {
            return $rootScope.revprof[data];
        }

        $rootScope.setRevProfileData = function(revdata) {
            return $window.localStorage.setItem('revdata', JSON.stringify(revdata));
        }

        $rootScope.getRevProfileData = function(){
            return $rootScope.revdata;
        }

        $rootScope.getRevProfileSpecificData = function(data) {
            var return_data  = JSON.parse($window.localStorage.getItem('revdata'));
            //console.log(return_data['email']);
            return return_data[data];
        }



        $rootScope.checksearch = function() {
            return $window.sessionStorage.checksearchtoggle;
        }

        // all user reviews data

        $rootScope.setAllUserReviews = function(userrevdata) {
            return $window.localStorage.setItem('userrevdata', JSON.stringify(userrevdata));
        }

        $rootScope.getAllUserReviews = function(){
            return $rootScope.userrevdata;
        }

        $rootScope.getSpecificUserReviews = function(data){
            var return_data  = JSON.parse($window.localStorage.getItem('userrevdata'));
            return return_data[data];
        }




        /*$rootScope.search = function(data) {
            return $window.localStorage.checksearchtoggle = data ;
        }*/

        // angular function() {};ilter
        $rootScope.queryfy = function(data) {
            return $resource(data, {} ,{
                query: {
                    data,
                    isArray: true
                }
            });
        };

        // ionic pop up where user would be able to review for the various page -reviews
        

        return {
            
            signin: function (form) {
                return $http.post(base+'/api/v1/ratingapp/auth/login', form);
            },
            signup: function (form) {
                return $http.post(base+'/api/v1/ratingapp/auth/register', form);
            },
            getuserprofile: function(userid, id) {
                return $http.get(base+'/api/v1/ratingapp/data/review/' +userid, {
                    method: 'GET',
                    params: {
                        token: id
                    }
                });
            },
            addrevprofile: function (form, id) {
                console.log("T router");
                return $http.post(base+'/api/v1/ratingapp/data/add/reviewprof', form, {
                    method: 'POST',
                    params: {
                        token: id
                    }
                });
            },
            getallreviewprofiles: function(id){
                return $http.get(base+'/api/v1/ratingapp/data/allrevprofiles', {
                    method: 'GET',
                    params: {
                        token: id
                    }
                });
            },
            getspecificprofile: function(revid,id){
                return $http.get(base+'/api/v1/ratingapp/data/review/' +revid, {
                    method: 'GET',
                    params: {
                        token: id
                    }
                });
            },
            addrev: function(form, id){
                return $http.post(base+'/api/v1/ratingapp/data/add/reviewprof/userrev', form, {
                    method: 'POST',
                    params: {
                        token: id
                    }
                });
            },
            getalluserreviews: function (revid,id) {
                console.log("Step 1");
                return $http.get(base+'/api/v1/ratingapp/data/alluserreviews/'+revid, {
                    method: 'GET',
                    params: {
                        token: id
                    }
                });
            }
            /*getUserData: function(id,email){
                return $http.get(base+'/api/v1/ratingapp/data/user/' +id, {
                    method: 'GET',
                    params: {
                        token: email
                    }
                });
            },*/
            /*getAll: function (email) {
                return $http.get(base+'/api/v1/bucketList/data/list', {
                    method: 'GET',
                    params: {
                        token: email
                    }
                });
            },
            getOne: function (id, email) {
                return $http.get(base+'/api/v1/bucketList/data/item/' + id, {
                    method: 'GET',
                    params: {
                        token: email
                    }
                });
            },
            saveItem: function (form, email) {
                return $http.post(base+'/api/v1/bucketList/data/item', form, {
                    method: 'POST',
                    params: {
                        token: email
                    }
                });
            },
            putItem: function (id, form, email) {
                return $http.put(base+'/api/v1/bucketList/data/item/' + id, form, {
                    method: 'PUT',
                    params: {
                        token: email
                    }
                });
            },
            deleteItem: function (id, email) {
                return $http.delete(base+'/api/v1/bucketList/data/item/' + id, {
                    method: 'DELETE',
                    params: {
                        token: email
                    }
                });
            }*/
        }
    })

;
