var xmlhttp = new XMLHttpRequest();
var url = "https://thingspeak.com/channels/120152/field/1.json";
var Prvni = new Array();
var Druhy = new Array();
var Treti = new Array();

        var PrvniSum = 0; var DruhySum = 0; var TretiSum = 0;
        var PrvniPrumer = 0; var DruhyPrumer = 0; var TretiPrumer = 0;
//cas 2016-05-28T15:11:36+02:00
// prvnich 10 znaku je datum
// 20\d{2}(-|\/)((0[1-9])|(1[0-2]))(-|\/)((0[1-9])|([1-2][0-9])|(3[0-1]))(T|\s)(([0-1][0-9])|(2[0-3])):([0-5][0-9]):([0-5][0-9])
//function escapeRegExp(string){
//  return string.replace(20\d{2}(-|\/)((0[1-9])|(1[0-2]))(-|\/)((0[1-9])|([1-2][0-9])|(3[0-1]))(T|\s)(([0-1][0-9])|(2[0-3])):([0-5][0-9]):([0-5][0-9]), "\\$&"); // $& means the whole matched string
//}


xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = JSON.parse(xmlhttp.responseText);
       
        var html = "<h1>StuNoMe 2015/2016 letní semestr - " + response.channel.name + "</h1>";
     
        for (var i = 0; i < response.feeds.length; i++) {
            if(response.feeds[i].field1 != null) {
                //html += "<p>" + response.feeds[i].field1 + " ";
            }
            if(response.feeds[i].created_at != null) {
                var newDate = new Date((response.feeds[i].created_at || "").replace(/-/g,"/").replace(/[TZ]/g," "));
                var startOfFirstClass = new Date("2016-05-29T09:00:00+02:00");
                var endOfFirstClass = new Date("2016-05-29T10:00:00+02:00");
                var startOfSecondClass = new Date("2016-05-29T10:00:01+02:00");
                var endOfSecondClass = new Date("2016-05-29T11:00:00+02:00");
                var startOfThirdClass = new Date("2016-05-29T11:00:01+02:00");
                var endOfThirdClass = new Date("2016-05-29T12:00:00+02:00");

                if ((newDate < endOfFirstClass) && (newDate > startOfFirstClass)) {Prvni.push(parseInt(response.feeds[i].field1));} else
                if ((newDate < endOfSecondClass) && (newDate > startOfSecondClass)) {Druhy.push(parseInt(response.feeds[i].field1));} else 
                if ((newDate < endOfThirdClass) && (newDate > startOfThirdClass)) {Treti.push(parseInt(response.feeds[i].field1))}
            }
        }
        for( var i = 0; i < Prvni.length; i++ ){PrvniSum += parseInt( Prvni[i], 10 );}
             PrvniPrumer = PrvniSum/Prvni.length;
        for( var i = 0; i < Druhy.length; i++ ){DruhySum += parseInt( Druhy[i], 10 );}
             DruhyPrumer = DruhySum/Druhy.length;
        for( var i = 0; i < Treti.length; i++ ){TretiSum += parseInt( Treti[i], 10 );}
             TretiPrumer = TretiSum/Treti.length;
        html += "<p> Celkový počet hodnotících/průměrné hodnocení předmětu </p>"
        html += "<p> Předmět 1: " + Prvni.length + "/" + PrvniPrumer + " </p>";
        html += "<p> Předmět 2: " + Druhy.length + "/" + DruhyPrumer + " </p>";
        html += "<p> Předmět 3: " + Treti.length + "/" + TretiPrumer + " </p>";


        document.getElementById("wrapper").innerHTML = html;
       
        console.log(response);

var chart = c3.generate({
    bindto: '#chart',
    data: {
        columns: [
            ['Predmet 1', PrvniPrumer],
            ['Predmet 2', DruhyPrumer],
            ['Predmet 3', TretiPrumer]
        ],
        type: 'bar'
    }
});
    }
};
 
xmlhttp.open("GET", url, true);
xmlhttp.send();



