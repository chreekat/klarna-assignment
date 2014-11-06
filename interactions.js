app = angular.module("boxes", ["webStorageModule"]);
app.controller("BoxList", function ($scope, webStorage, $timeout) {

    // UTIL FUNCS

    sync = function () {
        webStorage.add("model", $scope.m);
    };
    modelDefaults =  function () {
        return {
            boxes: [1],
            maxId: 1,
            closedCount: 0,
        };
    };
    showMsg = (function () {
        promise = null;
        return function ActualFunction(msg) {
            $scope.e.message = "| " + msg;
            $timeout.cancel(promise);
            promise = $timeout(function () { $scope.e.message = ""; }, 3000);
        };
    }());

    // SCOPE INITIALIZATION

    // m = model (synced to storage)
    $scope.m = (function () {
        fromStorage = webStorage.get("model");
        if (fromStorage !== null) {
            return fromStorage;
        } else {
            return modelDefaults() ;
        }
    }());
    // e = ephemeral (non-stored) data
    $scope.e = {
        borders: false,
        message: ""
    };

    // CONTROLLER ACTIONS

    $scope.reset = function () {
        $scope.m = modelDefaults();
        $scope.e.message = "";
        sync();
    };
    $scope.closeBox = function(targetId, $event) {
        if ($scope.m.boxes.length == 1) {
            showMsg("Can't close last box!");
            // I thought I once read that angular prevents propagation by
            // default, and indeed addBox usually doesn't fire when the
            // close button is pressed. But when closing the last box, the
            // event *does* propagate, and addBox *does* fire!
            // See http://plnkr.co/edit/9xpYpxFvyXhvquZkTc9X?p=preview for
            // a test case.
            $event.stopPropagation();
        } else {
            targetIdx = $scope.m.boxes.indexOf(targetId);
            $scope.m.boxes.splice(targetIdx, 1);
            $scope.m.closedCount++;
            sync();
            showMsg("You just closed box " + targetId);
        }
    };
    $scope.addBox = function(targetId) {
        targetIdx = $scope.m.boxes.indexOf(targetId);
        $scope.m.boxes.splice(targetIdx+1, 0, ++$scope.m.maxId);
        sync();
    };

    // REACTIVE VALUES
    // (which are too complex to fit in templates in the html)

    $scope.leftId = function (idx) {
        lid = "";
        if ([1,2,4].indexOf(idx % 6) >= 0) {
            lid = $scope.m.boxes[idx-1];
        }
        return lid;
    };
    $scope.rightId = function (idx, atEnd) {
        rid = "";
        if (!atEnd && [0,1,3].indexOf(idx % 6) >= 0) {
            rid = $scope.m.boxes[idx+1];
        }
        return rid;
    };
    $scope.bgColor = function () {
        // At one end, we have absolute black. Let's make that happen at 20
        // boxes, so we can take steps of 6, starting at 135
        val = Math.max(0, 135 - 6* $scope.m.boxes.length);
        return "rgb("+ val + "," + val + "," + val + ")"
    };
});
