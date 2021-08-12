import Pagination from './components/Pagination'
import Table from './components/Table'

const components = [Pagination, Table]

const install = function (Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Pagination,
  Table,
}
