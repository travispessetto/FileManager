<?php
require_once("application.php");

class File extends Application
{
    public function Index()
    {
      global $config;
      $this->View("file/index",array("title"=>"File Manager","fileroot"=>$config["fileroot"],"files"=>array_diff(scandir($config["fileroot"]),$config['dotfiles'])));
    }

    public function DeleteDir($params)
    {
      try
      {
          $dir = urldecode($_POST["dir"]);
          $iterator = new RecursiveDirectoryIterator($dir,RecursiveDirectoryIterator::SKIP_DOTS);
          $files = new RecursiveIteratorIterator($iterator,RecursiveIteratorIterator::CHILD_FIRST);
          foreach($files as $file)
          {
            if($file->isDir())
            {
              @rmdir($file->getRealPath());
            }
            else
            {
              @unlink($file->getRealPath());
            }
          }
          @rmdir($dir);
        }
        catch(Exception $ex)
        {
          header($_SERVER['SERVER_PROTOCOL'] . ' 403 Forbidden', true, 403);
          echo json_encode(array("message" => "Directory ".$dir." could not be deleted"));
        }
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

    public function NewDir($params)
    {
      $name = $_POST['name'];
      $dir = $_POST['dir'];
      $newdir = join("/",array(trim($dir,"\t\n\r\0\x0B\\/"),trim($name,"\t\n\r\0\x0B\\/")));
      try
      {
        if(@mkdir($newdir))
        {
          header('status-code: 200');
          echo  json_encode(array("directory"=>$dir.$name));
        }
        else
        {
          header($_SERVER['SERVER_PROTOCOL'] . ' 403 Forbidden', true, 403);
          echo json_encode(array("message" => "File ".$dir.$name." could not be created"));
        }
      }
      catch(Exception $ex)
      {
        header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
      }
    }

    public function OpenFile($params)
    {
      global $config;
      $file = $params['file'];
      $info = new SplFileInfo($file);
      $mime = mime_content_type($file);
      if($info->isFile())
      {
        $data["extension"] = $info->getExtension();
        if(array_key_exists($data['extension'],$config['extensionmodes']))
        {
          $data['mode'] = $config["extensionmodes"][$data['extension']];
          $data['handler'] = "codemirror";
          $data["filecontents"] = file_get_contents($file);
          header('Content-Type: application/json');
        }
        elseif(stripos($mime,"text") !== false )
        {
          $data['mode'] = "text/plain";
          $data['handler'] = "codemirror";
          $data["filecontents"] = file_get_contents($file);
          header('Content-Type: application/json');
        }
        else
        {
          $data['file'] = $file;
          $data['handler'] = "download";
          $data['mime'] = $mime;
        }
          echo json_encode($data);
      }
      else
      {
        echo "File ($file) could not be opened as it is not recognized as a file by system";
      }
    }

    public function Save($params)
    {
      if($_SERVER['REQUEST_METHOD'] == "POST")
      {
         $file = urldecode($_POST['file']);
         $content = urldecode($_POST['content']);
         file_put_contents($file,$content);
      }
    }
}
