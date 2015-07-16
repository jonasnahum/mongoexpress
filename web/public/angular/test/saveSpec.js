
describe("api students", function(){
    var url = '/api/students/';
    var all = [
        {name: 'rodrigo', age: 30, id: 10},
        {name: 'jonas', age: 29, id: 11},
        {name: 'monse', age: 20, id: 12}
    ];
    var $httpMock = undefined;
    
    beforeEach(module('app'));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('POST', url).respond(true);
    }));
    
    it('saves', inject(function(alumnosApi) {
        
        $httpMock.expectPOST(url);
        alumnosApi.save(all[1], function(result) {                
            expect(result).toBe(true);
        });
        $httpMock.flush();
        
    }));
});

