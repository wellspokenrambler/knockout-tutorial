function Answer(text) {
    this.answerText = text; 
    this.points = ko.observable(1);
}

function SurveyViewModel(question, pointsBudget, answers) {
    this.question = question;
    this.pointsBudget = pointsBudget;
    this.pointsPerAnswer = 10;
    this.answers = $.map(answers, function(text) { 
        return new Answer(text)
    });
    this.save = function() { alert('Survey saved! (just kidding, I\'m pure front-end.)'); };
                       
    this.pointsUsed = ko.computed(function() {
        var total = 0;
        for (var i = 0; i < this.answers.length; i++)
            total += this.answers[i].points();
        return total;        
    }, this);
}

ko.applyBindings(new SurveyViewModel("What is your favorite JS library?", 20, [
    "Knockout",
    "Vue",
    "Svelte",
    "React",
    "Angular"
]));