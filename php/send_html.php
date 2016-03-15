<?php
$querystring= $_SERVER["QUERY_STRING"];
$querystring = filter_var($querystring, FILTER_SANITIZE_STRING);

if(strpos($querystring, '<')!==FALSE or strpos($querystring, '%3C')!==FALSE or strpos($querystring, '%&lt;')!==FALSE)
{
  echo 'Bad Request';
}
else{
$querystring = str_ireplace('%2F', '/', $querystring);
$querystring = str_ireplace('%2A', '*', $querystring);
$querystring = str_ireplace('%3A', ':', $querystring);
$querystring = str_ireplace('%24', '#', $querystring);
$querystring = str_ireplace('$', '#', $querystring);
$querystring = str_ireplace('%2C', ',', $querystring);
$querystring = str_ireplace('+', '%20', $querystring);
$querystring = str_ireplace('%40', '@', $querystring);


$querystring_split = explode('&',$querystring);

$email = $querystring_split[0];
$message = $querystring_split[1];

$email = str_ireplace('email=','',$email);

$message = str_ireplace('message=','',$message);

$message_split_1 = explode('@@', $message);


$message ='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta property="og:title" content="Teacher at Sea Favorites" /> 
  <meta property="og:image" content="http://beta.w1.tas.noaa.gov/images/include_file_images/banner.jpg" /> 
  <meta property="og:description" content="Teacher at Sea Favorites developed by individuals using the Teacher at Sea Image, Blog and Lesson Search" /> 
  <meta property="og:url" content="http://www.tas.noaa.gov">
  <meta property ="og:type" content="HTML"


</head>
<body>
<a href="'.$shorturl.'" target="_blank">View this email in your browser</a><br/><br/>
<div style="font-family:Arial, Tahoma, san-serif; background:#EBFAF7;border:1px solid #ccc;"><div id="header"  style="margin-left:10px; margin-right:10px"><div style="float:left;padding-left:7px;"><img style="margin-top:10px;" src="http://www.tas.noaa.gov/images/include_file_images/banner_smaller.png"/></div><div style="float:right; margin-right:10px;margin-left:10px;"><ul> 
                               <li style="list-style-type:none; display:inline; margin:1px;"><a href="http://teacheratsea.wordpress.com" target="_blank"><img src="http://www.tas.noaa.gov/images/wp_logo.png" width="20" height="20" class="icon" alt="wordpress"></a></li>

           <li style="list-style-type:none; display:inline; margin:1px;" "=""><a href="http://www.facebook.com/noaateacheratsea" target="_blank"><img src="http://www.tas.noaa.gov/images/facebook.png" width="20" height="20" class="icon" alt="facebook"></a></li>
           <li style="list-style-type:none; display:inline; margin:1px;" "=""><a href="http://twitter.com/teacheratsea" target="_blank"><img src="http://www.tas.noaa.gov/images/twitter.png" width="20" height="20" class="icon" alt="twitter"></a></li>

           <li style="list-style-type:none; display:inline; margin:1px;" "=""><a href="http://www.flickr.com/photos/60919111@N08/sets/72157626264008559/with/6635298211/" target="_blank"><img src="http://www.tas.noaa.gov/images/flickr.png" alt="flickr" width="20" height="20" class="icon"></a></li>
           <li style="list-style-type:none; display:inline; margin:1px;" "=""><a href="http://www.youtube.com/playlist?list=PLFC2C10270ABB3B09" target="_blank"><img src="http://www.tas.noaa.gov/images/youtube.png" width="21" height="20" class="icon" alt="youtube"></a></li>
              <li style="list-style-type:none; display:inline; margin:1px;" "=""><a href="/media/Feeds.html"><img src="http://www.tas.noaa.gov/images/feed-icon-22x22.png" width="20" height="20" class="icon" alt="rss feed"></a></li>
     </ul>
	 </div><div style="clear:both"></div><div style="height:2px; border-top: 1px solid #0057a5; border-bottom:2px solid #189E81"></div></div><p style="margin-left:15px""><h6 style="font-size:16px;color:#0057a5;margin-bottom:10px; margin-top:10px; margin-left:20px; margin-right:20px; ">Thanks for visiting our site and supporting our program! The stories you favorited have been sent to the email address provided. </h6> <p style="margin-bottom:10px; margin-left:20px;margin-right:20px; font-size:14px">You\'re Teacher at Sea favorite stories are below.</p>';
for($x=0; $x<(count($message_split_1)-1); $x++)
{

$message_split_1[$x] = str_ireplace('%20',' ',$message_split_1[$x]);
$message_split = explode('**', $message_split_1[$x]);
$img = $message_split[0];

$url = $message_split[1];
$url = str_ireplace('%23', '#', $url);
$title = $message_split[2];
$title = str_ireplace('%22','"',$title);
$title = str_ireplace('%2520', ' ' , $title);
$title = str_ireplace('%2522', ' ' , $title);
$title = str_ireplace('%2527', ' ' , $title);

if($x%2==0)
	{
	$message .= '
	<div style="margin:15px;; width:100%;"><div class="box" style=" width:37%;padding:2%;margin-right:5px; margin-bottom:10px; border:1px solid #ccc; float:left; margin-left:5px;min-height:90px	; font-size:14px;background-color:#FFF8DF;" ><div style="float:left;margin-left:0px;max-height:75px;overflow:hidden; margin-bottom:10px;margin-right:5%;"><img style="border:1px solid #ccc" src="'.$img.'?w=100" alt="'. $title.'"/></div><p  style="margin-top:0;"><a href="'.$url.'" target="_blank">'. $title.'</a></p><div style="margin:20px; margin-top:0px; margin-bottom:0px; "></div></div>';
	}
	else
	{
	$message .= '
	<div class="box" style=" width:37%;padding:2%;margin-right:5px; margin-bottom:10px; border:1px solid #ccc; float:left; margin-left:5px;min-height:90px; font-size:14px;background-color:#FFF8DF;" ><div style="float:left;margin-left:0px;max-height:75px;overflow:hidden; margin-bottom:10px;margin-right:5%"><img style="border:1px solid #ccc" src="'.$img.'?w=100" alt="'. $title.'"/></div><p style="margin-top:0;"><a href="'.$url.'" target="_blank">'. $title.'</a></div></div><div style="clear:left;margin:20px; margin-top:0px; margin-bottom:0px; "></div>';
	
	}

	
}
if((count($message_split_1)-1)%2!=0)
		{
		
			$message.='<div style="clear:both"></div>';
		}



$message.='<div style="clear:both"></div>';




$message .='<div style="clear:both"></div><p style="margin:20px;font-size:14px">Check out our <a href="http://www.tas.noaa.gov/dyk">Did You Know: Tweets from Sea</a> and our  <a href="http://teacheratsea.noaa.gov/media/photo_of_week.html">Photo of the Week</a> for some great classroom resources!</p>

<p style="margin:20px;font-size:14px">Want to learn more about the great things our teachers have been up to, go to the <a href="http://www.tas.noaa.gov/alumni/spotlight.html">Alumni Spotlight</a> page to keep up with</p>

<p style="margin:20px;font-size:14px">Have a question about our program, drop us a line at <a href="mailto:teacheratsea@noaa.gov">teacheratsea@noaa.gov</a></p>

<p style="margin:20px;font-size:14px">Remember to like us on <a href="http://www.facebook.com/noaateacheratsea">Facebook</a> and Follow us on <a href="http://twitter.com/teacheratsea"> Twitter</a>!</p> </div></body>';

 $subject = 'Your Teacher at Sea Favorited Blog Posts'; 
  $headers = 'From: teacheratsea@noaa.gov' . "\r\n" .
    'Reply-To: teacheratsea@noaa.gov' . "\r\n" .
   'Content-Type: text/html; charset=ISO-8859-1\r\n';
   
  //send email
  
mail($email,$subject ,$message, $headers  );
 echo $message; 
  
 }
?>

