//widgetsDb.js

//initial stuff here

//service definition here
window.widgetDbService.getWidgets = function getAllWidgets() {
  var defer = window.Q.defer();

  dbLoaded.then(function() {
    widgetsDb.executeSql('SELECT * FROM Producto', [], function success(res) {
      //res is an object, but it's not all our serialized widgets - we'll have to pull them out 1x1
      var allWidgets = [];
      for (var i = 0, len = res.rows.length; i < len; i++) {
        allWidgets.push(res.rows.item(i);
      }

      defer.resolve(allWidgets); //resovle promise

    }, defer.reject);
  });

  return defer.promise;
};

window.widgetDbService.deleteWidget = function deleteWidget(widgetId) {
  var defer = window.Q.defer();

  dbLoaded.then(function() {
    widgetsDb.executeSql('DELETE FROM Producto WHERE id = ?', [widgetId],
      defer.resolve, defer.reject);
  });

  return defer.promise;
};

//seed db stuff here