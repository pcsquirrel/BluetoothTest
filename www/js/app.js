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
    $scope.status = "Init";
    $scope.getDevices = function () {
        bluetoothSerial.list(ondevicelist, generateFailureFunction);
        bluetoothSerial.subscribe("\n", onmessage, generateFailureFunction("Subscribe Failed"));

    }

    $scope.selectDevice = function (id) {
        $scope.status = "Open " + id.id;
        bluetoothSerial.connect(id.id, onconnect, ondisconnect);
    }

    $scope.sendData = function () {
        $scope.status = "send ";
        var success = function () {
            $scope.$apply(function () {
                $scope.status = "send done: ";
            });
        };

        bluetoothSerial.write("Hello", success);
    }

    onmessage = function (message) {
        console.log("Got: " + message)
        $scope.$apply(function () {
            $scope.status = "Got: " + message;
        });
    }
    onconnect = function () {
        console.log("Connected")
        $scope.$apply(function () {
            $scope.status = "Connected ";
        });
    }
    ondisconnect = function (reason) {
        $scope.$apply(function () {
            var details = "";
            if (reason) {
                details += ": " + JSON.stringify(reason);
            }
            $scope.status = "Disconnected " + reason;
        });
        console.log("Disconnected " + reason);
    }

    ondevicelist = function (devices) {
        $scope.$apply(function () {
            $scope.devices_ = [];
            // console.log(JSON.stringify(devices));
            if (devices.length === 0) {
                $scope.status = "No Bluetooth Devices";
            } else {
                devices.forEach(function (device) {

                    $scope.devices_.push(device);
                    console.log(device.address);
                });
                $scope.status = "List";

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