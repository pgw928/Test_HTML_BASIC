
function call_ajax(){
    // 입력 텍스트 상자에서 키보드로 입력이 들어왔을 때 호출
    // 모든 키에 대해서 처리하는게 아니라 enter key일 경우에만 처리
    if(event.keyCode == 13){  // event: 현재발생한 event keyCode : 그때의 key값 (In particular, enter값이 13)
    //    만약 입력된 key가 enter key이면 이 부분을 수행하게 되요!
    // 서버쪽 프로그램을 호출해서 결과를 받아와요!
    // jQuery를 이용해서 AJAX처리 해 보아요!!
    // ajax의  인자로 javascript 객체를 넣어줘요!
    // javascript 객체는 (파이썬 dict랑 비슷) =>{ key : value, key :value,...}
    // data : 서버프로그램에게 넘겨줄 데이터들..
    $.ajax({
        async : true, // 비동기 방식의 호출(default)
        url : "http://192.168.0.200:8080/bookSearch/search",
        data : {
            keyword : $("input[type=text]").val()
        },
        type : "GET",
        timeout : 3000,
        dataType : "json", // 결과 JSON을 JavaScript 객체로 변환.
        // 이 호출이 만약 성공하면(success) , result : 받은 data
        success : function(result){
            $("tbody").empty()
            $.each(result,function(idx,item){
                var tr =$("<tr></tr>")     // <tr></tr>
                var imgTd = $("<td></td>") // <td></td>
                var img = $("<img />").attr("src",item.img)     // <img src=~~~~~>
                imgTd.append(img)
                tr.append(imgTd)
                var titleTd  = $("<td></td>").text(item.title)
                var authorTd = $("<td></td>").text(item.author)
                var priceTd  = $("<td></td>").text(item.price)
                var delTd    = $("<td></td>")
                var delBtn   = $("<input/>").attr("type","button").attr("value","삭제")
                tr.append(titleTd)
                tr.append(authorTd)
                tr.append(priceTd)
                delBtn.on('click',function(){
                    // 현재 클릭된 버튼에 대한 책 정보를 찾아서 화면에서 삭제
                    // this는 현재 이벤트가 발생된 객체를 지칭!!
                    $(this).parent().parent().remove()

                })


                delTd.append(delBtn)
                tr.append(delTd)
                $("tbody").append(tr)
            })
            // ----------------------------for 문 방법------------------------------------
            // for (var i = 0; i < result.length; i++) {                  //var 없어도됨
            //
            // var tr =$("<tr></tr>")     // <tr></tr>
            // var imgTd = $("<td></td>") // <td></td>
            // var img = $("<img />").attr("src",result[i].img)     // <img src=~~~~~>
            // imgTd.append(img)
            // tr.append(imgTd)
            // var titleTd  = $("<td></td>").text(result[i].title)
            // var authorTd = $("<td></td>").text(result[i].author)
            // var priceTd  = $("<td></td>").text(result[i].price)
            //
            // var buttonTd = $("<td></td>")
            // tr.append(titleTd)
            // tr.append(authorTd)
            // tr.append(priceTd)
            //-----------------------------------------------------------------------------

            // <tr>
        //     <td><img src=""></td>
        //     <td>제목</td>
        //     <td>저자</td>
        //     <td>가격</td>
        //     <td>버튼</td>
        //     <td>
        //      <input type=button value=삭제 onclick=do_delete()>
        //    </td>

        //     </tr>

            // alert(result[0].title)      // 제목
        },
        error : function(error){
            alert("서버호출 실패!!")
        }

    })
    }
}