		mostrarMenu();// e ocultar os números e informações de tela e chances	
		function mostrarMenu(){		
			document.body.style.backgroundImage = "url('https://64.media.tumblr.com/3641e6e25e89d9ffa6d751b82610d118/tumblr_mr0b2hGZ2C1sdxraao1_500.gifv')";		
			document.getElementById("divTela").style.display = 'none';
			document.getElementById("divMenu").style.display = 'block';
			document.getElementById("divBotões").style.display = 'none';
			document.getElementById("divPalpites").style.display = 'none';	
		}
		
		//desabilitar os botões de algumas "Telas" no início
		document.getElementById("bot2").disabled = true;
		document.getElementById("bot3").disabled = true;
		document.getElementById("bot4").disabled = true;
		document.getElementById("bot5").disabled = true;
		function escolherTema(escolha){	
			tela = escolha;
			mudarTela();
			//document.body.style.backgroundImage = "url(img/" + tela + ".jpg)";	
			chance = 10;
			stringTela = document.getElementById("divTela");
			stringTela.innerHTML = "Tela " + tela;
			stringPalpites = document.getElementById("divPalpites");
			stringPalpites.innerHTML = "Palpites: "  + chance;
			mostrarTelaNumerosChances()	;// e ocultar os menus
		
		}
		
		function mostrarTelaNumerosChances() {
			document.getElementById("divTela").style.display = 'block';
			document.getElementById("divMenu").style.display = 'none';
			document.getElementById("divBotões").style.display = 'block';
			document.getElementById("divPalpites").style.display = 'block';	
		}

		let novaCor = 0; //para botoes VERMELHO/AMARELO
		let terminou = 0; //a tela ou as chances
		let ativos = [];
		let arrayBotões = document.getElementsByClassName("botão");

		registrarAtivos();
		function registrarAtivos(){
			for (let i = 0; i <  arrayBotões.length;  i++){
				ativos[i] = i+1;
			}
		}

		let segredo = Math.floor(Math.random()*arrayBotões.length) + 1;		
		//
 		console.log("segredo=",segredo);
		//let palpite;
		for (let i = 0; i < arrayBotões.length; i++) {			
			arrayBotões[i].addEventListener("click", function() {			
				if (terminou){
					if(chance<=0){					
						mostrarMenu();					
						arrayBotões[palpite-1].classList.remove("gameover");																			
						arrayBotões[segredo-1].disabled=false;
						arrayBotões[segredo-1].classList.remove("segredo");				
					}					
					else if (tela%10 == 0){								
						if(tela == 10)
							document.getElementById("bot2").disabled = false;
						else if(tela == 20)
							document.getElementById("bot3").disabled = false;
						else if(tela == 30)
							document.getElementById("bot4").disabled = false;
						else if(tela == 40)
							document.getElementById("bot5").disabled = false;
						else if(tela == 50)						
							document.body.style.backgroundImage = "url(img/53.jpg)";
						mostrarMenu();										
					}
					else {
						tela++;
						mudarTela();
					}
					chance=chance+3;			
					stringTela.innerHTML = "Tela "+ tela ;
					stringPalpites.innerHTML = "Palpites: "  + chance;
					terminou = 0;
					arrayBotões[palpite-1].classList.remove("segredo");
					segredo = Math.floor(Math.random()*arrayBotões.length) + 1;
					//
					console.log("segredo=",segredo);
					ativar();
					registrarAtivos();
				}
				else{				
					palpite = parseInt(this.value);
					comparar(palpite);
					desativar();
				}							
			});
		}
		function desativar() {	
			for (let i = 0; i < arrayBotões.length; i++) {		
				if(novaCor){
					arrayBotões[i].disabled=true;
					if (chance<=0){
						arrayBotões[palpite-1].classList.add("gameover");						
					}													
					arrayBotões[segredo-1].disabled=false;
					arrayBotões[segredo-1].classList.add("segredo");								
					terminou=1;				
				}											
				else if(!ativos.includes(parseInt(arrayBotões[i].value))){
					arrayBotões[i].disabled=true;
					arrayBotões[i].classList.add("transparente");				
				}			
			}
			novaCor=0;
		}

		function ativar() {
			for (let i = 0; i < arrayBotões.length; i++) {	
				arrayBotões[i].disabled=false;
				arrayBotões[i].classList.remove("transparente");		
			}			
		}

		function comparar(palpite){					
			if(palpite < segredo){
				chance--;
				if (chance == 0)
					mostrarGameover();				
				else 
					mostrarDica(">");
				var index = ativos.indexOf(palpite);
				//remove do início até a posição do palpite
				ativos.splice(0,index+1);								
			}
			else if(palpite > segredo){
				chance--;
				if (chance == 0)
					mostrarGameover();
				else 
					mostrarDica("<");
				var index = ativos.indexOf(palpite);
				//remove da posição do palpite até o final
				ativos.splice(index);					
			}	
			else if(palpite == segredo){	
					arrayBotões[palpite-1].classList.add("segredo");
					if (tela%10 == 0){
						if (tela == 50)
							stringTela.innerHTML = "Parabéns! Você finalizou todas as telas.\nClique "  + palpite + " para tela menu";
						else
							stringTela.innerHTML = "Telas "+ (tela+1) + " a " + (tela+10) + " liberadas! \nClique " + palpite + " para continuar";				
					}
					else
						stringTela.innerHTML = "Clique " + palpite + " para Tela " + (tela+1);
					novaCor = 1;						
			}	
		}

		function mostrarGameover(){
			stringTela.innerHTML = "Acabaram seus palpites! \nClique " + segredo + " para tela menu";
			stringPalpites.innerHTML = "Palpites: "  + chance;
			novaCor = 1;
		}
		function mostrarDica(dica){
			stringTela.innerHTML = "Tela "+ tela + " | O número é "+ dica;
			stringPalpites.innerHTML = "Palpites: "  + chance;
		}
		

		
			

		
		