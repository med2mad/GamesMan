<!-- /*
* Bootstrap 5
* Template Name: Furni
* Template Author: Untree.co
* Template URI: https://untree.co/
* License: https://creativecommons.org/licenses/by/3.0/
*/ -->
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="author" content="Untree.co">
	<link rel="shortcut icon" href="/cross.svg">

  	<meta name="description" content="" />
  	<meta name="keywords" content="bootstrap, bootstrap4" />

	<!-- Bootstrap CSS -->
	<link href="/css/bootstrap.min.css" rel="stylesheet">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
	<link href="/css/tiny-slider.css" rel="stylesheet">
	<link href="/css/style.css" rel="stylesheet">

	<link href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" rel="stylesheet">

	<!--server(cannot have emulator in infinityfree.com) <script src="https://cdn.jsdelivr.net/npm/@ruffle-rs/ruffle@latest/ruffle.js"></script> --> 

	<title>GamesMan</title>
</head>

	<body>

		<!-- Start Header/Navigation -->
		<nav class="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

			<div class="container">
				<a class="navbar-brand" href="index.html"><img src="/images/home/logo-2.png" alt=""><span>.</span></a>

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
						<li class="{{$page=='add'?'nav-item active':''}}">
							<a class="nav-link" href="/page/add">Add game</a>
						</li>
						<li class="{{$page=='contact'?'nav-item active':''}}">
							<a class="nav-link" href="/page/contact">Contact us</a>
						</li>
					</ul>

					<ul class="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
						<li><a class="nav-link" href="#"><img src="/images/user.svg"></a></li>
						<li><a class="nav-link" href="cart.html"><img src="/images/cart.svg"></a></li>
					</ul>
				</div>
			</div>
				
		</nav>
		<!-- End Header/Navigation -->

		<!-- Start Hero Section -->
		<div class="hero" style="margin-bottom: 60px;">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-lg-5">
						<div class="intro-excerpt">
							<h1>About-Us</h1>
							<p class="mb-4">Point at a target, and we will assure it gets the Ass-Assassination it diserves.</p>
							<p><a href="" class="btn btn-secondary me-2">Shop Now</a><a href="#" class="btn btn-white-outline">Explore</a></p>
						</div>
					</div>
					<div class="col-lg-7" style="padding-top:50px;">
						<div class="hero-img-wrap">
							<div class="splide" style="position:relative;">
								<div class="startcarosel"></div>
								<div class="endcarosel"></div>
								<div class="splide__track">
									<ul class="splide__list" style="height:50%;">
										<li class="splide__slide">
											<img src="/images/header/flashpoint-logo.png" class="img-fluid" style="position:absolute;top:0;">
										</li>
										<li class="splide__slide">
											<img src="/images/header/gamemonetize-logo.png" class="img-fluid" style="position:absolute;top:0;">
										</li>
										<li class="splide__slide">
											<img src="/images/header/Newgrounds-logo.png" class="img-fluid" style="position:absolute;top:0;">
										</li>
										<li class="splide__slide">
											<img src="/images/header/kongregate-logo.png" class="img-fluid" style="position:absolute;top:0;">
										</li>
										<li class="splide__slide">
											<img src="/images/header/Unity_2021-logo.png" class="img-fluid" style="position:absolute;top:0;">
										</li>
										<li class="splide__slide">
											<img src="/images/header/twoplayergames-logo.png" class="img-fluid" style="position:absolute;top:0;">
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- End Hero Section -->