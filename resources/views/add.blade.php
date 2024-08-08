@include( 'header' );

		
		<!-- Start Contact Form -->
	<div class="untree_co-section">
      <div class="container">

        <div class="block">
          <div class="row justify-content-center">


            <div class="col-md-8 col-lg-8 pb-4">




              <form action="/" method="post" enctype="multipart/form-data">
                @csrf

                <div class="form-group">
                  <label class="text-black" for="file" accept=".swf">Game File (required*)</label>
                  <input name="file" type="file" class="form-control" id="file" required>
                </div>

                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <label class="text-black" for="fname">Name</label>
                      <input name="name" type="text" class="form-control" id="fname">
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label class="text-black" for="image">Image</label>
                      <input name="image" type="file" class="form-control" id="image">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label class="text-black" for="url">Url</label>
                  <input name="url" type="text" class="form-control" id="url">
                </div>

                <div class="form-group">
                  <label class="text-black" for="type">Type</label>
                  <input name="type" type="text" class="form-control" id="type">
                </div>

                <div class="form-group">
                  <label class="text-black" for="date">Date</label>
                  <input name="date" type="text" class="form-control" id="date">
                </div>

                <div class="form-group">
                  <label class="text-black" for="Origin">Origin</label>
                  <input name="origin" type="text" class="form-control" id="origin">
                </div>

                <div class="form-group mb-5">
                  <label class="text-black" for="description">Description</label>
                  <textarea name="description" class="form-control" id="description" cols="30" rows="5"></textarea>
                </div>

                <button type="submit" class="btn btn-primary-hover-outline">Add Game</button>
              </form>

            </div>

          </div>

        </div>

      </div>


    </div>
  </div>

  <!-- End Contact Form -->

		
@include( 'footer' );