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

          <form action="{{$route}}" method="post" enctype="multipart/form-data" id="myform">
            @csrf

            <div class="form-group">
              <label class="text-black" for="title">Game Title (*)</label>
              <input name="title" value="{{old('title', isset($game)?$game->title:'')}}" type="text" class="form-control" id="title" required maxlength="255" />
            </div>
            @error('title')
              <div class="text-danger">{{ $message }}</div>
            @enderror


            <div class="row mt-2">
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="filename" accept=".swf">Game File (.swf *)</label>
                  <div style="display:flex;">
                    <div class="input-group" onclick="document.getElementById('file').click();">
                      <button type="button" class="btn btn-secondary"><span class="fa fa-file"></span></button>
                      <input type="text" name="filename" value="{{isset($game->file)&&$game->file?$game->file:''}}" readonly id="filename" class="form-control" style="background-color:white;">  
                    </div>
                    <div>
                      <input name="file" type="file" id="file" style="display:none;" />
                      <a class="btn" style="background-color:brown; border-radius:10px;" id="nofile"><i style="font-size:1.2rem" class="fa fa-times"></i></a>
                    </div>
                  </div>
                </div>
                @error('file')
                <div class="text-danger">{{ $message }}</div>
                @enderror
              </div>


              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="url">Url (if no file *)</label>
                  <input name="url" value="{{old('url', isset($game)?$game->url:'')}}" type="text" class="form-control" id="url" maxlength="255" />
                </div>
                @error('url')
                  <div class="text-danger">{{ $message }}</div>
                @enderror
              </div>
            </div>


            <div class="row mt-3">
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="thumbnail">Thumbnail</label>
                  <div style="display:flex; gap:10px; align-items:center; justify-content:center">
                    <div>
                      <a class="btn btn-secondary" style="width:90px; padding:5px; margin:2px;" onclick="document.getElementById('thumbnail').click();"><i style="font-size:1.2rem" class="fa fa-image"></i></a> <br>
                      <a class="btn btn-secondary" style="width:90px; padding:5px; margin:2px; background-color:brown;" id="nothumbnail"><i style="font-size:1.2rem; color:white;" class="fa fa-times"></i></a>
                    </div>
                    <div>
                      <input name="thumbnail" type="file" id="thumbnail" accept=".jpg,.jpeg,.png,.bmp,.gif" style="display:none;" />
                      <label for="thumbnail"><img id="thumbnailimg" width="80" height="80" src="/images/thumbnails/{{isset($game)?$game->thumbnail:'none.jpg'}}" alt="game img"></label>
                    </div>
                  </div>
                </div>
                <input type="hidden" name="thumbnailname" value="{{isset($game)?$game->thumbnail:'none.jpg'}}" id="thumbnailname">
              </div>

              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="screenshot">Screenshot</label>
                  <div style="display:flex; gap:10px; align-items:center; justify-content:center">
                    <div>
                      <a class="btn btn-secondary" style="width:90px; padding:5px; margin:2px;" onclick="document.getElementById('screenshot').click();"><i style="font-size:1.2rem" class="fa fa-image"></i></a> <br>
                      <a class="btn btn-secondary" style="width:90px; padding:5px; margin:2px; background-color:brown;" id="noscreenshot"><i style="font-size:1.2rem; color:white;" class="fa fa-times"></i></a>
                    </div>
                    <div>
                      <input name="screenshot" type="file" class="form-control" id="screenshot" accept=".jpg,.jpeg,.png,.bmp,.gif" style="display:none;" />
                      <label for="screenshot"><img id="screenshotimg" width="80" height="80" src="/images/screenshots/{{isset($game)?$game->screenshot:'none.jpg'}}" alt="game img"></label>
                    </div>
                  </div>
                </div>
              </div>
              <input type="hidden" name="screenshotname" value="{{isset($game)?$game->screenshot:'none.jpg'}}" id="screenshotname">
            </div>


            <div class="row mt-2">
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="genre1">Genre 1</label>
                  <x-genres genre="genre1" value="{{isset($game)?$game->genre1:''}}"></x-genres>
                </div>
              </div>

              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="genre2">Genre 2</label>
                  <x-genres genre="genre2" value="{{isset($game)?$game->genre2:''}}"></x-genres>
                </div>
              </div>
            </div>


            <div class="form-group mt-3">
              <label class="text-black" for="instructions">Instructions</label>
              <textarea name="instructions" class="form-control" id="instructions" cols="30" rows="5">{{ old('instructions', isset($game)?$game->instructions:'') }}</textarea>
            </div>

            
            <input type="submit" class="btn btn-primary-hover-outline mt-3" value="{{ isset($game) ? 'Update Game' : 'Add Game' }}" />
          </form>

        </div>
      </div>
    </div>
  </div>
</div>
</fieldset>
<!-- End Contact Form -->

<script type="text/javascript">
    document.getElementById("file").onchange = function(event) {
      const inputFile = event.target;
      if (inputFile.files.length > 0) {
        document.getElementById("filename").value = inputFile.files[0].name;
      }
    }
    document.getElementById("nofile").onclick=function() {
        document.getElementById("file").value = null;
        document.getElementById("filename").value = '';
    }

    document.getElementById("thumbnail").onchange=function() {
      const inputFile = event.target;
      if (inputFile.files.length > 0) {
        document.getElementById("thumbnailimg").setAttribute("src",URL.createObjectURL(document.getElementById("thumbnail").files[0]));
        document.getElementById("thumbnailname").value = inputFile.files[0].name;
      }
    }
    document.getElementById("nothumbnail").onclick=function() {
        document.getElementById("thumbnail").value= null;
        document.getElementById("thumbnailimg").setAttribute("src","/images/thumbnails/none.jpg");
        document.getElementById("thumbnailname").value = 'none.jpg';
    }

    document.getElementById("screenshot").onchange=function() {
      const inputFile = event.target;
      if (inputFile.files.length > 0) {
        document.getElementById("screenshotimg").setAttribute("src",URL.createObjectURL(document.getElementById("screenshot").files[0]));
        document.getElementById("screenshotname").value = inputFile.files[0].name;
      }
    }
    document.getElementById("noscreenshot").onclick=function() {
        document.getElementById("screenshot").value= null;
        document.getElementById("screenshotimg").setAttribute("src","/images/screenshots/none.jpg");
        document.getElementById("screenshotname").value = 'none.jpg';
    }
</script>

@include( 'partials.footer' )