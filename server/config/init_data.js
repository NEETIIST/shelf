console.log("!!!LOAD TEACHERS FROM server/services/fenix/init_teachers.js")

var Degree 	= require("../models/degree.js");
var Course 	= require("../models/course.js");
var User 	= require("../models/user.js");
var mongoose =	require("mongoose");

mongoose.connect('mongodb://localhost:27017/shelf');
var total = 0; function saved(err){ total++; console.log(total); }


/* USER */
new User({username:"ist177907",admin:true}).save(saved);
new User({username:"ist178039",admin:true}).save(saved);
new User({username:"ist177969",admin:true}).save(saved);
new User({username:"ist177896",admin:true}).save(saved);

/* DEGREES */
new Degree({name:"Licenciatura em Engenharia Telecomunicações e Informática", acronym:"LETI", courses:["AL","CDI1","EMD","FP","SD","AC","CDI2","IETI","IAED","MO","ACED","EO","MC","PO","SO","IIPM","IRC","PE","SDis","SS","AR","BD","Ges","ICSE","PA","ESEmb","ES","PPess","GSR","SCom"],id:"2761663971586"}).save(saved);
console.log('LETI');

/* COURSES */
new Course({name:"Álgebra Linear", acronym:"AL",year:1,semester:1}).save(saved);
new Course({name:"Cálculo Diferencial e Integral I", acronym:"CDI1",year:1,semester:1}).save(saved);
new Course({name:"Elementos de Matemática Discreta", acronym:"EMD",year:1,semester:1}).save(saved);
new Course({name:"Fundamentos da Programação", acronym:"FP",year:1,semester:1}).save(saved);
new Course({name:"Sistemas Digitais", acronym:"SD",year:1,semester:1}).save(saved);
console.log('1 ano 1 semestre')
new Course({name:"Arquitectura de Computadores", acronym:"AC",year:1,semester:2}).save(saved);
new Course({name:"Cálculo Diferencial e Integral II", acronym:"CDI2",year:1,semester:2}).save(saved);
new Course({name:"Introdução à Engenharia de Telecomunicações e Informática", acronym:"IETI",year:1,semester:2}).save(saved);
new Course({name:"Introdução aos Algoritmos e Estruturas de Dados", acronym:"IAED",year:1,semester:2}).save(saved);
new Course({name:"Mecânica e Ondas", acronym:"MO",year:1,semester:2}).save(saved);
console.log('1 ano 2 semestre')
new Course({name:"Análise Complexa e Equações Diferenciais", acronym:"ACED",year:2,semester:1}).save(saved);
new Course({name:"Electromagnetismo e Óptica", acronym:"EO",year:2,semester:1}).save(saved);
new Course({name:"Matemática Computacional", acronym:"MC",year:2,semester:1}).save(saved);
new Course({name:"Programação com Objectos", acronym:"PO",year:2,semester:1}).save(saved);
new Course({name:"Sistemas Operativos", acronym:"SO",year:2,semester:1}).save(saved);
console.log('2 ano 1 semestre')
new Course({name:"Introdução às Interfaces Pessoa-Máquina", acronym:"IIPM",year:2,semester:2}).save(saved);
new Course({name:"Introdução às Redes de Computadores", acronym:"IRC",year:2,semester:2}).save(saved);
new Course({name:"Probabilidades e Estatística", acronym:"PE",year:2,semester:2}).save(saved);
new Course({name:"Sistemas Distribuídos", acronym:"SDis",year:2,semester:2}).save(saved);
new Course({name:"Sistemas e Sinais", acronym:"SS",year:2,semester:2}).save(saved);
console.log('2 ano 2 semestre')
new Course({name:"Arquitecturas de Redes", acronym:"AR",year:3,semester:1}).save(saved);
new Course({name:"Bases de Dados", acronym:"BD",year:3,semester:1}).save(saved);
new Course({name:"Gestão", acronym:"Ges",year:3,semester:1}).save(saved);
new Course({name:"Introdução aos Circuitos e Sistemas Electrónicos", acronym:"ICSE",year:3,semester:1}).save(saved);
new Course({name:"Propagação e Antenas", acronym:"PA",year:3,semester:1}).save(saved);
console.log('3 ano 1 semestre')
new Course({name:"Electrónica dos Sistemas Embebidos", acronym:"ESEmb",year:3,semester:2}).save(saved);
new Course({name:"Engenharia de Software", acronym:"ES",year:3,semester:2}).save(saved);
new Course({name:"Portfolio Pessoal A", acronym:"PPess",year:3,semester:2}).save(saved);
new Course({name:"Gestão e Segurança de Redes / Gestão de Redes e Serviços", acronym:"GSR",year:3,semester:2}).save(saved);
new Course({name:"Gestão e Segurança de Redes", acronym:"GSR",year:3,semester:2}).save(saved);
new Course({name:"Sistemas de Comunicações", acronym:"SCom",year:3,semester:2}).save(saved);
console.log('3 ano 2 semestre')
