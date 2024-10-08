@include( 'partials.header' )

		<!-- zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz -->
		<div class="hero" style="padding-bottom:10px !important;">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-lg-5">
						<div class="intro-excerpt">
							<h1 style="margin-bottom:5px; border: solid 2px rgb(255, 255, 255, 0.3); border-radius: 30px; text-align: center;">Search for Games</h1>
							<p style="text-align: center;">
								<a href="/page/games" class="btn btn-secondary me-2" style="padding: 5px 12px;">All Games</a>
								<a href="/page/contact" class="btn btn-white-outline" style="padding: 5px 12px;">Contact Me</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz -->


<fieldset>
<legend><div>Filter</div></legend>
<div class="search">
	<div class="filter">
		<form action="/page/games" method="GET">
			<div class="row" style="align-items:flex-end;">
				<div class="col-5" style="border-right: solid 2px #00000022;">
					<input name="title" value="{{$title}}" type="text" id="title" class="form-control" placeholder="Title"/>
				</div>
				<div class="col-4" style="padding: 0px 16px;">
					<label for="sortby">Sort by : </label>
					<div class="row" style="justify-content:center;">
						<div class="col-7 p-0">
							<select name="sortby" id="sortby" class="form-control">
								<option value="popularity" {{$sortby=='popularity'?'selected':''}}>Popularity</option>
								<option value="title" {{$sortby=='title'?'selected':''}}>Title</option>
								<option value="genre" {{$sortby=='genre'?'selected':''}}>Genre</option>
							</select>
						</div>
						<div class="col-4 p-0">
							<select name="order" class="form-control">
								<option value="asc" {{$order=='asc'?'selected':''}}>Asc</option>
								<option value="desc" {{$order=='desc'?'selected':''}}>Desc</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-3" style="border-left: solid 2px #00000022; padding-left:10px;">
					<input type="submit" value="Search" class="btn btn-primary-hover-outline" />
				</div>
			</div>
		</form>
	</div>

	{{ $data->appends(array('title'=>$title, 'sortby'=>$sortby, 'order'=>$order))->links('pagination::bootstrap-4') }}

</div>
</fieldset>
<!-- <div class="devider"></div> -->


<!-- Start services Section -->
<div class="untree_co-section product-section before-footer-section" style="padding:0 !important;">
	<div class="container">
		<div class="row">

			@foreach($data as $game)
				<div class="col-12 col-md-4 col-lg-3 mb-4">
					<a class="product-item" href="/play/{{$game->id}}">
						<img
							onmouseover="this.src='/images/screenshots/{{$game->screenshot}}'"
							onmouseout="this.src='/images/thumbnails/{{$game->thumbnail}}'"
							src="/images/thumbnails/{{$game->thumbnail}}"
							class="img-fluid product-thumbnail"
						>
						<h3 class="product-title">{{$game->title}}</h3>
						<p class="product-price">
							Genre : {{$game->genre}}<br>
							Popularity : <img src="/images/stars/{{$game->popularity}}.png" style="width:100px;">
						</p>
						<span class="icon-cross">
							<img src="/images/controller.svg" class="img-fluid">
						</span>
					</a>
				</div> 
			@endforeach
			
		</div>
	</div>
</div>
<!-- End services Section -->

<script>
	document.addEventListener("DOMContentLoaded", (event) => {
		document.querySelector("ul.pagination").style.flexWrap="wrap"
		document.querySelector("li.page-item.active > span").style.backgroundColor="gray"
		document.querySelector("li.page-item.active > span").style.borderColor="gray"
		document.querySelector("li.page-item.disabled > span").style.backgroundColor="gray"
		document.querySelector("li.page-item.disabled > span").style.borderColor="gray"
	})
</script>

@include( 'partials.footer' )