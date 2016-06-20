angular.module('waiterCalc', [])
    .controller('MainCtrl', function(){
        var vm = this;

        vm.currentMeal = {
            mealPrice: '',
            taxRate: 15,
            tipRate: 10,
            tax: 0,
            subtotal: 0,
            tip: 0,
            total: 0,
            calcSubtotal: function(){
                this.tax = Math.round(this.mealPrice * this.taxRate)/100;
                this.subtotal = parseFloat(this.mealPrice) + this.tax;
            },
            calcTip: function(){
                this.tip = Math.round(this.subtotal * this.tipRate)/100;
            },
            calcTotal: function(){
                this.total = this.subtotal + this.tip;
            }
        };

        vm.myEarnings = {
            tipTotal: 0,
            mealCount: 0,
            averageTip: 0,
            calcAvg: function(){
                this.averageTip = Math.round(this.tipTotal / this.mealCount * 100)/100;
            }
        };


        vm.reset = function(){
            vm.currentMeal.mealPrice = '';
        }

        vm.submit = function(){
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
        }

        vm.totalReset = function(){
            vm.myEarnings.averageTip = 0;
            vm.myEarnings.mealCount = 0;
            vm.myEarnings.tipTotal= 0;

            vm.currentMeal.mealPrice = '';
            vm.currentMeal.subtotal = 0;
            vm.currentMeal.tax  = 0;
            vm.currentMeal.tip = 0;
            vm.currentMeal.total = 0;
        }

    })
