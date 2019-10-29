var BrickyEditor = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var $dom = (function () {
        function $dom() {
        }
        $dom.el = function (html) {
            var div = document.createElement("div");
            div.innerHTML = html;
            var el = div.firstElementChild;
            div.innerHTML = null;
            return el;
        };
        $dom.ons = function (el, events, listener) {
            var _this = this;
            events.split(" ").forEach(function (ev) {
                _this.on(el, ev, listener);
            });
        };
        $dom.on = function (el, event, listener) {
            if (el.attachEvent)
                return el.attachEvent("on" + event, listener);
            else {
                return el.addEventListener(event, listener, false);
            }
        };
        $dom.offset = function (el) {
            var rect = el.getBoundingClientRect();
            var $body = document.body;
            return {
                top: rect.top + $body.scrollTop,
                left: rect.left + $body.scrollLeft,
            };
        };
        $dom.wrap = function (el, toEl) {
            el.parentElement.insertBefore(toEl, el);
            toEl.appendChild(el);
        };
        $dom.unwrap = function (el) {
            if (!el.parentElement)
                return;
            var parentsParent = el.parentElement.parentElement;
            if (parentsParent) {
                parentsParent.replaceChild(el, el.parentElement);
            }
            else {
                el.parentElement.innerHTML = el.innerHTML;
            }
        };
        $dom.hide = function (el) {
            el.style.display = "none";
        };
        $dom.show = function (el) {
            el.style.display = "block";
        };
        $dom.isHidden = function (el) {
            var style = window.getComputedStyle(el);
            return style.display === "none";
        };
        $dom.toggle = function (el, force) {
            var show = force ? force.valueOf() : this.isHidden(el);
            if (show)
                this.show(el);
            else
                this.hide(el);
        };
        $dom.before = function (el, elToInsert) {
            var _this = this;
            if (elToInsert instanceof HTMLElement) {
                el.parentNode.insertBefore(elToInsert, el);
            }
            else {
                elToInsert.forEach(function ($el) { return _this.before(el, $el); });
            }
        };
        $dom.after = function (el, elToInsert) {
            if (el.nextSibling)
                el.parentNode.insertBefore(elToInsert, el);
            else
                el.parentNode.appendChild(elToInsert);
        };
        $dom.hasClass = function (el, className) {
            if (el.classList)
                return el.classList.contains(className);
            else
                return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
        };
        $dom.addClass = function (el, className) {
            if (this.hasClass(el, className))
                return;
            if (el.classList)
                el.classList.add(className);
            else
                el.className += " " + className;
        };
        $dom.removeClass = function (el, className) {
            if (el.classList)
                el.classList.remove(className);
            else
                el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
        };
        $dom.toggleClass = function (el, className, force) {
            if (force) {
                if (force.valueOf())
                    this.addClass(el, className);
                else
                    this.removeClass(el, className);
                return;
            }
            if (el.classList) {
                el.classList.toggle(className);
            }
            else {
                var classes = el.className.split(" ");
                var existingIndex = -1;
                for (var i = classes.length; i--;) {
                    if (classes[i] === className)
                        existingIndex = i;
                }
                if (existingIndex >= 0)
                    classes.splice(existingIndex, 1);
                else
                    classes.push(className);
                el.className = classes.join(" ");
            }
        };
        $dom.windowScrollTop = function () {
            return window.pageYOffset !== undefined
                ? window.pageYOffset
                : ((document.documentElement ||
                    document.body.parentNode ||
                    document.body)).scrollTop;
        };
        $dom.replaceWith = function (from, to) {
            var parent = from.parentElement;
            if (parent)
                parent.replaceChild(to, from);
        };
        $dom.select = function (el, selector, addBack) {
            if (addBack === void 0) { addBack = false; }
            var elements = el.querySelectorAll(selector);
            var result = Array.prototype.slice.call(elements);
            if (addBack && addBack.valueOf() && $dom.matches(el, selector)) {
                result.push(el);
            }
            return result;
        };
        $dom.find = function (selector) {
            return document.querySelector(selector);
        };
        $dom.first = function (el, selector) {
            return el.querySelector(selector);
        };
        $dom.clone = function (el) {
            return el.cloneNode(true);
        };
        $dom.trigger = function (el, ev, data) {
            if (window.CustomEvent) {
                var event = new CustomEvent(ev, { detail: data });
            }
            else {
                var event = document.createEvent("CustomEvent");
                event.initCustomEvent(ev, true, true, data);
            }
            el.dispatchEvent(event);
        };
        $dom.matches = function (el, selector) {
            var matches = el.matches ||
                el["matchesSelector"] ||
                el.msMatchesSelector ||
                el["mozMatchesSelector"] ||
                el.webkitMatchesSelector ||
                el["oMatchesSelector"];
            return matches.call(el, selector);
        };
        $dom.data = function (el, prop) {
            var json = el.dataset[prop];
            var data = null;
            try {
                data = JSON.parse(json);
            }
            catch (e) {
                if (e instanceof SyntaxError) {
                    json = json.replace(/'/g, '"');
                    try {
                        data = JSON.parse(json);
                    }
                    catch (_a) { }
                }
            }
            return data;
        };
        return $dom;
    }());
    //# sourceMappingURL=DOMHelpers.js.map

    var EditorStrings = (function () {
        function EditorStrings() {
        }
        EditorStrings.errorBlocksFileNotFound = function (url) {
            return "Blocks file not found. Requested file: " + url + ".";
        };
        EditorStrings.errorTemplatesFileNotFound = function (url) {
            return "Templates file not found. Requested file: " + url + ".";
        };
        EditorStrings.errorBlockTemplateNotFound = function (templateName) {
            return "Template \"" + templateName + "\" not found.";
        };
        EditorStrings.errorTemplateParsing = function (name) {
            return "Template parsing error: " + name + ".";
        };
        EditorStrings.embedFieldLinkTitle = "Link to embed media";
        EditorStrings.embedFieldLinkPlaceholder = "Link to instagram, youtube and etc.";
        EditorStrings.imageFieldLinkTitle = "Image link";
        EditorStrings.imageFieldLinkPlaceholder = "http://url-to-image.png";
        EditorStrings.imageFieldUploadTitle = "or Upload a file";
        EditorStrings.imageFieldUploadButton = "Select file";
        EditorStrings.imageFieldAltTitle = "Alt";
        EditorStrings.imageFieldAltPlaceholder = "Image 'alt' attribute value";
        EditorStrings.imageFieldUrlSubtitle = "Link to open on image click";
        EditorStrings.htmlEditorLinkUrlTitle = "Url";
        EditorStrings.htmlEditorLinkUrlPlaceholder = "http://put-your-link.here";
        EditorStrings.htmlEditorLinkTitleTitle = "Title";
        EditorStrings.htmlEditorLinkTitlePlaceholder = "Title attribute for link";
        EditorStrings.htmlEditorLinkTargetTitle = "Target";
        EditorStrings.htmlEditorLinkTargetBlank = "Blank";
        EditorStrings.htmlEditorLinkTargetSelf = "Self";
        EditorStrings.htmlEditorLinkTargetParent = "Parent";
        EditorStrings.htmlEditorLinkTargetTop = "Top";
        EditorStrings.buttonClose = "close";
        EditorStrings.buttonOk = "Ok";
        EditorStrings.buttonCancel = "Cancel";
        EditorStrings.defaultTemplatesGroupName = "Other templates";
        return EditorStrings;
    }());
    //# sourceMappingURL=EditorStrings.js.map

    var str = {
        totalTrim: function (s) {
            return s !== undefined ? s.replace(/\s\s+/g, " ").trim() : "";
        },
        equalsInvariant: function (s1, s2) {
            return s1.toLowerCase() === s2.toLowerCase();
        },
        startsWith: function (s1, s2) { return s1.indexOf(s2) === 0; },
    };
    var Common = (function () {
        function Common() {
        }
        Common.extend = function (out) {
            var extensions = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                extensions[_i - 1] = arguments[_i];
            }
            out = out || {};
            for (var i = 1; i < extensions.length; i++) {
                if (!extensions[i]) {
                    continue;
                }
                for (var key in extensions[i]) {
                    if (extensions[i].hasOwnProperty(key)) {
                        out[key] = extensions[i][key];
                    }
                }
            }
            return out;
        };
        Common.getSelectedText = function () {
            var text = "";
            var doc = document;
            if (window.getSelection) {
                text = window.getSelection().toString();
            }
            else if (doc.selection && doc.selection.type !== "Control") {
                text = doc.selection.createRange().text;
            }
            return text;
        };
        Common.propsEach = function (obj, func) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var value = obj[key];
                    func(key, value);
                }
            }
        };
        Common.propsFilterKeys = function (obj, filter, payload) {
            var result = [];
            Common.propsEach(obj, function (key, value) {
                if (filter(key, value)) {
                    result.push(key);
                }
            });
            if (payload) {
                result.push(payload);
            }
            return result;
        };
        return Common;
    }());
    //# sourceMappingURL=Common.js.map

    var defaultOptions = {
        templatesUrl: "templates/bootstrap4.html",
        compactTools: false,
        compactToolsWidth: 768,
        ignoreHtml: true,
        onError: function (data) {
            console.log(data.message);
        },
    };
    //# sourceMappingURL=defaults.js.map

    var Selectors = (function () {
        function Selectors() {
        }
        Selectors.attr = function (attr) {
            return "[" + attr + "]";
        };
        Selectors.attrContentEditable = "contenteditable";
        Selectors.selectorContentEditable = "contenteditable";
        Selectors.attrField = "data-bre-field";
        Selectors.selectorField = "[" + Selectors.attrField + "]";
        Selectors.classEditor = "bre-editor";
        Selectors.classTemplate = "bre-template";
        Selectors.selectorTemplate = "." + Selectors.classTemplate;
        Selectors.classTemplateGroup = "bre-template-group";
        Selectors.selectorTemplateGroup = "." + Selectors.classTemplateGroup;
        Selectors.selectorTemplatePreview = ".bre-template-preview";
        Selectors.classMobile = "brickyeditor-tools-mobile";
        Selectors.htmlToolsCommand = "data-bre-doc-command";
        Selectors.htmlToolsCommandRange = "data-bre-doc-command-range";
        Selectors.selectorFieldSelected = "bre-field-selected";
        Selectors.selectorFieldContainer = "bre-field-container";
        Selectors.selectorHtmlToolsCommand = Selectors.attr(Selectors.htmlToolsCommand);
        Selectors.selectorHtmlToolsCommandRange = Selectors.attr(Selectors.htmlToolsCommandRange);
        return Selectors;
    }());
    //# sourceMappingURL=Selectors.js.map

    var BaseField = (function () {
        function BaseField($field, data, onSelect, onUpdate, onUpload) {
            this.$field = $field;
            this.data = data;
            this.onSelect = onSelect;
            this.onUpdate = onUpdate;
            this.onUpload = onUpload;
            this.bind();
        }
        Object.defineProperty(BaseField, "type", {
            get: function () {
                var name = this.name;
                name = name.replace("Field", "");
                name = name.substring(0, 1).toLowerCase() + name.substring(1);
                return name;
            },
            enumerable: true,
            configurable: true
        });
        BaseField.registerCommonFields = function () {
            if (!this.commonFieldsRegistered) {
                HtmlField.registerField();
                ImageField.registerField();
                EmbedField.registerField();
                ContainerField.registerField();
            }
            this.commonFieldsRegistered = true;
        };
        BaseField.createField = function ($field, data, onSelect, onUpdate, onUpload) {
            var fieldData = $dom.data($field, "breField");
            if (!fieldData || !fieldData.name) {
                throw new Error("There is no data or data doesn't contains 'name' in field " + $field.innerHTML);
            }
            if (data !== undefined) {
                var addFieldData = {};
                for (var field in data) {
                    if (field.name.toLowerCase() === fieldData.name.toLowerCase()) {
                        addFieldData = field;
                        break;
                    }
                }
                if (addFieldData) {
                    fieldData = Common.extend(fieldData, addFieldData);
                }
            }
            var type = fieldData.type;
            if (type != null) {
                if (!BaseField.commonFieldsRegistered) {
                    BaseField.registerCommonFields();
                }
                if (this._fields.hasOwnProperty(type)) {
                    var field = this._fields[type];
                    return new field($field, fieldData, onSelect, onUpdate, onUpload);
                }
                else {
                    throw new Error(type + " field not found");
                }
            }
            else {
                throw new Error("Field type not defined in data-bre-field attribute");
            }
        };
        BaseField.registerField = function () {
            if (this._fields.hasOwnProperty(this.type)) {
                delete this._fields[this.type];
            }
            this._fields[this.type] = this;
        };
        BaseField.prototype.deselect = function () {
            this.$field.classList.remove(Selectors.selectorFieldSelected);
        };
        BaseField.prototype.getEl = function () {
            var $el = this.$field.cloneNode(true);
            $el.attributes.removeNamedItem(Selectors.attrField);
            return $el;
        };
        BaseField.prototype.getSettingsEl = function () {
            return null;
        };
        BaseField.prototype.bind = function () {
        };
        BaseField.prototype.select = function () {
            this.$field.classList.add(Selectors.selectorFieldSelected);
            this.onSelect(this);
        };
        BaseField.prototype.updateProperty = function (prop, value, fireUpdate) {
            if (fireUpdate === void 0) { fireUpdate = true; }
            var oldValue = this.data[prop];
            if (oldValue === value) {
                return;
            }
            this.data[prop] = value;
            if (fireUpdate) {
                this.onUpdate(prop, oldValue, value);
            }
        };
        BaseField.commonFieldsRegistered = false;
        BaseField._fields = {};
        return BaseField;
    }());
    //# sourceMappingURL=BaseField.js.map

    var ContainerField = (function (_super) {
        __extends(ContainerField, _super);
        function ContainerField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ContainerField.prototype.bind = function () {
            var _this = this;
            var field = this;
            var $field = this.$field;
            this.container = new BlocksContainer($field, function (block) {
                field.updateBlocks();
            }, function (block) {
                field.updateBlocks();
            }, function (block) {
                _this.select();
            }, function (block) {
            }, function (block) {
                field.updateBlocks();
            }, function (block) {
                field.updateBlocks();
            }, field.onUpload, true);
            $dom.addClass($field, Selectors.selectorFieldContainer);
            $dom.on($field, "click", function (ev) {
                field.select();
                ev.stopPropagation();
                return false;
            });
        };
        ContainerField.prototype.updateBlocks = function () {
            var container = this.container;
            var data = getContainerData(container, true);
            this.updateProperty("blocks", data, true);
            var html = getContainerHtml(container);
            this.updateProperty("html", html, true);
        };
        ContainerField.prototype.deselect = function () {
            this.container.blocks.forEach(function (b) { return b.deselect(); });
            this.$field.classList.remove(Selectors.selectorFieldSelected);
        };
        ContainerField.prototype.getEl = function () {
            var container = this.container;
            var html = getContainerHtml(container);
            return $dom.el(html);
        };
        return ContainerField;
    }(BaseField));
    //# sourceMappingURL=ContainerField.js.map

    var PromptParameter = (function () {
        function PromptParameter(key, title, value, placeholder) {
            this.key = key;
            this.title = title;
            this.placeholder = placeholder || "";
            this.value = value;
        }
        PromptParameter.prototype.parseValue = function () {
            if (this.$input) {
                this.value = this.$input.value;
            }
            this.$control = null;
            delete this._$control;
        };
        Object.defineProperty(PromptParameter.prototype, "$control", {
            get: function () {
                if (!this._$control) {
                    this._$control = $dom.el("<div class=" + (this.key ? "bre-prompt-field" : "bre-prompt-subtitle") + ">\n                            <label class=\"bre-label\" for=\"" + this.key + "\">" + (this.title ? this.title : "Select file...") + "</label>\n                        </div>");
                    this.$input = this.key ? this.getEditor() : null;
                    if (this.$input != null) {
                        this._$control.appendChild(this.$input);
                    }
                }
                return this._$control;
            },
            set: function (value) {
                this._$control = value;
            },
            enumerable: true,
            configurable: true
        });
        PromptParameter.prototype.getEditor = function () {
            var $input = document.createElement("input");
            $input.id = this.key;
            $input.className = "bre-input";
            $input.setAttribute("type", "text");
            $input.setAttribute("placeholder", this.placeholder);
            $input.value = this.value || "";
            return $input;
        };
        return PromptParameter;
    }());
    //# sourceMappingURL=PromptParameter.js.map

    var PromptParameterImage = (function (_super) {
        __extends(PromptParameterImage, _super);
        function PromptParameterImage(key, title, value, placeholder) {
            var _this = _super.call(this, key, title, value, placeholder) || this;
            if (value) {
                _this._value = value;
            }
            return _this;
        }
        PromptParameterImage.prototype.parseValue = function () {
            this.value = this._value;
            this.$control = null;
            delete this._$control;
            this._value = null;
            delete this._value;
        };
        PromptParameterImage.prototype.getEditor = function () {
            var field = this;
            var img = this.value && this.value.fileContent ? this.value.fileContent : "";
            var $editor = $dom.el("\n                <div class='bre-image-input'>\n                    <label for=\"" + this.key + "\">\n                        " + this.placeholder + "\n                    </label>                        \n                    <img src=\"" + img + "\"/>                    \n                    <input type=\"file\" id=\"" + this.key + "\" class=\"bre-input\" placeholder=\"" + this.placeholder + "\">\n                </div>\n                <small class='bre-image-input-filename'></small>");
            var $file = $editor.querySelector("input");
            var $filePreview = $editor.querySelector("img");
            var $fileName = $editor.querySelector(".bre-image-input-filename");
            var value = this.value;
            field.updatePreview($filePreview, $fileName, this.value);
            $file.onchange = function () {
                if ($file.files && $file.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (ev) {
                        var target = ev.target;
                        field._value = new PromptParameterImageResult();
                        field._value.fileContent = target.result;
                        field._value.fileInfo = new PromptParameterImageResultFile($file.files[0]);
                        field.updatePreview($filePreview, $fileName, field._value);
                    };
                    reader.readAsDataURL($file.files[0]);
                }
            };
            return $editor;
        };
        PromptParameterImage.prototype.updatePreview = function ($filePreview, $fileName, value) {
            if (!value) {
                return;
            }
            $filePreview.src = value.fileContent;
            $filePreview.classList.add("bre-loaded");
            $fileName.innerText = value.fileInfo.name;
        };
        return PromptParameterImage;
    }(PromptParameter));
    //# sourceMappingURL=PromptParameterImage.js.map

    var PromptParameterImageResult = (function () {
        function PromptParameterImageResult() {
        }
        return PromptParameterImageResult;
    }());
    var PromptParameterImageResultFile = (function () {
        function PromptParameterImageResultFile(file) {
            this.name = file.name;
            this.size = file.size;
            this.type = file.type;
            this.lastModified = file.lastModified;
            this.lastModifiedDate = file.lastModifiedDate;
        }
        return PromptParameterImageResultFile;
    }());
    //# sourceMappingURL=PromptParameterImageResult.js.map

    var PromptParameterList = (function () {
        function PromptParameterList(params) {
            this.params = params;
        }
        PromptParameterList.prototype.getValue = function (key) {
            var param = this.params.find(function (p) {
                return p.key === key;
            });
            return param ? param.value : null;
        };
        return PromptParameterList;
    }());
    //# sourceMappingURL=PromptParameterList.js.map

    var PromptParameterOption = (function () {
        function PromptParameterOption(title, value, selected) {
            if (selected === void 0) { selected = false; }
            this.title = title;
            this.value = value;
            this.selected = selected;
        }
        return PromptParameterOption;
    }());
    //# sourceMappingURL=PromptParameterOption.js.map

    //# sourceMappingURL=Prompt.js.map

    var PromptParameterOptions = (function (_super) {
        __extends(PromptParameterOptions, _super);
        function PromptParameterOptions(key, title, options, value, placeholder) {
            var _this = _super.call(this, key, title, value, placeholder) || this;
            _this.options = [];
            options.forEach(function (kv) {
                _this.options.push(new PromptParameterOption(kv[0], kv[1], kv[1] == value));
            });
            return _this;
        }
        PromptParameterOptions.prototype.getEditor = function () {
            var options = this.options.map(function (opt) {
                return "<option value=\"" + opt.value + "\" " + (opt.selected ? "selected" : "") + ">" + (opt.title ? opt.title : opt.value) + "</option>";
            });
            return $dom.el("<select type=\"text\" id=\"" + this.key + "\" class=\"brickyeditor-input\" placeholder=\"" + this.placeholder + "\">" + options + "</select>");
        };
        return PromptParameterOptions;
    }(PromptParameter));
    //# sourceMappingURL=PromptParameterOptions.js.map

    //# sourceMappingURL=Prompt.js.map

    var getRequest = function (url) {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 400) {
                        var data = null;
                        try {
                            data = JSON.parse(this.responseText);
                        }
                        catch (_a) {
                            data = this.responseText;
                        }
                        try {
                            resolve(data);
                        }
                        catch (ex) {
                            reject(ex);
                        }
                    }
                    else {
                        reject();
                    }
                }
            };
            request.send();
            request = null;
        });
    };
    var jsonp = function (url) {
        return new Promise(function (resolve, reject) {
            var id = "_" + Math.round(10000 * Math.random());
            var callbackName = "jsonp_callback_" + id;
            window[callbackName] = function (data) {
                delete window[callbackName];
                var element = document.getElementById(id);
                if (element !== null) {
                    element.remove();
                }
                resolve(data);
            };
            var src = url + "&callback=" + callbackName;
            var script = document.createElement("script");
            script.src = src;
            script.id = id;
            script.addEventListener("error", reject);
            (document.getElementsByTagName("head")[0] ||
                document.body ||
                document.documentElement).appendChild(script);
        });
    };
    //# sourceMappingURL=httpTransport.js.map

    var EmbedService = (function () {
        function EmbedService() {
        }
        EmbedService.getEmbedAsync = function (embedUrl) {
            var _this = this;
            var url = "https://noembed.com/embed?url=" + embedUrl;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var data, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, jsonp(url)];
                        case 1:
                            data = _a.sent();
                            resolve(data);
                            return [3, 3];
                        case 2:
                            err_1 = _a.sent();
                            reject(err_1);
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            }); });
        };
        EmbedService.processEmbed = function (provider) {
            switch (provider) {
                case EmbedService.Instagram:
                    if (instgrm) {
                        instgrm.Embeds.process();
                    }
                    break;
                default:
                    break;
            }
        };
        EmbedService.Instagram = "Instagram";
        return EmbedService;
    }());
    //# sourceMappingURL=EmbedService.js.map

    //# sourceMappingURL=Services.js.map

    var EmbedField = (function (_super) {
        __extends(EmbedField, _super);
        function EmbedField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(EmbedField.prototype, "settings", {
            get: function () {
                var _this = this;
                return function (field) {
                    _this.showEmbedLoaderAsync(field);
                };
            },
            enumerable: true,
            configurable: true
        });
        EmbedField.prototype.getSettingsEl = function () {
            var $el = $dom.el('<div style="position: absolute;width: 100%; height: 100px;;text-align: center;font-weight: bold;vertical-align: middle;background: #333;opacity: 0.2;">Change embed element link</div>');
            $dom.before(this.$field, $el);
            return $el;
        };
        EmbedField.prototype.bind = function () {
            var _this = this;
            var field = this;
            var $field = this.$field;
            $dom.on($field, "click", function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.showEmbedLoaderAsync(field);
                    return [2];
                });
            }); });
            field.loadMedia(false);
        };
        EmbedField.prototype.loadMedia = function (fireUpdate) {
            return __awaiter(this, void 0, void 0, function () {
                var field, json, $embed, $script, scriptSrc;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            field = this;
                            if (!field.data || !field.data.url) {
                                return [2];
                            }
                            return [4, EmbedService.getEmbedAsync(field.data.url)];
                        case 1:
                            json = _a.sent();
                            field.setEmbed(json, fireUpdate);
                            $embed = $dom.el(json.html);
                            $script = $dom.first($embed, "script");
                            if ($script) {
                                $script.remove();
                                scriptSrc = $script.src;
                                if (str.startsWith(scriptSrc, "//")) {
                                    scriptSrc = "https:" + scriptSrc;
                                    loadScript(scriptSrc).then(function () {
                                        EmbedService.processEmbed(json.provider_name);
                                    });
                                }
                            }
                            field.$field.innerHTML = "";
                            field.$field.removeAttribute("class");
                            field.$field.removeAttribute("style");
                            field.$field.appendChild($embed);
                            field.select();
                            return [2];
                    }
                });
            });
        };
        EmbedField.prototype.setEmbed = function (value, fireUpdate) {
            if (fireUpdate === void 0) { fireUpdate = true; }
            this.updateProperty("embed", value, fireUpdate);
        };
        EmbedField.prototype.setUrl = function (value) {
            this.updateProperty("url", value);
        };
        EmbedField.prototype.showEmbedLoaderAsync = function (field) {
            return __awaiter(this, void 0, void 0, function () {
                var fields, url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, Editor.UI.modal.promptAsync(field.getPromptParams())];
                        case 1:
                            fields = _a.sent();
                            if (!(fields != null)) return [3, 3];
                            url = fields.getValue("url");
                            if (!url) return [3, 3];
                            field.setUrl(url);
                            return [4, field.loadMedia(true)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        EmbedField.prototype.getPromptParams = function () {
            return [
                new PromptParameter("url", EditorStrings.embedFieldLinkTitle, this.data.url || "http://instagr.am/p/BO9VX2Vj4fF/", EditorStrings.embedFieldLinkPlaceholder),
            ];
        };
        return EmbedField;
    }(BaseField));

    var SelectionUtils = (function () {
        function SelectionUtils() {
        }
        SelectionUtils.bindTextSelection = function ($el, handler) {
            var _this = this;
            if (!$dom.matches($el, "[contenteditable]")) {
                return;
            }
            $dom.on($el, "mouseup", function () {
                setTimeout(function () {
                    var rect = _this.getSelectionRect();
                    handler(rect);
                }, 0);
            });
            $dom.on($el, "keyup", function (ev) {
                var rect = _this.getSelectionRect();
                handler(rect);
            });
        };
        SelectionUtils.getSelectionRect = function () {
            var selection = window.getSelection();
            var range = selection.getRangeAt(0);
            if (range) {
                var rect = range.getBoundingClientRect();
                if (rect) {
                    return rect;
                }
            }
            return null;
        };
        return SelectionUtils;
    }());
    //# sourceMappingURL=SelectionUtils.js.map

    var HtmlField = (function (_super) {
        __extends(HtmlField, _super);
        function HtmlField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HtmlField.prototype.bind = function () {
            var _this = this;
            var field = this;
            var $field = this.$field;
            if (!$dom.matches($field, Selectors.selectorContentEditable)) {
                $field.setAttribute(Selectors.attrContentEditable, "true");
            }
            var html = this.data.html || this.$field.innerHTML;
            this.setHtml(html, false);
            $field.innerHTML = this.data.html;
            SelectionUtils.bindTextSelection($field, function (rect) {
                Editor.UI.htmlTools.show(rect);
            });
            $dom.ons($field, "blur keyup paste input", function (ev) {
                _this.setHtml($field.innerHTML);
            });
            $dom.on($field, "paste", function (e) {
                e.preventDefault();
                var ev = e.originalEvent;
                var text = ev.clipboardData.getData("text/plain");
                document.execCommand("insertHTML", false, text);
            });
            $dom.on($field, "click", function (ev) {
                field.select();
                ev.stopPropagation();
                return false;
            });
        };
        HtmlField.prototype.setHtml = function (value, fireUpdate) {
            if (fireUpdate === void 0) { fireUpdate = true; }
            value = value.trim();
            if (this.$field.innerHTML !== value) {
                this.$field.innerHTML = value;
            }
            this.updateProperty("html", value, fireUpdate);
        };
        HtmlField.prototype.getEl = function () {
            var $el = _super.prototype.getEl.call(this);
            $el.removeAttribute(Selectors.attrContentEditable);
            return $el;
        };
        return HtmlField;
    }(BaseField));
    //# sourceMappingURL=HtmlField.js.map

    var locales = {
        errorBlocksFileNotFound: function (url) {
            return "Blocks file not found. Requested file: " + url + ".";
        },
        errorTemplatesFileNotFound: function (url) {
            return "Templates file not found. Requested file: " + url + ".";
        },
        errorBlockTemplateNotFound: function (templateName) {
            return "Template \"" + templateName + "\" not found.";
        },
        errorTemplateParsing: function (name) {
            return "Template parsing error: " + name + ".";
        },
        embedFieldLinkTitle: "Link to embed media",
        embedFieldLinkPlaceholder: "Link to instagram, youtube and etc.",
        prompt: {
            image: {
                link: {
                    title: "Image link",
                    placeholder: "http://url-to-image.png",
                },
                alt: {
                    title: "Image alt",
                    placeholder: "Image 'alt' attribute value",
                },
                upload: {
                    title: "or Upload a file",
                    placeholder: "select file",
                    button: "Select file",
                },
                url: {
                    subtitle: "Link to open on image click",
                },
            },
        },
        htmlEditorLinkUrlTitle: "Url",
        htmlEditorLinkUrlPlaceholder: "http://put-your-link.here",
        htmlEditorLinkTitleTitle: "Title",
        htmlEditorLinkTitlePlaceholder: "Title attribute for link",
        htmlEditorLinkTargetTitle: "Target",
        htmlEditorLinkTargetBlank: "Blank",
        htmlEditorLinkTargetSelf: "Self",
        htmlEditorLinkTargetParent: "Parent",
        htmlEditorLinkTargetTop: "Top",
        buttonClose: "close",
        buttonOk: "Ok",
        buttonCancel: "Cancel",
        defaultTemplatesGroupName: "Other templates",
    };
    //# sourceMappingURL=locales.js.map

    var createElement = function (html) {
        var temp = document.createElement("div");
        temp.innerHTML = html;
        var result = temp.children[0];
        temp.innerHTML = null;
        return result;
    };
    var modalTemplate = "\n<div>\n  <div class=\"bre-modal\" style=\"display: block;\">\n    <div class=\"bre-modal-placeholder\">\n    </div>\n  </div>\n</div>";
    var showModal = function (props) {
        var element = createElement(modalTemplate);
        var placeholder = element.getElementsByClassName("bre-modal-placeholder")[0];
        var closeModal = function () {
            element.remove();
            element = null;
        };
        var content = props.content, onOk = props.onOk, onCancel = props.onCancel;
        content.forEach(function (el) { return placeholder.appendChild(el); });
        if (onOk !== undefined) {
            var buttonOk = createElement("<button type=\"button\">Save</button>");
            buttonOk.addEventListener("click", function () {
                onOk();
                closeModal();
            });
            placeholder.appendChild(buttonOk);
        }
        var buttonCancel = createElement("<button type=\"button\">Cancel</button>");
        buttonCancel.addEventListener("click", function () {
            onCancel();
            closeModal();
        });
        placeholder.appendChild(buttonCancel);
        document.body.appendChild(element);
    };
    var helpers = { createElement: createElement, showModal: showModal };
    //# sourceMappingURL=helpers.js.map

    var textFieldEditor = function (_a) {
        var key = _a.key, p = _a.p, data = _a.data;
        var html = "<input type='text' name='" + key + "' placeholder='" + p.placeholder + "' value='" + (p.value || "") + "' />";
        var input = helpers.createElement(html);
        input.onchange = function () {
            data[key] = input.value;
        };
        return input;
    };
    var fileFieldEditor = function (_a) {
        var key = _a.key, p = _a.p, data = _a.data;
        var file = data[key];
        var filePreview = helpers.createElement("<img src=\"" + p.value + "\"/>");
        var fileInput = helpers.createElement("<input type=\"file\" id=\"bre-modal-modal-" + key + "\" class=\"bre-input\" placeholder=\"" + p.placeholder + "\">");
        var fileName = helpers.createElement("<span class='bre-image-input-filename'></span>");
        var updatePreview = function () {
            if (file === undefined) {
                fileName.innerText = "";
                filePreview.src = null;
            }
            else {
                fileName.innerText = file.name;
                var reader = new FileReader();
                reader.onload = function (ev) {
                    filePreview.src = ev.target.result.toString();
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.onchange = function () {
            file = fileInput.files && fileInput.files[0];
            updatePreview();
            data[key] = file;
        };
        updatePreview();
        var editor = helpers.createElement("<div class='bre-image-input'>\n    <label for=\"bre-modal-modal-" + key + "\">\n      " + p.placeholder + "\n    </label>\n  </div>");
        editor.append(filePreview, fileInput, fileName);
        return editor;
    };
    var parameterEditors = {
        text: textFieldEditor,
        file: fileFieldEditor,
    };
    var prompt = function (params) {
        return new Promise(function (resolve) {
            var result = {};
            var editors = Object.keys(params).map(function (key) {
                var p = params[key];
                var editor = parameterEditors[p.type || "text"]({
                    key: key,
                    p: p,
                    data: result,
                });
                return editor;
            });
            helpers.showModal({
                content: editors,
                onOk: function () { return resolve(result); },
                onCancel: function () { return resolve(null); },
            });
        });
    };
    //# sourceMappingURL=prompt.js.map

    var getPromptParams = function (_a) {
        var src = _a.src, file = _a.file, alt = _a.alt;
        return ({
            src: {
                value: src,
                title: locales.prompt.image.link.title,
                placeholder: locales.prompt.image.link.placeholder,
            },
            file: {
                type: "file",
                value: file,
                title: locales.prompt.image.upload.title,
                placeholder: locales.prompt.image.upload.placeholder,
            },
            alt: {
                value: alt,
                title: locales.prompt.image.alt.title,
                placeholder: locales.prompt.image.alt.placeholder,
            },
        });
    };
    var ImageField = (function (_super) {
        __extends(ImageField, _super);
        function ImageField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ImageField.prototype, "isImg", {
            get: function () {
                return (this._isImg =
                    this._isImg || this.$field.tagName.toLowerCase() === "img");
            },
            enumerable: true,
            configurable: true
        });
        ImageField.prototype.bind = function () {
            var _this = this;
            var field = this;
            var data = this.data;
            this.setSrc(this.data.src, false);
            this.$field.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                var params, updated, file, src, alt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = getPromptParams(this.data);
                            return [4, prompt(params)];
                        case 1:
                            updated = _a.sent();
                            if (updated !== null) {
                                file = updated.file, src = updated.src, alt = updated.alt;
                                if (file !== undefined) {
                                    if (field.onUpload) {
                                        field.onUpload(file, function (url) {
                                            field.setSrc(url);
                                            field.setFile(null);
                                        });
                                    }
                                    else {
                                        field.setFile(file);
                                        field.setSrc(null);
                                    }
                                }
                                else if (src) {
                                    field.setSrc(src);
                                    field.setFile(null);
                                }
                                field.setAlt(alt);
                            }
                            return [2];
                    }
                });
            }); });
        };
        ImageField.prototype.setSrc = function (src, fireUpdate) {
            if (fireUpdate === void 0) { fireUpdate = true; }
            if (src) {
                if (this.isImg) {
                    this.$field.setAttribute("src", src);
                }
                else {
                    this.$field.style.backgroundImage = "url(" + src;
                }
            }
            this.updateProperty("src", src, fireUpdate);
        };
        ImageField.prototype.setAlt = function (alt) {
            this.$field.setAttribute(this.isImg ? "alt" : "title", alt);
            this.updateProperty("alt", alt);
        };
        ImageField.prototype.setFile = function (file) {
            if (file) {
                if (this.isImg) {
                    this.$field.setAttribute("src", fileContent);
                }
                else {
                    this.$field.style.backgroundImage = "url(" + fileContent + ")";
                }
            }
            this.updateProperty("file", file);
        };
        ImageField.prototype.setLink = function (url) {
            if (url && url.href) {
                if (!this.$link) {
                    this.$link = $dom.el("<a href='" + url.href + "' title='" + url.title + "' target='" + url.target + "'></a>");
                    $dom.on(this.$link, "click", function (ev) {
                        ev.stopPropagation();
                        return false;
                    });
                    $dom.wrap(this.$field, this.$link);
                }
                else {
                    this.$link.href = url.href;
                }
            }
            else if (this.$link) {
                $dom.unwrap(this.$field);
                this.$link = null;
                delete this.$link;
            }
            this.updateProperty("link", url);
        };
        ImageField.prototype.getEl = function () {
            var $el = _super.prototype.getEl.call(this);
            var link = this.data.link;
            if (link && link.href) {
                var $link = $dom.el("<a href='" + link.href + "' title='" + link.title + "' target='" + link.target + "'></a>");
                $link.appendChild($el);
                return $link;
            }
            return $el;
        };
        return ImageField;
    }(BaseField));
    //# sourceMappingURL=ImageField.js.map

    //# sourceMappingURL=Fields.js.map

    var allTemplates = [];
    var getTemplate = function (templateName) {
        var template = allTemplates.find(function (x) {
            return str.equalsInvariant(x.name, templateName);
        });
        return template || null;
    };
    var loadTemplatesAsync = function (url, $editor, onError) { return __awaiter(void 0, void 0, void 0, function () {
        var grouppedTemplates, data, $data, $style, $groups, ungrouppedTemplates, ungrouppedTemplatesGroupName, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    grouppedTemplates = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, getRequest(url)];
                case 2:
                    data = _a.sent();
                    $data = helpers.createElement("<div>" + data + "</div>");
                    $style = $data.querySelector("style");
                    if ($style !== null) {
                        $dom.before($editor, $style);
                    }
                    $groups = $data.querySelectorAll(Selectors.selectorTemplateGroup);
                    $groups.forEach(function ($group) {
                        var name = $group.getAttribute("title");
                        var templates = parseTemplates($group, onError);
                        grouppedTemplates.push({ name: name, templates: templates });
                        $group.remove();
                        allTemplates = __spreadArrays(allTemplates, templates);
                    });
                    ungrouppedTemplates = parseTemplates($data, onError);
                    ungrouppedTemplatesGroupName = grouppedTemplates.length > 0
                        ? EditorStrings.defaultTemplatesGroupName
                        : "";
                    grouppedTemplates.push({
                        name: ungrouppedTemplatesGroupName,
                        templates: ungrouppedTemplates,
                    });
                    allTemplates = __spreadArrays(allTemplates, ungrouppedTemplates);
                    return [2, grouppedTemplates];
                case 3:
                    err_1 = _a.sent();
                    onError(EditorStrings.errorTemplatesFileNotFound(url));
                    throw err_1;
                case 4: return [2];
            }
        });
    }); };
    var parseTemplates = function ($el, onError) {
        var templates = [];
        var $templates = $el.querySelectorAll(Selectors.selectorTemplate);
        $templates.forEach(function ($template) {
            var template = createTemplate($template, onError);
            if (template !== null) {
                templates.push(template);
            }
        });
        return templates;
    };
    var getTemplatePreview = function (template) {
        var $template = helpers.createElement("<div class='" + Selectors.classTemplate + "'></div>");
        $template.appendChild(template.$preview);
        return $template;
    };
    var createTemplate = function ($template, onError) {
        var $html = $template;
        var name = $template.dataset.name || "";
        var $preview = $template.querySelector(Selectors.selectorTemplatePreview);
        if ($preview !== null) {
            $template.removeChild($preview);
        }
        else {
            var block = new Block(name, $html.innerHTML, true);
            var blockHtml = block.getHtml(true);
            if (blockHtml === null) {
                onError(EditorStrings.errorTemplateParsing(name));
                return null;
            }
            $preview = helpers.createElement(blockHtml);
        }
        return {
            name: name,
            $html: $html,
            $preview: $preview,
        };
    };
    //# sourceMappingURL=template.js.map

    var Editor = (function () {
        function Editor($editor, options) {
            var _this = this;
            this.isLoaded = false;
            this.getData = function () {
                return getContainerData(_this.container, _this.options.ignoreHtml);
            };
            this.getHtml = function () { return getContainerHtml(_this.container); };
            this.onError = function (message, code) {
                if (code === void 0) { code = 0; }
                return _this.options.onError({ message: message, code: code });
            };
            BaseField.registerCommonFields();
            this.$editor = $editor;
            this.$editor.classList.add(Selectors.classEditor);
            this.options = __assign(__assign({}, defaultOptions), options);
            this.container = this.createContainer();
            Editor.UI = new UI(this);
            this.tryBindFormSubmit();
        }
        Editor.prototype.initAsync = function () {
            return __awaiter(this, void 0, void 0, function () {
                var editor, templates, blocks;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            editor = this;
                            Editor.UI.toggleToolsLoader(true);
                            return [4, loadTemplatesAsync(editor.options.templatesUrl, editor.$editor, editor.onError)];
                        case 1:
                            templates = _a.sent();
                            Editor.UI.toggleToolsLoader(false);
                            Editor.UI.setTemplates(templates);
                            return [4, this.tryLoadInitialBlocksAsync()];
                        case 2:
                            blocks = _a.sent();
                            if (blocks !== null) {
                                this.loadBlocks(blocks);
                            }
                            this.isLoaded = true;
                            this.trigger("onLoad", this);
                            return [2];
                    }
                });
            });
        };
        Editor.prototype.tryBindFormSubmit = function () {
            var editor = this;
            var $form = this.options.formSelector
                ? $dom.find(this.options.formSelector)
                : null;
            var $input = this.options.inputSelector
                ? $dom.find(this.options.inputSelector)
                : null;
            if (!$form || !$input || !($input instanceof HTMLInputElement)) {
                return;
            }
            $dom.on($form, "submit", function () {
                $input.value = JSON.stringify(editor.getData());
                return true;
            });
        };
        Editor.prototype.loadBlocks = function (blocks) {
            var _this = this;
            if (blocks && blocks.length) {
                blocks.forEach(function (block) {
                    var template = getTemplate(block.name);
                    if (template) {
                        _this.container.addBlock(template.name, template.$html.innerHTML, block.fields, undefined, false);
                    }
                    else {
                        var message = EditorStrings.errorBlockTemplateNotFound(block.name);
                        _this.onError(message);
                    }
                });
            }
        };
        Editor.prototype.addBlock = function (template) {
            var container = this.getContainer(this.container);
            container.addBlock(template.name, template.$html.innerHTML, undefined, undefined, true);
        };
        Editor.prototype.createContainer = function () {
            var _this = this;
            var onAdd = function (block, idx) {
                if (_this.isLoaded) {
                    _this.trigger("onBlockAdd", { block: block, idx: idx });
                    _this.trigger("onChange", {
                        blocks: _this.getData(),
                        html: _this.getHtml(),
                    });
                }
            };
            var onDelete = function (block, idx) {
                _this.trigger("onBlockDelete", { block: block, idx: idx });
                _this.trigger("onChange", {
                    blocks: _this.getData(),
                    html: _this.getHtml(),
                });
            };
            var onUpdate = function (block, property, oldValue, newValue) {
                _this.trigger("onBlockUpdate", {
                    block: block,
                    property: property,
                    oldValue: oldValue,
                    newValue: newValue,
                });
                _this.trigger("onChange", {
                    blocks: _this.getData(),
                    html: _this.getHtml(),
                });
            };
            return new BlocksContainer(this.$editor, onAdd, onDelete, function (block) {
                _this.trigger("onBlockSelect", { block: block });
            }, function (block) {
                _this.trigger("onBlockDeselect", { block: block });
            }, function (block, from, to) {
                _this.trigger("onBlockMove", { block: block, from: from, to: to });
                _this.trigger("onChange", {
                    blocks: _this.getData(),
                    html: _this.getHtml(),
                });
            }, onUpdate, this.options.onUpload);
        };
        Editor.prototype.tryLoadInitialBlocksAsync = function () {
            return __awaiter(this, void 0, Promise, function () {
                var url, editor;
                var _this = this;
                return __generator(this, function (_a) {
                    url = this.options.blocksUrl;
                    editor = this;
                    return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var blocks, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(url !== undefined)) return [3, 5];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4, getRequest(url)];
                                    case 2:
                                        blocks = _a.sent();
                                        resolve(blocks);
                                        return [3, 4];
                                    case 3:
                                        error_1 = _a.sent();
                                        editor.onError(EditorStrings.errorBlocksFileNotFound(url));
                                        reject(error_1);
                                        return [3, 4];
                                    case 4: return [3, 6];
                                    case 5:
                                        if (this.options.blocks !== undefined) {
                                            resolve(this.options.blocks);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                        _a.label = 6;
                                    case 6: return [2];
                                }
                            });
                        }); })];
                });
            });
        };
        Editor.prototype.getContainer = function (container) {
            if (container.selectedBlock && container.selectedBlock.isContainer()) {
                var field = container.selectedBlock.selectedField;
                if (field) {
                    return this.getContainer(field.container);
                }
            }
            return container;
        };
        Editor.prototype.trigger = function (event, data) {
            var editor = this;
            $dom.trigger(this.$editor, "bre." + event, data);
            Common.propsEach(editor.options, function (key, value) {
                if (str.equalsInvariant(key, event) && value) {
                    value(data);
                }
            });
        };
        return Editor;
    }());
    //# sourceMappingURL=Editor.js.map

    var HtmlLinkParams = (function () {
        function HtmlLinkParams(href, title, target) {
            if (href === void 0) { href = ""; }
            if (title === void 0) { title = ""; }
            if (target === void 0) { target = ""; }
            this.href = href;
            this.title = title;
            this.target = target;
        }
        HtmlLinkParams.getLinkFromParams = function (fields) {
            var href = fields.getValue("href");
            var title = fields.getValue("title");
            var target = fields.getValue("target");
            return new HtmlLinkParams(href, title, target);
        };
        HtmlLinkParams.prototype.getLinkPromptParams = function () {
            return [
                new PromptParameter("href", EditorStrings.htmlEditorLinkUrlTitle, this.href, EditorStrings.htmlEditorLinkUrlPlaceholder),
                new PromptParameter("title", EditorStrings.htmlEditorLinkTitleTitle, this.title, EditorStrings.htmlEditorLinkTitlePlaceholder),
                new PromptParameterOptions("target", EditorStrings.htmlEditorLinkTargetTitle, [
                    ["", ""],
                    [EditorStrings.htmlEditorLinkTargetBlank, "_blank"],
                    [EditorStrings.htmlEditorLinkTargetSelf, "_self"],
                    [EditorStrings.htmlEditorLinkTargetParent, "_parent"],
                    [EditorStrings.htmlEditorLinkTargetTop, "_top"],
                ], this.target),
            ];
        };
        return HtmlLinkParams;
    }());
    //# sourceMappingURL=HtmlLinkParams.js.map

    var HtmlTools = (function () {
        function HtmlTools(editor) {
            this.editor = editor;
            this.buttons = [
                { icon: "bold", command: "Bold", range: true, aValueArgument: null },
                { icon: "italic", command: "Italic", range: true, aValueArgument: null },
                { icon: "link", command: "CreateLink", range: true, aValueArgument: null },
                {
                    icon: "list-ul",
                    command: "insertUnorderedList",
                    range: true,
                    aValueArgument: null,
                },
                {
                    icon: "list-ol",
                    command: "insertOrderedList",
                    range: true,
                    aValueArgument: null,
                },
                { icon: "undo", command: "Undo", range: false, aValueArgument: null },
                { icon: "repeat", command: "Redo", range: false, aValueArgument: null },
            ];
            if (editor.options.htmlToolsButtons) {
                this.buttons = editor.options.htmlToolsButtons;
            }
            this.setControl();
        }
        HtmlTools.prototype.setControl = function () {
            var _this = this;
            var $panel = $dom.el('<div class="bre-html-tools-panel"></div>');
            this.buttons.forEach(function (b) {
                var $btn = _this.getButtonElement(b.icon, b.command, b.range, b.aValueArgument);
                $panel.appendChild($btn);
            });
            this.$control = $dom.el('<div class="bre-html-tools bre-btn-group"></div>');
            this.$control.appendChild($panel);
            $dom.hide(this.$control);
            this.editor.$editor.appendChild(this.$control);
        };
        HtmlTools.prototype.getButtonElement = function (icon, command, rangeCommand, aValueArgument) {
            var _this = this;
            if (rangeCommand === void 0) { rangeCommand = true; }
            if (aValueArgument === void 0) { aValueArgument = null; }
            var $btn = $dom.el("<button type=\"button\" class=\"bre-btn\"><i class=\"fa fa-" + icon + "\"></i></button>");
            $btn.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                var selection, selectionRange, params, fields, link, valueArgument;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            selection = window.getSelection();
                            selectionRange = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
                            if (rangeCommand && !selectionRange)
                                return [2];
                            if (!(command == "CreateLink")) return [3, 2];
                            params = this.getLinkPromptParamsInternal(selection);
                            return [4, Editor.UI.modal.promptAsync(params)];
                        case 1:
                            fields = _a.sent();
                            link = HtmlLinkParams.getLinkFromParams(fields);
                            if (link.href) {
                                document.execCommand(command, false, link.href);
                                if (link.target) {
                                    selection.anchorNode.parentElement.setAttribute("target", link.target);
                                }
                                if (link.title) {
                                    selection.anchorNode.parentElement.setAttribute("title", link.title);
                                }
                            }
                            return [3, 3];
                        case 2:
                            if (typeof aValueArgument === "string") {
                                valueArgument = aValueArgument.replace("%%SELECTION%%", selection.toString());
                            }
                            try {
                                document.execCommand(command, false, valueArgument);
                            }
                            catch (_b) {
                                this.wrapSelectionToContainer(selection);
                                document.execCommand(command, false, valueArgument);
                            }
                            _a.label = 3;
                        case 3: return [2, false];
                    }
                });
            }); };
            return $btn;
        };
        HtmlTools.prototype.wrapSelectionToContainer = function (selection) {
            var $container = selection.anchorNode.parentElement;
            var $wrapper = $dom.el("<div class=\"bre-temp-container\" contenteditable=\"true\">" + $container.innerHTML + "</div>");
            $container.innerHTML = "";
            $container.removeAttribute(Selectors.attrContentEditable);
            $container.appendChild($wrapper);
            var range = document.createRange();
            range.selectNodeContents($wrapper);
            selection.removeAllRanges();
            selection.addRange(range);
        };
        HtmlTools.prototype.show = function (rect) {
            if (rect && rect.width > 1) {
                var $editor = this.editor.$editor;
                var offset = $dom.offset($editor);
                var editorWidth = $editor.clientWidth;
                var top = rect.top - offset.top + $dom.windowScrollTop() + rect.height;
                var controlWidth = this.$control.clientWidth;
                var left = rect.left - offset.left + rect.width / 2 - controlWidth / 2;
                if (left < 0) {
                    left = 0;
                }
                else if (left + controlWidth > editorWidth) {
                    left = editorWidth - controlWidth;
                }
                this.$control.style.top = top + "px";
                this.$control.style.left = left + "px";
                $dom.show(this.$control);
            }
            else {
                $dom.hide(this.$control);
            }
        };
        HtmlTools.prototype.getLinkPromptParamsInternal = function (selection) {
            var link;
            if (selection &&
                selection.anchorNode &&
                str.equalsInvariant(selection.anchorNode.parentNode.nodeName, "a")) {
                var $a = selection.anchorNode.parentNode;
                link = new HtmlLinkParams($a.getAttribute("href"), $a.getAttribute("title"), $a.getAttribute("target"));
            }
            else {
                link = new HtmlLinkParams();
            }
            return link.getLinkPromptParams();
        };
        return HtmlTools;
    }());
    //# sourceMappingURL=HtmlTools.js.map

    var Modal = (function () {
        function Modal($control, $closeBtn, $form, $btns, $okBtn, $cancelBtn) {
            this.$control = $control;
            this.$closeBtn = $closeBtn;
            this.$form = $form;
            this.$btns = $btns;
            this.$okBtn = $okBtn;
            this.$cancelBtn = $cancelBtn;
            var modal = this;
            $dom.on($closeBtn, "click", function () {
                modal.hideModal();
            });
        }
        Modal.prototype.hideModal = function () {
            this.restoreSelection();
            $dom.hide(this.$control);
        };
        Modal.prototype.showModal = function ($html, showBtns) {
            if (showBtns === void 0) { showBtns = true; }
            this.saveSelection();
            $dom.toggle(this.$btns, showBtns);
            if ($html) {
                this.$form.appendChild($html);
                if ($dom.isHidden($html)) {
                    $dom.show($html);
                }
            }
            $dom.show(this.$control);
        };
        Modal.prototype.promptAsync = function (fields) {
            var _this = this;
            var modal = this;
            return new Promise(function (resolve, reject) {
                for (var i = 0; i < modal.$form.children.length; i++) {
                    var child = modal.$form.children[i];
                    if (child !== _this.$btns) {
                        modal.$form.removeChild(child);
                    }
                }
                fields.forEach(function (field) {
                    $dom.before(_this.$btns, field.$control);
                });
                $dom.on(modal.$okBtn, "click", function () {
                    fields.forEach(function (field) { return field.parseValue(); });
                    modal.hideModal();
                    var list = new PromptParameterList(fields);
                    resolve(list);
                });
                $dom.on(modal.$cancelBtn, "click", function () {
                    modal.hideModal();
                    resolve(null);
                });
                modal.showModal();
            });
        };
        Modal.prototype.saveSelection = function () {
            var selection = window.getSelection();
            this.selectionRanges = [];
            for (var idx = 0; idx < selection.rangeCount; idx++) {
                this.selectionRanges.push(selection.getRangeAt(idx));
            }
        };
        Modal.prototype.restoreSelection = function () {
            if (!this.selectionRanges || this.selectionRanges.length === 0) {
                return;
            }
            var selection = window.getSelection();
            selection.removeAllRanges();
            this.selectionRanges.forEach(function (range) { return selection.addRange(range); });
        };
        return Modal;
    }());
    //# sourceMappingURL=Modal.js.map

    var UI = (function () {
        function UI(editor) {
            this.editor = editor;
            this.editor = editor;
            this.setTools();
            this.setModal();
            this.htmlTools = new HtmlTools(this.editor);
        }
        UI.initBtnDeck = function ($btnsDeck) {
            var $btns = $dom.select($btnsDeck, ".bre-btn");
            var $firstBtn = $btns[0];
            $dom.on($firstBtn, "click", function (ev) {
                UI.toggleBtnDeck($btnsDeck);
                ev.stopPropagation();
                return false;
            });
        };
        UI.toggleBtnDeck = function ($btnsDeck, isOn) {
            var $btns = $dom.select($btnsDeck, ".bre-btn");
            if (!$btns || $btns.length === 0) {
                return;
            }
            var $firstBtn = $btns[0];
            var size = 32;
            var gap = size / 6;
            isOn = isOn || $btnsDeck.dataset.isOn || false;
            if (isOn) {
                $btnsDeck.style.height = "0";
                $btnsDeck.style.width = "0";
                $btns.forEach(function ($btn, idx) {
                    if (idx === 0) {
                        return;
                    }
                    $btn.style.opacity = "0";
                    $btn.style.top = "0";
                    $btn.style.left = "0";
                });
            }
            else {
                $btns.forEach(function ($btn, idx) {
                    if (idx === 0) {
                        return;
                    }
                    $btn.style.opacity = "1";
                    $btn.style.left = (idx + 1) * (size + gap) + "px";
                });
                $btnsDeck.style.height = size + "px";
                $btnsDeck.style.width = (size + gap) * $btns.length - gap + "px";
            }
            $dom.toggleClass($firstBtn, "bre-btn-active", !isOn);
            $btnsDeck.dataset.isOn = String(!isOn);
        };
        UI.prototype.toggleToolsLoader = function (toggle) {
            $dom.toggle(this.$toolsLoader, toggle);
        };
        UI.prototype.setTemplates = function (templateGroups) {
            var _this = this;
            var editor = this.editor;
            templateGroups.forEach(function (group) {
                if (group.templates.length === 0) {
                    return;
                }
                var $header = $dom.el("<div class='" + Selectors.classTemplateGroup + "'>" + group.name + "</div>");
                _this.$toolsTemplates.appendChild($header);
                var $group = $dom.el("<div></div>");
                group.templates.forEach(function (template) {
                    var $preview = getTemplatePreview(template);
                    $preview.setAttribute("title", template.name);
                    $preview.onclick = function (ev) {
                        editor.addBlock(template);
                        ev.stopPropagation();
                        return false;
                    };
                    $group.appendChild($preview);
                });
                $dom.on($header, "click", function () {
                    $dom.toggle($group);
                });
                _this.$toolsTemplates.appendChild($group);
            });
        };
        Object.defineProperty(UI.prototype, "isCompactTools", {
            get: function () {
                var compactTools = this.editor.options.compactTools;
                if (compactTools == null) {
                    return window.innerWidth < this.editor.options.compactToolsWidth;
                }
                else {
                    return compactTools.valueOf();
                }
            },
            enumerable: true,
            configurable: true
        });
        UI.prototype.setTools = function () {
            var _this = this;
            this.$tools = $dom.el('<div class="bre bre-tools" data-bricky-tools></div>');
            this.$toolsTemplates = $dom.el('<div class="bre-tools-templates"></div>');
            this.$toolsLoader = $dom.el('<div class="bre-tools-loader"><b>Loading...</b></div>');
            this.$toolsHideBtn = $dom.el('<button type="button" class="bre-tools-toggle"><div>►</div></button>');
            this.$tools.appendChild(this.$toolsHideBtn);
            this.$tools.appendChild(this.$toolsLoader);
            this.$tools.appendChild(this.$toolsTemplates);
            this.$toolsHideBtn.onclick = function (ev) { return _this.toggleTools(); };
            this.editor.$editor.appendChild(this.$tools);
            if (this.isCompactTools) {
                $dom.addClass(this.$tools, "bre-tools-templates-compact");
                this.toggleTools();
            }
        };
        UI.prototype.toggleTools = function () {
            $dom.toggleClass(this.$tools, "bre-tools-collapsed", !$dom.hasClass(this.$toolsHideBtn, "bre-tools-toggle-collapsed"));
            $dom.toggleClass(this.$toolsHideBtn, "bre-tools-toggle-collapsed");
        };
        UI.prototype.setModal = function () {
            var $modal = $dom.el('<div class="bre bre-modal"><div class="bre-modal-placeholder"></div></div>');
            var $modalCloseBtn = $dom.el("<div class=\"bre-modal-close\"><a href=\"#\">" + EditorStrings.buttonClose + " \u2716</a></div>");
            var $modalContent = $dom.el('<div class="bre-modal-content"></div>');
            var $modalForm = $dom.el("<form></form>");
            var $modalBtns = $dom.el('<div class="bre-btns"></div>');
            var $modalOk = $dom.el("<button type=\"button\" class=\"bre-btn bre-btn-primary\">" + EditorStrings.buttonOk + "</button>");
            var $modalCancel = $dom.el("<button type=\"button\" class=\"bre-btn\">" + EditorStrings.buttonCancel + "</button>");
            $modalBtns.appendChild($modalOk);
            $modalBtns.appendChild($modalCancel);
            $modalForm.appendChild($modalBtns);
            $modalContent.appendChild($modalForm);
            var $placeholder = $dom.first($modal, ".bre-modal-placeholder");
            $placeholder.appendChild($modalCloseBtn);
            $placeholder.appendChild($modalContent);
            this.modal = new Modal($modal, $modalCloseBtn, $modalForm, $modalBtns, $modalOk, $modalCancel);
            this.editor.$editor.appendChild($modal);
        };
        return UI;
    }());
    //# sourceMappingURL=UI.js.map

    var BlockUI = (function () {
        function BlockUI($block, preview, actions, onSelect) {
            this.$block = $block;
            this.onSelect = onSelect;
            if (!preview) {
                this.buildEditorUI(actions);
            }
        }
        BlockUI.prototype.delete = function () {
            this.$editor.remove();
        };
        BlockUI.prototype.toggleSelection = function (isOn) {
            this.$editor.classList.toggle("bre-selected", isOn);
        };
        BlockUI.prototype.buildEditorUI = function (actions) {
            var _this = this;
            this.$tools = $dom.el('<div class="bre-block-tools bre-btn-deck"></div>');
            actions.forEach(function (action) {
                var $btn = _this.buildButton(action);
                _this.$tools.appendChild($btn);
            });
            UI.initBtnDeck(this.$tools);
            this.$editor = $dom.el('<div class="bre-block-wrapper"></div>');
            this.$editor.appendChild(this.$tools);
            this.$editor.appendChild(this.$block);
            $dom.on(this.$editor, "mouseover", function () {
                _this.$editor.classList.add("bre-active");
            });
            $dom.on(this.$editor, "mouseout", function () {
                _this.$editor.classList.remove("bre-active");
            });
            $dom.on(this.$editor, "click", function () {
                _this.onSelect();
            });
        };
        BlockUI.prototype.buildButton = function (action) {
            var $el = $dom.el("<button type=\"button\" class=\"bre-btn\"><i class=\"fa fa-" + action.icon + "\"></i></button>");
            if (action.action) {
                $el.onclick = function (ev) {
                    action.action();
                    ev.stopPropagation();
                    return false;
                };
            }
            return $el;
        };
        return BlockUI;
    }());
    //# sourceMappingURL=BlockUI.js.map

    var BlockUIAction = (function () {
        function BlockUIAction(icon, action, title) {
            this.icon = icon;
            this.action = action;
            this.title = title;
        }
        return BlockUIAction;
    }());
    //# sourceMappingURL=BlockUIAction.js.map

    var Block = (function () {
        function Block(name, html, preview, data, events) {
            var _this = this;
            this.fields = [];
            this.name = name;
            this.html = html;
            this.events = events;
            var $block = $dom.el(html);
            this.bindFields($block, data);
            var actions = this.getActions();
            this.ui = new BlockUI($block, preview, actions, function () { return _this.select(); });
        }
        Block.prototype.isContainer = function () {
            if (!this.selectedField) {
                return false;
            }
            return this.selectedField instanceof ContainerField;
        };
        Block.prototype.delete = function () {
            this.ui.delete();
            this.events.onDelete(this);
        };
        Block.prototype.move = function (offset) {
            this.events.onMove(this, offset);
        };
        Block.prototype.clone = function () {
            this.events.onCopy(this);
        };
        Block.prototype.select = function (field) {
            if (field === this.selectedField) {
                return;
            }
            if (field === null) {
                field = this.fields[0];
            }
            if (this.selectedField) {
                this.selectedField.deselect();
            }
            this.selectedField = field;
            this.ui.toggleSelection(true);
            this.events.onSelect(this);
        };
        Block.prototype.deselect = function () {
            this.selectedField = null;
            this.fields.forEach(function (f) {
                f.deselect();
            });
            this.ui.toggleSelection(false);
            this.events.onDeselect(this);
        };
        Block.prototype.scrollTo = function () {
            var top = $dom.offset(this.ui.$editor).top - 100;
            top = top > 0 ? top : 0;
        };
        Block.prototype.getData = function (ignoreHtml) {
            var fieldsData = [];
            this.fields.forEach(function (field) {
                fieldsData.push(field.data);
            });
            var data = {
                template: this.name,
                fields: fieldsData,
            };
            if (!ignoreHtml) {
                data.html = this.getHtml(true);
            }
            return data;
        };
        Block.prototype.getHtml = function (trim) {
            var $html = $dom.el(this.html);
            var fieldsHtml = {};
            this.fields.forEach(function (field) {
                var name = field.name || field.data.name;
                fieldsHtml[name] = field.getEl();
            });
            $dom.select($html, Selectors.selectorField, true).forEach(function ($elem) {
                var fieldData = $dom.data($elem, "breField");
                var name = fieldData.name;
                var $field = fieldsHtml[name];
                $dom.replaceWith($elem, $field);
            });
            var html = $html.outerHTML;
            if (!html) {
                return null;
            }
            return trim ? str.totalTrim(html) : html;
        };
        Block.prototype.bindFields = function ($block, data) {
            var block = this;
            var $fields = $dom.select($block, Selectors.selectorField, true);
            $fields.forEach(function ($elem) {
                var onUpdate = function (property, oldValue, newValue) {
                    if (block.events.onUpdate !== undefined) {
                        block.events.onUpdate(block, property, oldValue, newValue);
                    }
                };
                var onSelect = block.select;
                var field = BaseField.createField($elem, data, onSelect, onUpdate, block.events ? block.events.onUpload : undefined);
                block.fields.push(field);
            });
        };
        Block.prototype.getActions = function () {
            var block = this;
            var actions = [
                new BlockUIAction("ellipsis-h"),
                new BlockUIAction("trash-o", function () { return block.delete(); }),
                new BlockUIAction("copy", function () { return block.clone(); }),
                new BlockUIAction("angle-up", function () { return block.move(-1); }),
                new BlockUIAction("angle-down", function () { return block.move(1); }),
            ];
            return actions;
        };
        return Block;
    }());
    //# sourceMappingURL=Block.js.map

    var getContainerData = function (container, ignoreHtml) { return container.blocks.map(function (block) { return block.getData(ignoreHtml); }); };
    var getContainerHtml = function (container) {
        var html = container.blocks.map(function (block) { return block.getHtml(true); }).join("\n");
        var root = container.$element.cloneNode(false);
        root.innerHTML = html;
        return root.outerHTML;
    };
    var getDefaultPlaceholder = function () {
        return helpers.createElement('<i data-bre-placeholder="true">Click here to select this container...</i>');
    };
    var toggleContainerPlaceholderIfNeed = function (container) {
        if (container.usePlaceholder !== true) {
            return;
        }
        if (container.$placeholder !== undefined) {
            container.$placeholder.remove();
            container.$placeholder = undefined;
            return;
        }
        if (container.blocks.length === 0) {
            var $placeholder = getDefaultPlaceholder();
            container.$placeholder = $placeholder;
            container.$element.appendChild($placeholder);
        }
    };
    var BlocksContainer = (function () {
        function BlocksContainer($element, onAddBlock, onDeleteBlock, onSelectBlock, onDeselectBlock, onMoveBlock, onUpdateBlock, onUpload, usePlaceholder) {
            if (usePlaceholder === void 0) { usePlaceholder = false; }
            this.onAddBlock = onAddBlock;
            this.onDeleteBlock = onDeleteBlock;
            this.onSelectBlock = onSelectBlock;
            this.onDeselectBlock = onDeselectBlock;
            this.onMoveBlock = onMoveBlock;
            this.onUpdateBlock = onUpdateBlock;
            this.onUpload = onUpload;
            this.blocks = [];
            this.isContainer = true;
            this.$element = $element;
            this.usePlaceholder = usePlaceholder;
            toggleContainerPlaceholderIfNeed(this);
        }
        BlocksContainer.prototype.addBlock = function (name, html, data, idx, select) {
            var _this = this;
            if (select === void 0) { select = true; }
            var block = new Block(name, html, false, data, {
                onDelete: this.deleteBlock,
                onSelect: this.selectBlock,
                onDeselect: this.deselectBlock,
                onCopy: this.copyBlock,
                onMove: function (b, offset) { return _this.moveBlock(b, offset); },
                onUpdate: this.onUpdateBlock,
                onUpload: this.onUpload,
            });
            this.insertBlock(block, idx);
            if (select) {
                block.select();
                block.scrollTo();
            }
        };
        BlocksContainer.prototype.insertBlock = function (block, idx) {
            idx = idx || this.blocks.length;
            if (this.selectedBlock) {
                idx = this.blocks.indexOf(this.selectedBlock) + 1;
            }
            this.blocks.splice(idx, 0, block);
            if (idx === 0) {
                this.$element.appendChild(block.ui.$editor);
            }
            else {
                $dom.after(this.blocks[idx - 1].ui.$editor, block.ui.$editor);
            }
            this.onAddBlock(block, idx);
            block.select(undefined);
            toggleContainerPlaceholderIfNeed(this);
        };
        BlocksContainer.prototype.deleteBlock = function (block) {
            var idx = this.blocks.indexOf(block);
            this.blocks.splice(idx, 1);
            block = null;
            if (idx < this.blocks.length) {
                this.blocks[idx].select();
            }
            else if (this.blocks.length > 0) {
                this.blocks[idx - 1].select();
            }
            else {
                this.selectedBlock = null;
            }
            this.onDeleteBlock(block, idx);
            toggleContainerPlaceholderIfNeed(this);
        };
        BlocksContainer.prototype.moveBlock = function (block, offset) {
            var idx = this.blocks.indexOf(block);
            var new_idx = idx + offset;
            if (new_idx >= this.blocks.length || new_idx < 0) {
                return;
            }
            var $anchorBlock = this.blocks[new_idx].ui.$editor;
            if (offset > 0) {
                $dom.after($anchorBlock, block.ui.$editor);
            }
            else if (offset < 0) {
                $dom.before($anchorBlock, block.ui.$editor);
            }
            this.blocks.splice(idx, 1);
            this.blocks.splice(new_idx, 0, block);
            this.onMoveBlock(block, idx, new_idx);
            block.scrollTo();
        };
        BlocksContainer.prototype.copyBlock = function (block) {
            var idx = this.blocks.indexOf(block) + 1;
            this.addBlock(block.name, block.html, block.getData().fields, idx, true);
        };
        BlocksContainer.prototype.selectBlock = function (block) {
            if (this.selectedBlock === block) {
                return;
            }
            if (this.selectedBlock) {
                this.selectedBlock.deselect();
            }
            this.selectedBlock = block;
            this.onSelectBlock(block);
        };
        BlocksContainer.prototype.deselectBlock = function (block) {
            this.selectedBlock = null;
            this.onDeselectBlock(block);
        };
        return BlocksContainer;
    }());
    //# sourceMappingURL=BlocksContainer.js.map

    var Editor$1 = (function () {
        function Editor($editor, options) {
            var _this = this;
            this.isLoaded = false;
            this.getData = function () {
                return getContainerData(_this.container, _this.options.ignoreHtml);
            };
            this.getHtml = function () { return getContainerHtml(_this.container); };
            this.onError = function (message, code) {
                if (code === void 0) { code = 0; }
                return _this.options.onError({ message: message, code: code });
            };
            BaseField.registerCommonFields();
            this.$editor = $editor;
            this.$editor.classList.add(Selectors.classEditor);
            this.options = __assign(__assign({}, defaultOptions), options);
            this.container = this.createContainer();
            Editor.UI = new UI(this);
            this.tryBindFormSubmit();
        }
        Editor.prototype.initAsync = function () {
            return __awaiter(this, void 0, void 0, function () {
                var editor, templates, blocks;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            editor = this;
                            Editor.UI.toggleToolsLoader(true);
                            return [4, loadTemplatesAsync(editor.options.templatesUrl, editor.$editor, editor.onError)];
                        case 1:
                            templates = _a.sent();
                            Editor.UI.toggleToolsLoader(false);
                            Editor.UI.setTemplates(templates);
                            return [4, this.tryLoadInitialBlocksAsync()];
                        case 2:
                            blocks = _a.sent();
                            if (blocks !== null) {
                                this.loadBlocks(blocks);
                            }
                            this.isLoaded = true;
                            this.trigger("onLoad", this);
                            return [2];
                    }
                });
            });
        };
        Editor.prototype.tryBindFormSubmit = function () {
            var editor = this;
            var $form = this.options.formSelector
                ? $dom.find(this.options.formSelector)
                : null;
            var $input = this.options.inputSelector
                ? $dom.find(this.options.inputSelector)
                : null;
            if (!$form || !$input || !($input instanceof HTMLInputElement)) {
                return;
            }
            $dom.on($form, "submit", function () {
                $input.value = JSON.stringify(editor.getData());
                return true;
            });
        };
        Editor.prototype.loadBlocks = function (blocks) {
            var _this = this;
            if (blocks && blocks.length) {
                blocks.forEach(function (block) {
                    var template = getTemplate(block.name);
                    if (template) {
                        _this.container.addBlock(template.name, template.$html.innerHTML, block.fields, undefined, false);
                    }
                    else {
                        var message = EditorStrings.errorBlockTemplateNotFound(block.name);
                        _this.onError(message);
                    }
                });
            }
        };
        Editor.prototype.addBlock = function (template) {
            var container = this.getContainer(this.container);
            container.addBlock(template.name, template.$html.innerHTML, undefined, undefined, true);
        };
        Editor.prototype.createContainer = function () {
            var _this = this;
            var onAdd = function (block, idx) {
                if (_this.isLoaded) {
                    _this.trigger("onBlockAdd", { block: block, idx: idx });
                    _this.trigger("onChange", {
                        blocks: _this.getData(),
                        html: _this.getHtml(),
                    });
                }
            };
            var onDelete = function (block, idx) {
                _this.trigger("onBlockDelete", { block: block, idx: idx });
                _this.trigger("onChange", {
                    blocks: _this.getData(),
                    html: _this.getHtml(),
                });
            };
            var onUpdate = function (block, property, oldValue, newValue) {
                _this.trigger("onBlockUpdate", {
                    block: block,
                    property: property,
                    oldValue: oldValue,
                    newValue: newValue,
                });
                _this.trigger("onChange", {
                    blocks: _this.getData(),
                    html: _this.getHtml(),
                });
            };
            return new BlocksContainer(this.$editor, onAdd, onDelete, function (block) {
                _this.trigger("onBlockSelect", { block: block });
            }, function (block) {
                _this.trigger("onBlockDeselect", { block: block });
            }, function (block, from, to) {
                _this.trigger("onBlockMove", { block: block, from: from, to: to });
                _this.trigger("onChange", {
                    blocks: _this.getData(),
                    html: _this.getHtml(),
                });
            }, onUpdate, this.options.onUpload);
        };
        Editor.prototype.tryLoadInitialBlocksAsync = function () {
            return __awaiter(this, void 0, Promise, function () {
                var url, editor;
                var _this = this;
                return __generator(this, function (_a) {
                    url = this.options.blocksUrl;
                    editor = this;
                    return [2, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var blocks, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(url !== undefined)) return [3, 5];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4, getRequest(url)];
                                    case 2:
                                        blocks = _a.sent();
                                        resolve(blocks);
                                        return [3, 4];
                                    case 3:
                                        error_1 = _a.sent();
                                        editor.onError(EditorStrings.errorBlocksFileNotFound(url));
                                        reject(error_1);
                                        return [3, 4];
                                    case 4: return [3, 6];
                                    case 5:
                                        if (this.options.blocks !== undefined) {
                                            resolve(this.options.blocks);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                        _a.label = 6;
                                    case 6: return [2];
                                }
                            });
                        }); })];
                });
            });
        };
        Editor.prototype.getContainer = function (container) {
            if (container.selectedBlock && container.selectedBlock.isContainer()) {
                var field = container.selectedBlock.selectedField;
                if (field) {
                    return this.getContainer(field.container);
                }
            }
            return container;
        };
        Editor.prototype.trigger = function (event, data) {
            var editor = this;
            $dom.trigger(this.$editor, "bre." + event, data);
            Common.propsEach(editor.options, function (key, value) {
                if (str.equalsInvariant(key, event) && value) {
                    value(data);
                }
            });
        };
        return Editor;
    }());
    //# sourceMappingURL=Editor.js.map

    exports.Editor = Editor$1;

    return exports;

}({}));
