<select name="{{$genre}}" id="{{$genre}}" class="form-control">
    <option value="" {{$value===''?'selected':''}}></option>
    <option value="adventure" {{$value==='adventure'?'selected':''}}>adventure</option>
    <option value="arcade" {{$value==='arcade'?'selected':''}}>arcade</option>
    <option value="battle royale" {{$value==='battle royale'?'selected':''}}>battle royale</option>
    <option value="beat em up" {{$value==='beat em up'?'selected':''}}>beat em up</option>
    <option value="defense" {{$value==='defense'?'selected':''}}>defense</option>
    <option value="explorer" {{$value==='explorer'?'selected':''}}>explorer</option>
    <option value="fighter" {{$value==='fighter'?'selected':''}}>fighter</option>
    <option value="launch" {{$value==='launch'?'selected':''}}>launch</option>
    <option value="physics" {{$value==='physics'?'selected':''}}>physics</option>
    <option value="platformer" {{$value==='platformer'?'selected':''}}>platformer</option>
    <option value="point and click" {{$value==='point and click'?'selected':''}}>point and click</option>
    <option value="puzzle" {{$value==='puzzle'?'selected':''}}>puzzle</option>
    <option value="racing" {{$value==='racing'?'selected':''}}>racing</option>
    <option value="rpg" {{$value==='rpg'?'selected':''}}>rpg</option>
    <option value="runner" {{$value==='runner'?'selected':''}}>runner</option>
    <option value="shooter" {{$value==='shooter'?'selected':''}}>shooter</option>
    <option value="simulation" {{$value==='simulation'?'selected':''}}>simulation</option>
    <option value="space shooter" {{$value==='space shooter'?'selected':''}}>space shooter</option>
    <option value="strategy" {{$value==='strategy'?'selected':''}}>strategy</option>
    <option value="survival" {{$value==='survival'?'selected':''}}>survival</option>
</select>