<?php
class ControllerFunctions
{

    public function View()
    {
        $args = func_get_args();
        $argc = count($args);
        $path = "";
        $data = array();

        if(file_exists("views/layout.php"))
        {
           $view = $args[0];
           if($argc > 1)
           {
              $data = $args[1];
           }
           include("views/layout.php");
        }
        else
        {
           if($argc == 1)
           {
               $path = $args[0];
           }
           elseif($argc > 2)
           {
               $path = $args[0];
               uset($args[0]);
               $data = $args[1];
           }
           include("views/$path.php");
        }
    }

    public function No_Layout_View($path,$data)
    {
       include("views/$path.php");
    }

    protected function load_view_from_layout($path,$data)
    {
        include("views/$path.php");
    }

    protected function display_value($array,$key)
    {
       if(array_key_exists($key,$array))
       {
         echo $array[$key];
       }
    }

}
