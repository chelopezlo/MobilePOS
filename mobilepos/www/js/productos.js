//widgets.js seedDB function
function seedDb() {
  var defer = window.Q.deferred();

  //dbLoaded variable will be the promise - that way we can always safely query the db
  dbLoaded = defer.promise;

  var createSql = [
    'CREATE TABLE IF NOT EXISTS Producto (',
    'id INTEGER',
    ',nombre TEXT NOT NULL',
    ',codigo TEXT NOT NULL',
    ',descripcion TEXT NOT NULL',
    ',PRIMARY KEY(id)',
    ',UNIQUE(nombre, codigo)',
    ');'
  ].join(''),

/*    widgets = [
      {name: 'Widget1', color: 'red', sku: 'WDG1', qty: 150},
      {name: 'Widget2', color: 'black', sku: 'WDG2', qty: 137},
      {name: 'Widget3', color: 'yellow', sku: 'WDG3', qty: 23},
      {name: 'Widget4', color: 'green', sku: 'WDG4', qty: 94},
      {name: 'Widget5', color: 'brown', sku: 'WDG5'},
    ];*/

  widgetsDb.transaction(function(t) {
    t.executeSql(createSql, []);

    initialWidgets.forEach(function insertOrIgnore(w) {
      t.executeSql(
        'INSERT OR IGNORE INTO Producto (nombre, codigo, descripcion) VALUES (?,?,?),
        //params array is used to populate param placeholders (?) - and in the order in which they appear
        [w.nombre, w.codigo, w.descripcion]
      );
    });
  }, function error(e) {
    //typically only hit this if there are issues with your SQL statements
  }, function success() {
    defer.resolve(); //now it is ready to be queried against
  });
}