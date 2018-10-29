window.addEventListener("load",init,false);
function init() {
    //餐厅类
    function Restaurant(rest) {
        this.cash = rest.cash;
        this.seats = rest.seats;
        this.staff = rest.staff;
    }
    Restaurant.prototype.hire = function (clerk) {
        //招聘方法
        this.staff.push(clerk);
        clerk.ID = this.staff.indexOf(clerk);
    };
    Restaurant.prototype.fire = function (clerk) {
        //解雇方法
        this.staff.splice(this.staff.indexOf(clerk), 1);
        clerk.ID = undefined;
    };
    //职员类
    function Staff(name,salary) {
        this.ID = undefined;
        this.name = name;
        this.salary = salary;
    }
    Staff.prototype.job = function () {
        //完成一次工作,服务员和厨师各不相同
        console.log(this);
    };
    //服务员类，继承自职员
    function Server(name, salary) {
        Staff.call(this,name, salary);
    }
    Server.prototype = Object.create(Staff.prototype);
    Server.prototype.constructor = Server;
    //厨师类,继承自职员
    function Cook(name, salary) {
        Staff.call(this,name, salary);
    }
    Cook.prototype = Object.create(Staff.prototype);
    Cook.prototype.constructor = Cook;
    //顾客类
    function Customer() {
        //无属性
    }
    Customer.prototype.takeOrders = function () {
        //点菜
    };
    Customer.prototype.haveMeals = function () {
        //用餐
    };
    //菜品类
    function Dishes(name,cost,price) {
        this.name = name;
        this.cost = cost;
        this.price = price;
    }
    var ifeRestaurant = new Restaurant({
        cash: 1000000,
        seats: 20,
        staff: []
    });

    var newCook = new Cook("Tony", 10000);
    ifeRestaurant.hire(newCook);

    console.log(ifeRestaurant.staff);
    console.log(newCook);
    console.log(newCook instanceof Staff);

    ifeRestaurant.fire(newCook);
    console.log(ifeRestaurant.staff);
    console.log(newCook);
}