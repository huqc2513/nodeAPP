define(function(require, exports, module) {
    var ecfFront=require('common');
    Vue.directive("input-delete", {
        bind: function () {
            var scope=this.vm;
            var el=$(this.el),
                model=el.find('input').attr('v-model'),_this=this;

            scope.$watch(model, function (value,oldValue) {
                if($.trim(value).length>0){
                    el.find(".icon-delete").show();
                }else{
                    el.find(".icon-delete").hide();
                }
            }, {
                immediate: true
            });
            el.find(".icon-delete").on("click",function(){
                scope.$set(model,'');
            });
        },
        update: function (value) {

        }
    });

    Vue.directive("select-option", {
        bind: function () {
            var self=this;
            var scope=this.vm;
            var el=$(this.el),
                binding=scope.$eval(el.attr('v-bind'));
            var items=scope.$get(binding.dataList),ul;
            var value=scope.$get(binding.selectValue);
            var dialog;
            var initHtml=function(){
                var html='<ul class="constraint-term">'
                items.forEach(function(opt,index){
                    if(opt.value==value){
                        html=html+'<li class="item active-item" value="'+ opt.value+'" index="'+index+'">'+ opt.content+"</li>";
                    }else{
                        html=html+'<li class="item" value="'+ opt.value+'" index="'+index+'">'+ opt.content+"</li>";
                    }
                })
                html=html+'</ul>';
                dialog=ecfFront.modalDialog({
                    content: {body: html},
                    className: 'select-dialog'
                })
            };
            var bindEvents=function(){
                dialog.el.on('click',function(e){

                    //如果选择的不是li标签，则隐藏这个选项框
                    if(e.target.tagName.toLowerCase() != 'li'){
                        el.parent().find('.modal-wrap').hide();
                        return
                    }
                    var target= $(e.target);
                    target.addClass('active-item').siblings().removeClass('active-item');
                    scope.$set(binding.selectValue,target.attr('value'));
                    scope.$set(binding.selectContent,target.html());

                    if(binding.selectItem){
                        scope.$set(binding.selectItem,items[target.attr('index')]);

                    }
                    if(binding.change){
                        binding.change.call(self,items[target.attr('index')],e);
                    }
                    dialog.hide();
                });
                el.on('click',function(){
                    dialog.show();
                })
            };
            initHtml();
            bindEvents();
        },
        update: function (value) {

        }
    })
    Vue.directive("city-picker", {
        bind: function () {
            var scope=this.vm;
            var el=$(this.el),
                self=this,
                binding=scope.$eval(el.attr('v-bind'));
            var data=scope.$get(binding.dataList);
            var name=scope.$get(binding.areaName);
            el.cityPicker({
                value: name,
                setInputValue: function(){

                    var v=this.value.map(function(i){return i.name}).join(" ");
                    var id=this.value.map(function(i){return i.id}).join(" ");
                    var text=this.params.formatValue ? this.params.formatValue(this, this.value, this.displayValue) : v;
                    scope.$set(binding.areaName,text);
                    scope.$set(binding.areaId,id);
                    if(binding.change){
                        binding.change(this);
                    }
                }
            },data);
        },
        update: function (value) {

        }
    });
    Vue.directive("date-picker", {
        bind: function () {
            var scope=this.vm;
            var el=$(this.el),
                self=this,
                binding=scope.$eval(el.attr('v-bind'));
            var timePicker=el.datetimePicker({
                lessDate: scope.$get(binding.lessDate),
                setInputValue: function(){
                    var v=this.value.map(function(i){return i.name}).join(" ");
                    var text=this.params.formatValue ? this.params.formatValue(this, this.value, this.displayValue) : v;
                    scope.$set(binding.dateValue,text);
                    if(binding.change){
                        binding.change.call(self,this);
                    }
                }
            });
        },
        update: function (value) {

        }
    });
});


  