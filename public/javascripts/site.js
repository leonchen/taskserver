function updateCheckbox (ele) {
  var $ele = $(ele);
  $ele.siblings('input[name="'+$ele.val()+'"]').val($ele.prop('checked') ? 1 : 0);
}

$(function () {
  var pageResource = window.location.pathname.split("/")[1];
  $("#mainMenu a[href='/"+pageResource+"']").addClass("current");

  var $messages = $('#messages').find(">p");
  if ($messages.length) setTimeout(function () {
    $('#messages').fadeOut('slow');
  }, 3000);

  $('input.checkbox').click(function () {
    updateCheckbox(this);
  }).each(function () {
    updateCheckbox(this);
  });

  $('.create').click(function () {
    $('#entityForm').toggle();
  });

});
