angular.module('order_ng', ['backend']).
    config(function($routeProvider) {
        $routeProvider.
            when('', {controller:ListCtrl, templateUrl: '/static/templates/list.html'}).
            //when('/delete/:orderid', {controller:DeleteCtrl}).
            otherwise({redirectTo: ''});
    });


function ListCtrl($scope, Order) {
    // Fetch the list of items from backend
    $scope.orders = Order.query();

    $scope.add = function() {
        // $scope.order will be having the value in input field. it has two way
        // binding. So directly clearing value in $scope.order will clear the
        // value in input field.
        newitem = angular.copy($scope.order)
        // Following will give a push request.
        Order.save(newitem);
        // Adding the new element to `orders` array so it will be displayed to
        // the user in realtime
        $scope.orders.push(newitem);
        // Clear input field
        $scope.order.name = '';
        $scope.order.amount = '';
    }

    $scope.destroy = function(index) {
        item = $scope.orders[index];
        // Give delete request to backend
        Order.remove({id: item.id});
        // Remove the item from array so that user can see the change.
        $scope.orders.splice(index, 1);
    }

    $scope.editName = function(order) {
        order.oldname = order.name; // Backingup the existing data
        order.edit = true; // Display input field
    }

    $scope.doneEditing = function(order) {
        // setting order.edit to false will hide the input field
        order.edit = false;
        if (order.name == '') {
            // if no data is entered then reset back to old data
            order.name = order.oldname;
        }
        else if(order.name != order.oldname) {
            order.update();
        }
        order.oldname = ''
    }
    
}

