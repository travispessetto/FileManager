<?php
require_once("application.php");

class File extends Application
{
    public function Index()
    {
      global $config;
      $this->View("file/index",array("title"=>"File Manager","fileroot"=>$config["fileroot"],"files"=>array_diff(scandir($config["fileroot"]),$config['dotfiles'])));
    }

    public function Expand($params)
    {
       global $config;
       $data = array();
       if(is_dir($params['filepath']))
       {
           $data['files'] = array_diff(scandir($params['filepath']),$config['dotfiles']);
           $data["fileroot"] = $params['filepath'];
           $this->No_Layout_View("file/expand",$data);
       }
    }

    public function OpenFile($params)
    {
      global $config;
      $file = $params['file'];
      if(is_file($file))
      {
        echo file_get_contents($file);
      }
      else
      {
        echo "File ($file) could not be opened as it is not recognized as a file by system";
      }
    }
}

 ?>
