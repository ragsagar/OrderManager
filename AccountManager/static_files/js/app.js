window.Food = Backbone.Model.extend();

window.FoodCollection = Backbone.Collection.extend({
        model: Food,
        url: "/food/test_api/"
});

window.FoodListView = Backbone.View.extend({
        tagName: 'ul',
        
        initialize: function() {
            this.model.bind("reset", this.render, this);
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
    
    render: function(evenName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
    });

window.FoodView = Backbone.View.extend({
    template: _.template($('#food-item-detail').html()),
    render: function(eventName){
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
})

var AppRouter = Backbone.Router.extend({
    routes:{
        "": "list",
        "food/:id": "foodDetails"
    },

    list:function(){
        this.foodList = new FoodCollection();
        this.foodListView = new FoodListView({model: this.foodList});
        this.foodList.fetch();
        $('#sidebar').html(this.foodListView.render().el);
    },

    foodDetails: function(id) {
        this.food = this.foodList.get(id);
        this.foodView = new FoodView({model: this.food});
        $('#content').html(this.foodView.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();
