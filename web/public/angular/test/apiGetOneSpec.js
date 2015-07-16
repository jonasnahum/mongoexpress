
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
        $httpBackend.when('GET', url).respond(all[0]);
    }));
    
    it('gets one', inject(function(alumnosApi) {
        
        $httpMock.expectGET(url);
        alumnosApi.getOne(11, function(alumno) {                
            expect(alumno).toEqual(all[0]);
        });
        $httpMock.flush();
        
    }));
});

