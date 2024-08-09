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

    <table style="margin:0 0 10px 0; width:244px; background:#fff; border:1px solid #F3F3F3;" cellspacing="0" cellpadding="0"><tr><td style="font-family:verdana; font-size:11px; color:#000; padding:5px 5px;"><iframe allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" style="width:968px;height:561px;" src="https://html5.gamedistribution.com/c99a523e92ed42de95809f52f7508e12/" width="968px" height="561px" frameborder="0" scrolling="no"></iframe></td></tr><tr><td style="font-family:verdana; font-size:11px; padding:5px 10px; border-top:1px solid #F3F3F3;" align="center"><strong><a href="https://m.gamesflow.com/?play=10085326" target="_blank">Urban assault force</a></strong> | <a href="https://m.gamesflow.com" title="Mobile games with Gamesflow.com" target="_blank">Mobile games</a> with Gamesflow.com</td></tr></table>
    <table style="margin:0 0 10px 0; width:244px; background:#fff; border:1px solid #F3F3F3;" cellspacing="0" cellpadding="0"><tr><td style="font-family:verdana; font-size:11px; color:#000; padding:5px 5px;"><iframe allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" style="width:968px;height:561px;" src="https://html5.gamedistribution.com/5b1cb82de3324264912fe78c015fafa0/" width="968px" height="561px" frameborder="0" scrolling="no"></iframe></td></tr><tr><td style="font-family:verdana; font-size:11px; padding:5px 10px; border-top:1px solid #F3F3F3;" align="center"><strong><a href="https://m.gamesflow.com/?play=10085279" target="_blank">Grand clash arena</a></strong> | <a href="https://m.gamesflow.com" title="Mobile games with Gamesflow.com" target="_blank">Mobile games</a> with Gamesflow.com</td></tr></table>
    <iframe src="https://html5.gamemonetize.co/1oa8q7ngksa2dfiy7lhfqitbq75i2k1j/" width="750" height="1334" scrolling="none" frameborder="0"></iframe>
    <iframe src="https://html5.gamemonetize.co/tvmfhxxrzahsek5v97goloybsrswo07s/" width="1280" height="720" scrolling="none" frameborder="0"></iframe>
    <iframe src="https://www.crazygames.com/embed/fleeing-the-complex"  width="560" height="384" frameborder="0" allow="gamepad *;"></iframe>
    <iframe src="https://html5.gamemonetize.co/qmiysm6xxk90nbsv387jo7v6jooth9c7/" width="800" height="500" scrolling="none" frameborder="0"></iframe>
    <iframe src="https://archive.org/embed/f-1211" width="560" height="384" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>
-->

@include( 'footer' );
