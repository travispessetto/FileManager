var codeMirror;
$(document).ready(function()
{
  $(document).on("click","[data-dir]",expandDir);
  $(document).on("click","[data-file]",openFile);
  $(document).on("click","[data-action]",performAction);
  $(document).ajaxError(alertAjaxError);
  $(document).mouseup(hideDirMenu);
  $("[data-dir]").contextmenu(showDirMenu);
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
        $("[data-dir]").contextmenu(showDirMenu);
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

var performAction = function(event)
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
  else if(action == "createdir")
  {
    $("#dir-contextmenu").slideUp('slow');
    var name = prompt("What should we call the new directory?","New Directory");
    var dir = $("body").attr("data-current_dir");
    $.post('file/newdir','name='+encodeURIComponent(name)+"&dir="+encodeURIComponent(dir), function(data,xhr,status)
    {
      notice('<i class="fa fa-folder-o"></i>&nbsp;Directory Created<br />'+
      'You may need to reexpand the file to refesh');
    });
  }
  else if(action == "deletedir")
  {
    var dir = $("body").attr("data-current_dir");
    $.post('file/deleteDir',"dir="+encodeURIComponent(dir),function(data,xhr,status)
    {
      notice('<i class="fa fa-trash"></i>&nbsp;Directory Deleted<br>You may need to reexpand to see changes.');
    });
  }
}

var showDirMenu = function(event)
{
  event.preventDefault();
  var x = $(this).offset().left;
  var y = $(this).offset().top;
  var height = $(this).height();
  $("body").attr("data-current_dir",$(this).attr("data-dir"));
  y = y + height;
  var contextmenu = $("#dir-contextmenu");
  if(contextmenu.css("display") == "block")
  {
      contextmenu.slideUp('slow',function(){slideDownDirMenu(contextmenu,x,y);});
  }
  else
   {
    slideDownDirMenu(contextmenu,x,y);
  }
}

var slideDownDirMenu = function(contextmenu,x,y)
{
  contextmenu.css("left",x);
  contextmenu.css("top",y);
  contextmenu.slideDown();
}

var hideDirMenu = function(event)
{
  var container = $("#dir-contextmenu");
  if(!container.is(event.target) && container.has(event.target).length === 0)
  {
    container.slideUp();
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

var showAlert = function(message)
{
    $("#alert").html(message);
    $("#alert").fadeIn();
    // close after 3 secons
    setTimeout(closeAlert,3000);
}

var closeAlert = function()
{
    $("#alert").fadeOut();
}

var alertAjaxError = function(e,xhr,settings)
{
    var json = JSON.parse(xhr.responseText);
    showAlert('<i class="fa fa-exclamation-triangle"></i>&nbsp'+json.message);
}
