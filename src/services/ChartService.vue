<script>

export const fetchLocationData = async () => {
    try {
        const response = await fetch(`https://ahp-coffee.onrender.com/data`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching location data:', error);
        throw error; // Ném lỗi để component có thể xử lý
    }
}

export const processChartData = (data, type) => {
    const chartData = {
        labels: [],
        values: [],
        title: '',
        yAxisLabel: ''
    };

    switch (type) {
        case 'price':
            chartData.labels = data.map(item => item.khu_vuc);
            chartData.values = data.map(item => item.chi_phi_thue / 1000000);
            chartData.title = 'Biểu đồ giá thuê theo khu vực';
            chartData.yAxisLabel = 'Giá thuê (triệu đồng)';
            break;
        case 'area':
            chartData.labels = data.map(item => item.khu_vuc);
            chartData.values = data.map(item => item.dien_tich_tb);
            chartData.title = 'Biểu đồ diện tích trung bình theo khu vực';
            chartData.yAxisLabel = 'Diện tích (m²)';
            break;
        case 'income':
            chartData.labels = data.map(item => item.khu_vuc);
            chartData.values = data.map(item => item.muc_thu_nhap_tb / 1000000);
            chartData.title = 'Biểu đồ thu nhập trung bình theo khu vực';
            chartData.yAxisLabel = 'Thu nhập (triệu đồng)';
            break;
        case 'density':
            chartData.labels = data.map(item => item.khu_vuc);
            chartData.values = data.map(item => item.mat_do_dan_cu);
            chartData.title = 'Biểu đồ mật độ dân cư theo khu vực';
            chartData.yAxisLabel = 'Mật độ (người/km²)';
            break;
        case 'customers':
            chartData.labels = data.map(item => item.khu_vuc);
            chartData.values = data.map(item => item.luong_khach_tb_ngay);
            chartData.title = 'Biểu đồ lượng khách trung bình/ngày theo khu vực';
            chartData.yAxisLabel = 'Số lượng khách/ngày';
            break;
        case 'cafes':
            chartData.labels = data.map(item => item.khu_vuc);
            chartData.values = data.map(item => item.so_luong_quan_cafe);
            chartData.title = 'Biểu đồ số lượng quán cafe theo khu vực';
            chartData.yAxisLabel = 'Số lượng quán';
            break;
    }

    return chartData;
}

export const fetchFilteredChartData = async (params) => {
    try {
        // Tạo query string từ params
        const queryParams = new URLSearchParams();
        if (params.price) queryParams.append('price', params.price);
        if (params.area) queryParams.append('area', params.area);
        if (params.income) queryParams.append('income', params.income);

        const response = await fetch(`${API_URL}/locations/filter?${queryParams}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching filtered data:', error);
        throw error;
    }
}

// Thêm hàm để xử lý lỗi HTTP
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Có lỗi xảy ra');
    }
    return response.json();
}

export default {
    name: 'ChartService'
}
</script> 