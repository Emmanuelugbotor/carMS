<?php
/**
 * This example shows sending a message using PHP's mail() function.
 */
require 'phpmailer/PHPMailerAutoload.php';
//Create a new PHPMailer instance
$mail = new PHPMailer;

//Enter Your Email Address Here
$to_email = 'yourmail@website.com';

//Enter Your Name Here
$to_name = "Your_Name";

//Enter Your Subject Here
$subject = "Email_Subject";

$mail_content = '';
if( isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']) ||  isset($_POST['phone']) )  {	
	$from_mail = $_POST['email'];
	$sender_name = $_POST['name'];	
	$sender_message = $_POST['message'];
	
	
	if(isset($_POST['phone'])) {
		$phone = $_POST['phone'];
		 $sender_phone  = "</br> SENDER PHONE NO: " .$phone;
	}
	else {
		$sender_phone ="";
		
	}
	
	$mail_content = "SENDER NAME : " . $sender_name . "</br> SENDER EMAIL : " . $from_mail . "</br>" . $sender_phone ."</br> SENDER MESSAGE: </br> " . $sender_message;
}


if( !empty($mail_content) ) {
		
	$mail->SetFrom( $from_mail , $sender_name );
	$mail->AddReplyTo( $from_mail , $sender_name );
	$mail->AddAddress( $to_email , $to_name );
	//Set the subject line
	$mail->Subject = $subject;	
	
	$mail->MsgHTML( $mail_content );
	echo $mail->Send();
	exit;	
}