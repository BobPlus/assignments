(function (_) {

    // 将HTML转换为节点
    function html2node(str) {
        var container = document.createElement('div');
        container.innerHTML = str;
        return container.children[0];
    }

    var template =
        `<div class="pager">
            <ul>
                <li class="prev"><</li>
                    <li class="next">></a></li>
        </ul>
    </div>`;
  
    function Pager(opt) {

        _.extend(this, opt);

        // 容器节点 以及 样式设置
        this.container = this.container || document.body;

        // 内部数据结构
        this.pageNum = this.links.length || 1;

        // 组件节点
        this.initialPager = this._layout.cloneNode(true);
        this.initialUl = this.initialPager.firstElementChild;
        this.initialPagers = this.initialPager.querySelectorAll('.cursor');
        this.addPagers = this.addpage(this.pageNum);

        // 初始化动作
        this.container.appendChild(this.initialPager);
        this.initialUl.insertBefore(this.addPagers, this.initialUl.lastElementChild);
    }
    window.Pager = Pager;

    _.extend(Pager.prototype, {

        _layout: html2node(template),

        //增加页面节点
        addpage: function (pageNum) {
            var addFragment = document.createDocumentFragment();
            for (let i = 0; i < pageNum; i++) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(i + 1));
                _.addClass(li, "cursor");
                addFragment.appendChild(li);
            }
            return addFragment;
        },

        //直接跳转指定页
        nav: function (pageIndex) {
            window.open(this.links[pageIndex-1],"_self");
        },
        //上一页
        prev: function (params) {
            
        },
        //下一页
        next: function (params) {
            
        }
    });
    
})(util);


