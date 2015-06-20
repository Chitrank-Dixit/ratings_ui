angular.module('starter.controllers', ['ionic','starter.services','ngCookies', 'angular-storage', 'ngResource'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $ionicNavBarDelegate ,$timeout, $rootScope,API, $cookies) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
    
    //$scope.email = API.userdata.email;

    // searching fundamentals
    // search bar methods goes here using ngToggle
    $scope.custom = true;
    $scope.toggleCustom = function() {
        $scope.custom = $scope.custom === false ? true: false;
    };

    /*$rootScope.show('Please wait.. Fetching results');

    $rootScope.hide();*/

    
    
    $scope.data=["JavaScript","Java","Ruby","Python"];


})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, $rootScope, API, $window) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionic.material.ink.displayEffect();

    if ($rootScope.isSessionActive()) {
        $window.location.href = ('#/app/home');
    }

    $scope.user = {
        email: "",
        password: ""
    };

    $scope.validateUser = function () {
        /*var userData = {
            data:[]
        };*/
        var email = this.user.email;
        var password = this.user.password;
        if(!email || !password) {
            $rootScope.notify("Please enter valid credentials");
            return false;
        }
        $rootScope.show('Please wait.. Authenticating');
        API.signin({
            email: email,
            password: password
        }).success(function (data) {
            //$rootScope.setToken(email); // create a session kind of thing on the client side
            $rootScope.hide();
            //userData = data;
            
            
            $rootScope.setToken(data._id);
            $rootScope.setUserdata(data);
            $rootScope.setEmail(data.email);
            
            $window.location.href = ('#/app/home');
        }).error(function (error) {
            $rootScope.hide();
            $rootScope.notify("Invalid Username or password");
        });
    }

})

.controller('RegisterCtrl', function($scope, $timeout, $stateParams, $rootScope, API, $window) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionic.material.ink.displayEffect();
    var currenttime = new Date();
    $scope.user = {
        email: "",
        password: "",
        name: ""
    };

    $scope.createUser = function () {
        /*var userData = {
            data:[]
        };*/
        var timestamp =  currenttime;
        var email = this.user.email;
        var password = this.user.password;
        var name = this.user.name;
        var level = 1;
        var karma = 10;
        if(!email || !password || !name) {
            $rootScope.notify("Please enter valid data");
            return false;
        }
        $rootScope.show('Please wait.. Registering');
        API.signup({
            timestamp: timestamp,
            email: email,
            password: password,
            name: name,
            level: level,
            karma: karma,
        }).success(function (data) {
            //$rootScope.setToken(email); // create a session kind of thing on the client side
            //$rootScope.setId(_id);
            $rootScope.hide();
            //userData = data;
            //console.log(userData);
            $rootScope.setToken(data._id);
            $rootScope.setUserdata(data);
            console.log(data);
            
            $window.location.href = ('#/app/home');
        }).error(function (error) {
            //$rootScope.hide();
            if(error.error && error.error.code == 11000)
            {
                $rootScope.notify("A user with this email already exists");
            }
            else
            {
                $rootScope.notify("Oops something went wrong, Please try again!");
            }
            
        });
    }
})


.controller('AddRevCtrl', function($scope, $timeout, $stateParams, $rootScope, API, $window) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionic.material.ink.displayEffect();
    console.log("T 1");
    /*var revprofiledata = {
        data: []
    };*/
    $scope.revprofile = {
        name: "",
        description: "",
        category: "",
        author: ""
    };

    $scope.createReviewProfile = function () {
        var timestamp = new Date();
        var name = this.revprofile.name;
        var description = this.revprofile.description;
        var category = this.revprofile.category;
        var author = this.revprofile.author;
        var likes = 0;

        
        if(!name || !description || !category || !author) {
            $rootScope.notify("Please enter valid data");
            return false;
        }
        var token = $rootScope.getToken(); // id of the current user
        console.log("T 2");
        //$rootScope.show('Please wait.. Registering');
        API.addrevprofile({
            timestamp: timestamp,
            name: name,
            description: description,
            category: category,
            likes: likes,
            author: author,
            authorid: token
            
        }, token).success(function (data) {
            //$rootScope.hide();
            //revprofiledata = data;                       
            $rootScope.setRevProfileData(data);

            $window.location.href = ('#/app/rev-profile');
        }).error(function (error) {
            //$rootScope.hide();
            if(error.error && error.error.code == 11000)
            {
                $rootScope.notify("Profile already exists");
            }
            else
            {
                $rootScope.notify("Oops something went wrong, Please try again!");
            }
            
        });
    }
})


.controller('FriendsCtrl', function($scope, $stateParams, $timeout, $rootScope) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionic.material.motion.fadeSlideInRight();

    // Set Ink
    ionic.material.ink.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, $rootScope) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionic.material.ink.displayEffect();

    $rootScope.getUserProfile = function(userid) {
        //var review_id = this.reviewpro.revid;
        var token = $rootScope.getToken();
        //$rootScope.show('Please wait.. Authenticating');
        //console.log('in sp pro review', review_id);
        API.getuserprofile(userid, token).success(function (data) {
            //$rootScope.setToken(email); // create a session kind of thing on the client side
            //$rootScope.hide();
            //userData = data;
            
            
            $rootScope.setUserdata(data);

            $scope.userdata = $rootScope.getUserdata();
                       
            $window.location.href = ('#/app/rev-profile');
        }).error(function (error) {
            $rootScope.hide();
            $rootScope.notify("Invalid Username or password");
        });
    }

    /*$rootScope.$on('fetchAlldata', function(){
            API.getUserData($rootScope.getToken()).success(function (data, status, headers, config) {
            $rootScope.show("Please wait... Processing");
            $scope.list = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].isCompleted == false) {
                    $scope.list.push(data[i]);
                }
            };
            if($scope.list.length == 0)
            {
                $scope.noData = true;
            }
            else
            {
                $scope.noData = false;
            }

            $ionicModal.fromTemplateUrl('templates/newItem.html', function (modal) {
                $scope.newTemplate = modal;
            });

            $scope.newTask = function () {
                $scope.newTemplate.show();
            };
            $rootScope.hide();
        }).error(function (data, status, headers, config) {
            $rootScope.hide();
            $rootScope.notify("Oops something went wrong!! Please try again later");
        });
    });

    $rootScope.$broadcast('fetchAll');*/

})

.controller('RevProfileCtrl', function($scope, $stateParams, $timeout, $rootScope, $ionicPopup, API) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionic.material.ink.displayEffect();

    // get specific profile of the product

    $scope.userrev = {
        rate: 0,
        title: "",
        description: ""
    };

    $scope.review = function(){
        // An elaborate, custom popup
            $scope.userrev = {
                rate: 0,
                title: "",
                description: ""
            };

           var myPopup = $ionicPopup.show({
             width: 400,
             height: 350,
             scope: $scope,
             template: '<div class="popup"><div class="list"><div class="row"><div><rating ng-model="userrev.rate" max="max" min="min"></rating></div></div> <label class="item item-input item-floating-label"> <span class="input-label">Title</span> <input type="text" placeholder="Title" ng-model="userrev.title" required> </label> <label class="item item-input item-floating-label"> <span class="input-label">Description</span> <textarea placeholder="Description" rows="2" ng-model="userrev.description" name="Description" required></textarea> </label></div></div>',
             title: 'Your Review',
             subTitle: 'your review matters as it affects rating',
             buttons: [
               {
                 text: 'Submit',
                 type: 'button-positive',
                 onTap: function() {
                    if($scope.userrev.rate && $scope.userrev.title && $scope.userrev.description){
                        console.log("Working", $scope.userrev.title);
                        var timestamp =  new Date();
                        var userid = $rootScope.getToken();
                        var revid = $rootScope.getRevProfileSpecificData('_id');
                        var revtitle = $scope.userrev.title;
                        var revrate = $scope.userrev.rate;
                        var revdescription =$scope.userrev.description;
                        $rootScope.show("Adding your review");
                        API.addrev({
                            timestamp: timestamp,
                            title: revtitle,
                            description: revdescription,
                            rating: revrate,
                            reviewprofileid: revid, 
                            reviewer: userid

                        }, userid).success(function (data) {
                            //$rootScope.setToken(email); // create a session kind of thing on the client side
                            //$rootScope.hide();
                            //userData = data;
                            

                            
                            console.log("done");
                            $rootScope.hide();
                            $timeout(function() {
                                ionic.material.motion.blinds();
                            }, 300);

                            $scope.userreviews($rootScope.getRevProfileSpecificData('_id'));
                            
                        }).error(function (error) {
                            $rootScope.hide();
                            $rootScope.notify("Invalid Username or password");
                        });

                    }
                 }
               },
               { text: 'Cancel' }

             ]
           });
           myPopup.then(function(res) {
             console.log('Tapped!', res);
           });
           /*$timeout(function() {
              ionic.material.ink.displayEffect();
              myPopup.close(); //close the popup after 3 seconds for some reason
           }, 3000);*/
    }

    // all the user reviews related to this profile
    $scope.userreviews = function(revid) {
        var token = $rootScope.getToken();
        console.log("hii____", token);
        $rootScope.show("fetching..");
        API.getalluserreviews(revid, token).success(function (data){
            //console.log(data);
            $rootScope.setAllUserReviews(data);

            $scope.allreviews = data;
            $rootScope.hide();
            console.log("now done reviews", data);
            /*$scope.allprofilesstore = $rootScope.getAllReviewProfs();*/
        }).error(function (error) {
            console.log("Error");
            if(error.error && error.error.code == 11000)
            {
                $rootScope.notify("Profile already exists");
            }
            else
            {
                $rootScope.notify("Oops something went wrong, Please try again!");
            }

        })  
        
        
    }

    
    
})


.controller('HomeCtrl', function($scope, $stateParams, $timeout, $rootScope, API,$resource,$window) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    /*$timeout(function() {
        ionic.material.motion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);*/

    $timeout(function() {
        ionic.material.motion.blinds();
    }, 300);
    // Activate ink for controller
    ionic.material.ink.displayEffect();
    //console.log($rootScope.getUserdata());



    

    // get all events
    console.log("hii____");
    $scope.getAllReviewProfiles = function() {
        var token = $rootScope.getToken();
        console.log("hii____", token);
        
        API.getallreviewprofiles(token).success(function (data){
            //console.log(data);
            $rootScope.setAllReviewProfs(data);
            $rootScope.queryfy(data);
            
            //$scope.allprofiles = data;
            $scope.allprofiles = $rootScope.getAllReviewProfs();
        }).error(function (error) {
            console.log("Error");
            if(error.error && error.error.code == 11000)
            {
                $rootScope.notify("Profile already exists");
            }
            else
            {
                $rootScope.notify("Oops something went wrong, Please try again!");
            }

        })  
        
        
            
   
    }

    $scope.getReviewProfile = function (review_id) {
        //var review_id = this.reviewpro.revid;
        var token = $rootScope.getToken();
        //$rootScope.show('Please wait.. Authenticating');
        console.log('in sp pro review', review_id);
        API.getspecificprofile(review_id, token).success(function (data) {
            //$rootScope.setToken(email); // create a session kind of thing on the client side
            //$rootScope.hide();
            //userData = data;
            
            
            $rootScope.setRevProfileData(data);
                       
            $window.location.href = ('#/app/rev-profile');
        }).error(function (error) {
            $rootScope.hide();
            $rootScope.notify("Invalid Username or password");
        });
    }

    $rootScope.listprofiles = {'searchQuery' : ''};
    


})


.controller('GalleryCtrl', function($scope, $stateParams, $timeout, $rootScope) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionic.material.ink.displayEffect();

    ionic.material.motion.pushDown({
        selector: '.push-down'
    });
    ionic.material.motion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('DeveloperCtrl', function($scope, $stateParams, $timeout, $rootScope) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionic.material.ink.displayEffect();

    ionic.material.motion.pushDown({
        selector: '.push-down'
    });
    ionic.material.motion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.filter('nameFilter', function(){
    return function(objects, criteria){
        var filterResult = new Array();
        console.log(criteria);
        if(!criteria)
            return objects;
       
        for(index in objects) {
            if((objects[index].name.indexOf(criteria.toUpperCase()) != -1) || (objects[index].name.indexOf(criteria.toLowerCase()) != -1) ) // filter by name only
                filterResult.push(objects[index]);
        }
        console.log(filterResult);
        return filterResult;  
    }    
});