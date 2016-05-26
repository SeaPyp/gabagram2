(function() {
  'use strict';


angular.module('gabagramApp')
  .factory('GabsFactory', GabsFactory);

GabsFactory.$inject = ['$http'];

function GabsFactory($http){
  var gabsUrl = '/api/gabs';
  var gabsFactory = {};

  gabsFactory.getAllGabs = function(){
    return $http.get(gabsUrl);
  };

  gabsFactory.updateOne = function(id, data){
    return $http.patch(gabsUrl + id, data);
  };

  gabsFactory.new = function(data){
    return $http.post(gabsUrl, data);
  };

  gabsFactory.destroy = function(id){
    return $http.delete(gabsUrl + id);
  };

  return gabsFactory;
}

})();
