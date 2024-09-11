console.log('Flappy Bird');

const sprites = new Image();
sprites.src = 'sprites2.png';

const dano = new Audio();
dano.src = `hit.wav`;

let frames = 0;

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const plano_de_fundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 316,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            plano_de_fundo.spriteX, plano_de_fundo.spriteY,
            plano_de_fundo.largura, plano_de_fundo.altura,
            plano_de_fundo.x, plano_de_fundo.y,
            plano_de_fundo.largura, plano_de_fundo.altura
        );
        contexto.drawImage(
            sprites,
            plano_de_fundo.spriteX, plano_de_fundo.spriteY,
            plano_de_fundo.largura, plano_de_fundo.altura,
            (plano_de_fundo.x + plano_de_fundo.largura), plano_de_fundo.y,
            plano_de_fundo.largura, plano_de_fundo.altura

        );
        

    }
}


function criaChao() {

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
        const movimentoDoChao = 1;
        const repeteEm = chao.largura / 2;
        const movimentacao = chao.x - movimentoDoChao;
    // console.log('[chao.x]', chao.x);
      // console.log('[repeteEm]',repeteEm);
      // console.log('[movimentacao]', movimentacao % repeteEm);    

        chao.x = movimentacao % repeteEm;

    },
         desenha() {

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
            );    
        },
    };
    return chao;
}



    function fazColisao(flappyBird, chao) {
        const flappyBirdY = flappyBird.y + flappyBird.altura;
        const chaoY = chao.y;

        if(flappyBirdY >= chaoY) {
            return true;
        }
        return false;

    };

    function criaFlappyBird() {

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 34,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 3.5,
    pula() {
        flappyBird.velocidade = - flappyBird.pulo;
    },
    gravidade: 0.15,
    velocidade: 0,
    atualiza() {
        if(fazColisao(flappyBird, globais.chao)) {
            dano.play();
            setTimeout(() => {

            }, 500);
            mudaParaTela(Telas.INICIO);
             
        return;    
        }


        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    movimentos: [
        { spriteX: 0, spriteY: 0, }, //asa pra cima
        { spriteX: 0, spriteY: 26, }, //asa no meio
        { spriteX: 0, spriteY: 52, }, //asa pra baixo
        { spriteX: 0, spriteY: 26, }, //asa no meio
    ],
    frameAtual: 0,
    atualizaFrameAtual() {
        const intervaloDeFrames = 10;
        const passouOIntervalo = frames % intervaloDeFrames === 0;





      if(passouOIntervalo) {  
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao
      }
    },
    desenha() {
            flappyBird.atualizaFrameAtual();
           
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

        contexto.drawImage(
            sprites,
            spriteX, spriteY, //sprite X e sprite y
            flappyBird.largura, flappyBird.altura, //largura e altura da sprite
            flappyBird.x, flappyBird.y, //posicionamento da sprite no canvas
            flappyBird.largura, flappyBird.altura, //mantendo o tamanho da sprite no canvas
            
                );
            }
      }
      return flappyBird;
    }


const mensagem = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagem.spriteX, mensagem.spriteY,
            mensagem.largura, mensagem.altura,
            mensagem.x, mensagem.y,
            mensagem.largura, mensagem.altura,
        );
    }

}

const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.sX, mensagemGameOver.sY,
            mensagemGameOver.w, mensagemGameOver.h,
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.w, mensagemGameOver.h
        );
    }


}





function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,   
        desenha() {
            canos.pares.forEach(function(par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                // [Cano do Céu]

                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                // [Cano do Chão]

                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y:canos.altura + canoCeuY
                }

                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }


            })
        },
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y;
           
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
           
            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                if(cabecaDoFlappy <= par.canoCeu.y) {
                    return true;
                }

                if(peDoFlappy>= par.canoChao.y) {
                    return true;
                }
            }
            return false;
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames) {
                canos.pares.push({
                    x: canvas.width, 
                    y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function(par){
                par.x = par.x - 2;
                if(canos.temColisaoComOFlappyBird(par)) {
                    som_HIT.play();
                    mudaParaTela(Telas.GAME_OVER);
                }

                if(par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            });




        }
    }
    return canos;
}
function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);

        },

        atualiza() {
            const intervaloDeFrames = 140;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo) {
                placar.pontuacao = placar.pontuacao + 1;
            }
            
        }




    }

    return placar;
}





const globais = {}
const Telas = {
    INICIO: {
        inicializa () {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
             plano_de_fundo.desenha();
             globais.chao.desenha();
             mensagem.desenha();
             globais.flappyBird.desenha();
             globais.canos.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};

    let telaAtiva = {};
    function mudaParaTela(novaTela) {
        telaAtiva = novaTela;

        if(telaAtiva.inicializa) {
            telaAtiva.inicializa();
        }
    }

    Telas.JOGO = {
        inicializa() {
            globais.placar = criaPlacar();
        },
        desenha() {
             plano_de_fundo.desenha();
             globais.canos.desenha();
             globais.chao.desenha();
             globais.flappyBird.desenha();
             globais.placar.desenha();
        },
        click() {
            globais.flappyBird.pula();
        },
        atualiza() {
            globais.canos.atualiza();
            globais.chao.atualiza();
            globais.flappyBird.atualiza();
            globais.placar.atualiza();
        }
    };

    Telas.GAME_OVER = {
        desenha() {
            mensagemGameOver.desenha();
        },
        atualiza() {

        },
        click() {
            mudaParaTela(Telas.INICIO);
        }
    }



function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();    
    frames = frames + 1;
    requestAnimationFrame(loop);

}

window.addEventListener(`click`, function() {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
})

mudaParaTela(Telas.INICIO)
loop();


