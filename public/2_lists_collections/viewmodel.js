function SeatReservation(name, initialMeal) {
    let self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function() {
        let price = self.meal().price;
        return price ? "$" + price.toFixed(2) : "None";
    });
}

function ReservationsViewModel() {
    let self = this;

    // non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (caviar)", price: 290.0 }
    ];

    // Editable data
    self.seatReservations = ko.observableArray([
        new SeatReservation("Bert", self.availableMeals[1]),
        new SeatReservation("Ernie", self.availableMeals[2])
    ]);

    // operations
    self.addSeatReservation = function() {
        self.seatReservations.push(new SeatReservation("", self.availableMeals[0]));
    }

    self.removeSeatReservation = function(seatReservation) {
        self.seatReservations.remove(seatReservation);
    }

    //computed total cost
    self.totalCost = ko.computed(function() {
        let total = 0;
        for (let i = 0; i < self.seatReservations().length; i++) {
            total += self.seatReservations()[i].meal().price;
        }
        return "$" + total.toFixed(2);
    });
}

ko.applyBindings(new ReservationsViewModel());