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

<!-- 
    <iframe src="https://html5.gamemonetize.co/tvmfhxxrzahsek5v97goloybsrswo07s/" width="1280" height="720" scrolling="none" frameborder="0"></iframe>
    <iframe src="https://www.crazygames.com/embed/fleeing-the-complex"  width="560" height="384" frameborder="0" allow="gamepad *;"></iframe>
    <iframe src="https://html5.gamemonetize.co/qmiysm6xxk90nbsv387jo7v6jooth9c7/" width="800" height="500" scrolling="none" frameborder="0"></iframe>
    <iframe src="https://archive.org/embed/f-1211" width="560" height="384" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>
-->

@include( 'footer' );
