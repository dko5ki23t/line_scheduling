idToken = '';
lineName = '';
LIFF_ID = "2000017950-45PDG7Dv";
POST_URL = "https://script.google.com/macros/s/AKfycbxdswLHuxily1IWasVHv91Pdp3umSeggf5zskBL4rieFdMlCC3XF_YDe03foxb5T8Sffg/exec"

$(document).ready(function () {
    const liffId = LIFF_ID;
    initializeLiff(liffId);
})

function initializeLiff(liffId) {
    liff.init({
        liffId: liffId
    }).then(() => {
    }).catch((err) => {
        console.log('LIFF Initialization failed ', err);
    });
}

/* ------------------------------
表示用の関数
------------------------------ */
function dispLoading(msg){
  // 引数なしの場合、メッセージは非表示。
    if(msg === undefined ) msg = "";
  
  // 画面表示メッセージを埋め込み
  var innerMsg = "<div id='innerMsg'>" + msg + "</div>";  
  
  // ローディング画像が非表示かどうかチェックし、非表示の場合のみ出力。
  if($("#nowLoading").length == 0){
    $("body").append("<div id='nowLoading'>" + innerMsg + "</div>");
  }
}

/* ------------------------------
表示ストップ用の関数
------------------------------ */
function removeLoading(){
  $("#nowLoading").remove();
}  

$(function () {
  $('#btn').on('click', function () {
    dispLoading("処理中...");

    //idToken = liff.getIDToken();
    //lineToken = idToken;
    idToken = getDecodedIDToken();
    lineName = idToken.name;
    const data = {
      //token: lineToken,
      name: lineName,
      days: $('input[name="days"]').val(),
    };
    //alert(lineToken);
    const data_json = JSON.stringify(data);
    $.post(POST_URL, data_json)
    .done(function(data){
      alert("正常に送信できました");
    })
    .fail(function(){
      alert("送信に失敗しました\n少し時間をおいて再送信してください");
    })
    .always(function(){
      removeLoading();
    });
  });
});