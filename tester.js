function runTester() {
    var files = document.getElementById('file_upload').files;
    if (files.length == 0) {
        alert("Please first choose or drop any file...");
        return;
    }
    var path = (window.URL || window.webkitURL).createObjectURL(files[0]);
    alert(path);
    // Function to run index.js
 }