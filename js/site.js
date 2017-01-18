var codeMirror;
$(document).ready(function()
{
  $(document).on("click","[data-dir]",expandDir);
  $(document).on("click","[data-file]",openFile);
  $(document).on("click","[data-action]",performActionByAttr);
  $(document).ajaxError(alertAjaxError);
  $(document).mouseup(hideDirMenu);
  $("[data-dir]").contextmenu(showDirMenu);
  $("[data-file]").contextmenu(showFileMenu);
  $(document).keydown(windowKeyPress);
  $("#filter").keyup(filterFolders);
  setWindow();
  document.addEventListener("keydown", function(e) {
	  if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
		    e.preventDefault();
			performAction("savefile");
		  }
	  }, false);
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

var windowKeyPress = function(event)
{
	 if (event.which == 115 && (event.ctrlKey||event.metaKey)|| (event.which == 19)) {
        event.preventDefault();
        // do stuff
        return false;
    }
    return true;
}
var performActionByAttr =  function(event)
{
	  var action = $(this).attr('data-action');
	  performAction(action);
}

var performAction = function(action)
{
  if(action == "savefile")
  {
    var file = $("body").attr("data-open_file");
    var content = codeMirror.getValue();
	console.log('save file: ' + file);
    $.post('file/save','file='+encodeURIComponent(file)+"&content="+encodeURIComponent(content),function(data,xhr,status)
    {
      console.log(data);
      notice('<i class="fa fa-save"></i>&nbsp;File saved!');
    });
  }
  else if(action == "createdir")
  {
    $("#dir-contextmenu").slideUp('slow');
	showPrompt('What should we call the new directory?',createDirectoryOK,createDirectoryCancel);
  }
  else if(action == "deletedir")
  {
    var dir = $("body").attr("data-current_dir");
    $.post('file/deleteDir',"dir="+encodeURIComponent(dir),function(data,xhr,status)
    {
      notice('<i class="fa fa-trash"></i>&nbsp;Directory Deleted<br>You may need to reexpand to see changes.');
    });
  }
  else if(action == "createfile")
  {
	  $("#dir-contentmenu").slideUp('slow');
	  showPrompt('What should we call the new file?',createFileOK,createFileCancel);
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
  if(contextmenu.css("display") != "none")
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
    container.css("display","none");
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
	if(xhr === undefined || xhr.responseText === undefined)
	{
		console.log(xhr);
		showAlert('<i class="fa fa-exclamation-triangle"></i>&nbsp;Undefined Error');
	}
    var json = JSON.parse(xhr.responseText);
    showAlert('<i class="fa fa-exclamation-triangle"></i>&nbsp'+json.message);
}

var showFileMenu = function(event)
{
  event.preventDefault();
  var x = $(this).offset().left;
  var y = $(this).offset().top;
  var height = $(this).height();
  $("body").attr("data-current_dir",$(this).attr("data-dir"));
  y = y + height;
  var contextmenu = $("#dir-contextmenu");
  if(contextmenu.css("display") != "none")
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
    container.css("display","none");
  }
}

var filterFolders = function()
{
	var value = $(this).val();
	$(".file").each(function()
	{
		var file = $(this).text();
		if(file.includes(value))
		{
			$(this).show();
		}
		else
		{
			$(this).hide();
		}
	});
}

var createDirectoryOK = function(name)
{
	if(!!name)
    {
      showAlert('<i class="fa fa-folder-o"></i>&nbsp;Directory name not set canceled');
    }
	else
	{
		var dir = $("body").attr("data-current_dir");
		$.post('file/newdir','name='+encodeURIComponent(name)+"&dir="+encodeURIComponent(dir), function(data,xhr,status)
		{
		  notice('<i class="fa fa-folder-o"></i>&nbsp;Directory Created<br />'+
		  'You may need to reexpand the file to refesh');
		});
	}
}

var createDirectoryCancel = function()
{
	showAlert('<i class="fa fa-folder-o"></i>&nbsp;Directory creation canceled');
}

var createFileOK = function(name)
{
	if(name == "" || name == null)
    {
	  console.log("NAME HAS VALUE OF: " + name);
      showAlert('<i class="fa fa-folder-o"></i>&nbsp;File name not set canceled');
    }
	else
	{
		var dir = $("body").attr("data-current_dir");
		$.post('file/newfile','name='+encodeURIComponent(name)+"&dir="+encodeURIComponent(dir), function(data,xhr,status)
		{
		  notice('<i class="fa fa-folder-o"></i>&nbsp;File Created<br />'+
		  'You may need to reexpand the file to refesh');
		});
	}
}

var createFileCancel = function()
{
	showAlert('<i class="fa fa-folder-o"></i>&nbsp;File creation canceled');
}

var showPrompt = function(msg, success, cancel)
{
	$("#prompt-input").val("");
	$('#prompt-message').text(msg);
	$("div#modal-background").fadeIn();
	$('div#prompt').fadeIn();
	$('button#prompt-ok').unbind('click');
	$("button#prompt-ok").click(function(){promptSuccess(success); });
	$('button#prompt-cancel').unbind('click');
	$("button#prompt-cancel").click(function(){promptCancel(cancel);});
}

var promptSuccess = function(success)
{
	closePrompt();
	var input = $("#prompt-input").val();
	success(input);
}

var promptCancel = function(cancel)
{
	closePrompt();
	cancel();
}

var closePrompt = function()
{
	$("div#modal-background").fadeOut();
	$("div#prompt").fadeOut();
	$("div#prompt").fadeOut();
}

var funcNotSet = function()
{
	closePrompt();
	showAlert("Fatal: A function was not set for this button.");
}