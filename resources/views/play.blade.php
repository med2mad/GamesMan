@include( 'partials.header' )

<div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">

    <div style="max-width:960px;">
        @if($game->file)
        <div id="flash-game-container"></div>
        <script>
            window.addEventListener("load", (event) => {
                const ruffle = window.RufflePlayer.newest();
                const player = ruffle.createPlayer();
                const container = document.getElementById("flash-game-container");
                container.appendChild(player);
                player.load("/games/{{$game->file}}.swf");
            });
        </script>
        <script src="/ruffle/ruffle.js"></script> <!--server (remove line, cannot have emulator on infinityfree) -->
        @else
        <div class="game">
            <iframe src="{{$game->url}}" width="960" height="600"  scrolling="none" frameborder="0"></iframe>
        </div>
        @endif
    </div>

<div>

    <div  class="feature" style="margin-top: 20px;">
        <h2 class="mb-2 section-title">{{$game->title}}</h2>

        <h3 style="text-decoration:underline; margin-bottom:0;">Genre :</h3>
        <p class="mb-4" style="margin-left:10px;">{{$game->genre}}</p>

        <h3 style="text-decoration:underline; margin-bottom:0;">Popularity :</h3>
        <p class="mb-4"><img src="/images/stars/{{$game->popularity}}.png" style="width:100px;"> </p>

        <h3 style="text-decoration:underline; margin-bottom:0;">Instructions :</h3>
        <p class="mb-4" style="margin-left:10px; white-space:pre-wrap;">{{$game->instructions}}</p>
    </div>

</div>
</div>


<div style="color: rgba(165, 42, 42, 0.582);">
    (*note) : Press "Escap" to control mouse cursor.
</div>


 @include( 'partials.footer' )