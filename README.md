# pricing_car
pricing car

### Bài toán:
Lấy dữ liệu ô tô đã qua sử dụng để phân tích https://oto.com.vn/mua-ban-xe-cu-da-qua-su-dung

### 1. Thu thập dữ liệu:
* Sử dụng ngôn ngữ nodejs
* Sử dụng tool https://github.com/bda-research/node-crawler
* Code truy cập vào https://oto.com.vn/mua-ban-xe-cu-da-qua-su-dung rồi parse data html trả về
* Lưu vào database mongodb
* Kết quả thu thập được 20540 bản ghi dữ liệu
**Schema database**
```nodejs	
	var carSchema = new mongoose.Schema({
	  manufacturer_name: String, // Hãng sản xuất
	  model_name: String, // model
	  transmission: String, // kiểu hộp số
	  body_type: String, // kiểu dáng xe
	  production_year: Number, // năm sản xuất
	  number_of_seat: Number, // số chỗ ngồi
	  odometer_value: Number, // số km đã đi
	  color_body: String, // Màu xe
	  engine_fuel: String, // Loại nhiên liệu
	  engine_type: String, // Loại động cơ
	  engine_capacity: Number, // Dung tích động cơ
	  drivetrain: String, // Dẫn động
	  price: Number, // Giá xe
	  url: String
	});
```

### 2. Phân tích dữ liệu
* Tham khảo:
1. https://medium.com/analytics-vidhya/building-a-machine-learning-model-to-predict-the-price-of-the-car-bc51783ba2f3
2. https://www.kaggle.com/ambujbhardwaj/car-price-prediction
3. https://towardsdatascience.com/figuring-out-a-fair-price-of-a-used-car-in-a-data-science-way-11450b3b252b
4. https://towardsdatascience.com/project-2-worth-it-predicting-the-price-of-used-cars-in-singapore-e9afe63c75d0