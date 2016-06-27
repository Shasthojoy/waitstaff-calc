angular.module('waiterCalc', ['ngRoute', 'ngAnimate'])
    .value('pages', ['new-meal', 'my-earnings'])
    .run(function($rootScope, $location){
        $rootScope.$on('$routeChangeError', function(){
            $location.path('/');
        });
    })
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'welcome.html',
            controller: 'MainCtrl'
        })
        .when('/new-meal', {
            templateUrl: 'new-meal.html',
            controller: 'MainCtrl'
        })
        .when('/my-earnings', {
            templateUrl: 'my-earnings.html',
            controller: 'MainCtrl'
        })
        .when('/:unknown', {
            templateUrl: 'welcome.html',
            controller: 'MainCtrl',
            resolve: {
                error : function(pages, $route, $location){
                    var unknown = $route.current.params.unknown;
                    if(pages.indexOf(unknown)===-1){
                        $location.path('/');
                        return;
                    }
                    return unknown;
                }
            }
        })
    }])
  .controller('MainCtrl', function() {
    var vm = this;

    vm.currentMeal = {
      mealPrice: '',
      taxRate: 15,
      tipRate: 10,
      tax: 0,
      subtotal: 0,
      tip: 0,
      total: 0,
      // Calculates the Subtotal (Meal Price + Tax)
      calcSubtotal: function() {
        this.tax = Math.round(this.mealPrice * this.taxRate) / 100;
        this.subtotal = parseFloat(this.mealPrice) + this.tax;
      },
      // Calculates the Tip (Subtotal * Tip Rate)
      calcTip: function() {
        this.tip = Math.round(this.subtotal * this.tipRate) / 100;
      },
      // Calculates Total (Subtotal + Tip)
      calcTotal: function() {
        this.total = this.subtotal + this.tip;
      }
    };

    vm.myEarnings = {
      tipTotal: 0,
      mealCount: 0,
      averageTip: 0,
      // Calculates running average of Tips
      calcAvg: function() {
        this.averageTip = Math.round(this.tipTotal / this.mealCount * 100) / 100;
      }
    };

    // Error messages to display
    vm.errorMessages = {
      required: "Please enter data for all fields",
      min: "rate has to be a positive number"
    };

    // Resets input. Excludes tax/tip rates as these are likely to remain unchanged
    vm.reset = function() {
      vm.currentMeal.mealPrice = '';
    };

    // If any input has 'required' error, return true
    vm.requireCheck = function(userInput) {
      if (userInput.mealPrice.$error.required || userInput.taxRate.$error.required || userInput.tipRate.$error.required) {
        return true;
      } else {
        return false;
      };
    };

    vm.submit = function(userInput) {

      // Error Handling
      if (userInput.$invalid) {
        vm.required = vm.requireCheck(userInput);
        // Use vm.check to trigger error to display
        vm.check = true;
        return;
      };

      // Run currentMeal methods
      vm.currentMeal.calcSubtotal();
      vm.currentMeal.calcTip();
      vm.currentMeal.calcTotal();

      // Update myEarnings object
      vm.myEarnings.mealCount++;
      vm.myEarnings.tipTotal += vm.currentMeal.tip;
      vm.myEarnings.calcAvg();

      // Reset Form
      vm.reset();

      // Ensure no errors display after valid submission
      vm.check = false;
      vm.required = false;

    };

    // Resets session
    vm.totalReset = function() {
      vm.myEarnings.averageTip = 0;
      vm.myEarnings.mealCount = 0;
      vm.myEarnings.tipTotal = 0;

      vm.currentMeal.mealPrice = '';
      vm.currentMeal.subtotal = 0;
      vm.currentMeal.tax = 0;
      vm.currentMeal.tip = 0;
      vm.currentMeal.total = 0;
    };


  })
