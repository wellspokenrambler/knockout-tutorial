function AppViewModel() {
    //observables
    this.firstName = ko.observable("Isabelle");
    this.lastName = ko.observable("May");

    //computed observable
    this.fullName = ko.computed(() => this.firstName() + " " + this.lastName());
    
    //function to capitalise last name
    this.capitaliseLastName = () => {
        const currentLastName = this.lastName();
        this.lastName(currentLastName.toUpperCase());
    };
}

ko.applyBindings(new AppViewModel());