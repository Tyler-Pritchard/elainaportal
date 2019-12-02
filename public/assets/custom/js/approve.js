$(document).ready(function(){
    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };

    var bucketurl = "https://herokustorage711.s3.amazonaws.com/";
    var getDocsToApprove = function() {
        var token = localStorage.getItem("token");
        axios.get("/api/getDocsToApprove", 
        {
            headers: {
                Authorization: "bearer " + token //the token is a variable which holds the token
            }
        })
        .then((res) => {
            if (res.data.status == "success") {
                console.log(res.data);
                var data = res.data.data;
                var htmlbody = $('#doclist-table tbody');
                htmlbody.empty();
                var htmlcontent = ``;
                for (var i = 0; i < data.length; i++) {
                    htmlcontent += 
                        `<tr class="doclist">
                            <td><span>${data[i].username}</span></td>
                            <td><a class='doclink' href=${bucketurl + data[i]._doc.url.replaceAll(" ", "%20")} target="_blank">${data[i]._doc.url}</a></td>
                            <td><div class="upload-btn-wrapper">
                                  <button class="btn" id="uploadbtn">Upload a file</button>
                                  <input type="file" name="myfile" id="upload-input" data-user='${data[i].user}' class='${data[i]._doc._id}' />
                                </div></td>
                            <td class="checkmark" id='${data[i]._doc._id}'><button class="btn btn-default approve" data-user='${data[i].user}' data-approver='${data[i].approver}' id="${data[i]._doc._id}">Approve</button></td>
                        </tr>`;
                }
                htmlbody.append(htmlcontent);
            }
            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    
                    reader.onload = (e) => {
                        var formData = new FormData();
                        formData.append('file', input.files[0]);
                        var className = input.getAttribute('class');
                        var user = input.getAttribute('data-user');
                        formData.append('id', className);
                        formData.append('user', user);
                        $.ajax({
                            headers: {
                                Authorization: "bearer " + token
                            },
                            type: 'POST',
                            url: '/api/fileUpload',
                            data: formData,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: (response) => {
                                getDocsToApprove();
                            },
                        });
                    }
                    
                    reader.readAsDataURL(input.files[0]);
                }
            }

            $("#upload-input").change(function(){
                readURL(this);
            });

            $('.approve').click(function() {
                var user = $(this).attr('data-user');
                var approver = $(this).attr('data-approver');
                var docid = $(this).attr('id');
                console.log(approver, docid);
                var content = {
                    user: user,
                    approver: approver,
                    docid: docid
                };
                axios.post("/api/approveDoc", {
                    content: content
                },
                {
                    headers: {
                        Authorization: "bearer " + token //the token is a variable which holds the token
                    }
                })
                .then((res) => {
                    $('.checkmark#' + docid).empty();
                    $('.checkmark#' + docid).append('<img src="../assets/custom/images/checkmark.png"/>');
                });
            });
        });
    }

    getDocsToApprove();

    $('body').on('click', '#logout', function(event) {
        localStorage.clear();
        window.location.href = "/";
    });

})