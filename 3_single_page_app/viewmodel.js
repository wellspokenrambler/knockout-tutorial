function EmailViewModel() {
    // data
    let self = this;
    //page state
    self.isLoading = ko.observable(true);
    self.notFound = ko.observable(false);
    // mail data
    self.folders = ko.observableArray(["Inbox", "Sent", "Archive", "Spam"]);
    self.chosenFolderID = ko.observable("Inbox");
    self.chosenFolderData = ko.observable();
    self.chosenMailData = ko.observable();

    // mail behavior
    self.goToFolder = function(folder) {
        if (!folder) folder = "Inbox";
        location.hash = folder;
        $.get('https://learn.knockoutjs.com/mail',{folder: folder}, self.chosenFolderData);
        self.chosenFolderID(folder);
        self.chosenMailData(null);
    };

    self.goToMail = function(mail) {
        if(!location.hash.includes('/')) location.hash = mail.folder;
        $.get('https://learn.knockoutjs.com/mail',{mailId: mail.id}, self.chosenMailData);
        self.chosenFolderID(mail.folder.split('/')[0]);
        self.chosenFolderData(null);
    };

    //SPA router
    self.routeTo = function(hash) {
        self.isLoading(true);
        self.notFound(false);
        const view = hash.replace('#','');
        if (self.folders().includes(view)) {
            self.goToFolder(view);
        } else if (view.includes('/')) {
            const mailId = view.split('/')[1];
            self.goToMail({id: mailId, folder: view});
        } else {
            self.chosenFolderData(null);
            self.chosenMailData(null);
            self.notFound(true);
        }
        self.isLoading(false);
    };

    //listen to hash changes
    window.addEventListener('hashchange', () => {
        //only route if not already loading a route
        if(!self.isLoading()) self.routeTo(window.location.hash);
    });

    //initial routing
    window.location.hash ? self.routeTo(window.location.hash) : self.routeTo("#Inbox");
}

ko.applyBindings(new EmailViewModel());