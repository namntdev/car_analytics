var mongoose = require('mongoose');
var url = require('url');
var Crawler = require("crawler");

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
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
var Car = mongoose.model('Car', carSchema);

main();

function main() {
    //Lấy danh sách tất cả các phòng
    var sUrl = 'https://oto.com.vn/mua-ban-xe-cu-da-qua-su-dung/p';
    for (var i = 1101; i <= 1143; i++) {
    	console.log('Get ' + i);
    	var sUrlTemp = sUrl + i;
		getCarList(sUrlTemp);

    	
    }
    

    
    // var url_room = 'http://flcsamson.com.vn/vi/flc-luxury-hotel-samson/studio-suite-r4.html';
    // getRoomHotelFLC('title_room', url_room);


    //Lấy thông tin chi tiết của từng phòng
    //getRoombyUrl(String name, String url);
}

function getCarList(sUrl){
	var c = new Crawler({
		maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
        	if(error){
        		console.log(error);
        	}else{
        		var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                //console.log($('.listcar .sellcar-item'));
                var i = 0;
                $('.listcar .sellcar-item').each(function (i, e) {
                	var url_car = 'http://' + url.parse(sUrl).hostname + $(this).find('.photo a').attr("href");
                    //console.log(url_car);
                    getCar(url_car);
                    // var data = new Article({ title: title, shortDescription: title, url: url });
                    // data.save();
                });
                console.log('done ' + sUrl);
                //console.log(tinmoi);
                //var data = new Article({ title: title, shortDescription: 'shortDescription', url: 'url' });
                //data.save();
            }
            done();
        }
    });

    // Queue just one URL, with default callback
    c.queue(sUrl);
}

function getCar(sUrl){
	var c = new Crawler({
		maxConnections : 20,
        // This will be called for each crawled page
        callback : function (error, res, done) {
        	if(error){
        		console.log(error);
        	}else{
        		var $ = res.$;
                // Lấy thông số cơ bản của ô tô
                var arr = [];
                $('.baseinfo .colleft .row').each(function (i, e) {
                	arr[$(this).find('label').text()]= $(this).find('span').text();
                });
                $('.baseinfo .colright .row').each(function (i, e) {
                    // console.log($(this).find('label').text());
                    // console.log('...');
                    // console.log($(this).find('span').text());
                    // console.log('...');
                    arr[$(this).find('label').text()]= $(this).find('span').text()
                });
                $('.techinfo .colleft .row').each(function (i, e) {
                	arr[$(this).find('label').text()]= $(this).find('span').text();
                });
                $('.techinfo .colright .row').each(function (i, e) {
                    // console.log($(this).find('label').text());
                    // console.log('...');
                    // console.log($(this).find('span').text());
                    // console.log('...');
                    arr[$(this).find('label').text()]= $(this).find('span').text()
                });
                var html = $.html();
                var regexValue = /'.*'/g;
                //Lấy giá xe
                var regexPrice = /var price.*/g;
                var priceString = html.match(regexPrice)[0];
                var price = priceString.match(regexValue)[0].replace(/\'/g, '');
                //Lấy nhà sản xuất
                var regexMakeName = /var makeName.*/g;
                var makeNameString = html.match(regexMakeName)[0];
                var manufacturer_name = makeNameString.match(regexValue)[0].replace(/\'/g, '');
                //Lấy kiểu dáng xe 
                var regexClassificationName = /var classificationName.*/g;
                var classificationNameString = html.match(regexClassificationName)[0];
                var body_type = classificationNameString.match(regexValue)[0].replace(/\'/g, '');
                //Lấy năm sản xuất
                var regexProductionYear = /var productionYear.*/g;
                var productionYearString = html.match(regexProductionYear)[0];
                var production_year = productionYearString.match(regexValue)[0].replace(/\'/g, '');
                //Lấy số chỗ ngồi
                var regexNumberOfSeat = /var numberOfSeat.*/g;
                var numberOfSeatString = html.match(regexNumberOfSeat)[0];
                var number_of_seat = numberOfSeatString.match(regexValue)[0].replace(/\'/g, '');
                //Lấy model
                var regexShortModelName = /var shortModelName.*/g;
                var shortModelNameString = html.match(regexShortModelName)[0];
                var model_name = shortModelNameString.match(regexValue)[0].replace(/\'/g, '');
                //Lấy số km đã đi
                var odometer_value = arr['Số Km đã đi'];
                //Lấy màu xe
                var color_body = arr['Màu xe'];
                //Lấy kiểu hộp số
                var transmission = arr['Hộp số']; 
                //Lấy loại nhiên liệu
                var engine_fuel = arr['Nhiên liệu'];
                //Lấy dẫn động
                var drivetrain = arr['Dẫn động'];
                //Lấy dung tích động cơ
                var engine_capacity = arr['Dung tích động cơ'];
                //Lấy loại động cơ
                var engine_type = arr['Loại động cơ'];

                // console.log(price);
                // console.log(manufacturer_name);
                // console.log(body_type);
                // console.log(production_year);
                // console.log(number_of_seat);
                // console.log(model_name);
                // console.log(odometer_value);
                // console.log(color_body);
                // console.log(transmission);

                var data = new Car({
                	manufacturer_name: manufacturer_name, // Hãng sản xuất
					model_name: model_name, // model
					transmission: transmission, // kiểu hộp số
					body_type: body_type, // kiểu dáng xe
					production_year: production_year, // năm sản xuất
					number_of_seat: number_of_seat, // số chỗ ngồi
					odometer_value: odometer_value, // số km đã đi
					color_body: color_body, // Màu xe
					engine_fuel: engine_fuel, // Loại nhiên liệu
					engine_type: engine_type, // Loại động cơ
					engine_capacity: engine_capacity, // Dung tích động cơ
					drivetrain: drivetrain, // Dẫn động
					price: price, // Giá xe
					url: sUrl
				});
                data.save();
            }
            done();
        }
    });

    // Queue just one URL, with default callback
    c.queue(sUrl);

}

