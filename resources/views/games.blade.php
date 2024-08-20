@include( 'partials.header' )

<div class="search">
	<div>
		<form action="/page/games" method="GET">
			<div class="row" style="align-items:flex-end;">
				<div class="col-5">
					<label for="title">Search : </label>
					<input name="title" value="{{$title}}" type="text" id="title" class="form-control" placeholder="Title"/>
				</div>
				<div class="col-4">
					<label for="sortby">Sort by : </label>
					<div class="row">
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
				<div class="col-2">
					<input type="submit" value="Search" class="btn btn-primary-hover-outline" />
				</div>
			</div>
		</form>
	</div>

	{{ $data->appends(array('title'=>$title, 'sortby'=>$sortby, 'order'=>$order))->links('pagination::bootstrap-4') }}
</div>

<!-- Start services Section -->
<div class="untree_co-section product-section before-footer-section" style="margin-top:4rem; padding-bottom:0 !important;">
	<div class="container">
		<div class="row">

			@foreach($data as $game)
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
			@endforeach
			
		</div>
	</div>
</div>
<!-- End services Section -->



<script>
	document.addEventListener("DOMContentLoaded", (event) => {
		document.querySelector("li.page-item.active > span").style.backgroundColor="gray"
		document.querySelector("li.page-item.active > span").style.borderColor="gray"
		document.querySelector("li.page-item.disabled > span").style.backgroundColor="gray"
		document.querySelector("li.page-item.disabled > span").style.borderColor="gray"
	
		document.querySelector(".pagination").style.margin=0
	})
</script>

@include( 'partials.footer' )