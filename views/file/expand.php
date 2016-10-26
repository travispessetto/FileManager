<div class="file">
  <?php foreach($data['files'] as $file): ?>
    <?php $datalink = is_dir("$data[fileroot]/$file")? "data-dir=\"$data[fileroot]/$file\"" : "data-file=\"$data[fileroot]/$file\""; ?>
    <div>
      <span class="file closed" <?php echo $datalink; ?>>
        <?php if(is_dir("$data[fileroot]/$file")): ?>
          <i class="fa fa-folder"></i>
        <?php else: ?>
          <i class="fa fa-file-o"></i>
        <?php endif; ?>
        <?php echo $file; ?>
      </span>
    </div>
  <?php endforeach; ?>
</div>
