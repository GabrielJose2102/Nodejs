$('#post-comment').hide(); //ocultando formulario de comentarios


$('#btn-toggle-comment').click(e => { //evento de click en el boton para sacar y esconder formulario de comentarios
    e.preventDefault();
    $('#post-comment').slideToggle();
})

$('#btn-like').click(function (e) { //evento de boton de likes
    e.preventDefault(); //para que no se active la función por defecto que tiene el evento
    let imgId = $(this).data('id'); //obteniendo id del nodo
    
    $.post('/images/' + imgId + '/like') //petición post a la ruta de don de se ejecuta la función de likes
        .done(data => { //Callback agraga funciones que e ejecutan cuando se ejecuta el objeto de la petición
            $('.likes-count').text(data.likes); //obtiene numero de likes y agraga a el nodo que se muestra
        });
});


$('#btn-delete').click(function(e) { //evento de eliminar imagen
   e.preventDefault();
   let $this = $(this); //obteniendo el objeto this
   const response = confirm('Are you sure you want to delete this image?'); //alerta de confirmación para eliminar la imagen

   if (response) { //comprobación de la eliminción
       let imgId = $(this).data('id'); //obteniendo id de la imagen desde el objeto this
       $.ajax({ //petición ajax
           url: '/images/' + imgId, //ruta
           type: 'DELETE' //tipo de petición
       })
       .done(function (result) { //función para cuando se ejecute la eliminción
           $this.removeClass('btn-danger').addClass('btn-success'); //cambiando clase del boton 
           $this.find('i').removeClass('fa-times').addClass('fa-check'); //cambiando el icono
           $this.append('<span>Delete!</span>'); //Mensaje de eliminado
       })
   }
});