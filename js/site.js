$(document).ready(function()
{
  $(document).on("click","[data-dir]",expandDir);
  $(document).on("click","[data-file]",openFile);
});

var expandDir = function()
{
   if($(this).hasClass("closed"))
   {
     var path = $(this).attr('data-dir');
     $(this).removeClass("closed");
     $(this).addClass("opened");
     var workingDiv = $(this);
     $.get("file/expand","filepath="+path,function(data,status,xhr)
     {
        workingDiv.closest("div").append(data);
     });
   }
   else
   {
        $(this).removeClass("opened");
        $(this).addClass("closed");
        $(this).closest("div.file").children("div").each(function()
        {
          $(this).remove();
        });
   }
}

var openFile = function()
{
  var file = $(this).attr('data-file');
  $.get("file/openFile","file="+file,function(data,status,xhr)
  {
    $("textarea#code").val(data);
    $("textarea#code").attr("data-open_file",file);
    var codeEditor = $("textarea#code")[0];
    var codeMirror = CodeMirror.fromTextArea(codeEditor,
    {
      lineNumbers: true,
      matchBrackets: true,
      mode: "application/x-httpd-php",
      indentUnit: 4,
      indentWithTabs: true
    });
  });
}
