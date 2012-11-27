function init() {
    $("#search").click(search);
    gadgets.window.adjustHeight();
}

// Perform a search and display the results
function search() {
 
     osapi.jive.corev3.contents.get({"author":"https://apps-public-cloud-trunk.jivesoftware.com/people/2116","fields": "@all"}).execute(function(response) {
        console.log("The Response is " + JSON.stringify(response));
     });
        osapi.jive.corev3.people.get({id : '@me'}).execute(function(response) {
        console.log("The User is " + JSON.stringify(response));
        
           
            gadgets.window.adjustHeight();
        });
    }

// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);