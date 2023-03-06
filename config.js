export function content() {
    return {
        emailErrorMessage: 'Please enter valid email id.',
        passwordErrorMessage: 'Please enter a password.',
        companyNameErrorMessage: 'Please enter a company name.',
        companySizeErrorMessage: 'Please select a company size.',
        companyTypeErrorMessage: 'Please select acompany type.',
        productNameErrorMessage: 'Please enter a product name.',
        productIdErrorMessage: 'Please enter a product id.',
        productPriceErrorMessage: 'Please enter a product amount.',
        productImageErrorMessage: 'Please enter a product image url.',
        collectionNameErrorMessage: 'Please enter a collection name.',
        collectionDescErrorMessage: 'Please enter collection description.',
        ruleNameErrorMessage: 'Please enter a rule name.'
    }
}

export function exportListData(data, fileName) {
    if (data && !(data instanceof Array)) {
        data = [data];
    }
    if (data.length) {
        if (!fileName) {
            fileName = "fleek-data";
        }

        let headerData = Object.keys(data[0]);
        let downloadData = data.map(obj => Object.values(obj));
        downloadData.unshift(headerData);

        let csvContent = "data:text/csv;charset=utf-8,"
            + downloadData.map(e => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName + ".csv");
        link.click();
    }
}

export function addDays(days) {
    return new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000);
}

export function addMonths(months) {
    return new Date(new Date().setMonth(new Date().getMonth() + months));
}

export function addYears(years) {
    return new Date(new Date().setFullYear(new Date().getFullYear() + years));
}

// check if any parent has some specific class
export function hasSomeParentTheClass(element, classname) {
    if (element.className.split(' ').indexOf(classname) >= 0) {
        return element;
    } else {
        if (element.className !== 'sidebar') {
            return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
        } else {
            return false;
        }
    }
}

// validate the input fields
export function validateInput(Elm, errorMessage) {

    const _getNextSibling = function (elem, selector) {
        var sibling = elem.nextElementSibling;
        if (!selector) return sibling;
        while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling
        }
    };

    const _validateEmail = function (email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
    }

    let nextElm = _getNextSibling(Elm, '.error-message');

    switch (Elm.type) {
        case 'password':
            if (!Elm.value) {
                Elm.classList.add("error");

                let spanTag = document.createElement("span");
                spanTag.classList = "error-message";
                spanTag.innerHTML = errorMessage;
                if (!nextElm) {
                    Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                }
                return false;
            } else {
                if (nextElm) {
                    nextElm.remove();
                }
                Elm.classList.remove("error");
                return true;
            }
        case 'number':
            if (!Elm.value) {
                Elm.classList.add("error");

                if (errorMessage) {
                    let spanTag = document.createElement("span");
                    spanTag.classList = "error-message";
                    spanTag.innerHTML = errorMessage;
                    if (!nextElm) {
                        Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                    }
                }
                return false;
            } else if (Elm.value <= 0) {
                Elm.classList.add("error");

                if (errorMessage) {
                    let spanTag = document.createElement("span");
                    spanTag.classList = "error-message";
                    spanTag.innerHTML = errorMessage;
                    if (!nextElm) {
                        Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                    }
                }
                return false;
            } else {
                if (nextElm) {
                    nextElm.remove();
                }
                Elm.classList.remove("error");
                return true;
            }
        case 'textarea':
        case 'text':
            if (!Elm.value) {
                Elm.classList.add("error");

                if (errorMessage) {
                    let spanTag = document.createElement("span");
                    spanTag.classList = "error-message";
                    spanTag.innerHTML = errorMessage;
                    if (!nextElm) {
                        Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                    }
                }
                return false;
            } else {
                if (nextElm) {
                    nextElm.remove();
                }
                Elm.classList.remove("error");
                return true;
            }
        case 'email':
            if (!Elm.value) {
                Elm.classList.add("error");

                if (errorMessage) {
                    let spanTag = document.createElement("span");
                    spanTag.classList = "error-message";
                    spanTag.innerHTML = errorMessage;
                    if (!nextElm) {
                        Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                    }
                }
                return false;
            } else if (!_validateEmail(Elm.value)) {
                Elm.classList.add("error");

                if (errorMessage) {
                    let spanTag = document.createElement("span");
                    spanTag.classList = "error-message";
                    spanTag.innerHTML = errorMessage;
                    if (!nextElm) {
                        Elm.parentNode.insertBefore(spanTag, Elm.nextSibling);
                    }
                }
                return false
            } else {
                if (nextElm) {
                    nextElm.remove();
                }
                Elm.classList.remove("error");
                return true;
            }
        case 'checkbox':
            if (!Elm.checked) {
                Elm.classList.add("error");
                return false;
            } else {
                Elm.classList.remove("error");
                return true;
            }
        case 'select-one':
            if (Elm.value === '0') {
                Elm.classList.add("error");
                return false;
            } else {
                Elm.classList.remove("error");
                return true;
            }
    }
    return true;
}

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});