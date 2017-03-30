DBQuery.prototype._shellPrint = DBQuery.prototype.shellPrint;
DBQuery.prototype.shellPrint = function () {
    try {
        var n = 0;
        while (this.hasNext() && n < DBQuery.shellBatchSize) {
            var doc = this.next();
            print(sortDocKeys(doc));
            n++;
        }

    } catch (e) {
        print(e);
    }
};

function sortDocKeys(doc) {
    var printDoc = {};
    var keys = Object.keys(doc);
    keys.sort();

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (doc[key] && doc[key].toString() === "[object BSON]") {
            doc[key] = sortDocKeys(doc[key]);
        } else if (doc[key] && doc[key].constructor && doc[key].constructor === Array) {
            for (var j = 0; j < doc[key].length; j++) {
                doc[key][j] = sortDocKeys(doc[key][j]);
            }
        }

        printDoc[key] = doc[key];
    }

    return printDoc;
}