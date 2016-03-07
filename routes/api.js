var express = require('express');
var pg = require('pg');
var _ = require('lodash');
var router = express.Router();

var DB_CONN_STRING = "postgres://cristianbarrera@localhost:5432/cristianbarrera";

router.get('/talleres', function(req, res, next) {

    var results = [];

    pg.connect(DB_CONN_STRING, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT row_to_json(t.*) as tt, row_to_json(s.*) as ss " +
            "FROM liquidator.talleres t, liquidator.sucursales s " +
            "WHERE t.id = s.taller_id");

        // Stream results back one row at a time
        query.on('row', function (row) {
            var found = _.find(results, {id:row.tt.id});
            if(!found){
                var taller = row.tt;
                taller.sucursales = [row.ss];
                results.push(taller);
            }else{
                found.sucursales.push(row.ss);
            }
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });
});

router.get('/siniestros', function(req, res, next) {
    var results = [];

    pg.connect(DB_CONN_STRING, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM liquidator.siniestros");

        // Stream results back one row at a time
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });
});

router.get('/asegurados', function(req, res, next) {
    var results = [];

    pg.connect(DB_CONN_STRING, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM liquidator.asegurados");

        // Stream results back one row at a time
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });
});

module.exports = router;
