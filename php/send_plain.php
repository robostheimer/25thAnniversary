<?php
$querystring= $_SERVER["QUERY_STRING"];
$querystring = filter_var($querystring, FILTER_SANITIZE_STRING);


$querystring= $_SERVER["QUERY_STRING"];
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


$message_split_1 = explode('@@', $message);
$message_2.='<p>Thank you for visiting our site. </p><p><b>Your Favorite Stories are listed below:</b></p>';
for($x=0; $x<(count($message_split_1)-1); $x++)
{

$message_split_1[$x] = str_ireplace('%20',' ',$message_split_1[$x]);
$message_split = explode('**', $message_split_1[$x]);
//echo $message_split[2].'<br>';
$img = $message_split[0];
$url = $message_split[1];
$url = str_ireplace('%23', '#', $url);
$url = 'http://teacheratsea.noaa.gov'.$url;
$title = $message_split[2];
$title = str_ireplace('@@','', $title);
$title = str_ireplace('%27','\'', $title);
$title = str_ireplace('%2520',' ', $title);

$message_2 .= '<p>'.$title. ' at ' .$url.'</p>';
}




 $subject = 'Your Teacher at Sea Favorited Resources'; 
  $headers = 'From: teacheratsea@noaa.gov' . "\r\n" .
    'Reply-To: teacheratsea@noaa.gov' . "\r\n" .
   'Content-Type: text/html; charset=ISO-8859-1\r\n';
   
  //send email
  
  mail($email,$subject , $message_2, $headers  );
  echo  $message_2; 
  
  //emailTxt +=  '<div style="float:left"><img src="'+mailImg+'" alt="'+mailtitle+'"/></div><div style="float:left"><a href="'+mailurl+'" target="_blank">'+mailtitle+'</a></div>';
	}		
  
 //'From:teacheratsea@noaa.gov', "Content-Type: text/html; charset=ISO-8859-1\r\n"
?>

