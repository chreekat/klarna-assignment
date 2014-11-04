// No map for NodeLists. :(
map = function(listish, f) {
    acc = [];
    for (i = 0; i < listish.length; i++) {
        acc.push(f(listish[i]));
    }
};
// no indexOf for classlists, either. :/
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

app = angular.module("boxes", []);
app.controller("BoxList", function ($scope) {
    $scope.boxes = [1];
    $scope.maxId = 1;
    $scope.deleteBox = function(targetId) {
        targetIdx = $scope.boxes.indexOf(targetId);
        $scope.boxes.splice(targetIdx, 1);
    };
    $scope.addBox = function(targetId) {
        targetIdx = $scope.boxes.indexOf(targetId);
        $scope.boxes.splice(targetIdx+1, 0, ++$scope.maxId);
    };
    $scope.leftId = function (idx) {
        if ([1,2,4].indexOf(idx % 6) >= 0) {
            return $scope.boxes[idx-1];
        }
        return "";
    };
    $scope.rightId = function (idx, atEnd) {
        if (!atEnd && [0,1,3].indexOf(idx % 6) >= 0) {
            return $scope.boxes[idx+1];
        }
        return "";
    };
});
