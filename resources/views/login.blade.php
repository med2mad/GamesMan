@include( 'partials.header' )

<x-title text="Login"></x-title>

<!-- Start Contact Form -->
 
<fieldset>
<legend><div>User info</div></legend>

<div class="untree_co-section">
  <div class="container">
    <div class="block">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-8 pb-4">

          <form action="/login" method="post" enctype="multipart/form-data" id="myform">
            @csrf
            
            <div class="form-group">
              <label class="text-black" for="name">Username</label>
              <input name="name" type="text" value="{{ old('name') }}" required class="form-control" id="name"/>
            </div>
            @error('name')
              <div class="text-danger">{{ $message }}</div>
            @enderror

            <div class="form-group">
              <label class="text-black" for="password">Password</label>
              <input name="password" type="password" required class="form-control" id="password" />
            </div>
            @error('password')
              <div class="text-danger">{{ $message }}</div>
            @enderror

            <input type="submit" class="btn btn-primary-hover-outline mt-3" value="Login" />
          </form>

        </div>
      </div>
    </div>
  </div>
</div>
</fieldset>
<!-- End Contact Form -->

@include( 'partials.footer' )