<!DOCTYPE html>
<html>
  <head>
    <title><?php $this->display_value($data,"title"); ?></title>
    <!-- Contains Reset make sure is first -->

    <script src="codemirror/lib/codemirror.js"></script>
    <link rel="stylesheet" href="codemirror/lib/codemirror.css" />
    <link rel="stylesheet" href="css/site.css" />
    <!-- We will change this base on extension -->
    <script src="codemirror/lib/codemirror.js"></script>
    <script src="codemirror/addon/edit/matchbrackets.js"></script>
    <script src="codemirror/mode/htmlmixed/htmlmixed.js"></script>
    <script src="codemirror/mode/xml/xml.js"></script>
    <script src="codemirror/mode/javascript/javascript.js"></script>
    <script src="codemirror/mode/css/css.js"></script>
    <script src="codemirror/mode/clike/clike.js"></script>
    <script src="codemirror/mode/php/php.js"></script>
    <script src="js/jquery.js"></script>
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
  </body>
</html>
