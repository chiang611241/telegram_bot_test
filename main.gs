function doPost(e){
  var estringa = JSON.parse(e.postData.contents); //得到的字串轉為JSON格式
  sendtext(estringa); //把使用者的訊息傳送到sendtext()裡
  var d = new Date(); //取得時間
  var SpreadSheet = SpreadsheetApp.openById("1KjNTIxZD3ustqPpThfyUla3MQyPt3-S2j_oceTzL7pA"); //開啟試算表
  var Sheet = SpreadSheet.getSheetByName("工作表1"); //找到試算表下的工作表1
  var LastRow = Sheet.getLastRow(); //工作表1的最後一列
  Sheet.getRange(LastRow+1, 1).setValue(d);  //最後一列的第一行儲存時間
  Sheet.getRange(LastRow+1, 2).setValue(estringa); //最後一列的第二行儲存使用者傳送的訊息
}

function sendtext(e){
  if (e.message.text == "喵"){
    var mensaje = {
      "method": "sendMessage",
      "chat_id": e.message.chat.id,
      "text": "喵喵"
    } 
   }else if(e.message.text ){
      var mensaje = {
      "method": "sendMessage",
      "chat_id": e.message.chat.id,
      "text": e.message.text
      } 
    }
    else {
    var mensaje = {
      "method": "sendMessage",
      "chat_id": e.message.chat.id,
      "text": "我只會說話跟喵喵叫"
    }
   }
  start(mensaje);
}
function start(mensaje) {
    var data = {
        "method": "post",
        "payload": mensaje
    }
    var d = new Date();
    var SpreadSheet = SpreadsheetApp.openById("1KjNTIxZD3ustqPpThfyUla3MQyPt3-S2j_oceTzL7pA");
    var Sheet = SpreadSheet.getSheetByName("工作表2");
    var LastRow = Sheet.getLastRow();
    Sheet.getRange(LastRow + 1, 1).setValue(d);
    Sheet.getRange(LastRow + 1, 3).setValue(data);
    var returned = UrlFetchApp.fetch("https://api.telegram.org/bot481773211:AAFDlZSrV8APtI4xsQ1sQTnyE_1xiYYsCCs/", data);
    Sheet.getRange(LastRow + 1, 2).setValue(returned);
}
