
var funkify = module.exports = function(input) {
    var output = typeof input === 'function' ? thunkify(input, null, '[root]') : Object.create(input);
    for (var key in input) {
        var val = input[key];
        output[key] = typeof input[key] === 'function' ? thunkify(val, input, key) : val;
    }
    return output;
};

// Basically the same as https://github.com/visionmedia/node-thunkify/ but with overridable ctx
function thunkify(input, ctx, key) {
    return function() {        
        ctx = ctx || this;
        
        var args = [];
        for (var i = 0; i < arguments.length; ++i) {
            args.push(arguments[i]);
        }

        return function(done) {
            var called;
            args.push(function() {
                if (!called) {
                    called = true;
                    done.apply(null, arguments);
                }
            });
            try {
                input.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        };
    };
}
