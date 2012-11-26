function init() {
    $("#search").click(search);
    gadgets.window.adjustHeight();
}

// Perform a search and display the results
function search() {
     var request = osapi.jive.corev3.contents.get({
    
     "fields": "@all"
 });

 request.execute(function(data) {
     console.log("Fetched the document!", data);
 });

}

// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);