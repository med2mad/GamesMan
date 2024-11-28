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

			<table id="myTable" class="display">
				<thead>
					<tr>
						<th>Game</th>
						<th style="text-align:center;">Genre 1</th>
						<th style="text-align:center;">Genre 2</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody class="dashboard">
					@foreach($data as $game)
						<tr>
							<td>
								<img src="/images/thumbnails/{{$game->thumbnail}}" alt="{{$game->thumbnail}}">
								{{$game->title}}
							</td>
							<td style="text-align:center;">
								@php
									$badgeClass1 = $genreColors[$game->genre1];
								@endphp
								<span style="border-radius:20px; font-size:larger; padding:5px; color:white; background-color:{{$badgeClass1}};">{{$game->genre1}}</span>
							</td>
							<td style="text-align:center;">
								@php
									$badgeClass2 = $genreColors[$game->genre2];
								@endphp
								<span style="border-radius:20px; font-size:larger; padding:5px; color:white; background-color:{{$badgeClass2}};">{{$game->genre2}}</span>
							</td>
							<td>{{$game->created_at}}</td>
							<td><a href="/" class="btn btn-primary"></a></td>
						</tr>
					@endforeach
				</tbody>
			</table>

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