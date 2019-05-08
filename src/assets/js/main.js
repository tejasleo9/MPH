jQuery(document).ready(function ($) {
  $(document).on('click', '.icon-more', function (e) {
    e.stopPropagation();
    $('.srch-popup').hide(100);
    $('.actionBox .action-popup').hide(100);
    $(this).parents('.myTableBody').siblings().find('.action-popup').hide(100);
    $(this).parents('.more').find('.action-popup').toggle(100);
  });
  $(document).on('click', '.actionBtn', function (e) {
    e.stopPropagation();
    $('.srch-popup').hide(100);
    $('.myTableBody .action-popup').hide(100);
    $(this).siblings('.action-popup').toggle(100);
  });

  $(document).on('click', function () {
    $('.action-popup').hide(100);
    $('.srch-popup').hide(100);
    $('#menu').removeClass('showmenu');
  });

  $(document).on('click', '.srchBtn', function (e) {
    e.stopPropagation();
    $('.action-popup').hide(100);
    $(this).siblings('.srch-popup').toggle(100);
  });
  $(document).on('click', '.action-popup, .srch-popup, .showmenu', function (e) {
    e.stopPropagation();
  });

  $(document).on('mouseover', '#menu ul li', function () {
    var menu = $(this).find('p').data('menu');
    $('#' + menu).css('display', 'flex');
  }).on('mouseout', function () {
    $('.sub-menu').css('display', 'none');
  });
  $(document).on('mouseover', '.sub-menu', function () {
    $(this).css('display', 'flex');
  }).on('mouseout', function () {
    $('.sub-menu').css('display', 'none');
  });
  $(document).on('click', '.menu-btn', '.main-menu', function (e) {
    $('#menu').toggleClass('showmenu');
    e.stopPropagation();
  });

  $('[data-toggle="tooltip"]').tooltip()

});
