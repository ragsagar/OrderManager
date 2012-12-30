angular.module('backend', ['ngResource']).
    factory('Order', function($resource) {
        var Order = $resource('/food/order/:id', {id: '@id'}, {update: { method: 'PUT'}});
        
        Order.prototype.update = function(cb) {
            return Order.update({id: this.id},
                angular.extend({}, this, {id:undefined}), cb);
        };

        Order.prototype.destroy = function(cb) {
            return Order.remove({id: this.id}, cb);
        };

        return Order
        });

