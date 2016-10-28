<div class="side-bar">
  <h2>File Tree</h2>
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
<div class="main">
  <div id="codediv">
  </div>
  <button data-action="savefile"><i class="fa fa-save"></i>&nbsp;Save</button>
</div>
<div id="dir-contextmenu">
  <ul>
    <li data-action="createdir"><i class="fa fa-plus"></i>&nbsp;<i class="fa fa-folder"></i>&nbsp;New Directory</li>
    <li><i class="fa fa-plus"></i>&nbsp;<i class="fa fa-file-o"></i>&nbsp;New File</li>
    <li data-action="deletedir"><i class="fa fa-trash"></i>&nbsp;<i class="fa fa-folder"></i>&nbsp;Delete Directory</li>
  </ul>
</div>
