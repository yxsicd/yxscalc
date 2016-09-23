var db = new loki('sandbox.db');

// Add a collection to the database
var items = db.addCollection('items');

// Add some documents to the collection
items.insert({ name : 'mjolnir', owner: 'thor', maker: 'dwarves' });
items.insert({ name : 'gungnir', owner: 'odin', maker: 'elves' });
items.insert({ name : 'tyrfing', owner: 'Svafrlami', maker: 'dwarves' });
items.insert({ name : 'draupnir', owner: 'odin', maker: 'elves' });

// Find and update an existing document
var tyrfing = items.findOne({'name': 'tyrfing'});
tyrfing.owner = 'arngrim';
items.update(tyrfing);

// These statements send to Text Output
logText('tyrfing value :');
logObject(tyrfing);
logText('odins items');
logObject(items.find({ 'owner': 'odin' }));

// This statement sends to Inspector
inspectObject(db);


var arr=[];for(var i=0;i<50000;i++)
{
	items.insert({ linkid :i%5000 , trailid:i%800 , traffic:i*1.0 });
}

var xx=items.where(function(d){return d.linkid.toString().match(".*188.*")})
inspectObject(xx);


var db = new loki('sandbox.db');

// Add a collection to the database
var items = db.addCollection('items');
var arr=[];for(var i=0;i<100;i++)
{
	items.insert({ linkid :i%20 , trailid:i%8 , traffic:i*1.0 });
}

var xx=items.where(function(d){return d.linkid.toString().match(".*188.*")})
inspectObject(xx);

var count = 1000000;
var arr = []; for (var i = 0; i < count; i++) {
	arr.push({ linkid: i % 100, trailid: i % 30, traffic: i * 1.0 });
}

var ret = [];for (var i = 0; i < count; i++) {
	if (arr[i].linkid.toString().match("8")) {
		 ret.push(arr[i])
	}
}
