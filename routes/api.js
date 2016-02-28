var express = require('express');
var router = express.Router();

var talleres = [
  {id:1, nombre:"Salazar e Israel HONDA", sucursales:[
    {id:1, nombre:"Av. Las Condes 8106, Las Condes"},
    {id:2, nombre:"Vitacura 9546, Vitacura"},
  ]},
  {id:2, nombre:"Automotora INALCO", sucursales:[
    {id:3, nombre:"Vicuña Mackenna 3500, Macul"},
    {id:4, nombre:"LIRA 451, Santiago"},
  ]},
  {id:3, nombre:"AUTOCENTRO DUMAY GREAT WALL  GEELY MAZDA Y SUZUKI", sucursales:[
    {id:5, nombre:"Av. José María Cardenal Caro 2635 , Conchali"},
    {id:6, nombre:"TIL - TIL 2838, Macul"},
  ]},
  {id:4, nombre:"GUILLERMO MORALES (Alfa Romeo, Mg; Mitsubishi, Ssang yong)", sucursales:[
    {id:7, nombre:"Avenida El Parque 1307, Parque Enea, Pudahuel"},
    {id:8, nombre:"Hnos Carrera Pinto 160 -Panam. Norte KM 16 1/2 , Colina"},
  ]}
];

var siniestros = [
  {id:1512, asegurado_id:1, sucursal_id:1, estado:"No inspeccionado",      marca:"Toyota",        modelo:"Yaris",   color:"blanco", ano:"2014", patente:"LX-5332", relato:"relato..."},
  {id:2245, asegurado_id:2, sucursal_id:1, estado:"Sin documentos",        marca:"Alfa Romeo",    modelo:"Mito",    color:"rojo",   ano:"2011", patente:"CSGJ-22", relato:"relato..."},
  {id:3325, asegurado_id:3, sucursal_id:1, estado:"En reparacion",         marca:"Honda",         modelo:"Civic",   color:"azul",   ano:"2012", patente:"HDFV-74", relato:"relato..."},
  {id:4174, asegurado_id:1, sucursal_id:2, estado:"No inspeccionado",      marca:"Citroen",       modelo:"C5",      color:"rojo",   ano:"2010", patente:"WRHD-32", relato:"relato..."},
  {id:5366, asegurado_id:2, sucursal_id:2, estado:"En reparacion",         marca:"Renault",       modelo:"Megane",  color:"blanco", ano:"2011", patente:"ERUJD-75",relato:"relato..."},
  {id:6634, asegurado_id:3, sucursal_id:3, estado:"En reparacion",         marca:"Peugeot",       modelo:"206",     color:"blanco", ano:"2014", patente:"YUUJ-31", relato:"relato..."},
  {id:7841, asegurado_id:1, sucursal_id:4, estado:"No inspeccionado",      marca:"Jeep",          modelo:"Compass", color:"verde",  ano:"2014", patente:"GGFB-52", relato:"relato..."},
  {id:8478, asegurado_id:2, sucursal_id:5, estado:"No inspeccionado",      marca:"Honda",         modelo:"Fit",     color:"negro",  ano:"2014", patente:"RTUG-86", relato:"relato..."},
  {id:9312, asegurado_id:3, sucursal_id:6, estado:"Sin tiempo estimado",   marca:"Nissan",        modelo:"Quasqai", color:"negro",  ano:"2013", patente:"WETV-42", relato:"relato..."},
  {id:1052, asegurado_id:1, sucursal_id:7, estado:"Sin tiempo estimado",   marca:"Mercedes Benz", modelo:"B200",    color:"blanco", ano:"2013", patente:"RTJJ-34", relato:"relato..."},
  {id:1152, asegurado_id:2, sucursal_id:8, estado:"Sin tiempo estimado",   marca:"BMW",           modelo:"318",     color:"blanco", ano:"2013", patente:"WETYW-25",relato:"relato..."},
];

var asegurados = [
    {id:1, nombre:"Juan Carlos Perez Cotapos",                rut:"13.135.355-3", telefono:"+56992513523"},
    {id:2, nombre:"Pedro Pablo Barrera Bouteille",            rut:"21.135.355-k", telefono:"+56222453647"},
    {id:3, nombre:"Bernardita Maria Del Carmen Peñailillo",   rut:"12.135.355-k", telefono:"+56222453647"},
];


router.get('/talleres', function(req, res, next) {
  return res.json(talleres);
});

router.get('/siniestros', function(req, res, next) {
  return res.json(siniestros);
});

router.get('/asegurados', function(req, res, next) {
    return res.json(asegurados);
});

module.exports = router;
