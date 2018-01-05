(function(){
    var fileUpload=function(options){

        var opts= $.extend({
            auto: true,
            fileType: "",
            fileInput: null,				//html file控件
            url: "",						//ajax地址
            fileFilter: [],					//过滤后的文件数组
            filter: null,		//选择文件组的过滤,
            onSelect: function() {},		//文件选择后
            onDelete: function() {},		//文件删除后
            onDragOver: function() {},		//文件拖拽到敏感区域时
            onDragLeave: function() {},	//文件离开到敏感区域时
            onProgress: function() {},		//文件上传进度
            onSuccess: function() {},		//文件上传成功时
            onFailure: function() {},		//文件上传失败时,
            onComplete: function() {}		//文件全部上传完毕时
        },options);
        var fileFilter=[],self=this;
        var formatFileSize = function(size){
            return (Math.round(size * 100 / 1024) / 100).toString() + 'KB';
        }
        var filter=function(files){
            if(opts.filter)
                opts.filter(files);
            else{
                var arrFiles = [];
                for (var i = 0, file; file = files[i]; i++) {
                    var type=file.name.split('.').pop();
                    if (opts.fileType=="" || opts.fileType.indexOf(type)>=0) {
                        var size=formatFileSize(file.size);
                        if (size >= opts.size) {
                            alert('文件过大，应小于'+opts.size+'k');
                        } else {
                            arrFiles.push(file);
                        }
                    } else {
                        alert('文件格式错误');
                    }
                }
                return arrFiles;
            }

        };
        //选中文件的处理与回调
        var funDealFiles= function() {
            for (var i = 0, file; file = fileFilter[i]; i++) {
                //增加唯一索引值
                file.index = i;
            }
            //执行选择回调
            opts.onSelect(fileFilter);
        };
        var funGetFiles= function(e) {
            // 获取文件列表对象
            var files = e.target.files || e.dataTransfer.files;
            //继续添加文件
            fileFilter = fileFilter.concat(filter(files));
            funDealFiles();
        };
        //删除对应的文件
        var funDeleteFile= function(fileDelete) {
            var arrFile = [];
            for (var i = 0, file; file = fileFilter[i]; i++) {
                if (file != fileDelete) {
                    arrFile.push(file);
                } else {
                    opts.onDelete(fileDelete);
                }
            }
            fileFilter = arrFile;
        };
        //文件上传
        var funUploadFile= function() {
            for (var i = 0, file; file = fileFilter[i]; i++) {
                (function(file) {
                    var xhr = new XMLHttpRequest();
                    if (xhr.upload) {
                        // 上传中
                        xhr.upload.addEventListener("progress", function(e) {
                            opts.onProgress(file, e.loaded, e.total);
                        }, false);

                        // 文件上传成功或是失败
                        xhr.onreadystatechange = function(e) {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    opts.onSuccess(file, xhr.responseText);
                                    funDeleteFile(file);
                                    if (!self.fileFilter.length) {
                                        //全部完毕
                                        opts.onComplete();
                                    }
                                } else {
                                    opts.onFailure(file, xhr.responseText);
                                }
                            }
                        };

                        // 开始上传
                        xhr.open("POST", opts.url, true);
                        xhr.setRequestHeader("X_FILENAME", unescape(encodeURIComponent(file.name)));
                        xhr.send(file);
                    }
                })(file);
            }

        };
        this.fileFilter=fileFilter,this.opts=opts;
        this.formatFileSize=formatFileSize;
        if (opts.fileInput) {
            opts.fileInput.on("change",function(e){
                funGetFiles(e);
                if(opts.auto){
                    funUploadFile();
                }
            });
        }
    };
    window.html5FileUpload=fileUpload;
})()