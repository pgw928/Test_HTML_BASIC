
function call_boxoffice() {


       // .replaceAll(/-/g,"")

    // if (event.keyCode == 13) {  // event: 현재발생한 event keyCode : 그때의 key값 (In particular, enter값이 13)
            $.ajax({
            async: true, // 비동기 방식의 호출(default)
            url: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
            data: {
                key: '18643900bc848dcdc45f2c1a039714b2',
                targetDt:  $("input[id=datePicker]").val().replace(/-/g,"")
            },
            type: "GET",
            timeout: 3000,
            dataType: "json", // 결과 JSON을 JavaScript 객체로 변환.
            // 이 호출이 만약 성공하면(success) , result : 받은 data
            success: function (result) {
                $("tbody").empty()
                var result_list = result.boxOfficeResult.dailyBoxOfficeList

                $.each(result_list, function (idx, item) {
                    var tr = $("<tr></tr>")     // <tr></tr>
                    var imgTd = $("<td></td>") // <td></td>
                    // var img = $("<img />").attr("src",item.img)     // <img src=~~~~~>
                    // imgTd.append(img)
                    // tr.append(imgTd)
                    var rankTd = $("<td></td>").text(item.rank)

                    var movieNmTd = $("<td></td>").text(item.movieNm)
                    var salesAccTd = $("<td></td>").text(item.salesAcc)
                    var audiAccTd = $("<td></td>").text(item.audiAcc)
                    var moviecd = item.movieCd

                    var butt = $("<input />").attr("type",'button').attr("value","영화의 상세정보")
                    var buttonTd = $("<td></td>")
                    //--------------------------------------------------------------------------------------
                    $.ajax({
                        async : true , //동기 or 비동기
                        url : "https://dapi.kakao.com/v2/search/image",//호출할 서버쪽 프로그램 URL
                        data : {
                            query : item.movieNm + " 포스터",
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

                            var img = $("<img />").attr("src",img_list[0].thumbnail_url).addClass("myImage")
                            console.log(img_list[0])
                            imgTd.append(img)
                        },
                        error : function (error) {
                            alert("망함..")
                        }

                    })

                    //--------------------------------------------------------------------------------------

                    butt.on('click',function(){
                        $.ajax({
                            async: true, // 비동기 방식의 호출(default)
                            url: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json",
                            data: {
                                key : '18643900bc848dcdc45f2c1a039714b2',
                                movieCd: moviecd
                            },
                            type: "GET",
                            timeout: 4000,
                            dataType: "json",
                            success: function (result1) {
                                var movieInfo = result1.movieInfoResult.movieInfo
                                var movieNm = movieInfo.movieNm
                                var prdtYear = movieInfo.prdtYear
                                var genres = movieInfo.genres
                                var genreNm = ''
                                for( i=0; i<genres.length; i++){
                                    genreNm = genreNm + " " + genres[i].genreNm
                                }
                                var directors=movieInfo.directors
                                var peopleNm_d =''
                                for( i=0; i<directors.length; i++){
                                    peopleNm_d = peopleNm_d + " " + directors[i].peopleNm
                                }

                                var actors = movieInfo.actors
                                var peopleNm_a =''
                                for( i=0; i<actors.length; i++){
                                    peopleNm_a = peopleNm_a + " " + actors[i].peopleNm
                                }

                                alert('영화제목 : '+movieNm +'\n'+'제작년도 : '+ prdtYear+'\n'+'영화장르 :'+genreNm +'\n'
                                +'감독 :'+peopleNm_d + '\n'+'출연배우 :'+peopleNm_a)
                            },
                            error : function(error1){
                                alert("서버호출 실패!!")}

                        })
                    })

                    buttonTd.append(butt)

                    tr.append(rankTd)
                    tr.append(imgTd)
                    tr.append(movieNmTd)
                    tr.append(salesAccTd)
                    tr.append(audiAccTd)
                    tr.append(buttonTd)




                    $("tbody").append(tr)
                })

            },
            error: function (error) {
                alert("서버호출 실패!!")
            }

        })
    }
// }
