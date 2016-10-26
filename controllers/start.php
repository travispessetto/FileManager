<?php
require_once("application.php");
class Start extends Application
{

      public function Index()
      {
        $this->view("start/index",array("title"=>"Sign In"));
      }

}
