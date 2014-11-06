// No map for NodeLists. :(
map = function(listish, f) {
    acc = [];
    for (i = 0; i < listish.length; i++) {
        acc.push(f(listish[i]));
    }
};
// no indexOf for classLists, either. :/
indexOf = function(listish, obj) {
    for (i = 0; i < listish.length; i++) {
        if (listish[i] === obj) {
            return i;
        }
    }
    return -1;
}

setContainerBorder = function (doSet) {
    map(
        document.querySelectorAll("div.container1, div.container2"),
        function (cont) { cont.classList.toggle("border", doSet); }
    );
};

isBox = function (node) {
    return node !== null && indexOf(node.classList, "box") >= 0;
}

updateBg = function (ev) {
    // If we're inside a box, set border
    if (ev.target.querySelector("div.box") == null) {
        setContainerBorder(true);
    } else {
        setContainerBorder(false);
    }
};

document.addEventListener("mouseover", updateBg);

app = angular.module("boxes", ["webStorageModule"]);
app.controller("BoxList", function ($scope, webStorage, $timeout) {
    defaults =  function () {
        return {
            boxes: [1],
            maxId: 1,
            closedCount: 0,
        };
    };

    showMsg = (function () {
        promise = null;
        return function ActualFunction(msg) {
            $scope.message = "| " + msg;
            $timeout.cancel(promise);
            promise = $timeout(function () { $scope.message = ""; }, 3000);
        };
    }());

    $scope.m = (function () {
        fromStorage = webStorage.get("model");
        if (fromStorage !== null) {
            return fromStorage;
        } else {
            return defaults() ;
        }
    }());

    $scope.reset = function () {
        $scope.m = defaults();
        $scope.message = "";
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
    $scope.leftId = function (idx) {
        if ([1,2,4].indexOf(idx % 6) >= 0) {
            return $scope.m.boxes[idx-1];
        }
        return "";
    };
    $scope.rightId = function (idx, atEnd) {
        if (!atEnd && [0,1,3].indexOf(idx % 6) >= 0) {
            return $scope.m.boxes[idx+1];
        }
        return "";
    };
    $scope.bgColor = function () {
        // At one end, we have absolute black. Let's make that happen at 20
        // boxes, so we can take steps of 6, starting at 135
        val = Math.max(0, 135 - 6* $scope.m.boxes.length);
        return "rgb("+ val + "," + val + "," + val + ")"
    };
    sync = function () {
        webStorage.add("model", $scope.m);
    };

});
