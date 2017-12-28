import { createTest, destroyVM } from '../util'
import Login from '@/views/login'

describe('login.vue', () => {
  let vm

  beforeEach(() => {
    vm = createTest(Login)
  })

  afterEach(() => {
    destroyVM(vm)
  })

  it('should render correct contents', () => {
    var inputs = vm.$el.querySelectorAll('.ivu-input')
    expect(inputs[0].placeholder).to.equal('Username')
    expect(inputs[1].placeholder).to.equal('Password')
  })
})
