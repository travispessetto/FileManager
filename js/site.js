var codeMirror;
$(document).ready(function()
{
  $(document).on("click","[data-dir]",expandDir);
  $(document).on("click","[data-file]",openFile);
  $(document).on("click","[data-action]",performAction);
  setWindow();
});

$(window).resize(function()
{
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
        var appendingDiv = $(data);
        workingDiv.closest("div").append(appendingDiv);
        appendingDiv.slideDown('slow');
     });
   }
   else
   {
        $(this).removeClass("opened");
        $(this).addClass("closed");
        toClose = $(this).next('div.file');
        toClose.slideUp('slow',function(){toClose.remove()});
   }
}

var openFile = function()
{
  var file = $(this).attr('data-file');
  $.get("file/openFile","file="+file,function(data,status,xhr)
  {
    if(data.handler == "codemirror")
    {
          $("#codediv").html("");
          $("body").attr("data-open_file",file);
          codeMirror = CodeMirror(document.getElementById("codediv"),
          {
            lineNumbers: true,
            matchBrackets: true,
            mode: data['mode'],
            indentUnit: 4,
            indentWithTabs: true,
            readOnly: false,
            inputStyle: "contenteditable"
          });
          codeMirror.setValue(data.filecontents);
          var height = parseInt($("#codediv").height());
          codeMirror.setSize("100%","100%");
      }
  });
}

var setWindow = function()
{
  var winWidth = parseInt($(window).width());
  var sidebarWidth = parseInt($(".side-bar").width());
  var width = winWidth - sidebarWidth;
  var height = $(window).height();
  $(".main").height(height);
  $("#codediv").height(height - 50);
  $(".main").width(width);
}

var performAction = function()
{
  var action = $(this).attr('data-action');
  if(action == "savefile")
  {
    var file = $("body").attr("data-open_file");
    var content = codeMirror.getValue();
    $.post('file/save','file='+encodeURIComponent(file)+"&content="+encodeURIComponent(content),function(data,xhr,status)
    {
      console.log(data);
      notice('<i class="fa fa-save"></i>&nbsp;File saved!');
    });
  }
}

var notice = function(message)
{
    $("#notice").html(message);
    $("#notice").fadeIn();
    // close after 3 secons
    setTimeout(closeNotice,3000);
}

var closeNotice = function()
{
    $("#notice").fadeOut();
}
