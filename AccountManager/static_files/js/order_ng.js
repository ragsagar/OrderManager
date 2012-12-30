angular.module('order_ng', ['backend']).
    config(function($routeProvider) {
        $routeProvider.
            when('', {controller:ListCtrl, templateUrl: '/static/templates/list.html'}).
            //when('/delete/:orderid', {controller:DeleteCtrl}).
            otherwise({redirectTo: ''});
    });


function ListCtrl($scope, Order) {
    $scope.orders = Order.query();
    $scope.add = function() {
        //Order.save($scope.order);
        //$scope.orders.push($scope.order)
        console.log($scope.order.id)
        newitem = angular.copy($scope.order)
        Order.save(newitem);
        //$scope.orders.push({name: $scope.order.name, amount: $scope.order.amount});
        $scope.orders.push(newitem);
        $scope.order.name = '';
        $scope.order.amount = '';
    }
    $scope.destroy = function(index) {
        //console.log(index);
        item = $scope.orders[index];
        console.log(item);
        //$http.delete(item.self).then(function (){
            //$scope.orders.splice(index, 1); });
        //item.destroy();
        Order.remove({id: item.id});
        $scope.orders.splice(index, 1);
        //console.log($scope.orders);
    }
    $scope.editName = function(order) {
        $scope.oldname = order.edit;
        order.edit = true;
    }

    $scope.doneEditing = function(order) {
        console.log('done editing')
        if (order.name == null) {
            order.name = $scope.oldname;
            $scope.oldname = '';
            return
        }
        order.edit = false;
        if(order.name != $scope.oldname) {
            order.update();
        }
    }
    
}

//function CreateCtrl($scope, $location, Order) {
    //$scope.add = function() {
    //Order.save($scope.order, function(order) {
        //$location.path('/');
    //});
    //}
//}

//function DeleteCtrl($scope, $location, $routerParams, Order) {
    //Order.get({id: $routerParams.orderid}, function(order) {
        //order.destroy(function() {
            //$location.path('/');
        //});
    //});
//}

