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

// Business Logic for Contacts ---------
function Address(street, city, zip, type){
  this.street = street;
  this.city = city;
  this.zip = zip;
  this.type = type
}

function Contact(firstName, lastName, phoneNumber, emailAddress, newAddress){
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress,
  this.newAddress = newAddress
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

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".physical-address").html(contact.newAddress.city + " " + contact.newAddress.zip + "!");
 
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
    var inputtedType = $("input#new-zip").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-street").val("");
    $("input#new-city").val("");
    $("input#new-zip").val("");
    $("input#new-type").val("");
    var newAddress = new Address(inputtedStreet, inputtedCity, inputtedZip, inputtedType)
    // var newAddress2 = new Address(inputtedStreet2, inputtedCity2, inputtedZip2, inputtedType2)
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, newAddress);
    addressBook.addContact(newContact);
    console.log("Contact: ", newContact);
    console.log("Address book: ", addressBook);
    displayContactDetails(addressBook)
    console.log(newAddress)
  })
})







// var addressBook = new AddressBook();
// var contact = new Contact("Ada", "Lovelace", "503-555-0100");
// var contact2 = new Contact("Grace", "Hopper", "503-555-0199");
// addressBook.addContact(contact);
// addressBook.addContact(contact2);