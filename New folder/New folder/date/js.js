var d = new Date();
var ngay = d.getDate();
var thang = d.getMonth()+1;
var nam = d.getFullYear();

var gio = d.getHours();
var phut = d.getMinutes();
var giay = d.getSeconds();

var sngay = ngay + '/' + thang + '/' + nam + "" + gio + ":" + phut + ":" + giay;
document.write("Ngày: " + sngay);


