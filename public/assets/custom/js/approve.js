$(document).ready(function(){
    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };
    //var bucketurl = "https://herokustorage711.s3.amazonaws.com/";
    //var bucketurl = "https://console.cloud.google.com/storage/browser/herokustorage247appout/";
    var bucketurl = "https://console.cloud.google.com/storage/browser/herokustorage712/";
    // console.log("bucketurl");
    // console.log(bucketurl);
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
                            <td><span>${data[i].user}</span></td>
                            <td><a class='doclink' href=${bucketurl + data[i]._doc.url.replaceAll(" ", "%20")} target="_blank">${data[i]._doc.url}</a></td>
                            <td><div class="upload-btn-wrapper">
                                  <button class="btn" id="uploadbtn${data[i]._doc._id}">Upload a file</button>
                                  <input type="file" name="myfile" class="upload-input" data-user='${data[i].user}' doc_name='${data[i]._doc.url}' data-id='${data[i]._doc._id}' />
                                </div></td>
                            <td>
                                <a  href="/download_document/${data[i]._doc.url}"><button class="btn btn-default" >Download</button></a>
                            </td>
                            <td class="checkmark${data[i]._doc._id}"><button class="btn btn-default approve" data-user='${data[i].user}' doc_name='${data[i]._doc.url}' data-approver='${data[i].approver}' id="${data[i]._doc._id}">Approve</button></td>
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
                        var doc_id = input.getAttribute('data-id');
                        var doc_name = input.getAttribute('doc_name');
                        var user = input.getAttribute('data-user');
                        formData.append('id', doc_id);
                        formData.append('doc_name', doc_name);
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
                                $('#uploadbtn'+ doc_id).empty();
                    $('#uploadbtn' + doc_id).append('<img src="../assets/custom/images/checkmark.png"/>');
                                getDocsToApprove();
                            },
                        });
                    }
                    
                    reader.readAsDataURL(input.files[0]);
                }
            }

            $(".upload-input").change(function(){
                readURL(this);
            });

            $('.approve').click(function() {
                var user = $(this).attr('data-user');
                var approver = $(this).attr('data-approver');
                var docid = $(this).attr('id');
                var doc_name = $(this).attr('doc_name');
                console.log(approver, docid);
                var content = {
                    user: user,
                    approver: approver,
                    docid : docid,
                    doc_name : doc_name
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
                    $('.checkmark' + docid).empty();
                    $('.checkmark' + docid).append('<img src="../assets/custom/images/checkmark.png"/>');
                });
            });

        })
        .catch((err) => {
            console.log(err);
        }); 
    }

            

    getDocsToApprove();

    $('body').on('click', '#logout', function(event) {
        localStorage.clear();
        window.location.href = "/";
    });

})