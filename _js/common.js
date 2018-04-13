// ====================================================================
// Common - js
// 
// Scripts for the entire app
// ====================================================================

(function() {

  // ============================================
  // Document ready
  // ============================================
  $(function() {

    // Highlight the active route
    activeNavLink();

  });// end document ready

  // ============================================
  // Window on load - hide page loader animation
  // ============================================
  $(window).on('load', function(){
    setTimeout(function() {
      $( ".page-loader-cover" ).fadeOut(500, function() {
        $( ".page-loader-cover" ).remove();
      });  
    }, 2000);
  });

  // ============================================
  // Document scroll
  // ============================================
  $(window).scroll(function() {
    if($(window).scrollTop() > 100) {

    } else {

    }
  });

  // ============================================
  // Use body ID to match to active nav link
  // ============================================
  function activeNavLink() {
    let bodyClass = $('body').attr("id");
    $( "nav .menu li" ).each(function() {
      if ($(this).attr('data-page') === bodyClass) {
        $(this).addClass('active');
      }
    });
  }

})();


// Shared functions outside of closure

// ============================================
// Validate form elements
// ============================================
function formValidation(elemClass) {
  // Set form to valid
  var valid = true;
  // Loop through form inputs
  $(elemClass).each(function(index, elem) {
    // Check if empty
    if ($(elem).val() == '' || $(elem).val() == null) {
      // Show label
      $(elem).prev('label').show();
      // Set form to invalid
      valid = false;
    } else {
      // Hide label
      $(elem).prev('label').hide();
    }
  });
  // Return true and submit form if valid
  if (valid) {
    return true;
  }
}
