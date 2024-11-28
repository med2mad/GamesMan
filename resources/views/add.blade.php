@include( 'partials.header' )

<x-title text="Submit a Game"></x-title>

<!-- Start Contact Form -->
 
<fieldset>
<legend><div>Game info</div></legend>

<div class="untree_co-section">
  <div class="container">
    <div class="block">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-8 pb-4">

          <div class="form-group text-right">
            @isset($success)
              <p class="alert alert-info" >Thank you !<br>Game submitted for validation.</p>
            @endisset
          </div>

          <form action="/{{$route}}" method="post" enctype="multipart/form-data" id="myform">
            @csrf
            
            <div class="form-group">
              <label class="text-black" for="title">Game Title (*)</label>
              <input name="title" value="{{old('title')}}" type="text" class="form-control" id="title" required maxlength="255" />
            </div>
            @error('title')
              <div class="text-danger">{{ $message }}</div>
            @enderror

            <div class="row mt-2">
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="file" accept=".swf">Game File (.swf)</label>
                  <input name="file" type="file" class="form-control" id="file" />
                </div>
              </div>
              @error('file')
                <div class="text-danger">{{ $message }}</div>
              @enderror
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="url">Url    (if no file)   </label>
                  <input name="url" value="{{old('url')}}" type="text" class="form-control" id="url" maxlength="255" />
                </div>
              </div>
              @error('url')
                <div class="text-danger">{{ $message }}</div>
              @enderror
            </div>

            <div class="row mt-3">
              <div class="col-6">
                <div class="form-group">
                  <div style="display:flex; gap:10px; align-items:center;">
                    <label class="text-black" for="thumbnail">Thumbnail</label>
                    <div>
                      <a class="btn btn-secondary" style="width:90px; padding:5px; margin:2px;" onclick="document.getElementById('thumbnail').click();"><i style="font-size:1.2rem" class="fa fa-image"></i></a> <br>
                      <a class="btn btn-secondary" style="width:90px; padding:5px; margin:2px;" id="nothumbnail"><i style="font-size:1.2rem" class="fa fa-times"></i></a>
                    </div>
                    <div>
                      <input name="thumbnail" type="file" class="form-control" id="thumbnail" accept=".jpg,.jpeg,.png,.bmp,.gif" style="display:none;" />
                      <label for="thumbnail"><img id="imgthumbnail" width="80" height="80" src="/images/screenshots/none.jpg" alt="game img"></label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <div style="display:flex; gap:10px; align-items:center;">
                    <label class="text-black" for="screenshot">Screen Shot</label>
                    <div>
                      <a class="btn btn-secondary" style="width:90px; padding:5px; margin:2px;" onclick="document.getElementById('screenshot').click();"><i style="font-size:1.2rem" class="fa fa-image"></i></a> <br>
                      <a class="btn btn-secondary" style="width:90px; padding:5px; margin:2px;" id="noscreenshot"><i style="font-size:1.2rem" class="fa fa-times"></i></a>
                    </div>
                    <div>
                      <input name="screenshot" type="file" class="form-control" id="screenshot" accept=".jpg,.jpeg,.png,.bmp,.gif" style="display:none;" />
                      <label for="screenshot"><img id="imgscreenshot" width="80" height="80" src="/images/screenshots/none.jpg" alt="game img"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group mt-2">
              
            </div>

            
            <div class="row mt-2">
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="genre1">Genre 1</label>
                  <x-genres genre="genre1"></x-genres>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="genre2">Genre 2</label>
                  <x-genres genre="genre2"></x-genres>
                </div>
              </div>
            </div>


            <div class="form-group mt-3">
              <label class="text-black" for="instructions">Instructions</label>
              <textarea name="instructions" class="form-control" id="instructions" cols="30" rows="5"></textarea>
            </div>

            <input type="submit" class="btn btn-primary-hover-outline mt-3" value="Submit Game" />
          </form>

        </div>
      </div>
    </div>
  </div>
</div>
</fieldset>
<!-- End Contact Form -->

<script type="text/javascript">
    document.getElementById("thumbnail").onchange=function() {
        document.getElementById("imgthumbnail").setAttribute("src",URL.createObjectURL(document.getElementById("thumbnail").files[0]));
    }
    document.getElementById("nothumbnail").onclick=function() {
        document.getElementById("thumbnail").value= null;
        document.getElementById("imgthumbnail").setAttribute("src","/images/screenshots/none.jpg");
    }

    document.getElementById("screenshot").onchange=function() {
        document.getElementById("imgscreenshot").setAttribute("src",URL.createObjectURL(document.getElementById("screenshot").files[0]));
    }
    document.getElementById("noscreenshot").onclick=function() {
        document.getElementById("screenshot").value= null;
        document.getElementById("imgscreenshot").setAttribute("src","/images/screenshots/none.jpg");
    }
</script>

@include( 'partials.footer' )