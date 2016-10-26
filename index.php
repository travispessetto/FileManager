<?php
require_once("routes.php");
require_once("config.php");
$url = $_GET['url'];
$routes = new Routes();
$routeinfo = $routes->get_matched_values($url);
$getargs = $_GET;
$controller = null;

if(!array_key_exists("controller",$routeinfo) || empty($routeinfo["controller"]))
{
  $routeinfo["controller"] = $config["defaultcontroller"];
}
if(array_key_exists("controller",$routeinfo) && file_exists("controllers/$routeinfo[controller].php"))
{
  require_once("controllers/$routeinfo[controller].php");
  $controllerStr = ucfirst($routeinfo['controller']);
  $controller = new $controllerStr();
  $action = "Index";
  unset($routeinfo["controller"]);
  if(array_key_exists("action",$routeinfo))
  {
    $action = $routeinfo["action"];
    unset($routeinfo["action"]);
  }
  try
  {
    call_user_func(array($controller,$action),array_merge($routeinfo,$getargs));
  }
  catch(Exception $ex)
  {
      die("Controller method not found");
  }
}
else
{
      echo "Requested: $url<br />";
      die("Controller $controller not found");
}
