var xmlhttp = new XMLHttpRequest();
var url = "https://thingspeak.com/channels/120152/field/1.json";
 
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = JSON.parse(xmlhttp.responseText);
       
        var html = "<h1>Data pro channel " + response.channel.name + "</h1>";
     
        for (var i = 0; i < response.feeds.length; i++) {
            if(response.feeds[i].field1 != null) {
                html += "<p>" + response.feeds[i].field1 + "</p>";
                // poznat cas pro polozku
                // priradit predmet
                // secist vsechny hodnoty pro dany predmet a zprumerovat je
            }
        }
           
        document.getElementById("wrapper").innerHTML = html;
        debugger;
        console.log(response);
    }
};
 
xmlhttp.open("GET", url, true);
xmlhttp.send();



var chart = c3.generate({
    bindto: '#chart',
    data: {
        columns: [
            ['ZSNM', 3],
            ['Kultura', 1],
            ['PIT', 2.3],
            ['SEV', 1.8]
        ],
        type: 'bar'
    }
});

