
		<!-- Start Hero Section -->
		<div class="hero" style="margin-bottom:45px; position:relative;">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-lg-5">
						<div class="intro-excerpt">
							<img src="/images/logo-hero.png" alt="" class="mb-1">
							<p><a href="/page/games" class="btn btn-secondary me-2">All Games</a><a href="/page/signup" class="btn btn-white-outline">Sign Up</a></p>
						</div>
					</div>
					<div class="col-lg-7">
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
											<img src="/images/header/Newgrounds-Logo.png" class="img-fluid" style="position:absolute;top:0;">
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

			<div class="wave" style="top:18px;">
				<svg data-name="Layer 1" viewBox="0 0 1200 120" preserveAspectRatio="none">
					<path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
				</svg>
			</div>
		</div>

		<script src="/js/splide.min.js"></script>
		<script src="/js/splide-extension-auto-scroll.min.js"></script>
	
		<script>
			document.addEventListener('DOMContentLoaded', function() {
				var splide = new Splide('.splide', {
					height:'200px',
					fixedWidth:'300px',
					gap:'150px',
					type:'loop',
					arrows:false,
					autoScroll:{speed:1.5, autoStart:true},
				});
				
				splide.mount(window.splide.Extensions);
			});
		</script>
	
		<!-- End Hero Section -->
