if(typeof module === "object"){
 var Terraformer = require("../dist/node/terraformer.js");
 Terraformer.WKT = require("../dist/node/Parsers/WKT/index.js");
}

describe("WKT Convert", function () {

  it("should convert a POINT", function () {
    var input = {
      type: "Point",
      coordinates: [ 30, 10 ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("POINT (30 10)");
  });


  it("should convert a POINT with Z", function () {
    var input = {
      type: "Point",
      coordinates: [ 30, 10, 10 ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("POINT Z (30 10 10)");
  });

  it("should convert a POINT with M (nonstandard)", function () {
    var input = {
      properties: { m: true },
      type: "Point",
      coordinates: [ 30, 10, 10 ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("POINT M (30 10 10)");
  });

  it("should convert a POINT with Z and M", function () {
    var input = {
      type: "Point",
      coordinates: [ 30, 10, 10, 12 ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("POINT ZM (30 10 10 12)");
  });

  it("should convert an empty POINT", function () {
    var input = {
      type: "Point",
      coordinates: [ ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("POINT EMPTY");
  });

  it("should convert a POLYGON", function () {
    var input = {
      type: "Polygon",
      coordinates: [ [ [ 30, 10 ], [ 20, 20 ], [ 30, 20 ] ] ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("POLYGON ((30 10, 20 20, 30 20))");
  });

  it("should convert a POLYGON with Z", function () {
    var input = {
      type: "Polygon",
      coordinates: [ [ [ 30, 10, 1 ], [ 20, 20, 2 ], [ 30, 20, 3 ] ] ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("POLYGON Z ((30 10 1, 20 20 2, 30 20 3))");
  });

  it("should convert a POLYGON with ZM", function () {
    var input = {
      type: "Polygon",
      coordinates: [ [ [ 30, 10, 1, 3 ], [ 20, 20, 2, 2 ], [ 30, 20, 3, 1 ] ] ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("POLYGON ZM ((30 10 1 3, 20 20 2 2, 30 20 3 1))");
  });

  it("should convert a POLYGON with M (nonstandard)", function () {
    var input = {
      properties: { m: true },
      type: "Polygon",
      coordinates: [ [ [ 30, 10, 1 ], [ 20, 20, 2 ], [ 30, 20, 3 ] ] ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("POLYGON M ((30 10 1, 20 20 2, 30 20 3))");
  });

  it("should convert an EMPTY POLYGON", function () {
    var input = {
      type: "Polygon",
      coordinates: [ ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("POLYGON EMPTY");
  });

  it("should convert a MULTIPOINT", function () {
    var input = {
      type: "MultiPoint",
      coordinates: [ [ 30, 10 ], [ 20, 20 ], [ 30, 20 ] ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("MULTIPOINT (30 10, 20 20, 30 20)");
  });

  it("should convert a LINESTRING", function () {
    var input = {
      type: "LineString",
      coordinates: [ [ 30, 10 ], [ 20, 20 ], [ 30, 20 ] ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("LINESTRING (30 10, 20 20, 30 20)");
  });

  it("should convert a MULTILINESTRING", function () {
    var input = {
      type: "MultiLineString",
      coordinates: [ [ [ 30, 10 ], [ 20, 20 ], [ 30, 20 ] ] ]
    };

    var output = Terraformer.WKT.convert(input);

    expect(output).toEqual("MULTILINESTRING ((30 10, 20 20, 30 20))");
  });

  it("should convert a MULTIPOLYGON", function () {
    var input = { "type": "MultiPolygon",
      "coordinates": [
        [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
        [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
         [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
      ]
    };
    var output = Terraformer.WKT.convert(input);
    expect(output).toEqual("MULTIPOLYGON (((102 2, 103 2, 103 3, 102 3, 102 2)), ((100 0, 101 0, 101 1, 100 1, 100 0), (100.2 0.2, 100.8 0.2, 100.8 0.8, 100.2 0.8, 100.2 0.2)))");
  });

});


describe("WKT Parser", function() {

  it("should parse a POINT", function(){
    var input = "POINT (30 10)";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([30,10]);
    expect(output).toBeInstanceOfClass(Terraformer.Point);
    expect(output.type).toEqual("Point");
  });

  it("should parse a POINT with a Z coordinate", function(){
    var input = "POINT (30 10 20)";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([30,10,20]);
    expect(output).toBeInstanceOfClass(Terraformer.Point);
    expect(output.type).toEqual("Point");
  });

  it("should parse a POINT with Z and M coordinates", function(){
    var input = "POINT (30 10 20 15)";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([30,10,20,15]);
    expect(output).toBeInstanceOfClass(Terraformer.Point);
    expect(output.type).toEqual("Point");
  });

  it("should parse a LINESTRING", function(){
    var input = "LINESTRING (30 10, 10 30, 40 40)";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [30,10], [10,30], [40,40] ]);
    expect(output).toBeInstanceOfClass(Terraformer.LineString);
    expect(output.type).toEqual("LineString");
  });

  it("should parse a LINESTRING with a Z coordinate", function(){
    var input = "LINESTRING (30 10 5, 10 30 15, 40 40 25)";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [30,10,5], [10,30,15], [40,40,25] ]);
    expect(output).toBeInstanceOfClass(Terraformer.LineString);
    expect(output.type).toEqual("LineString");
  });

  it("should parse a LINESTRING with Z and M coordinates", function(){
    var input = "LINESTRING (30 10 5 2, 10 30 15 8, 40 40 25 16)";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [30,10,5,2], [10,30,15,8], [40,40,25,16] ]);
    expect(output).toBeInstanceOfClass(Terraformer.LineString);
    expect(output.type).toEqual("LineString");
  });

  it("should parse a POLYGON", function(){
    var input = "POLYGON ((30 10, 10 20, 20 40, 40 40, 30 10))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [ [30, 10], [10, 20], [20, 40], [40, 40], [30, 10] ] ]);
    expect(output).toBeInstanceOfClass(Terraformer.Polygon);
    expect(output.type).toEqual("Polygon");
  });

  it("should parse a POLYGON with a Z coordinate", function(){
    var input = "POLYGON ((30 10 4, 10 20 6, 20 40 8, 40 40 1, 30 10 3))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [ [30, 10, 4], [10, 20, 6], [20, 40, 8], [40, 40, 1], [30, 10, 3] ] ]);
    expect(output).toBeInstanceOfClass(Terraformer.Polygon);
    expect(output.type).toEqual("Polygon");
  });

  it("should parse a POLYGON with Z and M coordinates", function(){
    var input = "POLYGON ((30 10 4 1, 10 20 6 3, 20 40 8 5, 40 40 1 7, 30 10 3 9))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [ [30, 10, 4, 1], [10, 20, 6, 3], [20, 40, 8, 5], [40, 40, 1, 7], [30, 10, 3, 9] ] ]);
    expect(output).toBeInstanceOfClass(Terraformer.Polygon);
    expect(output.type).toEqual("Polygon");
  });

  it("should parse a POLYGON with a hole", function(){
    var input = "POLYGON ((35 10, 10 20, 15 40, 45 45, 35 10),(20 30, 35 35, 30 20, 20 30))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([
      [ [35, 10],[10, 20],[15, 40],[45, 45],[35, 10] ],
      [ [20, 30],[35, 35],[30, 20],[20, 30] ]
    ]);
    expect(output).toBeInstanceOfClass(Terraformer.Polygon);
    expect(output.type).toEqual("Polygon");
  });

  it("should parse a MULTIPOINT", function(){
    var input = "MULTIPOINT ((10 40), (40 30), (20 20), (30 10))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [10, 40],[40, 30], [20,20], [30,10] ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiPoint);
    expect(output.type).toEqual("MultiPoint");
  });

  it("should parse a MULTIPOINT with a Z coordinate", function(){
    var input = "MULTIPOINT ((10 40 1), (40 30 2), (20 20 3), (30 10 4))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [10, 40, 1],[40, 30, 2], [20, 20, 3], [30, 10, 4] ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiPoint);
    expect(output.type).toEqual("MultiPoint");
  });

  it("should parse a MULTIPOINT with Z and M coordinates", function(){
    var input = "MULTIPOINT ((10 40 1 8), (40 30 2 9), (20 20 3 8), (30 10 4 9))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [10, 40, 1, 8],[40, 30, 2, 9], [20, 20, 3, 8], [30, 10, 4, 9] ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiPoint);
    expect(output.type).toEqual("MultiPoint");
  });

  it("should parse a MULTIPOINT with alternate syntax", function(){
    var input = "MULTIPOINT (10 40, 40 30, 20 20, 30 10)";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [10, 40],[40, 30], [20,20], [30,10] ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiPoint);
    expect(output.type).toEqual("MultiPoint");
  });

  it("should parse a MULTIPOINT with alternate syntax and Z coordinates", function(){
    var input = "MULTIPOINT (10 40 1, 40 30 2, 20 20 3, 30 10 4)";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [10, 40, 1],[40, 30, 2], [20, 20, 3], [30, 10, 4] ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiPoint);
    expect(output.type).toEqual("MultiPoint");
  });

  it("should parse a MULTIPOINT with alternate syntax and Z and M coordinates", function(){
    var input = "MULTIPOINT (10 40 1 2, 40 30 2 3, 20 20 3 4, 30 10 4 5)";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([ [10, 40, 1, 2],[40, 30, 2, 3], [20, 20, 3, 4], [30, 10, 4, 5] ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiPoint);
    expect(output.type).toEqual("MultiPoint");
  });

  it("should parse a MULTILINESTRING with alternate syntax", function(){
    var input = "MULTILINESTRING ((10 10, 20 20, 10 40),(40 40, 30 30, 40 20, 30 10))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([
      [ [10,10],[20,20],[10,40] ],
      [ [40,40],[30,30],[40,20],[30,10] ]
    ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiLineString);
    expect(output.type).toEqual("MultiLineString");
  });

  it("should parse a MULTILINESTRING with alternate syntax and Z coordinates", function(){
    var input = "MULTILINESTRING ((10 10 10, 20 20 20, 10 40 30),(40 40 30, 30 30 20, 40 20 10, 30 10 10))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([
      [ [10,10,10],[20,20,20],[10,40,30] ],
      [ [40,40,30],[30,30,20],[40,20,10],[30,10,10] ]
    ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiLineString);
    expect(output.type).toEqual("MultiLineString");
  });

  it("should parse a MULTILINESTRING with alternate syntax and Z and M coordinates", function(){
    var input = "MULTILINESTRING ((10 10 10 5, 20 20 20 4, 10 40 30 3),(40 40 30 2, 30 30 20 1, 40 20 10 2, 30 10 10 3))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([
      [ [10,10,10,5],[20,20,20,4],[10,40,30,3] ],
      [ [40,40,30,2],[30,30,20,1],[40,20,10,2],[30,10,10,3] ]
    ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiLineString);
    expect(output.type).toEqual("MultiLineString");
  });

  it("should parse a MULTIPOLYGON", function(){
    var input = "MULTIPOLYGON (((30 20, 10 40, 45 40, 30 20)),((15 5, 40 10, 10 20, 5 10, 15 5)))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([
      [
        [ [30,20],[10,40],[45,40],[30,20] ]
      ],
      [
        [ [15,5],[40,10],[10,20],[5,10],[15,5] ]
      ]
    ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiPolygon);
    expect(output.type).toEqual("MultiPolygon");
  });

  it("should parse a MULTIPOLYGON with a Z coordinate", function(){
    var input = "MULTIPOLYGON (((30 20 1, 10 40 2, 45 40 3, 30 20 4)),((15 5, 40 10, 10 20, 5 10, 15 5)))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([
      [
        [ [30,20,1],[10,40,2],[45,40,3],[30,20,4] ]
      ],
      [
        [ [15,5],[40,10],[10,20],[5,10],[15,5] ]
      ]
    ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiPolygon);
    expect(output.type).toEqual("MultiPolygon");
  });

  it("should parse a MULTIPOLYGON with Z and M coordinates", function(){
    var input = "MULTIPOLYGON (((30 20 1 0, 10 40 2 1, 45 40 3 2, 30 20 4 3)),((15 5, 40 10, 10 20, 5 10, 15 5)))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([
      [
        [ [30,20,1,0],[10,40,2,1],[45,40,3,2],[30,20,4,3] ]
      ],
      [
        [ [15,5],[40,10],[10,20],[5,10],[15,5] ]
      ]
    ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiPolygon);
    expect(output.type).toEqual("MultiPolygon");
  });

  it("should parse a MULTIPOLYGON with a hole", function(){
    var input = "MULTIPOLYGON (((40 40, 20 45, 45 30, 40 40)),((20 35, 45 20, 30 5, 10 10, 10 30, 20 35),(30 20, 20 25, 20 15, 30 20)))";
    var output = new Terraformer.WKT.parse(input);
    expect(output.coordinates).toEqual([
      [
        [ [40,40], [20,45], [45,30], [40,40] ]
      ],
      [
        [ [20,35],[45,20],[30,5] ,[10,10],[10,30],[20,35] ],
        [ [30,20], [20,25], [20,15],[30,20] ]
      ]
    ]);
    expect(output).toBeInstanceOfClass(Terraformer.MultiPolygon);
    expect(output.type).toEqual("MultiPolygon");
  });

});