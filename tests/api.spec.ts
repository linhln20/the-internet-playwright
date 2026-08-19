import { test, expect } from '../utils/fixtures';

test.describe.skip('Thực hành API Testing với Reqres.in', () => {

    // 1. Test GET Request: Lấy danh sách người dùng
    test('GET - Lấy danh sách người dùng ở trang 2', async ({ apiHelper }) => {
        // Gửi request GET tới endpoint
        const response = await apiHelper.get('https://reqres.in/api/users?page=2');

        // Kiểm tra Status Code (200 nghĩa là gọi API thành công)
        expect(response.status()).toBe(200);

        // Chuyển đổi dữ liệu trả về (response) sang định dạng JSON
        const responseBody = await response.json();
        console.log(responseBody); // In ra console để xem cấu trúc dữ liệu

        // Kiểm tra các giá trị trong Body
        expect(responseBody.page).toBe(2); // Đảm bảo đang ở đúng trang 2
        expect(responseBody.data.length).toBeGreaterThan(0); // Đảm bảo danh sách user không bị rỗng
    });

    // 2. Test POST Request: Tạo một người dùng mới
    test('POST - Tạo người dùng mới thành công', async ({ apiHelper }) => {
        // Chuẩn bị dữ liệu để gửi đi (Payload)
        const newUserData = {
            name: "Tuan",
            job: "Automation Engineer"
        };

        // Gửi request POST kèm theo dữ liệu
        const response = await apiHelper.post('https://reqres.in/api/users', newUserData);

        // Kiểm tra Status Code (201 nghĩa là Created - Đã tạo thành công)
        expect(response.status()).toBe(201);

        // Chuyển đổi response sang JSON và kiểm tra
        const responseBody = await response.json();

        // So sánh dữ liệu API trả về xem có khớp với dữ liệu mình gửi đi không
        expect(responseBody.name).toBe(newUserData.name);
        expect(responseBody.job).toBe(newUserData.job);

        // Đảm bảo hệ thống có tạo ra một ID mới cho user này
        expect(responseBody).toHaveProperty('id');
    });

});