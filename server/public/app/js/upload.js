(function(){
    var fileUpload=function(options){

        var opts= $.extend({
            auto: true,
            fileType: "",
            fileInput: null,				//html file�ؼ�
            url: "",						//ajax��ַ
            fileFilter: [],					//���˺���ļ�����
            filter: null,		//ѡ���ļ���Ĺ���,
            onSelect: function() {},		//�ļ�ѡ���
            onDelete: function() {},		//�ļ�ɾ����
            onDragOver: function() {},		//�ļ���ק����������ʱ
            onDragLeave: function() {},	//�ļ��뿪����������ʱ
            onProgress: function() {},		//�ļ��ϴ�����
            onSuccess: function() {},		//�ļ��ϴ��ɹ�ʱ
            onFailure: function() {},		//�ļ��ϴ�ʧ��ʱ,
            onComplete: function() {}		//�ļ�ȫ���ϴ����ʱ
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
                            alert('�ļ�����ӦС��'+opts.size+'k');
                        } else {
                            arrFiles.push(file);
                        }
                    } else {
                        alert('�ļ���ʽ����');
                    }
                }
                return arrFiles;
            }

        };
        //ѡ���ļ��Ĵ�����ص�
        var funDealFiles= function() {
            for (var i = 0, file; file = fileFilter[i]; i++) {
                //����Ψһ����ֵ
                file.index = i;
            }
            //ִ��ѡ��ص�
            opts.onSelect(fileFilter);
        };
        var funGetFiles= function(e) {
            // ��ȡ�ļ��б����
            var files = e.target.files || e.dataTransfer.files;
            //��������ļ�
            fileFilter = fileFilter.concat(filter(files));
            funDealFiles();
        };
        //ɾ����Ӧ���ļ�
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
        //�ļ��ϴ�
        var funUploadFile= function() {
            for (var i = 0, file; file = fileFilter[i]; i++) {
                (function(file) {
                    var xhr = new XMLHttpRequest();
                    if (xhr.upload) {
                        // �ϴ���
                        xhr.upload.addEventListener("progress", function(e) {
                            opts.onProgress(file, e.loaded, e.total);
                        }, false);

                        // �ļ��ϴ��ɹ�����ʧ��
                        xhr.onreadystatechange = function(e) {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    opts.onSuccess(file, xhr.responseText);
                                    funDeleteFile(file);
                                    if (!self.fileFilter.length) {
                                        //ȫ�����
                                        opts.onComplete();
                                    }
                                } else {
                                    opts.onFailure(file, xhr.responseText);
                                }
                            }
                        };

                        // ��ʼ�ϴ�
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