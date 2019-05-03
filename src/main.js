var toType = function (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};
var ta = document.getElementById('textarea_in');
let al = document.getElementById('alert_area');
let array_of = document.getElementById('array_of');
var OriginalString = ta.innerHTML;
let regex = new RegExp(/(\d+\s+\d+\s+(?:(?:\d+\.\d+)|\d+))(?:\.[\S\d]+)*/mig);
var t = regex[Symbol.match](OriginalString);
array_of.innerText = t.length.toString();
al.innerHTML = t.toString();
console.log(OriginalString);
//# sourceMappingURL=main.js.map