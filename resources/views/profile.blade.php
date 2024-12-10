@include( 'partials.header' )

<x-title text="{{ isset($user) ? 'Update Profile' : 'SignUp' }}"></x-title>

<!-- Start Contact Form -->
 
<fieldset>
<legend><div>User info</div></legend>

<div class="untree_co-section">
  <div class="container">
    <div class="block">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-8 pb-4">

          <form action="{{$route}}" method="post" enctype="multipart/form-data" id="myform">
            @csrf
            
            <div class="form-group">
              <label class="text-black" for="name">Username</label>
              <input name="name" type="text" value="{{old('name', isset($user)?$user->name:'')}}" class="form-control" id="name" required minlength="5" maxlength="10" />
            </div>
            @error('name')
              <div class="text-danger">{{ $message }}</div>
            @enderror

            <div class="form-group">
              <label class="text-black" for="email">Email</label>
              <input name="email" type="email" value="{{old('email', isset($user)?$user->email:'')}}" class="form-control" id="email" required />
            </div>
            @error('email')
              <div class="text-danger">{{ $message }}</div>
            @enderror

            <div class="form-group">
              <label class="text-black" for="password">Password</label>
              <input name="password" type="password" class="form-control" id="password" required minlength="5" maxlength="10" />
            </div>
            @error('password')
              <div class="text-danger">{{ $message }}</div>
            @enderror

            <div class="form-group">
              <label class="text-black" for="Password">Password Confirmation</label>
              <input name="password_confirmation" type="password" class="form-control" id="password_confirmation" required minlength="5" maxlength="10" />
            </div>
            @error('password_confirmation')
              <div class="text-danger">{{ $message }}</div>
            @enderror

            <div class="form-group" style="text-align: center">
              <label class="text-black" for="photo">Photo</label>
              <div style="display:flex; gap:10px; align-items:center;justify-content: center;">
                <div>
                  <a onclick="document.getElementById('photo').click();" class="btn btn-secondary" style="width:90px; padding:5px; margin:2px;"><i style="font-size:1.2rem" class="fa fa-image"></i></a> <br>
                  <a id="nophoto" class="btn btn-secondary" style="width:90px; padding:5px; margin:2px; background-color:brown; color:white;"><i style="font-size:1.2rem" class="fa fa-times"></i></a>
                </div>
                <div>
                  <input name="photo" type="file" class="form-control" id="photo" accept=".jpg,.jpeg,.png,.bmp,.gif" style="display:none;" />
                  <label for="photo"><img id="photoimg" width="80" height="80" src="/images/users/{{isset($user)?$user->photo:'none.jpg'}}" alt="userphoto"></label>
                </div>
              </div>
            </div>
            <input type="hidden" name="photoname" value="{{isset($game)?$game->photo:'none.jpg'}}" id="photoname">
          
            <input type="submit" class="btn btn-primary-hover-outline mt-3" value="{{ isset($user) ? 'Update Profile' : 'SignUp' }}" />
          </form>

        </div>
      </div>
    </div>
  </div>
</div>
</fieldset>
<!-- End Contact Form -->

<script type="text/javascript">
  document.getElementById("photo").onchange=function() {
    const inputFile = event.target;
    if (inputFile.files.length > 0) {
      document.getElementById("photoimg").setAttribute("src",URL.createObjectURL(document.getElementById("photo").files[0]));
      document.getElementById("photoname").value = inputFile.files[0].name;
    }
  }
  document.getElementById("nophoto").onclick=function() {
      document.getElementById("photo").value= null;
      document.getElementById("photoimg").setAttribute("src","/images/users/none.jpg");
      document.getElementById("photoname").value = 'none.jpg';
  }
</script>

@include( 'partials.footer' )