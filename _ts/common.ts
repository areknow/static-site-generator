// ====================================================================
// Common - js
//
// Scripts for the entire app
// ====================================================================

import * as $ from 'jquery';

(() => {

  /**
   * Document ready
   */
  $(() => {
    activeNavLink();
    revealPage();
  });

  /**
   * Use body ID to match to active nav link
   */
  function activeNavLink() {
    const bodyClass = $('body').attr('id');
    $('nav .menu li').each((index, element) => {
      if ($(element).attr('data-page') === bodyClass) {
        $(element).addClass('active');
      }
    });
  }

  /**
   * Reveal the page with a short delay
   */
  function revealPage() {
    setTimeout(() => {
      $('.page-loader-cover').fadeOut(500, () => {
        $('.page-loader-cover').remove();
      });
    }, 2000);
  }

})();
