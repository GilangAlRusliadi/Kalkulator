<?php
$folders = array_filter(glob('*'), 'is_dir');
echo json_encode(array_values($folders));
?>
