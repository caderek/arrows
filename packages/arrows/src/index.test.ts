import arrows from './index'

describe('arrows', () => {
  it('contains all the @arrows libraries', () => {
    expect(arrows).toHaveProperty('array')
    expect(arrows).toHaveProperty('composition')
    expect(arrows).toHaveProperty('dispatch')
    expect(arrows).toHaveProperty('error')
    expect(arrows).toHaveProperty('multimethod')
  })
})
