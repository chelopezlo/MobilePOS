//widgets.db.js
(function() {
  var widgetsDb,
      dbLoaded;

  window.widgetDbService = {};

  document.addEventListener('deviceready', function initWidgetsDb);

  function initWidgetsDb() {
    window.sqlitePlugin //cordova sqlite plugin
      .openDatabase({
        name: 'widgets.db' //db file name
      }, function success(db) {
        window.WidgetsDb = db; //If debug build, handy to have accessible to window
        widgetsDb = db;  //private reference available only within this closure
        seedDb();  //function that seeds initial data if needed
      }, function error(e) {
        //uh oh - something odd happened...
      });
  }
})();