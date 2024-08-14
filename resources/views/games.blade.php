@include( 'header' );

		<!-- Start services Section -->
		<div class="untree_co-section product-section before-footer-section" style="margin-top:4rem; padding-bottom:0 !important;">
		    <div class="container">
		      	<div class="row">

				  	@foreach($data as $game)
						@if($game->valid == 0)
							<div class="col-12 col-md-4 col-lg-3 mb-5">
								<a class="product-item" href="/play?file={{$game->file}}&url={{$game->url}}">
									<img
									<!-- onmouseover="this.src='/images/screenshots/{{$game->screenshot}}'"
									onmouseout="this.src='/images/thumbnails/{{$game->thumbnail}}'" -->
									src="/images/thumbnails/{{$game->thumbnail}}"
									class="img-fluid product-thumbnail"
									>
									<h3 class="product-title">{{$game->name}}</h3>
									<p class="product-price">
										Owner : {{$game->owner}}<br>
										Submitted : {{$game->date}}<br>
										Type : {{$game->category}}
									</p>
									<span class="icon-cross">
										<img src="/images/cross.svg" class="img-fluid">
									</span>
								</a>
							</div> 
						@endif
					@endforeach
					
		      	</div>
		    </div>
		</div>
		<!-- End services Section -->
		
		<!-- Start Why Choose Us Section -->
		<div class="why-choose-section">
			<div class="container">
				
				<div class="row my-5">
					<div class="col-6 col-md-6 col-lg-3 mb-4">
						<div class="feature">
							<div class="icon">
								<img src="/images/truck.svg" alt="Image" class="imf-fluid">
							</div>
							<h3>Fast &amp; Free Shipping</h3>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing. Nullam ac aliquet velit. Aliquam vulputate.</p>
						</div>
					</div>

					<div class="col-6 col-md-6 col-lg-3 mb-4">
						<div class="feature">
							<div class="icon">
								<img src="/images/bag.svg" alt="Image" class="imf-fluid">
							</div>
							<h3>Easy to Shop</h3>
							<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
						</div>
					</div>

					<div class="col-6 col-md-6 col-lg-3 mb-4">
						<div class="feature">
							<div class="icon">
								<img src="/images/support.svg" alt="Image" class="imf-fluid">
							</div>
							<h3>24/7 Support</h3>
							<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
						</div>
					</div>

					<div class="col-6 col-md-6 col-lg-3 mb-4">
						<div class="feature">
							<div class="icon">
								<img src="/images/return.svg" alt="Image" class="imf-fluid">
							</div>
							<h3>Hassle Free Returns</h3>
							<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
						</div>
					</div>

					<div class="col-6 col-md-6 col-lg-3 mb-4">
						<div class="feature">
							<div class="icon">
								<img src="/images/money.svg" alt="Image" class="imf-fluid" style="width:40px;">
							</div>
							<h3>Internaional money transitions</h3>
							<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
						</div>
					</div>

					<div class="col-6 col-md-6 col-lg-3 mb-4">
						<div class="feature">
							<div class="icon">
								<img src="/images/check.svg" alt="Image" class="imf-fluid" style="width:40px;">
							</div>
							<h3>Job done correctly</h3>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing. Nullam ac aliquet velit. Aliquam vulputate.</p>
						</div>
					</div>

					<div class="col-6 col-md-6 col-lg-3 mb-4">
						<div class="feature">
							<div class="icon">
								<img src="/images/clock.svg" alt="Image" class="imf-fluid" style="width:40px;">
							</div>
							<h3>Job done fast</h3>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing. Nullam ac aliquet velit. Aliquam vulputate.</p>
						</div>
					</div>

					<div class="col-6 col-md-6 col-lg-3 mb-4">
						<div class="feature">
							<div class="icon">
								<img src="/images/privacy.svg" alt="Image" class="imf-fluid" style="width:40px;">
							</div>
							<h3>Client privacy</h3>
							<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
						</div>
					</div>

				</div>
			
			</div>
		</div>
		<!-- End Why Choose Us Section -->

		<!-- Start Product Section -->
		<div class="product-section pt-0">
			<div class="container">
				<div class="row">

					<!-- Start Column 1 -->
					<div class="col-md-12 col-lg-3 mb-5 mb-lg-0">
						<h2 class="mb-4 section-title">Crafted with excellent material.</h2>
						<p class="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
						<p><a href="#" class="btn">Explore</a></p>
					</div> 
					<!-- End Column 1 -->

					<!-- Start Column 2 -->
					<div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a class="product-item" href="#">
							<img src="/images/products/glock.jpg" class="img-fluid product-thumbnail">
							<h3 class="product-title">gun</h3>
							<strong class="product-price">$50.00</strong>

							<span class="icon-cross">
								<img src="/images/cross.svg" class="img-fluid">
							</span>
						</a>
					</div> 
					<!-- End Column 2 -->

					<!-- Start Column 3 -->
					<div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a class="product-item" href="#">
							<img src="/images/products/herobomb.png" class="img-fluid product-thumbnail">
							<h3 class="product-title">Kruzo Aero Chair</h3>
							<strong class="product-price">$78.00</strong>

							<span class="icon-cross">
								<img src="/images/cross.svg" class="img-fluid">
							</span>
						</a>
					</div>
					<!-- End Column 3 -->

					<!-- Start Column 4 -->
					<div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a class="product-item" href="#">
							<img src="/images/products/game.jpg" class="img-fluid product-thumbnail">
							<h3 class="product-title">Ergonomic Chair</h3>
							<strong class="product-price">$43.00</strong>

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

		

		<!-- Start Testimonial Slider -->
		<div class="testimonial-section before-footer-section">
			<div class="container">
				<div class="row">
					<div class="col-lg-7 mx-auto text-center">
						<h2 class="section-title">Testimonials</h2>
					</div>
				</div>

				<div class="row justify-content-center">
					<div class="col-lg-12">
						<div class="testimonial-slider-wrap text-center">

							<div id="testimonial-nav">
								<span class="prev" data-controls="prev"><span class="fa fa-chevron-left"></span></span>
								<span class="next" data-controls="next"><span class="fa fa-chevron-right"></span></span>
							</div>

							<div class="testimonial-slider">
								
								<div class="item">
									<div class="row justify-content-center">
										<div class="col-lg-8 mx-auto">

											<div class="testimonial-block text-center">
												<blockquote class="mb-5">
													<p>&ldquo;Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.&rdquo;</p>
												</blockquote>

												<div class="author-info">
													<div class="author-pic">
														<img src="/images/person-1.png" alt="Maria Jones" class="img-fluid">
													</div>
													<h3 class="font-weight-bold">Maria Jones</h3>
													<span class="position d-block mb-3">CEO, Co-Founder, XYZ Inc.</span>
												</div>
											</div>

										</div>
									</div>
								</div> 
								<!-- END item -->

								<div class="item">
									<div class="row justify-content-center">
										<div class="col-lg-8 mx-auto">

											<div class="testimonial-block text-center">
												<blockquote class="mb-5">
													<p>&ldquo;Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.&rdquo;</p>
												</blockquote>

												<div class="author-info">
													<div class="author-pic">
														<img src="/images/person-1.png" alt="Maria Jones" class="img-fluid">
													</div>
													<h3 class="font-weight-bold">Maria Jones</h3>
													<span class="position d-block mb-3">CEO, Co-Founder, XYZ Inc.</span>
												</div>
											</div>

										</div>
									</div>
								</div> 
								<!-- END item -->

								<div class="item">
									<div class="row justify-content-center">
										<div class="col-lg-8 mx-auto">

											<div class="testimonial-block text-center">
												<blockquote class="mb-5">
													<p>&ldquo;Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.&rdquo;</p>
												</blockquote>

												<div class="author-info">
													<div class="author-pic">
														<img src="/images/person-1.png" alt="Maria Jones" class="img-fluid">
													</div>
													<h3 class="font-weight-bold">Maria Jones</h3>
													<span class="position d-block mb-3">CEO, Co-Founder, XYZ Inc.</span>
												</div>
											</div>

										</div>
									</div>
								</div> 
								<!-- END item -->

							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- End Testimonial Slider -->

		
	@include( 'footer' );