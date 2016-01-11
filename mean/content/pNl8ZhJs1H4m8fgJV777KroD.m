clear
format long;
print = @(x) disp(sprintf('%11s = %g',x,evalin('caller',x)));
section = @(title) disp(sprintf('\n==========================\n  %s\n==========================',title));

par = @(r1,r2) (r1*r2/(r1+r2));
divpot = @(r1,r2,u) ((r1/r2)*u);
radToDeg = @(rad) (rad*180/pi);
degToRad = @(deg) (deg*pi/180);
fToW = @(f) (2*pi*f); 
wToF = @(w) (w/(2*pi));
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



	section('Ex 7a.1')
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

fo=700*10^3;

R=11.7;						print('R')
L=1.0885*10^-3;				print('L')
La=9.2*10^-6;				print('La')
Cmax=138.8*10^-12;			print('Cmax')
Cmin=15.2*10^-12;			print('Cmin')

w_min=1/sqrt(L*Cmax);		print('w_min')
fo_min=wToF(w_min);			%print('fo_min')		
w_max=1/sqrt(L*Cmin);		print('w_max')
fo_max=wToF(w_max);			%print('fo_max')

Q=(fo*L)/R;					print('Q')



	section('Ex 7a.5')
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

Max_3db_abaixo=30.6*0.707;
fo=710*10^3;

f_abaixo=705.4*10^3;
f_acima=714.7*10^3;
delta_f=f_acima-f_abaixo;
print('delta_f')

Q=fo/delta_f;				print('Q')

L=1.0885*10^-3;
syms C_;
Cress=vpasolve(1/sqrt(L*C_)==2*pi*fo,C_);
Cress=double(Cress);		print('Cress')

Imped_car=sqrt(L/Cress);	print('Imped_car')

R_efetivo=Imped_car/Q;		print('R_efetivo')



	section('Ex 7b.3')
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

f=1.008*10^3;				print('f')

C=100*10^-12;
R=1*10^6;
w_corte=1/(R*C);
f_corte=wToF(w_corte);		print('f_corte')

VRm_medio=32*10^-3;			print('VRm_medio')
VRm_pico=328*10^-3;			print('VRm_pico')

fm=1.015*10^3;				print('fm')



	section('Ex 7c.2')
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

Vo=1.13;
Vi=0.103;
Av_exp=Vo/Vi;				print('Av_exp')

R1=22*10^3;
R2=2.2*10^3;
Av_cal=1+R1/R2;				print('Av_cal')



	section('Ex 7d')
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
disp('Testes de demonstracao')
%{

No gerador de funções, ao aumentar a tensão pico a pico faz com que a entrada do pré-amplificador seja cada 
vez maior, até ao ponto de saturação. Neste ponto, a saída deixa de produzir um sinal harmónico fundamental 
e passa a incluir ondas sobrepostas, deixando o som de ser claro.

Com o gerador de funções ligado diretamente ao pré-amplificador, foi notável um som do estilo apito sem ruido.

Com todo o sistema montado, ligámos música do computador à entrada auxiliar do gerador de funções, 
onde modulámos a onda em AM. Colocámos a antena perto do circuto RLC e regulámos o condensador para a 
capacidade ideal medida no ponto A.5. Da saida do RLC ligámos o diodo, a resistencia e o condensador adicional
 e completámos o andar de desmodulação. Da saida deste andar ligámos ao pré-amplificador e a sua saida às colunas. 
 Conseguimos ouvir sem problemas e com ruido minimo o som que estávamos a reproduzir, com resultado praticamente 
 igual ao ouvido com as colunas ligadas diretamente ao computador! Podemos afirmar que a cumprimos o objetivo!








	
%}
disp(' ')