
function search_image() {
    // enter key를 입력하면 .
    if(event.keyCode==13) {

        // alert("검색시작")
        // AJAX를 이용해서 DAUM쪽 OPEN API를 호출
        $.ajax({
            async : true , //동기 or 비동기
            url : "https://dapi.kakao.com/v2/search/image",//호출할 서버쪽 프로그램 URL
            data : {
                query : $("#movie_name").val() + " 포스터",
                sort : "accuracy"
            },
            beforeSend : function(xhr){
                xhr.setRequestHeader("Authorization",
                    "KakaoAK 1b81ec09b908c640d79220911f0a87ca")
            },
            type : "GET",
            timeout : 3000,
            dataType : "json",
            success : function (result) {
                var img_list = result.documents
                var li = $("<li></li>")
                var img = $("<img />").attr("src",img_list[0].thumbnail_url)
                    .addClass("myImage")
                li.append(img)
                $("ul").append(li)
            },
            error : function (error) {
                alert("망함..")
            }

        })


    }

}