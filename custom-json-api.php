<?php
/**
 * Plugin Name: Custom Data JSON API
 * Description: Tạo API để thêm, sửa, xóa dữ liệu JSON, hiển thị danh sách trong admin.
 * Version: 1.0
 * Author: Your Name
 */

// -------------------- 1. Tạo bảng dữ liệu khi kích hoạt plugin --------------------
register_activation_hook(__FILE__, 'create_custom_data_json_table');

function create_custom_data_json_table() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'custom_data_json';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        data JSON NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// Xóa bảng khi plugin được vô hiệu hóa (tùy chọn)
register_deactivation_hook(__FILE__, 'delete_custom_data_json_table');

function delete_custom_data_json_table() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'custom_data_json';
    $wpdb->query("DROP TABLE IF EXISTS $table_name");
}

// -------------------- 2. Tạo REST API endpoints --------------------
add_action('rest_api_init', function () {

    // Hiển thị danh sách dữ liệu
    register_rest_route('custom-data-json/v1', '/list', array(
        'methods' => 'GET',
        'callback' => 'get_custom_data_json_list',
        'permission_callback' => '__return_true',
    ));

    // Hiển thị dữ liệu chi tiết theo ID
    register_rest_route('custom-data-json/v1', '/list/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_custom_data_json_by_id',
        'permission_callback' => '__return_true',
    ));

    // Hiển thị dữ liệu chi tiết theo tên
    register_rest_route('custom-data-json/v1', '/list/(?P<name>[a-zA-Z0-9_-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_custom_data_json_by_name',
        'permission_callback' => '__return_true',
    ));

    // Thêm dữ liệu mới
    register_rest_route('custom-data-json/v1', '/add', array(
        'methods' => 'POST',
        'callback' => 'add_custom_data_json',
        'permission_callback' => '__return_true',
    ));

    // Sửa dữ liệu theo ID
    register_rest_route('custom-data-json/v1', '/update/(?P<id>\d+)', array(
        'methods' => 'PUT',
        'callback' => 'update_custom_data_json',
        'permission_callback' => '__return_true',
    ));

    // Sửa dữ liệu theo name
    register_rest_route('custom-data-json/v1', '/update/(?P<name>[a-zA-Z0-9_-]+)', array(
        'methods' => 'PUT',
        'callback' => 'update_custom_data_json_by_name',
        'permission_callback' => '__return_true',
    ));

    // Xóa dữ liệu theo ID
    register_rest_route('custom-data-json/v1', '/delete/(?P<id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => 'delete_custom_data_json',
        'permission_callback' => '__return_true',
    ));
});

function get_custom_data_json_list(WP_REST_Request $request) {
    global $wpdb;

    $table_name = $wpdb->prefix . 'custom_data_json';
    $data = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");

    if ($data) {
        return new WP_REST_Response(array('data' => $data), 200);
    } else {
        return new WP_REST_Response(array('message' => 'No data found'), 404);
    }
}

function get_custom_data_json_by_name(WP_REST_Request $request) {
    global $wpdb;

    $name = sanitize_text_field($request['name']);
    $table_name = $wpdb->prefix . 'custom_data_json';

    // Truy vấn dữ liệu theo tên
    $data = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE name = %s", $name));

    if ($data) {
        return new WP_REST_Response($data, 200);
    } else {
        return new WP_REST_Response(array('message' => 'Data not found'), 404);
    }
}

function get_custom_data_json_by_id(WP_REST_Request $request) {
    global $wpdb;

    $id = (int) $request['id'];
    $table_name = $wpdb->prefix . 'custom_data_json';

    $data = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $id));

    if ($data) {
        return new WP_REST_Response(array('data' => $data), 200);
    } else {
        return new WP_REST_Response(array('message' => 'Data not found for ID ' . $id), 404);
    }
}

function add_custom_data_json(WP_REST_Request $request) {
    global $wpdb;

    $json_data = $request->get_json_params();
    $name = sanitize_text_field($request->get_param('name'));

    if (empty($json_data) || empty($name)) {
        return new WP_REST_Response(array('message' => 'Missing data or name'), 400);
    }

    $table_name = $wpdb->prefix . 'custom_data_json';

    $insert_result = $wpdb->insert(
        $table_name,
        array(
            'name' => $name,
            'data' => wp_json_encode($json_data),
            'created_at' => current_time('mysql')
        )
    );

    if ($insert_result) {
        return new WP_REST_Response(array('message' => 'Data added successfully'), 200);
    } else {
        return new WP_REST_Response(array('message' => 'Failed to add data'), 500);
    }
}

function update_custom_data_json_by_name(WP_REST_Request $request) {
    global $wpdb;

    // Lấy tên từ URL và dữ liệu từ request body
    $name = sanitize_text_field($request['name']);
    $json_data = $request->get_json_params();

    $table_name = $wpdb->prefix . 'custom_data_json';

    // Cập nhật dữ liệu trong bảng dựa vào name
    $update_result = $wpdb->update(
        $table_name,
        array(
            'data' => wp_json_encode($json_data)
        ),
        array('name' => $name) // Điều kiện WHERE
    );

    // Kiểm tra kết quả
    if ($update_result !== false) {
        return new WP_REST_Response(array('message' => 'Data updated successfully'), 200);
    } else {
        return new WP_REST_Response(array('message' => 'Failed to update data or name not found'), 500);
    }
}


function update_custom_data_json(WP_REST_Request $request) {
    global $wpdb;

    $id = $request['id'];
    $json_data = $request->get_json_params();
    $name = sanitize_text_field($request->get_param('name'));

    $table_name = $wpdb->prefix . 'custom_data_json';

    $update_result = $wpdb->update(
        $table_name,
        array(
            'data' => wp_json_encode($json_data),
            'name' => $name
        ),
        array('id' => $id)
    );

    if ($update_result !== false) {
        return new WP_REST_Response(array('message' => 'Data updated successfully'), 200);
    } else {
        return new WP_REST_Response(array('message' => 'Failed to update data'), 500);
    }
}

function delete_custom_data_json(WP_REST_Request $request) {
    global $wpdb;

    $id = $request['id'];
    $table_name = $wpdb->prefix . 'custom_data_json';

    $delete_result = $wpdb->delete($table_name, array('id' => $id));

    if ($delete_result) {
        return new WP_REST_Response(array('message' => 'Data deleted successfully'), 200);
    } else {
        return new WP_REST_Response(array('message' => 'Failed to delete data'), 500);
    }
}

// -------------------- 3. Hiển thị danh sách trong Admin Dashboard --------------------

add_action('admin_menu', 'custom_data_json_admin_menu');

function custom_data_json_admin_menu() {
    add_menu_page(
        'Custom Data JSON',
        'Custom Data JSON',
        'manage_options',
        'custom-data-json',
        'display_custom_data_json',
        'dashicons-admin-generic'
    );
}

function display_custom_data_json() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'custom_data_json';
    $data = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");

    echo '<div class="wrap">';
    echo '<h1>Custom Data JSON</h1>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead><tr><th>ID</th><th>Name</th><th>Data</th><th>Actions</th></tr></thead><tbody>';

    foreach ($data as $row) {
        echo "<tr>
                <td>{$row->id}</td>
                <td>{$row->name}</td>
                <td><pre>{$row->data}</pre></td>
                <td><a href='?page=custom-data-json&delete_id={$row->id}' onclick=\"return confirm('Delete?')\">Delete</a></td>
              </tr>";
    }

    echo '</tbody></table></div>';
}
