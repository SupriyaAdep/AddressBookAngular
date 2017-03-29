var app = angular.module("addressbookApp", ['ngRoute']);

/*Setting Up routing*/

app.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/",{
       	   templateUrl: "views/contactList.html",
       	   controller: "ContactsListCtrl"
        })
        .when("/addContact",{
       	   templateUrl : "views/addContact.html",
       	   controller: "ContactsListCtrl"
        })
        .when("/addContact/edit/:id",{
       	   templateUrl : "views/addContact.html",
       	   controller: "ContactsListCtrl"
        })
        .when("/viewContact/view/:id", {
           templateUrl : "views/viewContact.html",
           controller: "ContactsListCtrl"
        })
        .otherwise({
       	   redirectTo: "/"
        })

});

app.directive("saListItems", function(){
    return {
       retrict: "E",
       templateUrl: "views/licontacts.html"
    }
});

/*Setting Up services*/

app.service("ContactService", function(){
	var contactService = {};
	contactService.addressContacts = [
	   {id: 1, contactName: "JKL Ipsum" , contactNo: 111111111},
	   {id: 2, contactName: "DEF Ipsum" , contactNo: 2222222222},
	   {id: 3, contactName: "GHI Ipsum" , contactNo: 3333333333},
	   {id: 4, contactName: "ABC Ipsum" , contactNo: 444444444},
	];

    contactService.getNewId = function(){
        if(contactService.newId){
            contactService.newId++;
            return contactService.newId;
        }else{
        	var maxId = _.max(contactService.addressContacts, function(addressContacts){ return addressContacts.id; })
        	contactService.newId = maxId.id + 1;
        	return contactService.newId;
        }
    };

    /*To grab id by url*/
    contactService.findById = function(id){
       for (var contact in contactService.addressContacts){
       	    if (contactService.addressContacts[contact].id === id)
       	    {
       	    	return contactService.addressContacts[contact];
       	    }
       }
    };
	contactService.save = function(entry){
		var updated = contactService.findById(entry.id);
		if (updated) {
            _.extend(updated, entry);
		}
		else{
			entry.id = contactService.getNewId();
			contactService.addressContacts.push(entry);
	    }
	};
	/*To delete a contact*/
	contactService.removeItem = function(entry){
         var index = contactService.addressContacts.indexOf(entry);
         contactService.addressContacts.splice(index, 1);
	};

	return contactService;
});

app.controller("ContactsListCtrl", ['$scope', '$routeParams' ,  'ContactService', '$location' , function($scope, $routeParams, ContactService, $location){
	
	$scope.addressContacts = ContactService.addressContacts;

    if (!$routeParams.id){
        $scope.addressContact = {id : 0, contactName: "" , contactNo: ""};
    }else{
        $scope.addressContact= _.clone(ContactService.findById(parseInt($routeParams.id)));
    }
	$scope.save = function(){
         ContactService.save($scope.addressContact);
         $location.path("/");
	}
	$scope.removeItem = function(entry){
        ContactService.removeItem(entry);
	}
}])










