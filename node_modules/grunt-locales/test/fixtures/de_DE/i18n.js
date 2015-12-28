(function () {
var i18n = window.i18n = window.i18n || {};
var MessageFormat = {locale: {}};

MessageFormat.locale.de=function(n){return n===1?"one":"other"}

var
c=function(d){if(!d)throw new Error("MessageFormat: No data passed to function.")},
n=function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: `"+k+"` isnt a number.");return d[k]-(o||0)},
v=function(d,k){c(d);return d[k]},
p=function(d,k,o,l,p){c(d);return d[k] in p?p[d[k]]:(k=MessageFormat.locale[l](d[k]-o),k in p?p[k]:p.other)},
s=function(d,k,p){c(d);return d[k] in p?p[d[k]]:p.other};

i18n["\x0a\x09\x3ch1\x3e{title}\x3c/h1\x3e\x0a\x09\x3cp\x3eWith whitespace.\x3c/p\x3e\x0a"] = function(d){return "<h1>"+v(d,"title")+"</h1><p>With whitespace.</p>"};

i18n["Apples"] = "Äpfel";

i18n["Bananas"] = "Bananen";

i18n["First name \x26 last name"] = "Vorname \x26 Nachname";

i18n["Hello {name}!"] = function(d){return "Hello "+v(d,"name")+"!"};

i18n["Oranges"] = "Orangen";

}());
