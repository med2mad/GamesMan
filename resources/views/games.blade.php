@include( 'header' )

<form action="/page/games" method="GET">
	<label for="title">Search : </label>
	<input name="title" value="{{$title}}" type="text" id="title"/>
	<label for="sortby">Sort by : </label>
	<select name="sortby" id="sortby">
		<option value="popularity" {{$sortby=='popularity'?'selected':''}}>Popularity</option>
		<option value="title" {{$sortby=='title'?'selected':''}}>Title</option>
		<option value="genre" {{$sortby=='genre'?'selected':''}}>Genre</option>
	</select>
	<select name="order">
		<option value="asc" {{$order=='asc'?'selected':''}}>Asc</option>
		<option value="desc" {{$order=='desc'?'selected':''}}>Desc</option>
	</select>
	<input type="submit" value="Search"/>
</form>

{{ $data->appends(array('title'=>$title, 'sortby'=>$sortby, 'order'=>$order))->links('pagination::bootstrap-4') }}

<!-- Start services Section -->
<div class="untree_co-section product-section before-footer-section" style="margin-top:4rem; padding-bottom:0 !important;">
	<div class="container">
		<div class="row">

			@foreach($data as $game)
				@if($game->valid)
					<div class="col-12 col-md-4 col-lg-3 mb-5">
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

@include( 'footer' )