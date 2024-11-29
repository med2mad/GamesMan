<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="author" content="Untree.co">
	<link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
	<link rel="shortcut icon" href="/controller.svg">

  	<meta name="description" content="" />
	<link href="/css/bootstrap.min.css" rel="stylesheet">
	<link href="/css/font-awesome.min.css" rel="stylesheet">
	<link href="/css/tiny-slider.css" rel="stylesheet">
	<link href="/css/style.css" rel="stylesheet">
	<link href="/css/splide.min.css" rel="stylesheet">
	<link href="/css/datatables.min.css" rel="stylesheet">

	<!--server(cannot have emulator in infinityfree.com)<script src="https://cdn.jsdelivr.net/npm/@ruffle-rs/ruffle@latest/ruffle.js"></script> -->

	<title>GamesMan</title>
</head>

	<body>

		<!-- Start Header/Navigation -->
		<nav class="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

			<div class="container">
				<a class="navbar-brand" href="/"><img src="/images/logo-nav.png" alt="logo" height="20px"><span>.</span></a>

				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarsFurni">
					<ul class="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
						<li class="{{$page=='index'?'nav-item active':''}}">
							<a class="nav-link" href="/page/index">Home</a>
						</li>
						<li class="{{$page=='games'?'nav-item active':''}}">
							<a class="nav-link" href="/page/games">Games</a>
						</li>
						@auth
						<li class="{{$page=='dashboard'?'nav-item active':''}}">
							<a class="nav-link" href="/page/dashboard?userId={{auth()->user()->id}}">Dashboard</a>
						</li>
						@endauth
						<li class="{{$page=='contact'?'nav-item active':''}}">
							<a class="nav-link" href="/page/contact">Contact me</a>
						</li>
						@guest
							<li class="{{$page=='signup'?'nav-item active':''}}">
								<a class="nav-link" href="/page/signup">Signup</a>
							</li>
							<li class="{{$page=='login'?'nav-item active':''}}">
								<a class="nav-link" href="/page/login">Login</a>
							</li>
						@endguest
						@auth
							<li>
								<a class="nav-link" href="/logout">Logout</a>
							</li>
							<li>
								<img src="/images/users/{{auth()->user()->photo}}" class="photo">
							</li>
						@endauth
					</ul>

					<ul class="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
						<li><a class="nav-link" href="#"><img src="/images/user.svg"></a></li>
						<li><a class="nav-link" href="cart.html"><img src="/images/cart.svg"></a></li>
					</ul>
				</div>
			</div>
				
		</nav>
		<!-- End Header/Navigation -->
