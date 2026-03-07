#include<stdio.h>

main(){
	//cria as variaveis
	float base, altura,area;
	
	//Solicita informações para o usuário salva
	printf("Digite a base:");
	scanf("%f",&base);
	
	printf("Digite a altura:");
	scanf("%f",&altura);
	
	//Calculo
	area = base*altura/2;
	
	//Mostrar a resposta
	printf("A area e %.2f",area);
}
