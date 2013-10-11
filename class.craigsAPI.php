<?php
class craigsAPI
 {
  public function getLatest($location, $category)
   {
    $xml = $this->curlXML($location, $category);
    $ary = $this->parseXMLElement($xml);
    $ary = array_slice($ary, 0, 1);
    $ary = $this->getListingDetails($ary);
    
    return $ary[0];
   }
  
  private function curlXML($location, $category)
   {
    $ch = curl_init($location . '.craigslist.org/' . $category . '/index.rss');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    
    $obj = new SimpleXmlElement($data, LIBXML_NOCDATA);
    
    return $obj;
   }
  
  private function parseXMLElement($obj)
   {
    $ary = array();
    
    $obj = json_decode(json_encode($obj));
    
    foreach ($obj->item as $key => $val)
     {
      $ary[$key] = array(
        'title' => $val->title,
        'link' => $val->link,
        'description' => $val->description
      );
     }
    
    return $ary;
   }
  
  private function getListingDetails($ary)
   {
    $newAry = array();
    
    foreach ($ary as $key => $value)
     {
      $listing = $this->getListing($value['link']);
      
      $newAry[] = array(
        'listingID' => $listing['listingID'],
        'title' => $listing['title'],
        'link' => $value['link'],
        'description' => isset($value['description']) && $value['description'] ? $value['description'] : false,
        'location' => $listing['location'],
        'posted' => $listing['posted'],
        'email' => $listing['email'],
        'compensation' => isset($listing['compensation']) && $listing['compensation'] ? $listing['compensation'] : false,
        'catsAreOK' => isset($listing['catsAreOK']) && $listing['catsAreOK'] ? $listing['catsAreOK'] : false,
        'dogsAreOK' => isset($listing['dogsAreOK']) && $listing['dogsAreOK'] ? $listing['dogsAreOK'] : false,
        'imgList' => isset($listing['imgList']) && $listing['imgList'] ? $listing['imgList'] : false,
        'street1' => isset($listing['street1']) && $listing['street1'] ? $listing['street1'] : false,
        'street2' => isset($listing['street2']) && $listing['street2'] ? $listing['street2'] : false,
        'city' => isset($listing['city']) && $listing['city'] ? $listing['city'] : false,
        'region' => isset($listing['region']) && $listing['region'] ? $listing['region'] : false
      );
     }
    
    return $newAry;
   }
  
  private function getListing($link)
   {
    $ary  = array();
    $html = file_get_contents($link);
    
    $ary['listingID']    = $this->getBetween($html, '<p class="postinginfo">Posting ID: ', "</p>");
    $ary['title']        = $this->getBetween($html, "<title>", "</title>");
    $ary['email']        = $this->getBetween($html, 'var displayEmail = "', '";');
    $ary['location']     = $this->getBetween($html, '<!-- CLTAG GeographicArea=', ' -->');
    $ary['posted']       = date("c", $this->getBetween($html, 'Posted: <date title="', '">') / 1000);
    $ary['compensation'] = $this->getBetween($html, '<!-- CLTAG compensation=', ' -->');
    $ary['catsAreOK']    = $this->getBetween($html, '<!-- CLTAG catsAreOK=', ' -->');
    $ary['dogsAreOK']    = $this->getBetween($html, '<!-- CLTAG dogsAreOK=', ' -->');
    $ary['street1']      = $this->getBetween($html, '<!-- CLTAG xstreet0=', ' -->');
    $ary['street2']      = $this->getBetween($html, '<!-- CLTAG xstreet1=', ' -->');
    $ary['city']         = $this->getBetween($html, '<!-- CLTAG city=', ' -->');
    $ary['region']       = $this->getBetween($html, '<!-- CLTAG region=', ' -->');
    
    $images = explode('","', $this->getBetween($html, 'imgList = [', '];'));
    foreach ($images as $k => $v)
     {
      $images[$k] = trim(str_replace('"', "", $v));
     }
    $ary['imgList'] = $images;
    
    return $ary;
    
   }
  
  private function getBetween($content, $start, $end)
   {
    $r = explode($start, $content);
    if (isset($r[1]))
     {
      $r = explode($end, $r[1]);
      return $r[0];
     }
    return '';
   }
 }