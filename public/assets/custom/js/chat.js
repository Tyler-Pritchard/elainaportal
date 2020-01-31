$(document).ready(function(){

    $(".chat-module-body").scrollTop($(".chat-module-body").height());

    var getChats = function() {
        var token = localStorage.getItem("token");
        axios.get("/api/getChats",
            //axios.get("/api/getFreshChat",
        {
            headers: {
                Authorization: "bearer " + token //the token is a variable which holds the token
            }
        })
        .then((res) => {
            if (res.data.status == "success") {
                var username = localStorage.getItem("username");
                $("h5.nav-user-name").text(username);
                var contents = res.data.data;
                var contentmodule = $(".chat-module-body");
                contentmodule.empty();
                var htmlcontent = ``;
                contents.sort((a, b) => parseFloat(a.date) - parseFloat(b.date));
                console.log(contents);
                for (var i = 0; i < contents.length; i++) {
                    var now = new Date();
                    var contentdate = new Date(contents[i].date);

                    var diff = moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(contentdate,"DD/MM/YYYY HH:mm:ss")));
                    var daydiff = diff.format("DD");
                    var monthdiff = diff.format("MM");
                    var hourdiff = diff.format("HH");
                    var minutediff = diff.format("mm");
                    var diffString = "";
                    var seconddiff = diff / 1000;
                    if (seconddiff < 60) {
                        diffString = "Just now";
                    }
                    if (seconddiff > 60 && seconddiff < 120) {
                        diffString = "A miniute ago";
                    }
                    if (seconddiff > 120 && seconddiff < 3600) {
                        diffString = Math.floor(seconddiff / 60) + " miniutes ago";
                    }
                    if (seconddiff > 3600) {
                        if (seconddiff / 3600 == 1) {
                            diffString = "An hour ago";
                        }
                        else {
                            diffString = Math.floor(diff / 3600000) + " hours ago";
                        }
                    }
                    if ( seconddiff / 3600 == 24 )
                    {
                        diffString = "A day ago";
                    }
                    if (seconddiff / 3600 >= 48) {
                        diffString = Math.floor(seconddiff / (3600 * 24)) + " days ago";
                    }

                    htmlcontent += `<div class="media chat-item">`;
                    if (contents[i].sender != "ELaiNA") {
                        htmlcontent += `<span class="chat-avatar">${contents[i].sender.charAt(0).toUpperCase()}</span>`;
                    }
                    else {
                        htmlcontent += `<img class="img-rounded img-responsive" src="/assets/img/elaina_avatar.png" height="48">`;
                        }
                        
                    htmlcontent += `
                        <div class="media-body">
                            <div class="chat-item-title">
                                <span class="chat-item-author">${contents[i].sender}</span>
                                <span>${diffString}</span>
                            </div>
                            <div class="chat-item-body">
                                <p>${contents[i].text}</p>
                            </div>
                        </div>
                    </div>`;
                }
                contentmodule.append(htmlcontent);
                var count = $(".chat-item").length;
                $(".chat-module-body").scrollTop(145 * count);
            }
        });
    }
    // getChats();
    

    $('body').on('click', '#logout', function(event) {
        localStorage.clear();
        window.location.href = "/";
    });

    $('body').on('click', '#new_btn_up', function(event) {

        var content = $('.grtvalue').val();
        // alert(content);
    
            var token = localStorage.getItem("token");
            var username = localStorage.getItem("username");
            var contentmodule = $(".chat-module-body");
            var htmlcontent =`
                <div class="media chat-item">
                <!-- <span class="chat-avatar">C</span> -->
                    <div class="media-body">
                        <div class="chat-item-title">
                        <img class="img-rounded img-responsive" src="/assets/img/elaina_avatar.png" height="48">
                            <span>Just now</span>
                        </div>
                        <div class="chat-item-body">
                            <p>${content}</p>
                        </div>
                    </div>
                </div>`;
            contentmodule.append(htmlcontent);
            var count = $(".chat-item").length;
            $(".chat-module-body").scrollTop(145 * count);
            axios.post("https://us-central1-elaina-public--woamtk.cloudfunctions.net/webApi/api/df_text_query", {
                text: content
              })
              .then((res) => {
                  console.log(res);
                  console.log(res.data.fulfillmentText);
                  if (res.status == 200) {
                      $('.form-control.mb-2.grtvalue').val("");
                    //   getChats();
                    var contentmodule = $(".chat-module-body");
                    var htmlcontent = `
                        <div class="media chat-item">
                        <!--  <span class="chat-avatar">E</span> -->
                            <div class="media-body">
                                <div class="chat-item-title">
                                <img class="img-rounded img-responsive" src="./assets/img/elaina_avatar.png" height="48">
                                    <span>Just now</span>
                                </div>
                                <div class="chat-item-body">
                                    <p>${res.data.fulfillmentText}</p>
                                </div>
                            </div>
                        </div>`;
                    contentmodule.append(htmlcontent);
                    var count = $(".chat-item").length;
                    $(".chat-module-body").scrollTop(145 * count);
                    $('.form-control.mb-2.grtvalue').val("");
                  }
              })
              .catch(() => {
                  console.log("Sorry. Server unavailable. ");
              }); 
            // axios.post("/api/pubchat", {
            //   content: content
            // },
            // {
            //     headers: {
            //         Authorization: "bearer " + token //the token is a variable which holds the token
            //     }
            // })
            // .then((res) => {
            //     console.log('Public Agent: ',res);
                
            //     if (res["data"]["status"] == 'success') {
            //         $(this).val("");
            //         getChats();
            //     }
            // })
            // .catch(() => {
            //     console.log("Sorry. Server unavailable. ");
            // }); 
        
        
    });
    $('body').on('keyup', 'form.chat-form textarea', function(event) {
        var content = $(this).val();
        if (event.keyCode == 13 && !event.shiftKey) {
            var token = localStorage.getItem("token");
            var username = localStorage.getItem("username");
            var contentmodule = $(".chat-module-body");
            var htmlcontent = `
                <div class="media chat-item">  
                <!-- <span class="chat-avatar">C</span> -->
                    <div class="media-body">
                        <div class="chat-item-title">
                        <img class="img-rounded img-responsive" src="/assets/img/elaina_avatar.png" height="48">
                            <span>Just now</span>
                        </div>
                        <div class="chat-item-body">
                            <p>${content}</p>
                        </div>
                    </div>
                </div>`;
            contentmodule.append(htmlcontent);
            var count = $(".chat-item").length;
            $(".chat-module-body").scrollTop(145 * count);
            axios.post("https://us-central1-elaina-public--woamtk.cloudfunctions.net/webApi/api/df_text_query", {
                text: content
              })
              .then((res) => {
                  console.log(res);
                  console.log(res.data.fulfillmentText);
                  if (res.status == 200) {
                      $(this).val("");
                    //   getChats();
                    var contentmodule = $(".chat-module-body");
                    var htmlcontent = `
                        <div class="media chat-item">
                        <!-- <span class="chat-avatar">E</span> -->
                            <div class="media-body">
                                <div class="chat-item-title">
                                <img class="img-rounded img-responsive" src="/assets/img/elaina_avatar.png" height="48">
                                    <span>Just now</span>
                                </div>
                                <div class="chat-item-body">
                                    <p>${res.data.fulfillmentText}</p>
                                </div>
                            </div>
                        </div>`;
                    contentmodule.append(htmlcontent);
                    var count = $(".chat-item").length;
                    $(".chat-module-body").scrollTop(145 * count);
                    $(this).val("");
                  }
              })
              .catch(() => {
                  console.log("Sorry. Server unavailable. ");
              }); 
            // axios.post("/api/pubchat", {
            //   content: content
            // },
            // {
            //     headers: {
            //         Authorization: "bearer " + token //the token is a variable which holds the token
            //     }
            // })
            // .then((res) => {
            //     console.log('Public Agent: ',res);
                
            //     if (res["data"]["status"] == 'success') {
            //         $(this).val("");
            //         getChats();
            //     }
            // })
            // .catch(() => {
            //     console.log("Sorry. Server unavailable. ");
            // }); 
        }
        
    });

})