@include( 'header' );

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
    <script src="/ruffle/ruffle.js"></script>

@include( 'footer' );
