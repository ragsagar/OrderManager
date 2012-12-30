window.Order = Backbone.Model.extend({
    urlRoot: "/food/order",
    defaults: {
        "id": null,
        "name": "",
        "amount": ""
        }
})

window.Orders = Backbone.Collection.extend({
    model: Order,
    url: "/food/order"
})

window.TableView = Backbone.View.extend({
    tagName: 'table',
    
    initialize: function(){
        this.model.bind("reset", this.render, this);
        //this.model.bind("destroy", this.render, this);
        var self = this;
        this.model.bind("add", function(order) {
            $(self.el).append(new TableRowView({model: order}).render().el);
        });
    },

    render: function(eventName){
        _.each(this.model.models, function(order){
            $(this.el).append(new TableRowView({model: order}).render().el);
        }, this);
        return this;
    },
    
    reset: function(eventName){
        $(this.el).html('');
        this.render();
        return this;
    }
}
);

window.TableRowView = Backbone.View.extend({
    tagName: "tr",

    template: _.template($('#row-content').html()),
    
    intialize: function() {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    events: {
        //"click .save": "saveOrder",
        "click .delete": "deleteOrder"
    },

    render: function(eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    close: function() {
        $(this.el).unbind();
        $(this.el).empty();
    },

    //saveOrder: function(){
        //this.model.set({
            //name: $('#name').val(),
            //price: $('#amount').val()
        //});
        //if (this.model.isNew()){
            //app.Order.create(this.model);
        //} else {
            //this.model.save();
        //}
        //return false;
    //},

    deleteOrder: function(){
        //console.log("Delete signal");
        //console.log(this.model);
        app.orders.remove(this.model);
        this.model.destroy();
        //app.show();
        //app.orders.trigger('reset');
        //console.log(this.model);
        this.close();
        return false;
    }
});


window.HeaderView = Backbone.View.extend({
    
    template: _.template($('#order-header').html()),

    initialize: function() {
        this.render();
    },

    render: function(eventName) {
        $(this.el).html(this.template());
        return this
    },
    
    events: {
        "click .add" : "addNewOrder"
    },

    addNewOrder: function(event) {
        if(!$('#name').val().trim() && !$('#amount').val().trim()) return;
        newrow = new TableRowView({model: new Order()});
        //newmodel = new Order()
        newrow.model.set({
            name: $('#name').val(),
            amount : $('#amount').val()
        })
        //newrow.model.save();
        app.orders.create(newrow.model);
        $('#name').val('');
        $('#amount').val('');
        }})

var AppRouter = Backbone.Router.extend({
    routes:{
        "": "show",
    },

    initialize: function(){
        $('#header').html(new HeaderView().render().el)
    },

    show: function(){
        this.orders = new Orders();
        this.tableView = new TableView({model: this.orders});
        this.orders.fetch();
        $('#content').html(this.tableView.render().el);
    }
})

var app = new AppRouter();
Backbone.history.start();
