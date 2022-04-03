let basicCode = `/*
    Simple Hello World program
    Uses the io library
*/

#include io

start:
    lda #message
    pha
    jsr print
    jmp (end)

message:
    .db "Hello, world!\n", 0x00

end:
    jmp (end)
`

function onWindowLoaded() {
    document.getElementById('text-area').innerHTML = basicCode;
}

window.addEventListener('load', onWindowLoaded)
