@include( 'header' );


<form action="/page/games" method="GET">
	<label for="title">Search : </label>
	<input name="title" value="{{$title}}" type="text" id="title"/>
	<label for="sort">Sort by : </label>
	<select name="sort">
		<option value="popularity" {{$sortBy=='popularity'?'selected':''}}>Popularity</option>
		<option value="title" {{$sortBy=='title'?'selected':''}}>Title</option>
		<option value="genre" {{$sortBy=='genre'?'selected':''}}>Genre</option>
	</select>
	<select name="order">
		<option value="asc" {{$order=='asc'?'selected':''}}>Asc</option>
		<option value="desc" {{$order=='desc'?'selected':''}}>Desc</option>
	</select>
	<input type="submit" value="Search"/>
</form>

<!-- Start services Section -->
<div class="untree_co-section product-section before-footer-section" style="margin-top:4rem; padding-bottom:0 !important;">
	<div class="container">
		<div class="row">

			@foreach($data as $game)
				@if($game->valid)
					<div class="col-12 col-md-4 col-lg-3 mb-5">
						<a class="product-item" href="/play?file={{$game->file}}&url={{$game->url}}">
							<img
							onmouseover="this.src='/images/screenshots/{{$game->screenshot}}'"
							onmouseout="this.src='/images/thumbnails/{{$game->thumbnail}}'"
							src="/images/screenshots/{{$game->thumbnail}}"
							class="img-fluid product-thumbnail"
							>
							<h3 class="product-title">{{$game->title}}</h3>
							<p class="product-price">
								Genre : {{$game->genre}}<br>
								Popularity : <img src="/images/stars/{{$game->popularity}}.png" style="width:100px;">
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


@include( 'footer' );