/*class Producto
{
    var id = null,
    var nombre = "",
    var codigo = "",
    var desc = "",

    function getProductos (transaction)
    {
        alert(transaction);
        var productos = [];
        transaction.executeSql('SELECT * FROM producto', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++){
                var prod = new producto{
                    id = results.rows.item(i).id,
                    nombre =  results.rows.item(i).nombre,
                    codigo = results.rows.item(i).codigo,
                    desc = results.rows.item(i).desc
                }
                productos.push(prod);
            }
        }, null);
        return productos;
    }





/*
}*/