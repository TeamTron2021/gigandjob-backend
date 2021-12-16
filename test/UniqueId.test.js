import UniqueId from '../shared/UniqueUUID';

describe('test uniqueID', () => {
  it('should return a unique id ', ()=>{
    let id = new UniqueId(); 
    expect(id.getId()).not.toBe(undefined);
    expect(id.getId()).not.toBe(null);
    expect(id.getId()).not.toBe('');
    expect(id.getId()).not.toBe(' ');
  })
})