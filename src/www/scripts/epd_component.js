(function() {
  function tableCheckbox() {
    $(document).on('change', '.epd-select-all-checkbox', function() {
      var $table = $(this).parents('table');
      var checked = this.checked;
      var $checkboxes = $table.find('tr > td:first-child > input[type="checkbox"]');
      console.log($checkboxes);
      $checkboxes.each(function(i, checkbox) {
        checkbox.checked = checked;
      });
    });
    $(document).on('change', '.epd-row-checkbox', function() {
      var $tbody = $(this).parents('tbody');
      var $checkboxes = $tbody.find('tr > td:first-child > input[type="checkbox"]');
      var allCheckedFlg = true;
      for (var i = 0, len = $checkboxes.length; i < len; i++) {
        if (!(allCheckedFlg = $checkboxes[i].checked)) break;
      }
      $(this).parents('table').find('.epd-select-all-checkbox')[0].checked = allCheckedFlg;
    });
  }
  tableCheckbox();
})();
