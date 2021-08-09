'use strict';

var vue = require('vue');

function render(_ctx, _cache) {
  return (vue.openBlock(), vue.createBlock("div", null, "sdfasdf"))
}

const script = {};


script.render = render;
script.__file = "lib/Table.vue";

script.install = function (Vue) {
  Vue.component(script.name, script);
};

module.exports = script;
