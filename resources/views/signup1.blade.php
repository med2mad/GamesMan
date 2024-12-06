@include( 'partials.header' )

<x-title text="Confirm Email..."></x-title>


    @include( 'partials.mail' )
    <?php
    $headers = 'From: mohamed.leghdaich@gmail.com\r\n'.
    'Reply-To: mohamed.leghdaich@gmail.com\r\n'.
    'X-Mailer: PHP/' . phpversion();

    send_mail(auth()->user()->email, "Gamesman account activation", "Username:".auth()->user()->name."<br><a href=\"http://localhost:8000/verification?token=".auth()->user()->password."&mail=". auth()->user()->email ."\">Click here to activate your Gamesman account</a>", $headers);
?>

<div class="untree_co-section" style="margin-top: 2rem;">
<div class="container">
<div class="block">
<div class="row justify-content-center">
<div class="col-md-9 col-lg-9 pb-4">
  
<h1>Welcome</h1>

<div class="alert alert-primary" style="font-size:1.2rem;">
   <p>
        A verification email has been sent to :<br>
        <span style="font-weight: bold;">
            "<?= auth()->user()->email ?>"
        </span>
    </p>
    <p>Click the link inside to confirm your email address and activate your account.</p>
</div>
<p>
    If you do not see the email, <a class="text-primary" style="font-size:1.2em; text-decoration:underline;font-style:italic" href="/page/signup1">Click here to re-send verification message</a>.
</p>

</div>
</div>
</div>
</div>
</div>

@include( 'partials.footer' )