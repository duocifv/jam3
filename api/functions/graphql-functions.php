<?php
// Đăng ký Mutation GraphQL để thực hiện đăng nhập và trả về thông tin người dùng
add_action('graphql_register_types', function() {
    register_graphql_mutation('loginUser', [
        'inputFields' => [
            'username' => [
                'type' => 'String',
            ],
            'password' => [
                'type' => 'String',
            ],
        ],
        'outputFields' => [
            'message' => [
                'type' => 'String',
                'description' => 'Thông báo sau khi đăng nhập thành công hoặc thất bại',
            ],
            'user' => [
                'type' => 'User',
                'description' => 'Thông tin người dùng sau khi đăng nhập',
            ],
        ],
        'mutateAndGetPayload' => function($input) {
            // Xác thực thông tin đăng nhập (username và password)
            $user = wp_authenticate($input['username'], $input['password']);

            // Kiểm tra nếu có lỗi khi xác thực người dùng
            if (is_wp_error($user)) {
                return new WP_Error('authentication_failed', 'Thông tin đăng nhập không hợp lệ.');
            }

            // Nếu đăng nhập thành công, trả về thông tin người dùng mà không tạo phiên hay cookie
            return [
                'message' => 'Đăng nhập thành công!',
                'user' => [
                    'userId' => $user->ID,               // Trả về ID của người dùng
                    'username' => $user->user_login,     // Trả về tên đăng nhập
                    'email' => $user->user_email,        // Trả về email
                    'displayName' => $user->display_name // Trả về tên hiển thị
                ],
            ];
        },
    ]);
});
?>
