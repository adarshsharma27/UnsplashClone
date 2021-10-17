function fancyBox() {
  $('[data-fancybox="gallery"]').fancybox({

    buttons: [
      "zoom",
      "share",
      "slideShow",
      "fullScreen",
      "download",
      "thumbs",
      "close"
    ]
  });
}

function downloadImage() {
  $('.download-cta').click(function (event) {
    let imgSrc = $(this).siblings('a').children('img').attr('src');
    $(this).attr("download", "true");
    $($(event.target).parentsUntil("[data-fancybox=gallery]").children(".download-cta")).toggleClass("success");
    $($(event.target).parentsUntil("[data-fancybox=gallery]").children(".download-cta")).attr('href', imgSrc);

  });
}

$(window).on('load', function () {
  $.ajax({
    url: `https://api.unsplash.com/search/photos?query=nature&per_page=20&client_id=B1Te3Bi85WhLyP01L40BxhBvaMtMtnxqbRNq-qc1lVQ`,
    method: 'GET',
    success: function (data) {
      $.each(data.results, function (key, value) {
        let html = `<div class="grid-image">
                  <div class="gallaryAnalytics">
                     <a href = ${value.urls.full}
                     data-fancybox = "gallery"
                        data-caption=${value.alt_description}>
                     <img alt=${value.alt_description} src=${value.urls.full}>
                     <a href="#" class="download-cta"><i class="fas fa-arrow-down"></i></a>
                     </a>
                  </div>
               </div>`
        $('.masonrygallery').append(html);

      });
      fancyBox();
      downloadImage();
    },
    error: function (error) {
      console.log(error);
    }

  });

});

$('.fa-search').click(function (event) {
  $('.masonrygallery').html('');
  event.preventDefault();
  searchImage = $("#search").val();
  $.ajax({
    url: `https://api.unsplash.com/search/photos?query=${searchImage}&per_page=30&client_id=B1Te3Bi85WhLyP01L40BxhBvaMtMtnxqbRNq-qc1lVQ`,
    method: 'GET',
    success: function (data) {
      $.each(data.results, function (key, value) {
        let html = `<div class="grid-image">
                  <div class="gallaryAnalytics">
                     <a href = ${value.urls.full}
                     data-fancybox = "gallery"
                        data-caption=${value.alt_description}>
                     <img alt=${value.alt_description} src=${value.urls.full}>
                     <a href="#" class="download-cta"><i class="fas fa-arrow-down"></i></a>
                     </a>
                  </div>
               </div>`
        $('.masonrygallery').append(html);
      });
      fancyBox();
      downloadImage();
    },
    error: function (error) {
      console.log(error);
    }

  });

});