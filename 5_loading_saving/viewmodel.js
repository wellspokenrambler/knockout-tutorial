function Task(data) {
    this.title = ko.observable(data.title);
    this.isDone = ko.observable(data.isDone);
}

function TaskListViewModel() {
    var self = this;
    self.tasks = ko.observableArray([]);
    self.newTaskText = ko.observable("");
    self.incompleteTasks = ko.computed(function() {
        return ko.utils.arrayFilter(self.tasks(), function(task) {
            return !task.isDone() && !task._destroy;
        });
    });
    
    self.addTask = function() {
        self.tasks.push(new Task({ title: self.newTaskText(), isDone: false }));
        self.newTaskText("");
    };

    self.removeTask = function(task) {
        self.tasks.destroy(task);
    };

    self.save = function() {
        $.ajax("https://learn.knockoutjs.com/tasks", {
            type: "POST",
            data: ko.toJSON({tasks: self.tasks}),
            contentType: "application/json",
            success: function(result) {
                alert(result);
            }
        });
    };

    //load tasks from server
    $.getJSON("https://learn.knockoutjs.com/tasks", function(data) {
        let mappedTasks = $.map(data, function(item) {
            return new Task(item);
        });
        self.tasks(mappedTasks);
    });
}

ko.applyBindings(new TaskListViewModel());