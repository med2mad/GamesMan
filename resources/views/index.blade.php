@include( 'partials.nav' )
@include( 'partials.hero' )

		<!-- Start Product Section -->
		<div class="product-section" style="margin-bottom: 30px;">
			<div class="container">
				<div class="row" style="align-items:center;">

					<!-- Start Column 1 -->
					<div class="col-md-12 col-lg-3 mb-5 mb-lg-0">
						<h2 class="mb-4 section-title">Most popular games at this moment.</h2>
						<p><a href="/page/games" class="btn">All Games</a></p>
					</div> 
					<!-- End Column 1 -->

					<!-- Start Column 2 -->
					<div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a class="product-item" href="/play/3">
							<img 
								onmouseover="this.src='/images/screenshots/Flipper Cube.jpg'"
								onmouseout="this.src='/images/thumbnails/Flipper Cube.jpg'"
								src="/images/thumbnails/Flipper Cube.jpg"
								class="img-fluid product-thumbnail"
							>
							<h3 class="product-title">Flipper Cube</h3>
							<p class="product-price">
								Genre : puzzle<br>
								Popularity : <img src="/images/stars/5.png" style="width:100px;">
							</p>
							<span class="icon-cross">
								<img src="/images/cross.svg" class="img-fluid">
							</span>
						</a>
					</div> 
					<!-- End Column 2 -->

					<!-- Start Column 3 -->
					<div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a class="product-item" href="/play/100">
							<img 
								onmouseover="this.src='/images/screenshots/grand clash arena.jpg'"
								onmouseout="this.src='/images/thumbnails/grand clash arena.jpg'"
								src="/images/thumbnails/grand clash arena.jpg"
								class="img-fluid product-thumbnail"
							>
							<h3 class="product-title">Grand Clash Arena</h3>
							<p class="product-price">
								Genre : battle royale<br>
								Popularity : <img src="/images/stars/5.png" style="width:100px;">
							</p>
							<span class="icon-cross">
								<img src="/images/cross.svg" class="img-fluid">
							</span>
						</a>
					</div> 
					<!-- End Column 3 -->

					<!-- Start Column 4 -->
					<div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a class="product-item" href="/play/124">
							<img 
								onmouseover="this.src='/images/screenshots/f74effdd-39d2-413d-93ff-68c912f6dd77.png'"
								onmouseout="this.src='/images/thumbnails/f74effdd-39d2-413d-93ff-68c912f6dd77.png'"
								src="/images/thumbnails/f74effdd-39d2-413d-93ff-68c912f6dd77.png"
								class="img-fluid product-thumbnail"
							>
							<h3 class="product-title">Run</h3>
							<p class="product-price">
								Genre : runner<br>
								Popularity : <img src="/images/stars/5.png" style="width:100px;">
							</p>
							<span class="icon-cross">
								<img src="/images/cross.svg" class="img-fluid">
							</span>
						</a>
					</div> 
					<!-- End Column 4 -->

				</div>
			</div>
		</div>
		<!-- End Product Section -->

		<!-- Start Why Choose Us Section -->
		<div class="why-choose-section" style="padding: 2rem 0 0 0;">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-lg-6 div3">
						<h2 class="section-title">Help us preserve games and animations from the web.</h2>
						
						<div class="row my-5">
							<div class="col-6 col-md-6">
								<div class="feature">
									<div class="icon">
										<img src="/images/flash.png" alt="Image" class="imf-fluid">
									</div>
									<h3>Flash is Back !</h3>
									<p>Since Adobe blocked Flash Player in January 12, 2021, new ways are made to play '.swf' files safely, like the popular emulator "Ruffle".</p>
								</div>
							</div>

							<div class="col-6 col-md-6">
								<div class="feature">
									<div class="icon">
										<img src="/images/support.png" alt="Image" class="imf-fluid">
									</div>
									<h3>Join the community effort</h3>
									<p>Since December 2017, over 200,000 games and animations have been preserved across more than a hundred browser plugins and web technologies.</p>
								</div>
							</div>

						</div>
					</div>

					<div class="col-lg-5 div4">
						<div class="img-wrap">
							<img src="/images/home/ww1.png" alt="Image" class="img-fluid">
						</div>
					</div>

				</div>
			</div>
		</div>
		<!-- End Why Choose Us Section -->

		<!-- Start We Help Section -->
		<div class="we-help-section">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-lg-7 mb-5 mb-lg-0 div1">
						<div class="imgs-grid">
							<div class="grid grid-1"><img src="/images/home/methode.png" height="350" width="400" alt="Untree.co" ></div>
							<div class="grid grid-2"><img src="/images/home/Jane-Smith.jpg" alt="Untree.co"></div>
							<div class="grid grid-3"><img src="/images/home/assassination-classroom.jpg" width="300" height="250" alt="Untree.co"></div>
						</div>
					</div>
					<div class="col-lg-5 ps-lg-5 div2">
						<h2 class="section-title mb-4">Oul Goal.</h2>
						<p>
							We pick games that meet today's expectations from multiple websites/archives,
							so you wont have to search platforms that can even mix different media types (like animations/images/audio/...).<br>
							To go use the websites yourself, links are down below.
						</p>

						<ul class="list-unstyled custom-list my-4">
							<li>Our platform is famiy frendly</li>
							<li>All genres of games all available</li>
							<li>Add a game you find to always find it here</li>
							<li>To share a game you made, submit it here</li>
						</ul>
						<p><a herf="/page/games" class="btn">Explore</a></p>
					</div>
				</div>
			</div>
		</div>
		<!-- End We Help Section -->

		<!-- Start Popular Product -->
		<div class="popular-product" id="popular">
			<div class="container">
				<h2 class="section-title">Recent added games</h2>
				<div class="row">
					<div class="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
						<div class="product-item-sm d-flex">
							<div class="thumbnail" style="text-align:center;">
								<img src="/images/screenshots/1724104252_9dd86090-8627-4aee-923f-84777d8b4f0c.png" alt="Image" class="img-fluid">
							</div>
							<div class="pt-3">
								<h3>Level Up!</h3>
								<p>Genre : platformer</p>
								<p><a href="/play/160"><u>Play</u></a></p>
							</div>
						</div>
					</div>

					<div class="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
						<div class="product-item-sm d-flex">
							<div class="thumbnail" style="text-align:center;">
								<img src="/images/screenshots/225b4262-14da-4ab6-99d9-382ba01fb021.png" alt="Image" class="img-fluid">
							</div>
							<div class="pt-3">
								<h3>Animator vs animation</h3>
								<p>Genre : arcade</p>
								<p><a href="/play/105"><u>Play</u></a></p>
							</div>
						</div>
					</div>

					<div class="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
						<div class="product-item-sm d-flex">
							<div class="thumbnail" style="text-align:center;">
								<img src="/images/screenshots/d70cc98a-ea48-4aaa-8330-83fa09deba99.png" alt="Image" class="img-fluid">
							</div>
							<div class="pt-3">
								<h3>King of Fighters Wing</h3>
								<p>Genre : fighter</p>
								<p><a href="/play/75"><u>Play</u></a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- End Popular Product -->

		
		<script>
			document.addEventListener("DOMContentLoaded", (event) => {
				gsap.registerPlugin(ScrollTrigger);

				gsap.from(document.querySelectorAll('.div1'), {
					xPercent:-70,
					opacity:0,
					scrollTrigger:{trigger:'.div1', start:"top 100%", end:'bottom 90%', scrub:true}
				});
				gsap.from(document.querySelectorAll('.div2'), {
					xPercent:70,
					opacity:0,
					scrollTrigger:{trigger:'.div2', start:"top 100%", end:'bottom 90%', scrub:true}
				});

				gsap.from(document.querySelectorAll('.div3'), {
					xPercent:-70,
					opacity:0,
					scrollTrigger:{trigger:'.div3', start:"top 100%", end:'bottom 90%', scrub:true}
				});
				gsap.from(document.querySelectorAll('.div4'), {
					xPercent:70,
					opacity:0,
					scrollTrigger:{trigger:'.div4', start:"top 100%", end:'bottom 90%', scrub:true}
				});
			});
		</script>

		<script src="/js/gsap.min.js"></script>
		<script src="/js/ScrollTrigger.min.js"></script>

	@include( 'partials.footer' )