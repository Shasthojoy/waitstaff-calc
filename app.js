angular.module('waiterCalc', [])
    .controller('MainCtrl', function(){
        var vm = this;

        vm.currentMeal = {
            mealPrice: 0,
            taxRate: 0,
            tipRate: 0,
            tax: 0,
            subtotal: 0,
            tip: 0,
            total: 0,
            calcSubtotal: function(){
                this.tax = Math.round(this.mealPrice * this.taxRate * 100)/100;
                this.subtotal = parseFloat(this.mealPrice) + this.tax;
            },
            calcTip: function(){
                this.tip = Math.round(this.subtotal * this.tipRate * 100)/100;
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

        vm.submit = function(userInput){
            vm.currentMeal.mealPrice = parseFloat(userInput.mealPrice.$modelValue);
            vm.currentMeal.taxRate = parseFloat(userInput.taxRate.$modelValue)/100;
            vm.currentMeal.tipRate = parseFloat(userInput.tipRate.$modelValue)/100;
            vm.currentMeal.calcSubtotal();
            vm.currentMeal.calcTip();
            vm.currentMeal.calcTotal();

            vm.myEarnings.mealCount++;
            vm.myEarnings.tipTotal += vm.currentMeal.tip;
            vm.myEarnings.calcAvg();

            console.log(vm.currentMeal);
            console.log(vm.myEarnings);
        }
    })
