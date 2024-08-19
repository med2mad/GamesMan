@include( 'header' )

<!-- Start Contact Form -->
<div class="untree_co-section">
  <div class="container">
    <div class="block">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-8 pb-4">

          <div class="form-group mt-2 text-right">
            @isset($success)
              <p class="alert alert-info" >Thank you !<br>Game submitted for validation.</p>
            @endisset
          </div>

          <form action="/" method="post" enctype="multipart/form-data" id="myform">
            @csrf
            
            <div class="form-group">
              <label class="text-black" for="title">Title (*)</label>
              <input name="title" type="text" class="form-control" id="title" required />
            </div>
            @error('title')
              <div class="text-danger">{{ $message }}</div>
            @enderror

            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="file" accept=".swf">Game File</label>
                  <input name="file" type="file" class="form-control" id="file" />
                </div>
              </div>
              @error('file')
                <div class="text-danger">{{ $message }}</div>
              @enderror
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="url">Url</label>
                  <input name="url" type="text" class="form-control" id="url" />
                </div>
              </div>
              @error('url')
                <div class="text-danger">{{ $message }}</div>
              @enderror
            </div>

            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="thumbnail">Thumbnail</label>
                  <input name="thumbnail" type="file" class="form-control" id="thumbnail" />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label class="text-black" for="screenshot">Screen Shot</label>
                  <input name="screenshot" type="file" class="form-control" id="screenshot" />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="text-black" for="genre">Genre</label>
              <input name="genre" type="text" class="form-control" id="genre" />
            </div>

            <div class="form-group mb-5">
              <label class="text-black" for="instructions">Instructions</label>
              <textarea name="instructions" class="form-control" id="instructions" cols="30" rows="5"></textarea>
            </div>

            <input type="submit" class="btn btn-primary-hover-outline" value="Submit Game" />
          </form>

        </div>
      </div>
    </div>
  </div>
</div>
<!-- End Contact Form -->

@include( 'footer' )