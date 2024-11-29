@include( 'partials.header' )

<x-title text="Dashboard"></x-title>

@php
$genreColors = [
	'platformer' => 'blue',
	
	'shooter' => 'navy',
    'space shooter' => 'navy',

    'defense' => 'lime',
	'beat em up'=> 'lime',
	
    'puzzle' => 'yellow',
    'strategy' => 'yellow',

	'rpg' => 'silver',
	'explorer' => 'silver',

	'point and click' => 'pink',
	'simulation' => 'pink',
	
    'physics' => 'aqua',
    'launch' => 'aqua',

	'arcade' => 'teal',
	'runner' => 'teal',

	'fighter' => 'maroon',
	'battle royale' => 'maroon',
	'survival' => 'maroon',

	'racing' => 'black',

	'adventure' => 'green',

	'' => '',
];
@endphp

<!-- Start table -->
<div class="untree_co-section product-section before-footer-section" style="padding:0 !important;">
	<div class="container">
		<div>
			
			<a href="/page/add" class="btn" style="background-color:rgb(0, 90, 0); margin-top:30px; padding:8px 10px !important;">+ Add Game</a>
			<table id="myTable" class="display">
				<thead>
					<tr>
						<th>Game</th>
						<th style="text-align:center;">Genre 1</th>
						<th style="text-align:center;">Genre 2</th>
						<th style="text-align:center;">Date</th>
						<th style="text-align:right;">Actions</th>
					</tr>
				</thead>
				<tbody class="dashboard">
					@foreach($games as $game)
						<tr>
							<td>
								<img src="/images/thumbnails/{{$game->thumbnail}}" alt="{{$game->thumbnail}}">
								{{$game->title}}
							</td>
							<td style="text-align:center;">
								@php
									$badgeClass1 = $genreColors[$game->genre1];
								@endphp
								<span style="border-radius:20px; font-size:larger; padding:5px 10px; color:white; background-color:{{$badgeClass1}};">{{$game->genre1}}</span>
							</td>
							<td style="text-align:center;">
								@php
									$badgeClass2 = $genreColors[$game->genre2];
								@endphp
								<span style="border-radius:20px; font-size:larger; padding:5px 10px; color:white; background-color:{{$badgeClass2}};">{{$game->genre2}}</span>
							</td>
							<td style="text-align:center;">{{$game->created_at}}</td>
							<td style="text-align:right;">
								<a href="/page/edit?id={{$game->id}}" class="btn btn-primary" style="margin-bottom:5px; padding:5px 12px; width:100px;">Edit</a>
								<form action="/delete" method="post"> @csrf <button type="submit" class="btn btn-danger" style="background-color:brown; padding:5px 12px; width:100px;">Delete</button></form>
							</td>
						</tr>
					@endforeach
				</tbody>
			</table>
			<a href="/page/add" class="btn" style="background-color:rgb(0,90,0); padding:8px 10px !important;">+ Add Game</a>
			
		</div>
	</div>
</div>
<!-- End table -->

<script src="/js/jquery.js"></script>
<script src="/js/datatables.min.js"></script>
<script>
    let table = new DataTable('#myTable', {
        
    });
</script>

@include( 'partials.footer' )