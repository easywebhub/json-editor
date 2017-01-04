JSONEditor.defaults.themes.semanticui = JSONEditor.AbstractTheme.extend({
    getSelectInput:          function (options) {
        var el = this._super(options);
        el.className += 'form-control';
        //el.style.width = 'auto';
        return el;
    },
    setGridColumnSize:       function (el, size) {
        // convert base 12 cols to 16 cols
        var sizeNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];
        size = Math.ceil(size / 12 * 16);
        console.log('AA size', size);
        el.className = sizeNames[size] + ' column wide';
    },
    afterInputReady:         function (input) {
        if (input.controlgroup) return;
        input.controlgroup = this.closest(input, '.form-group');
        if (this.closest(input, '.compact')) {
            input.controlgroup.style.marginBottom = 0;
        }

        // TODO: use bootstrap slider
    },
    getTextareaInput:        function () {
        var wrapper = document.createElement('div');
        wrapper.className = 'ui form';


        var el = document.createElement('textarea');
        el.className = 'field';

        wrapper.appendChild(el);
        return wrapper;
    },
    getRangeInput:           function (min, max, step) {
        // TODO: use better slider
        return this._super(min, max, step);
    },
    getFormInputField:       function (type) {
        var el = this._super(type);
        if (type !== 'checkbox') {
            el.className += 'field';
        }
        return el;
    },
    getFormControl:          function (label, input, description) {
        var group = document.createElement('div');

        if (label && input.type === 'checkbox') {
            group.className += ' checkbox';
            label.appendChild(input);
            label.style.fontSize = '14px';
            group.style.marginTop = '0';
            group.appendChild(label);
            input.style.position = 'relative';
            input.style.cssFloat = 'left';
        } else {
            group.className += ' field';
            if (label) {
                label.className += ' ';
                group.appendChild(label);
            }
            group.appendChild(input);
        }

        if (description) group.appendChild(description);

        return group;
    },
    getIndentedPanel:        function () {
        var accordion = document.createElement('div');
        accordion.className = 'ui styled accordion getIndentedPanel';

        var title = document.createElement('div');
        title.className = 'title getIndentedPanel';
        title.innerHTML = '<i class="dropdown icon"></i>';

        var content = document.createElement('div');
        content.className = 'content getIndentedPanel';

        accordion.appendChild(title);
        accordion.appendChild(content);
        setTimeout(function () {
            $(accordion).accordion();
        }, 100);
        return accordion;
    },
    getFormInputDescription: function (text) {
        var el = document.createElement('p');
        el.className = 'help-block';
        el.innerHTML = text;
        return el;
    },
    getHeaderButtonHolder:   function () {
        var el = this.getButtonHolder();
        el.style.marginLeft = '10px';
        return el;
    },
    getButtonHolder:         function () {
        var el = document.createElement('div');
        el.className = 'ui buttons';
        return el;
    },
    getButton:               function (text, icon, title) {
        var el = this._super(text, icon, title);
        el.className += 'ui button';
        return el;
    },
    getTable:                function () {
        var el = document.createElement('table');
        el.className = 'table table-bordered';
        el.style.width = 'auto';
        el.style.maxWidth = 'none';
        return el;
    },

    addInputError:            function (input, text) {
        if (!input.controlgroup) return;
        input.controlgroup.className += ' has-error';
        if (!input.errmsg) {
            input.errmsg = document.createElement('p');
            input.errmsg.className = 'help-block errormsg';
            input.controlgroup.appendChild(input.errmsg);
        }
        else {
            input.errmsg.style.display = '';
        }

        input.errmsg.textContent = text;
    },
    removeInputError:         function (input) {
        if (!input.errmsg) return;
        input.errmsg.style.display = 'none';
        input.controlgroup.className = input.controlgroup.className.replace(/\s?has-error/g, '');
    },
    getTabHolder:             function () {
        var el = document.createElement('div');
        el.innerHTML = "<div class='tabs list-group col-md-2'></div><div class='col-md-10'></div>";
        el.className = 'rows';
        return el;
    },
    getTab:                   function (text) {
        var el = document.createElement('a');
        el.className = 'list-group-item';
        el.setAttribute('href', '#');
        el.appendChild(text);
        return el;
    },
    markTabActive:            function (tab) {
        tab.className += ' active';
    },
    markTabInactive:          function (tab) {
        tab.className = tab.className.replace(/\s?active/g, '');
    },
    getProgressBar:           function () {
        var min = 0, max = 100, start = 0;

        var container = document.createElement('div');
        container.className = 'progress';

        var bar = document.createElement('div');
        bar.className = 'progress-bar';
        bar.setAttribute('role', 'progressbar');
        bar.setAttribute('aria-valuenow', start);
        bar.setAttribute('aria-valuemin', min);
        bar.setAttribute('aria-valuenax', max);
        bar.innerHTML = start + "%";
        container.appendChild(bar);

        return container;
    },
    updateProgressBar:        function (progressBar, progress) {
        if (!progressBar) return;

        var bar = progressBar.firstChild;
        var percentage = progress + "%";
        bar.setAttribute('aria-valuenow', progress);
        bar.style.width = percentage;
        bar.innerHTML = percentage;
    },
    updateProgressBarUnknown: function (progressBar) {
        if (!progressBar) return;

        var bar = progressBar.firstChild;
        progressBar.className = 'progress progress-striped active';
        bar.removeAttribute('aria-valuenow');
        bar.style.width = '100%';
        bar.innerHTML = '';
    }
});
