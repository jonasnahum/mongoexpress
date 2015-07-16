
describe("api students", function(){
    var url = '/api/students/11';
    var all = [
        {name: 'rodrigo', age: 30, id: 10},
        {name: 'jonas', age: 29, id: 11},
        {name: 'monse', age: 20, id: 12}
    ];
    var $httpMock = undefined;
    
    beforeEach(module('app'));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('DELETE', url).respond(true);
    }));
    
    it('deletes one', inject(function(alumnosApi) {
        
        $httpMock.expectDELETE(url);
        alumnosApi.delete(11, function(result) {                
            expect(result).toEqual(true);
        });
        $httpMock.flush();
        
    }));
});

