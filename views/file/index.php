<div class="side-bar">
	<div class="side-bar-top">
	  <h2>File Tree</h2>
	  <div class="padded">
		<input id="filter" placeholder="Filter Folders" />
	  </div>
	</div>
	<div class="side-bar-bottom">
  
	  <div id="dir-contextmenu">
		<ul>
		  <li data-action="createdir"><i class="fa fa-plus"></i>&nbsp;<i class="fa fa-folder"></i>&nbsp;New Directory</li>
		  <li data-action="createfile"><i class="fa fa-plus"></i>&nbsp;<i class="fa fa-file-o"></i>&nbsp;New File</li>
		  <li data-action="deletedir"><i class="fa fa-trash"></i>&nbsp;<i class="fa fa-folder"></i>&nbsp;Delete Directory</li>
		</ul>
	  </div>
	  
	  <div id="file-contextmenu">
		<li data-action="renamefile"><i class="fa fa-pencil-o"></i>&nbsp;Rename</li>
		<li data-action="deletefile"><i class="fa fa-trash-o"></i>&nbsp;Delete</li>
	   </div>
	  <?php foreach($data["files"] as $file): ?>
		<?php $datalink = is_dir("$data[fileroot]/$file")? "data-dir=\"$data[fileroot]/$file\"" : "data-file=\"$data[fileroot]/$file\""; ?>
		<div class="file">
		  <span class="file closed"  <?php echo $datalink; ?>>
			<?php if(is_dir("$data[fileroot]/$file"))
			{
			  echo '<i class="fa fa-folder"></i>';
			}
			else
			{
			  echo '<i class="fa fa-file-o"></i>';
			}
			?>
			<?php echo $file; ?>
		  </span>
		</div>
	  <?php endforeach; ?>
	</div>
</div>
<div class="main">
  <div id="codediv">
  </div>
  <div id="filemenu">
	<button data-action="savefile"><i class="fa fa-save"></i>&nbsp;Save</button>
  </div>
</div>
