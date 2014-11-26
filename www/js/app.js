// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var example = angular.module('starter', ['ionic', 'ngCordova'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})


example.controller("ExampleController", function ($scope, $cordovaBluetoothSerial) {
    $scope.devices_ = [];
    $scope.getDevices = function () {
        bluetoothSerial.list(ondevicelist, generateFailureFunction);
    }
    
    $scope.selectDevice = function (id) {
        console.log("dev: 2"+JSON.stringify(id));
    }

    ondevicelist = function (devices) {
        $scope.$apply(function () {
            $scope.devices_ = [];
           // console.log(JSON.stringify(devices));
            if (devices.length === 0) {
                $scope.devices_.push("No Bluetooth Devices");
            } else {
                devices.forEach(function (device) {

                    $scope.devices_.push(device);
                    console.log(device.address);
                });
                

                //$scope.devices_ = devices;
            }


        });
    };


    generateFailureFunction = function (message) {
        //   $scope.devices_.push ("asdff");
        //  alert("fehler");
        var func = function (reason) { // some failure callbacks pass a reason
            var details = "";
            if (reason) {
                details += ": " + JSON.stringify(reason);
            }
            app.setStatus(message + details);
        };
        return func;
    }

});