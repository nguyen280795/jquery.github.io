var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
numberdaymonth = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
var dayname = ["Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat"];
var today = new Date();
checkday = today.getDate();
checkmonth = today.getMonth();
checkyear = today.getFullYear();
var positionDayOne = 0;
var positionDateNow;
var index = 1;

main();

//truyền tài liệu vào input
$(document).ready(function () {
    var date = checkday + "/" + (checkmonth + 1) + "/" + checkyear;
    $("#date-picker").val(date);

});
$('img').click(function () {
    if (index === 1) {
        $('#calendar_container').css({'display': 'block'});
        index++;
    }
    else {
        cancelCalendar();
        index--;
    }
    setDate();
});
function cancelCalendar() {
    $('#calendar_container').css({'display': 'none'});
}
//khởi tạo calendar
function main() {
    document.write('<div id = "calendar_container" style ="display:none;">');
    document.write('<form>');
    document.write('<table id = "calendar-table" style ="text-align: center;">');
    this.drawRowAction();
    this.createRowNameDay();
    this.createCalendarDay(today.getMonth(), today.getFullYear());
    document.write('</table>');
    document.write('</form>');
    document.write('</div>');
}
//khởi tạo các nút
function drawRowAction() {
    document.write('<tr>');
    document.write('<td class = "btn" onclick = "btnPreviousYearClick();"><a type = "a" name = "btnPreviousYear">&#8647;</a></td>');
    document.write('<td class = "btn" onclick = "btnPreviousMonthClick();"><a type = "a" name = "btnPreviousMonth">&#8592;</a></td>');
    document.write('<td class = "btn" colspan = "2"><select id = "months" onchange = "changeMonth();">');
    this.createMonths();
    document.write('</select></td>');
    document.write('<td class = "btn"><select id = "years" onchange = "changeYear();">');
    this.createYears();
    document.write('</select></td>');
    document.write('<td class = "btn" onclick = "btnNextMonthClick();"><a type = "a" name = "btnNextMonth">&#8594;</a></td>');
    document.write('<td class = "btn" onclick = "btnNextYearClick();"><a type = "a" name = "btnNextYear">&#8649;</a></td>');
    document.write('</tr>');
    document.write('<tr id = "title"></tr>');
}
//tạo option tháng
function createMonths() {
    for (var i = 0; i < months.length; i++) {
        var option = document.createElement("option");
        option.text = months[i];
        option.value = i;
        $('#months').append(option);
    }
}
//tạo option năm
function createYears() {
    for (var i = 1975; i <= 2100; i++) {
        var option = document.createElement("option");
        option.text = option.value = i;
        $('#years').append(option);
    }
}
//xuất ra ngày và sự kiện click từng ngày
function createRowNameDay() {
    for (var i = 0; i < dayname.length; i++) {
        $('#title').append('<td>' + dayname[i] + '</td>');
    }
}
function createCalendarDay(month, year) {
    var count = 1;
    var indexRow = 2;
    for (var i = 0; i < 6; i++) {
        $('#calendar-table').append('<tr id="row-days-' + i + '" onclick="cancelCalendar();"></tr>');
        for (var j = 0; j < 7; j++) {
            $('#row-days-' + [i]).append('<td id="day' + count + '" class="days" onclick="checkDay(' + count + ')">' + count + '</td>');
            count++;
        }
        indexRow++;
    }
    btnClick();
}
function btnClick() {
    setDate();
    setMonth();
    setYear();
}
//set tháng hiện tại
function setMonth() {
    $('#months').val(checkmonth);
}
//set năm hiện tại
function setYear() {
    $('#years').val(checkyear);
}
//set các ngày trong tháng
function setDate() {
    var dateNow = new Date().getDate();
    var monthNow = new Date().getMonth();
    var yearNow = new Date().getFullYear();
    var prev_month = checkmonth - 1;
    var next_month = checkmonth + 1;

    if (((checkyear % 4 === 0) && (checkyear % 100 !== 0)) || (checkyear % 400 === 0))
        numberdaymonth[1] = 29;
    else
        numberdaymonth[1] = 28;

    if (prev_month < 0)
        prev_month = 11;
    if (next_month === 12)
        next_month = 0;

    var dayIndex = new Date(checkyear, checkmonth, 1).getDay();
    positionDayOne = parseInt(dayIndex);
    var numberDay = numberdaymonth[checkmonth];
    var numberDayOfPrevMonth = numberdaymonth[prev_month];
    var numberDayOfNextMonth = numberdaymonth[next_month];

    var position = 1;
    var count = 1;
    var check = false;
    var positionStart = dayIndex;
    var positionStop = (parseInt(numberDay) + parseInt(dayIndex));

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            if (count >= dayIndex)
                check = true;
            if (check === true && position <= numberDay) {
                $('#day' + (position + dayIndex)).html(position);
                $('#day' + (position + dayIndex)).css({'background': '#FBFCFC'});
                if (dateNow === position && monthNow === checkmonth && yearNow === checkyear) {
                    $('#day' + (position + dayIndex)).css({'background': '#00ACE6'});
                    positionDateNow = "day" + (position + dayIndex);
                }
                document.getElementById("day" + (position + dayIndex)).style.color = "#000";
                position++;
            }
            count++;
        }
    }
    for (i = positionStart; i > 0; i--) {
        $('#day' + i).html(numberDayOfPrevMonth--);
        $('#day' + i).css({'color': '#D7DBDD'});
    }
    for (j = 1; j <= (42 - positionStop); j++) {
        $('#day' + (j + positionStop)).html(j);
        $('#day' + (j + positionStop)).css({'color': '#D7DBDD'});
    }
}
//chọn tháng option
function changeMonth() {
    clear();
    checkmonth = $('#months').find(':selected').val();
    // checkmonth = parseInt(document.getElementById("months").value);
    console.log("Month Check: " + checkmonth);
    setDate();
}
//chọn năm option
function changeYear() {
    clear();
    checkyear = $('#years').find(':selected').val();
    console.log("Year Check: " + checkyear);
    setDate();
}
//xóa các lịch cũ
function clear() {
    for (var i = 1; i <= 42; i++) {
        $('#day' + i).html('');
        $('#day' + i).css({'background': 'none'});
    }
}
//sự kiện click lùi 1 tháng
function btnPreviousMonthClick() {
    clear();
    checkmonth = checkmonth - 1;
    if (checkmonth < 0) {
        checkmonth = 11;
        checkyear = checkyear - 1;
    }
    console.log("Month Check: " + checkyear);
    btnClick();
}
//sự kiện click tăng 1 tháng
function btnNextMonthClick() {
    clear();
    checkmonth = parseInt(checkmonth) + 1;
    if (checkmonth > 11) {
        checkmonth = 0;
        checkyear = checkyear + 1;
    }
    console.log("Month Check: " + checkmonth);
    btnClick();
}
//giảm 1 năm
function btnPreviousYearClick() {
    clear();
    checkyear = checkyear - 1;
    console.log("YearCheck: " + checkyear);
    btnClick();
}
//tăng 1 năm
function btnNextYearClick() {
    clear();
    checkyear = checkyear + 1;
    console.log("YearCheck: " + checkyear);
    btnClick();
}
//chọn 1 ngày hiện lên input
function checkDay(position) {
    index = 1;
    var previous_month = checkmonth;
    var now_month = parseInt(checkmonth) + 1;
    var next_month = parseInt(checkmonth) + 2;
    var year = checkyear;
    var day = $('#day' + position).html();

    if (previous_month == 0)
        previous_month = 12;
    if (next_month === 13)
        next_month = 1;
    if (parseInt(day) > position) {
        if (previous_month == 12)
            year--;
        var results = day + "/" + previous_month + "/" + year;
    }
    else if (parseInt(day) < (position - positionDayOne)) {
        if (next_month === 1)
            year++;
        results = day + "/" + next_month + "/" + year;
    }
    else {
        results = day + "/" + now_month + "/" + year;
    }
    $('#date-picker').val(results);
}