
describe("index controller", function(){
    var url = '/api/students/';
    var id = 10;
    var all = [
        {name: 'rodrigo', age: 30, id: 10},
        {name: 'jonas', age: 29, id: 11},
        {name: 'monse', age: 20, id: 12}
    ];
    
    beforeEach(module('app')); 
    
    var $controller, $httpMock, api, $locationMock;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('GET', url).respond(all);
        $httpBackend.when('DELETE', url + id).respond(true);
    }));
    
    beforeEach(inject(function(alumnosApi) {
        api = alumnosApi;
    }));
    
    beforeEach(inject(function($location) {
        $locationMock = $location;
    }));

    
    it('loads students on IndexController', function() {
        var controller = $controller('IndexController');
        
        $httpMock.expectGET(url);
        $httpMock.flush();        

        expect(controller.students).toEqual(all);
    });
    
    it('changes location on Delete', function() {
        var controller = $controller('IndexController');
        controller.delete(id);
        $httpMock.expectDELETE(url + id);
        $httpMock.flush();
        
        expect($locationMock.path()).toBe('/');
    });
});

