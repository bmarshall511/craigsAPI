<?php
require_once("../class.craigsAPI.php");

$api = new craigsAPI;

$action   = $_REQUEST['action'];
$location = $_REQUEST['location'];
$category = $_REQUEST['category'];

switch ($action)
{
  case "getLatest":
    echo json_encode($api->getLatest($location, $category));
    break;
}