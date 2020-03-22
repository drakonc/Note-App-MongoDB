//Mensaje de Bienvenida
function Bienvenido(icon, mensaje) {
	Swal.fire({
		position: 'top-end',
		icon: icon,
		title: mensaje,
		showConfirmButton: false,
		timer: 2000
	});
}

function SweetalertBootstrap() {
	Swal.fire({
		title: 'Hola!',
		text: 'Bienvenido a la Aplicacións',
		icon: 'success',
		confirmButtonText: 'Ok'
	});
}

$(document).ready(function() {
	// show the alert
	setTimeout(function() {
		$('.alert').alert('close');
	}, 4000);
});
