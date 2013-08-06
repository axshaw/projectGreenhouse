var should = require("should")
describe('relayServer connection' ,function()	{
	it('should write to console incoming connection made when a client connects');
    it('should broadcast data to all clients');
	it('should insert all data');
	it('should prepare data averages');
	 it('should return -1 when the value is not present', function(){
      should.equal(-1, [1,2,3].indexOf(5));
      should.equal(-1, [1,2,3].indexOf(0));
    })
});