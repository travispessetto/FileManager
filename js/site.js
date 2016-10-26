
$(document).ready(function()
{
  $(document).on("click","[data-dir]",expandDir);
  $(document).on("click","[data-file]",openFile);
  setWindow();
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
    $("#codediv").html("");
    $("textarea#code").val(data);
    $("textarea#code").attr("data-open_file",file);
    var codeMirror = CodeMirror(document.getElementById("codediv"),
    {
      lineNumbers: true,
      matchBrackets: true,
      mode: "application/x-httpd-php",
      indentUnit: 4,
      indentWithTabs: true,
      readOnly: false
    });
    codeMirror.setValue(data);
    var height = parseInt($("#codediv").height());
    console.log("code div " + height);
    codeMirror.setSize("100%","100%");
    codeMirror.refresh();
  });
}

var setWindow = function()
{
  var winWidth = parseInt($(window).width());
  var sidebarWidth = parseInt($(".side-bar").width());
  var width = winWidth - sidebarWidth;
  var height = $(window).height();
  console.log(height);
  $(".main").height(height);
  $("#codediv").height(height - 50);
  $(".main").width(width);
  console.log(width);
}
