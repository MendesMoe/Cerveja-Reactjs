// Global variables
var editorInstance, userIsAdmin;
var remoteCodeInfos = { timestamp: 0, size: 0 };

// When DOM is loaded
$(function() {
    
  // Let's launch the loop (checking remote code each 0.5 seconds)
  checkCode();

});
