Two Way Data Binding Using Proxy
================================

Two way data binding implemented using Proxy. All data is bound on `$scope` object and all HTML elements that have the my-model attribute.

## Usage
The value of input will be reflected in p.
    
    <form>
        <input type="text" placeholder="Type here..." my-model="name">
    </form>

    <p my-model="name"></p>

    // In js.
    $scope.name = "Hansie"; // will be the value of both p and input.