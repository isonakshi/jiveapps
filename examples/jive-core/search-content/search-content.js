// On-view-load initialization
function init() {

     
      $("#search").click(search);
    gadgets.window.adjustHeight();
}
//Date convertor
var InputDate=response.data.modificationDate;
function DateFormatFunc(InputDate)
{



var DtFmt = new Date(InputDate.substring(6,10),InputDate.substring(0,2)-1,InputDate.substring(3,5),InputDate.substring(11,13),InputDate.substring(14,16),InputDate.substring(17,19)).valueOf();
var d = new Date();
var DtCurr = new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()).valueOf();
var timediff = Math.abs(DtCurr - DtFmt);
var days = Math.floor(timediff / (1000 * 60 * 60 * 24)); 
timediff -= days * (1000 * 60 * 60 * 24);
var hours = Math.floor(timediff / (1000 * 60 * 60)); 
timediff -= hours * (1000 * 60 * 60);
hours = hours - 13; //as it is IST now. When there is no Daylight saving 1 should be replaced with 12.
var mins = Math.floor(timediff / (1000 * 60)); 
timediff -= mins * (1000 * 60);
mins = mins - 30; //IST correction
var secs = Math.floor(timediff / 1000); 
timediff -= secs * 1000;
var dtfmtDate = days +":" + hours +":"+mins +":"+secs;
if (days > 0)
{
if (days == 1)
{ return "1 day";}
else
{ return days+" days"; }
}
else if (days === 0)
{
if (hours > 0)
{ 
if (hours == 1)
{return "1 hr";}
else
{return hours+" hrs"; }
}
else if (mins > 0)
{ 
if (mins == 1)
{ return "1 min"; }
else
{return mins+" mins"; }
}
else
{ return secs+" secs"; }
}
/* else if (hours == 0)
{
if (mins > 0)
{ return mins+" mins ago"; }
else
{ return secs+" secs ago"; }
}
else
{ return secs+" secs ago"; } */
return (dtfmtDate);
} 


// Perform a search and display the results
function search() {

$("#results").show();
$("#search-results").show();
       $("#search-results").html("");
    gadgets.window.adjustHeight();
    var types = [];
    $("input:checked").each(function() {
        types.push(this.id);
    });
    var params = {
        limit : $("#limit").val(),
        query : $("#query").val(),
        sort : $("#sort-type").val(),
        sortOrder : $("#sort-order").val()
    };
    if (types.length > 0) {
        params.type = types;
    }             
    console.log("searching for " + JSON.stringify(params));
    osapi.jive.core.searches.searchContent(params).execute(function(response) {
        console.log("searching response is " + JSON.stringify(response));
        if (response.error) {
            alert(response.error.message);
        }
        else { 
            var html = "";
            var rows = response.data;
            $.each(rows, function(index, row) {
                html += "<ul>";
                html += "<li><a href=" + row.resources.html.ref + ">"+row.subject+"</a></li>";
                html += "</ul>";
                
                html += "<ul 'font-style':'oblique', 'color':'grey', 'font-size':'10px'>"+row.contentSummary+"</ul>";
                html += "<ul>";
                html +="<li>"+row.author.name+"</li>";
                html += "<li>"+ row.modificationDate+"</li>";
                html += "<li>" + row.type + "</li>";
                html += "</ul>";
            });
            $("#search-results").html(html);
            gadgets.window.adjustHeight();
        }
    });console.log("response:",html);
}

// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
