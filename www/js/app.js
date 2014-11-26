// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var example = angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


example.controller("ExampleController", function($scope, $cordovaBluetoothSerial) {
    $scope.devices_ = [];
 //$scope.devices_.push ("asd");
$scope.getContactList = function() {
//$scope.devices_.push ("asdd");
   // ondevicelist();
    
     bluetoothSerial.list(ondevicelist, generateFailureFunction);
    /*
     $cordovaBluetoothSerial.list().then(function(imageData) {
            alert(imageData);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });*/



} 
ondevicelist =function (devices) {
     $scope.$apply(function () {
                        $scope.devices_ = [];    
var option;
//     $scope.devices_.push ("asdff");

// remove existing devic
     console.log("sfd"+devices);
  //   alert("wer");
     if (devices.length === 0) {
console.log("No Bluetooth Devices");
     }else{
         devices.forEach(function(device) {

         $scope.devices_.push( device.address);
             console.log(device.address);
         });
     }
         

                        });      
     };
                   
                   
 generateFailureFunction= function(message) {
   //   $scope.devices_.push ("asdff");
   //  alert("fehler");
var func = function(reason) { // some failure callbacks pass a reason
var details = "";
if (reason) {
details += ": " + JSON.stringify(reason);
}
app.setStatus(message + details);
};
return func;
}


/*deviceList.innerHTML = "";
app.setStatus("");
devices.forEach(function(device) {
option = document.createElement('option');
if (device.hasOwnProperty("uuid")) {
option.value = device.uuid;
} else if (device.hasOwnProperty("address")) {
option.value = device.address;
} else {
option.value = "ERROR " + JSON.stringify(device);
}
option.innerHTML = device.name;
deviceList.appendChild(option);
});
if (devices.length === 0) {
option = document.createElement('option');
option.innerHTML = "No Bluetooth Devices";
deviceList.appendChild(option);
if (cordova.platformId === "ios") { // BLE
app.setStatus("No Bluetooth Peripherals Discovered.");
} else { // Android
app.setStatus("Please Pair a Bluetooth Device.");
}
app.disable(connectButton);
listButton.style.display = "";
} else {
app.enable(connectButton);
listButton.style.display = "none";
app.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
}*/
    $scope.createContact = function() {
    $cordovaContacts.save({"displayName": "Steve Jobs"}).then(function(result) {
        console.log(JSON.stringify(result));
    }, function(error) {
        console.log(error);
    });
}
 $scope.removeContact = function() {
    $cordovaContacts.remove({"displayName": "Steve Jobs"}).then(function(result) {
        console.log(JSON.stringify(result));
    }, function(error) {
        console.log(error);
    });
}
});
