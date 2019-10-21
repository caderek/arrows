import arrows from './index'

describe('arrows', () => {
  it('contains all the @arrows libraries', () => {
    expect(arrows).toHaveProperty('arr')
    expect(arrows).toHaveProperty('com')
    expect(arrows).toHaveProperty('dis')
    expect(arrows).toHaveProperty('err')
    expect(arrows).toHaveProperty('mul')
  })
})
