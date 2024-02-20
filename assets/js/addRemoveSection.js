$(window).scroll(function () {
   if ($(this).scrollTop() > 315) {
      $('#dynamic').addClass('neewww');
      console.log('bob');
   } else {
      $('#dynamic').removeClass('neewww');
   }
});