//adds a fadeIn/fadeOut effect to the visible binding
ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        $(element).toggle(!!value); // Use "!!" to convert to boolean
    },
    update: function(element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        if (value) {
            $(element).fadeIn();
        } else {
            $(element).fadeOut();
        }   
    }
}

//creates a star rating control bound to a numeric observable
ko.bindingHandlers.starRating = {
    init: function(element, valueAccessor) {
        let starRating = $("<div>").addClass("star-rating").attr("tabindex", "0").appendTo(element);
        const starIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
        `;
        for (let i = 0; i < 5; ++i) {
            $("<span>").addClass("star").html(starIcon).appendTo(starRating);
        }
        starRating.on("keydown", function(event) {
            if (event.key == "ArrowLeft" || event.key == "ArrowDown") {
                event.preventDefault();
                var observable = valueAccessor();
                var currentRating = ko.unwrap(observable);
                if (currentRating > 1) {
                    observable(currentRating - 1);
                }
                else if (currentRating == 1) {
                    observable(5);
                }
            }
            else if (event.key == "ArrowRight" || event.key == "ArrowUp") {
                event.preventDefault();
                var observable = valueAccessor();
                var currentRating = ko.unwrap(observable);  
                if (currentRating < 5) {
                    observable(currentRating + 1);
                }
                else {
                    observable(1);
                }
            }
        });
    },
    update: function(element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        $("span", element).each(function(index) {
            $(this).toggleClass("chosen", index < value).click(function() {
                var observable = valueAccessor();  // Get the observable
                observable(index+1);               // Write the new rating to it
            }).hover(
                function() { $(this).prevAll().add(this).addClass("hover") },
                function() { $(this).prevAll().add(this).removeClass("hover")});
        });
    },
};