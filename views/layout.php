<!DOCTYPE html>
<html>
  <head>
    <title><?php $this->display_value($data,"title"); ?></title>
    <!-- Contains Reset make sure is first -->

	<link rel="stylesheet" href="codemirror/lib/codemirror.css" />
	<link rel="stylesheet" href="codemirror/addon/scroll/simplescrollbars.css" />
    <script src="codemirror/lib/codemirror.js"></script>
	<link rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css" />
    <link rel="stylesheet" href="css/site.css" />
    <!-- We will change this base on extension -->
	<script src="js/jquery.js"></script>
	<script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
    <script src="codemirror/lib/codemirror.js"></script>
    <script src="codemirror/addon/edit/matchbrackets.js"></script>
    <script src="codemirror/mode/htmlmixed/htmlmixed.js"></script>
    <script src="codemirror/mode/xml/xml.js"></script>
    <script src="codemirror/mode/javascript/javascript.js"></script>
    <script src="codemirror/mode/css/css.js"></script>
    <script src="codemirror/mode/clike/clike.js"></script>
    <script src="codemirror/mode/php/php.js"></script>
    <script src="codemirror/addon/scroll/simplescrollbars.js"></script>
    <script src="js/site.js"></script>
  </head>
  <body>
    <div id="notice">
      {{notice}}
    </div>
    <div id="alert">
      {{alert}}
    </div>
    <?php $this->load_view_from_layout($view,$data); ?>
	<!-- Prompt Dialog -->
	<div id="prompt">
		<div id="prompt-title">
			Prompt
		</div>
		<div id="prompt-text">
			<span id="prompt-message">What is your name?</span>
			<br />
			<br />
			<input id="prompt-input" />
		</div>
		<div id="prompt-buttons">
			<button id="prompt-cancel" class="btn-danger">Cancel</button>
			<button id="prompt-ok" class="btn-success">OK</button>
		</div>
	</div>
	<!-- Prompt Dialog -->
	<!-- Modal Background -->
	<div id="modal-background">
	</div>
	<!-- Modal Background -->
  </body>
</html>
