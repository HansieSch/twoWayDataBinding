var $scope = (function () {
    "use strict";

    var modelElements = document.querySelectorAll("*[my-model]");

    // new Proxy(target, handler)
    // target - All operations on Proxy are forwarded to target object.
    // handler - Placeholder object which contains methods that provide property access.
    var model = new Proxy({}, {
        set: function (target, key, value) {
            var bindedElements = document.querySelectorAll(`*[my-model=${key}]`);

            bindedElements.forEach((el, index, arr) => {
                var tag = el.tagName;

                // Tag names are used since el.value is an empty string by default.
                if (tag === "BUTTON" 
                    || tag === "OPTION"
                    || tag === "INPUT"
                    || tag === "METER"
                    || tag === "PROGRESS"
                    || tag === "TEXTAREA") {
                    el.value = value;
                    target[key] = value; // explicitly set value on target object
                } else {
                    el.innerText = value;
                    target[key] = value; // explicitly set value on target object
                }
            });

            return true;
        }
    });
    
    modelElements.forEach((el, index, arr) => {
        el.addEventListener("keyup", updateModel);
        el.addEventListener("change", updateModel);
    });

    function updateModel(event) {
        var modelFieldName = event.srcElement.getAttribute("my-model");

        // Need to check value and innerText properties since input can be 
        // from non-form elements as well.
        var value = event.srcElement.value || event.srcElement.innerText;

        model[modelFieldName] = value; // Update model.
    }

    return model;
})();