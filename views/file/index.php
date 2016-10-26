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
  <button>Save</button>
</div>
