// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for address ---------
function HomeAddress(street, city, zip){
  this.street = street;
  this.city = city;
  this.zip = zip;
}

function OfficeAddress(street2, city2, zip2){
  this.street2 = street2;
  this.city2 = city2;
  this.zip2 = zip2;
}
//business logic for contacts

function Contact(firstName, lastName, phoneNumber, emailAddress, newAddress, newAddress2){
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress,
  this.newAddress = newAddress,
  this.newAddress2 = newAddress2
  
  // this.physicalAddress = physicalAddress
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showAddress(address) {
  $("li#home").html("<li>Home</li><li>" + address.street + " " + address.city + " " + address.zip + "</li>");
}

function showAddress2(address2) {
  $("li#office").html("<li>Office</li><li>" + address2.street2 + " " + address2.city2 + " " + address2.zip2 + "</li>");
}

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  // $(".physical-address").html(contact.newAddress.city + " " + contact.newAddress.zip + "!");
  $(".physical-address").html("<ul><li id='home'>Home</li><li id='office'>Office</li></ul>");
    $("li#home").click(function(){
      showAddress(contact.newAddress)
    })
    $("li#office").click(function(){
      showAddress2(contact.newAddress2)
    })

  
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button");
}


function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    // var inputtedPhysicalAddress = $("input#new-physical-address").val();
    //use this V not this ^
     //collect street from input
     //collect city ''
    // '' zip ''
    // '' type '' 
    var inputtedStreet = $("input#new-street").val();
    var inputtedCity = $("input#new-city").val();
    var inputtedZip = $("input#new-zip").val();
    var inputtedStreet2 = $("input#new-street2").val();
    var inputtedCity2 = $("input#new-city2").val();
    var inputtedZip2 = $("input#new-zip2").val();
    
    

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-street").val("");
    $("input#new-city").val("");
    $("input#new-zip").val("");
    $("input#new-street2").val("");
    $("input#new-city2").val("");
    $("input#new-zip2").val("");
    var newAddress = new HomeAddress(inputtedStreet, inputtedCity, inputtedZip)
    var newAddress2 = new OfficeAddress(inputtedStreet2, inputtedCity2, inputtedZip2)
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, newAddress, newAddress2);
    addressBook.addContact(newContact);
    console.log("Contact: ", newContact);
    console.log("Address book: ", addressBook);
    displayContactDetails(addressBook)
    console.log(newAddress)
    console.log(newAddress2)
  })
})





// var addressBook = new AddressBook();
// var contact = new Contact("Ada", "Lovelace", "503-555-0100");
// var contact2 = new Contact("Grace", "Hopper", "503-555-0199");
// addressBook.addContact(contact);
// addressBook.addContact(contact2);