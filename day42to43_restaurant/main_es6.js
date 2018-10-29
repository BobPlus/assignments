window.addEventListener("load",init,false);
function init() {
    //餐厅类
    class Restaurant {
        constructor(rest) {
            this.cash = rest.cash;
            this.seats = rest.seats;
            this.staff = rest.staff;
        }
        hire(clerk) {
            //招聘方法
            this.staff.push(clerk);
            clerk.ID = this.staff.indexOf(clerk);
        }
        fire(clerk) {
            //解雇方法
            this.staff.splice(this.staff.indexOf(clerk), 1);
            clerk.ID = undefined;
        }
    }
    //职员类
    class Staff{
        constructor(name, salary) {
            this.ID = undefined;
            this.name = name;
            this.salary = salary;
        }
        job(){
            //完成一次工作,服务员和厨师各不相同
            console.log(this);
        }
    }
    //服务员类，继承自职员
    class Server extends Staff{
        constructor(name, salary) {
            super(name, salary);
        }
    }
    //厨师类,继承自职员
    class Cook extends Staff {
        constructor(name, salary) {
            super(name, salary);
        }
    }
    //顾客类
    class Customer {
        constructor() {
            //无属性
        }
        takeOrders() {
            //点菜
        }
        haveMeals() {
            //用餐
        }
    }
    //菜品类
    class Dishes {
        constructor(name, cost, price) {
            this.name = name;
            this.cost = cost;
            this.price = price;
        }
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