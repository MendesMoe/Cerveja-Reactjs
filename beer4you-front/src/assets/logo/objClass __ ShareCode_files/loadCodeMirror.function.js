/**
 * Loads Code Mirror and attaches it to #code textarea
 * 
 * @return {void}
 */
function loadCodeMirror()
{
  editorInstance = CodeMirror.fromTextArea(
    document.getElementById('code'),
    {
      autofocus: userIsAdmin,
      tabSize: 4,
      indentUnit: 4,
      indentWithTabs: false,
      lineNumbers: true,
      lineWrapping: true,
      matchBrackets: true,
      mode: "application/x-httpd-php",
      readOnly: !userIsAdmin,
      smartIndent: false,
      theme: "monokai"
    }
  );

  // If the user is the administrator, we install the 'change' event handler on the CodeMirror instance
  if (userIsAdmin) editorInstance.on('change', updateCode);

  // We install the 'keyup' event handler on the document to unfocus when "escape" key is pressed
  $(document).keyup(function(event) { if (event.keyCode == 27) editorInstance.getInputField().blur(); });
}
