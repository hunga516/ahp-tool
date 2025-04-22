export interface LocationData {
    _id: string;
    chi_phi_thue: number;
    dien_tich_tb: number;
    imageURL: string;
    khu_vuc: string;
    luong_khach_tb_ngay: number;
    mat_do_dan_cu: number;
    muc_thu_nhap_tb: number;
    quan: string;
    quy_hoach_do_thi: string;
    so_luong_quan_cafe: number;
}

export interface ChartData {
    labels: string[];
    values: number[];
    title: string;
    yAxisLabel: string;
}

export const fetchLocationData = async (): Promise<LocationData[]> => {
    try {
        // Thay thế URL API của bạn vào đây
        const response = await fetch('YOUR_API_URL');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching location data:', error);
        return [];
    }
}

export const processChartData = (data: LocationData[], type: 'price' | 'area' | 'income' | 'density'): ChartData => {
    const chartData: ChartData = {
        labels: [],
        values: [],
        title: '',
        yAxisLabel: ''
    };

    switch (type) {
        case 'price':
            chartData.labels = data.map(item => item.khu_vuc);
            chartData.values = data.map(item => item.chi_phi_thue / 1000000); // Chuyển đổi sang triệu
            chartData.title = 'Biểu đồ giá thuê theo khu vực';
            chartData.yAxisLabel = 'Giá thuê (triệu đồng)';
            break;
        case 'area':
            chartData.labels = data.map(item => item.khu_vuc);
            chartData.values = data.map(item => item.dien_tich_tb);
            chartData.title = 'Biểu đồ diện tích theo khu vực';
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
    }

    return chartData;
}

export interface FilterParams {
    price?: number;
    area?: number;
    income?: number;
}

export const fetchFilteredChartData = async (params: FilterParams): Promise<ChartData[]> => {
    try {
        const queryParams = new URLSearchParams();
        if (params.price) queryParams.append('price', params.price.toString());
        if (params.area) queryParams.append('area', params.area.toString());
        if (params.income) queryParams.append('income', params.income.toString());

        const response = await fetch(`YOUR_API_URL?${queryParams}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching filtered chart data:', error);
        return [];
    }
} 