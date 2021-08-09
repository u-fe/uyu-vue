import { openBlock, createBlock } from 'vue';

function render(_ctx, _cache) {
  return (openBlock(), createBlock("div", null, "sdfasdf"))
}

const script = {};


script.render = render;
script.__file = "lib/Table.vue";

script.install = function (Vue) {
  Vue.component(script.name, script);
};

export default script;
