$(document).ready( function() {

    var $container = $("#handsontable"),
        handsontable = $container.data('handsontable'),
        data = [
            ["", "Maserati", "Mazda", "Mercedes", "Mini", "Mitsubishi"],
            ["2009", 0, 2941, 4303, 354, 5814],
            ["2010", 5, 2905, 2867, 412, 5284],
            ["2011", 4, 2517, 4822, 552, 6127],
            ["2012", 2, 2422, 5399, 776, 4151]
        ],
        config = {
            data: data,
            // minRows: 15,
            // minCols: 6,
            minSpareRows: 1,
            autoWrapRow: true,
            colHeaders: true,
            currentRowClassName: 'currentRow',
            currentColClassName: 'currentCol',
            contextMenu: {
                items: {
                    "row_above": {},
                        "row_below": {},
                        "hsep1": "---------",
                        "col_left": {},
                        "col_right": {},
                        "hsep2": "---------",
                        "remove_row": {},
                        "remove_col": {}
                }
            }
        };

        


    $("#divButtons").find(".btnSubmit").click(function () {
        console.log($container.data('handsontable').getData());
        var blob = new Blob([JSON.stringify(data)], {type: 'text/'+'json'}),
            csvURL =window.URL.createObjectURL(blob);

        tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'filename.json');
        tempLink.click();
    });

    $(".dropdown-menu li a").click(function () {
         console.log("Selected Option:"+$(this).text());
         console.log(JSON.stringify(data));

        $.ajax({
                cache: false,
               // used data from url
                url:"/downloads/filename.json",
                datatype: "json",
                data: JSON.stringify(data),
                type: "POST",
                success: function (res) {
                   console.log(res);
                },
                error: function () {
                    console.log("ERROR");
                }
            });
            return false;
    });
    $("#handsontable").handsontable(config);
});
