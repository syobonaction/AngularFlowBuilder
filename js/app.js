myApp = angular.module('myApp', ['angular-bind-html-compile']);

myApp.service('data',function($sce){
  var blockFooter = '<div ng-show="editing"><button class="btn remove" ng-click="removeBlock($index)">Remove Block</button><button class="btn">Up</button></div>';
  var blocks = [
    {
      "name":"default",
      "contents":$sce.trustAsHtml('<button ng-show="editing" class="btn newblock" ng-click="newBlock($index)">+</button>')
    },
    {
      "name":"Information",
      "contents":$sce.trustAsHtml('<p ng-hide="editing" ng-model="currFlow.infoText">{{currFlow.infoText}}</p><p ng-show="editing"><textarea type="text" ng-model="currFlow.infoText"></textarea></p>' + blockFooter)
    },
    {
      "name":"Options",
      "contents":$sce.trustAsHtml('<div class="option" ng-repeat="option in currFlow.options"><input type="radio" id="{{option.id}}" name="{{option.name}}" value="{{option.value}}" ng-click="validate(option)"></input><label for="{{option.id}}" class="optLabel" ng-model="option.title">{{option.title}}<button ng-click="radioOptions(option)"><img ng-show="editing" src="img/gear.png" alt="settings"/></button></label></div><button ng-show="editing" class="btn add" ng-click="addOption()">Add Option</button>' + blockFooter)
    },
    {
      "name":"Choice",
      "contents":$sce.trustAsHtml('' + blockFooter)
    }
  ];
  return {
    getBlocks: function(){
      return blocks;
    }
  }
});

myApp.animation('.optLabel', function(){

});

var module = angular.module('angular-bind-html-compile', []);

module.directive('bindHtmlCompile', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return scope.$eval(attrs.bindHtmlCompile);
            }, function (value) {
                // In case value is a TrustedValueHolderType, sometimes it
                // needs to be explicitly called into a string in order to
                // get the HTML string.
                element.html(value && value.toString());
                // If scope is provided use it, otherwise use parent scope
                var compileScope = scope;
                if (attrs.bindHtmlScope) {
                    compileScope = scope.$eval(attrs.bindHtmlScope);
                }
                $compile(element.contents())(compileScope);
            });
        }
    };
}]);


myApp.controller('ctrlMain', function($scope, $sce, data, $compile) {
  $scope.flows = JSON.parse(flowData);
  $scope.admin = false;
  $scope.overlayOn = false;
  $scope.editing = false;
  $scope.editingRadio = false;
  $scope.addingBlock = false;
  $scope.currRadio;
  $scope.currBlock;
  $scope.currFlow = $scope.flows.group.datacollect.nodes[0];
  $scope.valid=false;
  $scope.blocks = data.getBlocks();
  $scope.isReady = function(){
    return $scope.valid===true;
  }
  $scope.isEditing = function(){
    return $scope.editing===true;
  }
  $scope.editMode = function() {
    if($scope.editing) {
      $scope.editing = false;
    } else {
      $scope.editing = true;
    }
  }
  //Block Stuff
  $scope.newBlock = function(block) {
    if($scope.addingBlock==false) {
      $scope.overlayOn = true;
      $scope.addingBlock = true;
      $scope.currBlock = block;
    } else {
      $scope.overlayOn = false;
      $scope.addingBlock = false;
    }
  }

  $scope.addBlock = function(currBlock, newBlock) {
    $scope.currFlow.blocks[currBlock] = newBlock;
  }
  $scope.removeBlock = function(currBlock) {
    $scope.currFlow.blocks[currBlock] = 0;
  }

  // Radio Stuff
  $scope.radioOptions = function(radio) {
    if($scope.editingRadio==false) {
      $scope.overlayOn = true;
      $scope.editingRadio = true;
      $scope.currRadio = radio;
    } else {
      $scope.overlayOn = false;
      $scope.editingRadio = false;
    }
  }
  $scope.addOption = function() {
    $scope.currFlow.options.push({"title":"New",
    "id":"New","suboptions":[]});
  }
  $scope.addSuboption = function() {
    $scope.currFlow.options.suboptions.push({"title":"New",
    "id":"New"});
  }
  $scope.removeOption = function(option) {
    $scope.currFlow.options.splice($scope.currFlow.options.indexOf(option),1);
    $scope.radioOptions();
  }

  // Validation
  $scope.validate = function(option) {
    if(option.suboptions.length > 0) {
      $scope.valid=false;
    } else {
      $scope.valid=true;
    }
  }
});
