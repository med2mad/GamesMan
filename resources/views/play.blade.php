@include( 'header' )

@if($file)

    <div id="flash-game-container"></div>
    <script>
        window.addEventListener("load", (event) => {
            const ruffle = window.RufflePlayer.newest();
            const player = ruffle.createPlayer();
            const container = document.getElementById("flash-game-container");
            container.appendChild(player);
            player.load("/games/{{$file}}.swf");
        });
    </script>
    <script src="/ruffle/ruffle.js"></script> <!--server (remove line, cannot have emulator on infinityfree) -->

@else

    <div class="game">

        <iframe src="{{$url}}" width="960" height="600" scrolling="none" frameborder="0"></iframe>
    
    </div>
    
@endif
    
    <!-- 
    <iframe src="" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" style="width: 100%; height: 100%;" width="960" height="600" frameborder="0" scrolling="no"></iframe>
     -->




 @include( 'footer' )