
describe("index controller", function(){
    var url = '/api/students/';
    var id = 10;
    var all = [
        {name: 'rodrigo', age: 30, id: 10},
        {name: 'jonas', age: 29, id: 11},
        {name: 'monse', age: 20, id: 12}
    ];
    var model =  {name: 'rodrigo', age: 30, _id: 10};
    
    beforeEach(module('app')); 
    
    var $controller, $httpMock, $locationMock;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('GET', url).respond(all);
        $httpBackend.when('DELETE', url + id).respond(true);
        $httpBackend.when('POST', url).respond(true);
        $httpBackend.when('GET', url + id).respond(model);//r.servidor
        $httpBackend.when('PUT', url).respond(true);
        
    }));
    
    beforeEach(inject(function($location, $routeParams) {
        $locationMock = $location;
        $routeParams.id = id;
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
    it("saves on save", function(){
        var controller = $controller("NuevoController");
        controller.save();
        $httpMock.expectPOST(url);
        $httpMock.flush();
        
        expect($locationMock.path()).toBe('/');
    });
    it("edit loads model", function(){
        var controller = $controller("EditarController");
        
        $httpMock.expectGET(url + id);
        $httpMock.flush();
        
        expect(controller.id).toBe(model._id);
        expect(controller.name).toBe(model.name);
        expect(controller.age).toBe(model.age);
    });
    it("edits saves a model", function(){
        var controller = $controller("EditarController");
        controller.update();
        $httpMock.expectPUT(url);
        $httpMock.flush();
        
        expect($locationMock.path()).toBe('/');
    });
    it("ver shows the model", function(){
        var controller = $controller("VerController");
        controller.load();
        $httpMock.expectGET(url + id);
        $httpMock.flush();
              
        expect(controller.id).toBe(model._id);
        expect(controller.name).toBe(model.name);
        expect(controller.age).toBe(model.age);
    });

    

});

