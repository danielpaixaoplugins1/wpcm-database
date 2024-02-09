jQuery(document).ready(function($) {
    $('#mdbm-create-backup').on('click', function() {
        var button = $(this),
            nonce = button.data('nonce');

        button.prop('disabled', true);

        $.post(mdbm_ajax.ajax_url, {
            action: 'mdbm_create_backup',
            security: nonce
        }, function(response) {
            button.prop('disabled', false);
            if (response.success) {
                $('#mdbm-backup-list').append('<li>' + response.data.file + '</li>');
                alert('Backup created successfully!');
            } else {
                alert(response.data.message);
            }
        });
    });

    $('.mdbm-restore-backup').on('click', function() {
        if (!confirm('Are you sure you want to restore this backup? This action cannot be undone.')) {
            return;
        }

        var button = $(this),
            file = button.data('file'),
            nonce = button.data('nonce');

        button.prop('disabled', true);

        $.post(mdbm_ajax.ajax_url, {
            action: 'mdbm_restore_backup',
            file: file,
            security: nonce
        }, function(response) {
            button.prop('disabled', false);
            if (response.success) {
                alert('Backup restored successfully!');
            } else {
                alert(response.data.message);
            }
        });
    });
});
