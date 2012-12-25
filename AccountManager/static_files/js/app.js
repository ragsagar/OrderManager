window.Food = Backbone.Model.extend({
        urlRoot: "/food/api",
        defaults: {
            "id": null,
            "name": "",
            "price": ""
        }
});

window.FoodCollection = Backbone.Collection.extend({
        model: Food,
        url: "/food/api"
});

window.FoodListView = Backbone.View.extend({
        tagName: 'ul',
        
        initialize: function() {
            this.model.bind("reset", this.render, this);
            var self = this;
            this.model.bind("add", function(food) {
                $(self.el).append(new FoodListItemView({model: food}).render().el);
            });
        },
        
        render: function(eventName){
            _.each(this.model.models, function(food){
                $(this.el).append(new FoodListItemView({model: food}).render().el);
            }, this);
            return this;
        }
}
);

window.FoodListItemView = Backbone.View.extend({
    tagName: "li",
    
    template: _.template($('#food-item').html()),

    initialize: function() {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },
    
    render: function(evenName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    
    close: function() {
        $(this.el).unbind();
        $(this.el).empty();
    }
    });

window.FoodView = Backbone.View.extend({
    template: _.template($('#food-item-detail').html()),

    initialize: function() {
        this.model.bind("change", this.render, this);
    },

    render: function(eventName){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change input": "change",
        "click .save": "saveFood",
        "click .delete": "deleteFood"
    },

    change: function(event) {
        var target = event.target;
        //console.log("Changing " + target.id + " from " + target.defaultValue + ' to ' + target.value);
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
        //this.model.save();
    },

    saveFood: function(){
        this.model.set({
            name: $('#name').val(),
            price: $('#price').val()
        });
        if (this.model.isNew()){
            app.foodList.create(this.model);
        } else {
            this.model.save();
        }
        return false;
    },

    deleteFood: function(){
        this.model.destroy({
            success: function(){
                alert('Food item deleted');
                window.history.back();
            }
        });
        return false;
    },

    close: function() {
        $(this.el).unbind();
        $(this.el).empty();
    }
});

window.HeaderView = Backbone.View.extend({

    template: _.template($('#food-header').html()),

    initialize: function() {
        this.render();
    },

    render: function(eventName) {
        $(this.el).html(this.template());
        return this
    },
    
    events: {
        "click .new": "newFood"
    },

    newFood: function(event) {
        if (app.foodView) app.foodView.close();
        app.foodView = new FoodView({model: new Food()});
        $('#content').html(app.foodView.render().el);
        return false;
    }
});

var AppRouter = Backbone.Router.extend({
    routes:{
        "": "list",
        ":id": "foodDetails"
    },

    initialize: function(){
        $('#header').html(new HeaderView().render().el)
    },

    list:function(){
        this.foodList = new FoodCollection();
        this.foodListView = new FoodListView({model: this.foodList});
        this.foodList.fetch();
        $('#sidebar').html(this.foodListView.render().el);
    },

    foodDetails: function(id) {
        if(!this.foodList) this.list()
        this.food = this.foodList.get(id);
        this.foodView = new FoodView({model: this.food});
        $('#content').html(this.foodView.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();
