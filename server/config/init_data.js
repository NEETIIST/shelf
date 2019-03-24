console.log("!!!LOAD TEACHERS FROM server/services/fenix/init_teachers.js")

var Degree 	= require("../models/degree.js");
var Course 	= require("../models/course.js");
var User 	= require("../models/user.js");
var mongoose =	require("mongoose");

mongoose.connect('mongodb://localhost:27017/shelf');
var total = 0; function saved(err){ total++; console.log(total); }


/* USER */
new User({username:"ist178083",admin:true}).save(saved);

/* DEGREES */
new Degree({name:"Licenciatura em Engenharia Telecomunicações e Informática", acronym:"LETI", courses:["AL","CDI1","EMD","FP","SD","AC","CDI2","IETI","IAED","MO","ACED","EO","MC","PO","SO","IIPM","IRC","PE","SDis","SS","AR","BD","Ges","ICSE","PA","ESEmb","ES","PPess","GSR","SCom"],id:"2761663971586"}).save(saved);
console.log('LETI');

new Degree({name:"Mestrado em Engenharia Telecomunicações e Informática", acronym:"METI", courses:["AGISIT","ACIC","CSF","DAD","DIIC","ESLE","ET","ETPN","PRI","RCM","SS","SPTS","SE","ADSI","CNV","CMU","CMul","CPS","RS","RO","RV","SAI","SEC","Emp","EE","FSI","MAD","PP1","PP2","PETI","DETI"],id:"2761663971587"}).save(saved);
console.log('METI');

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

/* METI Courses */
console.log('1 ano 1 semestre')
new Course({name:"Administração e Gestão de Infraestruturas e Serviços de It", acronym:"AGISIT",year:1,semester:1}).save(saved);
new Course({name:"Aplicações e Computação para a Internet das Coisas", acronym:"ACIC",year:1,semester:1}).save(saved);
new Course({name:"Ciber Segurança Forense", acronym:"CSF",year:1,semester:1}).save(saved);
new Course({name:"Desenvolvimento de Aplicações Distribuídas", acronym:"DAD",year:1,semester:1}).save(saved);
new Course({name:"Design de Interação para a Internet das Coisas", acronym:"DIIC",year:1,semester:1}).save(saved);
new Course({name:"Engenharia de Sistemas de Larga Escala", acronym:"ESLE",year:1,semester:1}).save(saved);
new Course({name:"Engenharia de Tráfego", acronym:"ET",year:1,semester:1}).save(saved);
new Course({name:"Engenharia e Tecnologia de Processos de Negócio", acronym:"ETPN",year:1,semester:1}).save(saved);
new Course({name:"Processamento e Recuperação de Informação", acronym:"PRI",year:1,semester:1}).save(saved);
new Course({name:"Redes de Comunicações Móveis", acronym:"RCM",year:1,semester:1}).save(saved);
new Course({name:"Segurança em Software", acronym:"SS",year:1,semester:1}).save(saved);
new Course({name:"Sistemas de Posicionamento e Telecomunicações por Satélite", acronym:"SPTS",year:1,semester:1}).save(saved);
new Course({name:"Sistemas Embebidos", acronym:"SE",year:1,semester:1}).save(saved);
console.log('1 ano 2 semestre')
new Course({name:"Administração de Dados e Sistemas de Informação", acronym:"ADSI",year:1,semester:2}).save(saved);
new Course({name:"Computação em Nuvem e Virtualização", acronym:"CNV",year:1,semester:2}).save(saved);
new Course({name:"Computação Móvel e Ubíqua", acronym:"CMU",year:1,semester:2}).save(saved);
new Course({name:"Comunicação Multimédia", acronym:"CMul",year:1,semester:2}).save(saved);
new Course({name:"Criptografia e Protocolos de Segurança", acronym:"CPS",year:1,semester:2}).save(saved);
new Course({name:"Redes de Sensores", acronym:"RS",year:1,semester:2}).save(saved);
new Course({name:"Redes Ópticas", acronym:"RO",year:1,semester:2}).save(saved);
new Course({name:"Redes Veiculares", acronym:"RV",year:1,semester:2}).save(saved);
new Course({name:"Sensores e Actuadores Inteligentes", acronym:"SAI",year:1,semester:2}).save(saved);
new Course({name:"Sistemas de Elevada Confiabilidade", acronym:"SEC",year:1,semester:2}).save(saved);
console.log('2 ano 1 semestre')
new Course({name:"Empreendedorismo", acronym:"Emp",year:2,semester:1}).save(saved);
new Course({name:"Engenharia Económica", acronym:"EE",year:2,semester:1}).save(saved);
new Course({name:"Fundamentos de Sistemas de Informação", acronym:"FSI",year:2,semester:1}).save(saved);
new Course({name:"Modelos de Apoio à Decisão", acronym:"MAD",year:2,semester:1}).save(saved);
new Course({name:"Portfolio Pessoal 1", acronym:"PP1",year:2,semester:1}).save(saved);
new Course({name:"Portfolio Pessoal 2", acronym:"PP2",year:2,semester:1}).save(saved);
new Course({name:"Projecto em Engenharia de Telecomunicações e Informática", acronym:"PETI",year:2,semester:1}).save(saved);
console.log('2 ano 2 semestre')
new Course({name:"Dissertação em Engenharia de Telecomunicações e Informática", acronym:"DETI",year:2,semester:2}).save(saved);
