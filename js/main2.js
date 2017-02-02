$(function() {
  var $movie_ls=$('#movie-list');
  var $add_form=$('#add-form');
  var $new_Title=$('#new-movie');
  var $new_imdb=$('#new-imdb');
  var $new_year=$('#new-year');
  var $up_Title=$('#up-movie');
  var $up_year=$('#up-year');
  var $update_form=$('#update-form');
  var j;
  var i=0;
  var alldata=[];
  $update_form.hide();
  $(window).scroll(function () {
     if ($(window).scrollTop() == $(document).height() - $(window).height()) {
       loadData(alldata);
     }
   });
  function loadData(value)
	{
      j=i;
      for(i;i<=j+20;i++){
        var one = '<tr><td>' + value[i].Title + '</td>';
        var two = '<td>' + value[i].id + '</td>';
        var three = '<td>' + value[i].Year + '</td>';
        var four  = '<td> <button class ="btn btn-primary" id="update">Update</button> </td>';
        var five  = '<td> <button class ="btn btn-danger" id="delete">Delete</button> </td> </tr>';
			  $movie_ls.append(one + two + three + four + five);
    }
	}
  function addMovie(value)
  {
      var one = '<tr><td>' + value.Title + '</td>';
      var two = '<td>' + value.id + '</td>';
      var three = '<td>' + value.Year + '</td>';
      var four  = '<td> <button class ="btn btn-primary" id="update">Update</button> </td>';
      var five  = '<td> <button class ="btn btn-danger" id="delete">Delete</button> </td> </tr>';
      $movie_ls.append(one + two + three + four + five);
  }
  $.ajax({
      type : 'GET',
      url : '/Search',
      success : function (data) {
        //  $.each(data,function(index,value)
  			//  {
          alldata=data;
  				loadData(alldata);
  			//  });

      }
  });

  $('.add_new').on('click',function() {
      var new_movie={
        Title : $new_Title.val(),
        Year : $new_year.val(),
        id : $new_imdb.val(),
        Type : "movie",
        Poster : "N/A",
      };
      $.ajax({
         type:'POST',
         url:'/Search',
         data: new_movie,
         success : function(data) {
            addMovie(new_movie);
         },
         error:function()
         {
           alert('error');
         }

     });
  });

  $movie_ls.delegate('#delete','click',function() {
    var $row = $(this).closest('tr');
    var $mv_id = $(this).closest('td').prev('td').prev('td').prev('td').text();
    //alert($mv_id);
    $.ajax({
        type : 'DELETE',
        url:'/Search/'+ $mv_id,
        success : function() {
          $row.remove();
        }

    });
  });

  $movie_ls.delegate('#update','click',function() {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    var $mv_name = $(this).closest('td').prev('td').prev('td').prev('td').text();
    var $mv_id = $(this).closest('td').prev('td').prev('td').text();
    var $mv_year = $(this).closest('td').prev('td').text();
    var $row = $(this).closest('tr');
    $add_form.hide();
    $update_form.show();
    $('#up-movie').val($mv_name);
    var $id = $('#up-imdb').val($mv_id).attr("disabled",true).val();
    $('#up-year').val($mv_year);
    $('.up_new').on('click',function() {
        var up_movie={
          Title : $up_Title.val(),
          Year : $up_year.val(),
          id : $id,
          Type : "movie",
          Poster : "N/A",
        };
        $row.remove();
        $add_form.show();
        $update_form.hide();
        $.ajax({
           type:'PUT',
           url:'/Search/'+$id,
           data: up_movie,
           success : function(data) {
             addMovie(data);
           },
           error:function()
           {
             alert('error');
           }

       });
     });
  });
});
