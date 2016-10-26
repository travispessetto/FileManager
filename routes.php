<?php

class Routes
{

  private $routes = array();
  public function __construct()
  {
     // The default route... make sure is last
     array_push($this->routes, "/^(?<controller>\w*)\/{0,1}$/");
     array_push($this->routes , "/^(?<controller>\w*)\/(?<action>\w*)$/");
  }

  public function get_matched_values($url)
  {
     foreach($this->routes as $route)
     {
       if(preg_match($route,$url,$matches))
       {
          return $matches;
       }
     }
     return array();
  }

}
