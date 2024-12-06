@include( 'partials.header' )

<x-title text="Confirm Email..."></x-title>


    @include( 'partials.mail' )
    <?php
    $headers = 'From: mohamed.leghdaich@gmail.com\r\n'.
    'Reply-To: mohamed.leghdaich@gmail.com\r\n'.
    'X-Mailer: PHP/' . phpversion();

    send_mail(auth()->user()->email, "Gamesman account activation", "Username:".auth()->user()->name."<br><a href=\"http://localhost:8000/verification?token=".auth()->user()->password."&mail=". auth()->user()->email ."\">Click here to activate your Gamesman account</a>", $headers);
?>

<h1>Welcome</h1>

<div class="alert alert-primary" style="font-size:2em; font-style:italic;">
   <p>A verification email holding your credentials has been sent with a link to :</p>
    <p style="overflow:auto; text-decoration:underline;">
        "<?= auth()->user()->email ?>"
    </p>
    <p>Click the link to confirm your email address and activate your account.</p>
</div>
<p>
    If you do not see the email, <a class="text-primary" style="font-size:1.2em; text-decoration:underline;font-style:italic" href="/page/signup1">Click here to re-send verification message</a>.
</p>

@include( 'partials.footer' )