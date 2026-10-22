/*
 * Ria USA - ES/EN language switcher.
 * Spanish is the source language in the HTML. English strings live in the
 * dictionary below, keyed by the exact (whitespace-normalized) Spanish text.
 * To translate a new string, add it to EN. Strings without an entry stay in Spanish.
 */
(function () {
    'use strict';

    var EN = {
        // Navigation / header
        'Inicio': 'Home',
        'Mi meta': 'My goal',
        'Mis puntos': 'My points',
        'Mi perfil': 'My profile',
        'Cerrar sesión': 'Log out',
        'Catálogo': 'Catalog',
        'Contáctanos': 'Contact us',
        'Información': 'Information',
        'Términos y condiciones': 'Terms and conditions',
        'términos y condiciones': 'terms and conditions',
        'términos y condiciones.': 'terms and conditions.',
        'TÉRMINOS Y CONDICIONES': 'TERMS AND CONDITIONS',
        'TÉRMINOS Y CONDICIONES DEL PROGRAMA PUNTOS RIA': 'RIA POINTS PROGRAM TERMS AND CONDITIONS',
        'Preguntas frecuentes': 'Frequently asked questions',
        'Bienvenido(a) Eduardo Naranjo': 'Welcome Eduardo Naranjo',
        'Bienvenido @Nombre': 'Welcome @Name',
        'Bienvenido Sr. Naranjo': 'Welcome Mr. Naranjo',
        'Volver Inicio': 'Back to Home',
        'Volver al catálogo': 'Back to catalog',
        'Volver a mi carrito': 'Back to my cart',
        'volver': 'back',
        'Regresar': 'Back',
        'Tienes': 'You have',
        'TIENES': 'YOU HAVE',
        'puntos': 'points',
        'Puntos': 'Points',
        'Ria Money Transfer 2026 | Todos los derechos reservados | Powered by': 'Ria Money Transfer 2026 | All rights reserved | Powered by',

        // Catalog
        'Gift Cards USA': 'USA Gift Cards',
        'GIFT CARDS': 'GIFT CARDS',
        'COMPRAS': 'SHOPPING',
        'Con mis Puntos Disponibles': 'With my available points',
        'Buscar aquí': 'Search here',
        'Ordenar de A - Z': 'Sort A - Z',
        'Ordenar de Z - A': 'Sort Z - A',
        'Ordenar de menor a mayor valor': 'Sort by value: low to high',
        'Ordenar de mayor a menor valor': 'Sort by value: high to low',
        'Agregar al carrito': 'Add to cart',
        'Se agregó con éxito al carrito de compras': 'Successfully added to the shopping cart',
        'Ver mi carrito': 'View my cart',
        'Ver mi carrito de compras': 'View my shopping cart',
        'Canjear ahora': 'Redeem now',
        'Seguir canjeando': 'Keep redeeming',
        'Mostrando 8 resultados para': 'Showing 8 results for',
        'Oferta': 'Sale',
        'Nuevo': 'New',
        'Etiqueta libre': 'Custom label',
        'Podria interesarte': 'You might like',
        'Detalle de producto': 'Product details',
        'Especificaciones': 'Specifications',
        'Valor de la Gift Card': 'Gift Card value',
        'Entrega digital por correo electrónico': 'Digital delivery by email',
        'Evento': 'Event',
        'Cantidad de puntos': 'Points amount',
        'PUNTOS ADICIONALES OCTUBRE': 'ADDITIONAL POINTS OCTOBER',
        'PUNTOS NOVIEMBRE': 'NOVEMBER POINTS',
        'PUNTOS DICIEMBRE': 'DECEMBER POINTS',
        'PUNTOS ENERO': 'JANUARY POINTS',
        'CANJE DE PUNTOS': 'POINTS REDEMPTION',
        '¿Cuál es la mecánica de puntos en el programa?': 'How do points work in the program?',
        '¿Cuál es el periodo de acumulación de puntos?': 'What is the points accumulation period?',
        'El participante podrá acumular puntos de manera indefinida mientras dure el programa.': 'Participants can accumulate points indefinitely for as long as the program lasts.',
        'Tendrás un año para realizar tus canjes desde el primer mes que se te cargaron los puntos.': 'You have one year to redeem, starting from the first month your points were credited.',
        '¿Cómo puedo consultar cuántos puntos acumulados y canjeados tengo?': 'How can I check my accumulated and redeemed points?',
        'Puedes hacerlo ingresando a la web www.puntosria.com': 'You can do it by logging in at www.puntosria.com',
        'PASO 1: Ingresando a la web www.puntosria.com con tu usuario (documento de identidad) y contraseña (123456).': 'STEP 1: Log in at www.puntosria.com with your user and password.',
        'PASO 2: Haz clic en la pestaña MIS PUNTOS y listo! Ahí podrás visualizar tu estado de cuenta (EECC) donde mensualmente se cargarán los puntos acumulados según el cumplimiento de la mecánica de acumulación': 'STEP 2: Click the MY POINTS tab and that is it! There you can see your account statement, where accumulated points are credited monthly according to the accumulation rules.',
        'Sí, desde el primer momento en que acumulas puntos puedes canjearlos por los premios de tu preferencia siempre y cuando tengas los puntos suficientes para el canje.': 'Yes, from the moment you accumulate points you can redeem them for the rewards you prefer, as long as you have enough points.',
        'PASO 1: Ingresa al catálogo de premios de la web de PUNTOS RIA': 'STEP 1: Go to the rewards catalog on the RIA POINTS website',
        'PASO 2: Elije el producto de tu preferencia, y agrégalo a tu carrito de compra.': 'STEP 2: Choose the Gift Card you prefer and add it to your shopping cart.',
        'PASO 3: Da clic en “CANJEAR” y listo!': 'STEP 3: Click "REDEEM" and you are done!',
        'Puedes hacerlo al correo de consultas@promotick.com, indica que vienes parte del programa PUNTOS RIA, tu documento de identidad y la duda que quieras absolver.': 'You can email consultas@promotick.com; mention you are part of the RIA POINTS program, include your ID and your question.',
        'Antes de finalizar el canje nos interesa saber tu opinión:': 'Before completing your redemption, we would like to hear your opinion:',
        'Enojado': 'Angry', 'Triste': 'Sad', 'Normal': 'Neutral', 'Feliz': 'Happy', 'Muy feliz': 'Very happy',
        'Confirmación': 'Confirmation',
        'Has aceptado los términos y condiciones del programa. Cualquier consulta o cambio de datos escríbenos a': 'You have accepted the program terms and conditions. For any question or data change, write to us at',
        'Alguna pregunta o sugerencia? Pónte en contacto con nosotros': 'Any question or suggestion? Get in touch with us',
        'Nº de cédula': 'ID number',
        'Nombre completo': 'Full name',
        'Nº de documento': 'ID number',
        'Ciudad': 'City',
        'Estado': 'State',
        'ELIMINAR CORREO': 'DELETE EMAIL',
        'Encuesta sobre el Nº de pedido 12345': 'Survey about Order No. 12345',
        'Tu opinión es muy importante y nos ayudará a mejorar': 'Your opinion is very important and will help us improve',
        '1. ¿Recibiste tu Gift Card a tiempo en tu correo? Califica su tiempo de entrega.': '1. Did you receive your Gift Card by email on time? Rate the delivery time.',
        'Te encuentras registrado. Ingresa con el usuario y contraseña enviados al correo electrónico que registraste.': 'You are registered. Log in with the user and password sent to the email you registered.',
        'Hola, ¿En que podemos ayudarte?, te responderemos lo más pronto posible. Nuestros horarios de atención son de lunes a viernes de 9h00 a 18h00.': 'Hello, how can we help you? We will answer as soon as possible. Our business hours are Monday to Friday, 9:00am to 6:00pm.',
        'Acepto los': 'I accept the',
        'He leído y acepto los': 'I have read and accept the',
        'Acepto recibir información sobre el programa por cualquier medio de comunicación': 'I agree to receive information about the program through any means of communication',
        'Acepto recibir información sobre el programa por cualquier medio de comunicación.': 'I agree to receive information about the program through any means of communication.',
        'Actualización de datos': 'Data update',
        'País de residencia': 'Country of residence',
        'Datos de la empresa': 'Company data',
        'Datos del representante legal': 'Legal representative data',
        'Tipo de documento': 'Document type',
        'Número de documento': 'Document number',
        'Los puntos acumulados figurarán solamente a nombre del participante y sólo este tendrá derecho sobre ellos.': 'Accumulated points will be recorded only in the name of the participant, who alone is entitled to them.',
        'Se le otorgará una mecánica de acumulación de puntos, el cual será comunicado previamente.': 'A points accumulation mechanic will be granted and communicated in advance.',
        'En ningún caso los puntos acumulados podrán ser transferidos y/o endosados a otra persona natural y/o jurídica.': 'Under no circumstances may accumulated points be transferred and/or endorsed to another natural or legal person.',
        'Los participantes recibirán puntos de forma mensual en función a las horas de conexión, la cual será comunicada previamente.': 'Participants will receive points monthly based on connection hours, which will be communicated in advance.',
        'Los participantes podrán ingresar a la plataforma de PUNTOS RIA www.puntosria.com para verificar la cantidad de puntos que tienen, así como sus posibilidades de canje.': 'Participants can log in to the RIA POINTS platform www.puntosria.com to check their points and redemption options.',
        'El plazo de canje de premios será de un año desde el primer mes que se te cargó puntos, siempre y cuando tenga los puntos necesarios para canjear el producto que desee.': 'The redemption period is one year from the first month points were credited, as long as you have the points needed for the item you want.',
        'Para realizar los canjes de premios, los participantes a través de la página web.': 'To redeem rewards, participants must use the website.',
        'En caso desee alguna consulta y/o duda del programa podrá escribirnos al correo consultas@promotick.com': 'For any question about the program, write to us at consultas@promotick.com',
        'Una vez registrado el canje en el portal, NO se aceptarán cambios de producto o servicio elegido. Todo canje que figure registrado en el portal se considera válido, por lo que se recomienda revisar su gestión antes de canjearlo.': 'Once a redemption is registered in the portal, NO changes to the chosen item or service will be accepted. Any redemption registered in the portal is considered valid, so please review it before redeeming.',
        'Eventualmente, los productos, modelos y puntajes de los premios pueden sufrir variaciones. Además, el catálogo de productos podrá renovarse o modificarse a solicitud de Mego Networks.': 'Occasionally, rewards, models and point values may vary. The catalog may also be renewed or modified at the request of Mego Networks.',
        'RIA se reserva el derecho de cancelar la participación en el programa a cualquier participante o titular que infrinja las reglas establecidas en el presente reglamento y/o cualquier otra regla que a criterio de RIA descalifique al participante y/o titular.': 'RIA reserves the right to cancel the participation of any participant or holder who breaches the rules set out in these regulations and/or any other rule that, in RIA\'s judgment, disqualifies the participant and/or holder.',
        'Tu carrito está vacío': 'Your cart is empty',
        'Ordenar:': 'Sort:',
        'Nombre A - Z': 'Name A - Z',
        'Nombre Z - A': 'Name Z - A',
        'Menor valor': 'Lowest value',
        'Mayor valor': 'Highest value',
        'Menos': 'Less',
        'Más': 'More',
        'Cantidad': 'Quantity',
        'Filtros': 'Filters',
        'Cerrar filtros': 'Close filters',
        'Buscar marca': 'Search brand',
        'Ej. Amazon': 'E.g. Amazon',
        'Categorías': 'Categories',
        'Mínimo': 'Min',
        'Máximo': 'Max',
        'El máximo debe ser igual o mayor que el mínimo.': 'The maximum must be equal to or greater than the minimum.',
        'Con mis puntos disponibles': 'With my available points',
        'Limpiar filtros': 'Clear filters',
        'Ver': 'View',
        'resultados': 'results',
        'Ver más': 'Show more',
        'Ordenar': 'Sort',
        'Catálogo': 'Catalog',
        'No encontramos Gift Cards con estos filtros': 'No Gift Cards match these filters',
        'Otros valores': 'Other values',
        'Belleza': 'Beauty',
        'Caridad': 'Charity',
        'Entretenimiento': 'Entertainment',
        'Familia': 'Family',
        'Moda': 'Fashion',
        'Comida': 'Food',
        'Videojuegos': 'Gaming',
        'Regalos': 'Gifts',
        'Hogar': 'Home',
        'Prepago': 'Prepaid',
        'Tiendas': 'Retail',
        'Deportes': 'Sports',
        'Viajes': 'Travel',
        'Recibirás tus Gift Cards digitales en el correo que elijas en un plazo de 3 a 5 días hábiles.': 'You will receive your digital Gift Cards at your chosen email address within 3 to 5 business days.',
        'Recibirás tus Gift Cards digitales en el correo indicado en un plazo de 3 a 5 días hábiles.': 'You will receive your digital Gift Cards at the email address provided within 3 to 5 business days.',
        'Las Gift Cards digitales se envían por correo electrónico en un plazo de 3 a 5 días hábiles después de realizar el canje. Revisa tu carpeta de spam si no la encuentras.': 'Digital Gift Cards are sent by email within 3 to 5 business days after redeeming. Check your spam folder if you cannot find it.',
        'Las Gift Cards son digitales y se envían al correo electrónico que indiques en un plazo de 3 a 5 días hábiles después de realizar tu canje. Si no la encuentras, revisa tu carpeta de spam.': 'Gift Cards are digital and are sent to the email you provide within 3 to 5 business days after you redeem. If you cannot find it, check your spam folder.',
        'Las Gift Cards se envían por correo electrónico en un plazo de 3 a 5 días hábiles después de realizado el canje.': 'Gift Cards are sent by email within 3 to 5 business days after the redemption.',
        'Los códigos de Gift Card no tienen valor en efectivo y no son reembolsables. El titular es responsable del uso y custodia de su código. RIA Club no se responsabiliza por códigos perdidos, robados o mal utilizados una vez entregados. Algunas Gift Cards pueden tener fecha de vencimiento - consulta los términos de cada marca. Los productos y servicios canjeables están sujetos a los términos y condiciones del emisor.':
            'Gift card codes have no cash value and are non-refundable. The cardholder is responsible for the safekeeping and proper use of their gift card code. RIA Club is not responsible for lost, stolen, or misused codes once delivered. Some gift cards may have an expiration date - please check the terms of each brand, as expiration policies vary by retailer. The products and services redeemable with each gift card are subject to the terms and conditions of the issuing retailer.',
        'Saltar al contenido': 'Skip to content',
        'Idioma': 'Language',
        'Tus puntos': 'Your points',
        'Mi carrito': 'My cart',
        'Buscar': 'Search',
        'Mi cuenta': 'My account',
        'Quitar': 'Remove',
        'Menú': 'Menu',
        'Menú principal': 'Main menu',
        'Principal': 'Main',
        'Español': 'Spanish',
        'English': 'English',
        'Tu carrito está vacío.': 'Your cart is empty.',
        'Finaliza tu canje': 'Complete your redemption',
        'Estás a solo 2 pasos de terminar tu canje': 'You are only 2 steps away from completing your redemption',
        'Debes mantener al menos un correo de envío.': 'You must keep at least one delivery email.',
        '1. Califica la variedad de productos que se encuentra dentro de la plataforma.': '1. Rate the variety of Gift Cards available on the platform.',
        '2. ¿Consideras que es amigable el proceso de canjes en la plataforma?': '2. Do you find the redemption process on the platform easy to use?',
        '3. Déjanos tus comentarios': '3. Leave us your comments',
        'Ver catálogo': 'View catalog',
        'No encontramos Gift Cards para tu búsqueda': 'We could not find Gift Cards for your search',
        'Ver todo el catálogo': 'View full catalog',
        'Mostrando': 'Showing',
        'resultados para': 'results for',
        'Elige el valor de tu Gift Card': 'Choose your Gift Card value',
        'Editar correo de envío': 'Edit delivery email',
        'Editar correo de envío:': 'Edit delivery email:',
        'Ingresa el nombre del destinatario.': 'Enter the recipient name.',
        'Ingresa un correo electrónico válido.': 'Enter a valid email address.',
        'Ingresa tu nombre y apellido.': 'Enter your first and last name.',
        'La nueva contraseña debe tener al menos 6 caracteres.': 'The new password must be at least 6 characters.',
        'Las contraseñas no coinciden.': 'Passwords do not match.',
        'Correo guardado': 'Email saved',
        'Correo eliminado': 'Email deleted',
        'Cambios guardados': 'Changes saved',
        'Elige el correo de envío.': 'Choose the delivery email.',
        'Tus puntos no alcanzan. Desmarca "Usar mis puntos" para pagar en USD.': 'Your points are not enough. Uncheck "Use my points" to pay in USD.',
        'Gift Cards de tu canje': 'Gift Cards in your redemption',
        'Estado de cuenta descargado': 'Account statement downloaded',
        'Sin movimientos en este periodo': 'No activity in this period',
        'Sin canjes en este periodo': 'No redemptions in this period',
        'Escribe tu mensaje.': 'Write your message.',
        'Mensaje enviado. Te responderemos pronto.': 'Message sent. We will reply soon.',
        'o': 'or',
        'Tu Gift Card llegará a tu correo en': 'Your Gift Card will arrive in your email in',
        'Valor (USD)': 'Value (USD)',
        'Gift Card digital': 'Digital Gift Card',
        'Desde': 'From',
        'Desde 2,500 Puntos': 'From 2,500 Points',
        '$25 - 2,500 Puntos': '$25 - 2,500 Points',
        '$50 - 5,000 Puntos': '$50 - 5,000 Points',
        '$100 - 10,000 Puntos': '$100 - 10,000 Points',
        'Hasta': 'To',
        'Cantidad': 'Quantity',
        'cantidad': 'quantity',
        'Seleccionar': 'Select',
        'Gift Card digital de Amazon válida en Estados Unidos. Recibirás el código en el correo electrónico que indiques al momento del canje. No tiene fecha de vencimiento y no es reembolsable.':
            'Amazon digital Gift Card valid in the United States. You will receive the code at the email you provide when redeeming. It does not expire and is non-refundable.',
        'Lea detenidamente los términos y condiciones del Programa, que están en la página web.':
            'Please read the Program terms and conditions carefully; they are available on the website.',
        'En caso de tener alguna duda contáctenos al correo consultas@promotick.com':
            'If you have any questions, contact us at consultas@promotick.com',
        'El articulo fue agregado a tus favoritos': 'The item was added to your favorites',
        'Ver favoritos': 'View favorites',
        'Agregado': 'Added',

        // Cart / checkout
        '(2 productos)': '(2 items)',
        'Sub-total (2 productos):': 'Subtotal (2 items):',
        'Total (2 productos):': 'Total (2 items):',
        'Subtotal': 'Subtotal',
        'Total': 'Total',
        'Total:': 'Total:',
        'Producto': 'Product',
        'Mis premios (2 productos)': 'My rewards (2 items)',
        'Esta a solo 2 pasos de terminar su canje': 'You are only 2 steps away from completing your redemption',
        '¿A qué correo enviaremos tus Gift Cards?': 'Which email should we send your Gift Cards to?',
        'Mi correo': 'My email',
        'Regalo para María': 'Gift for María',
        '+ Agregar otro correo': '+ Add another email',
        'Agregar correo de envío': 'Add delivery email',
        'Nombre del destinatario': 'Recipient name',
        'Correo electrónico': 'Email',
        'Guardar correo': 'Save email',
        'Información personal': 'Personal information',
        'Resumen de tu canje (2 productos)': 'Your redemption summary (2 items)',
        'Editar': 'Edit',
        'Editar |': 'Edit |',
        'Eliminar': 'Delete',
        'Enviar y confirmar canje': 'Submit and confirm redemption',
        'Continuar canje': 'Continue redemption',
        'Usar mis puntos': 'Use my points',
        'Cancelar': 'Cancel',
        'Aceptar': 'Accept',
        'Confirmar': 'Confirm',
        '¡Canje exitoso!': 'Redemption successful!',
        'La confirmación de tu canje fue enviada a': 'Your redemption confirmation was sent to',
        'Fecha': 'Date',
        'Fecha:': 'Date:',
        'Nº pedido': 'Order No.',
        'Nº pedido:': 'Order No.:',
        'Correo de envío': 'Delivery email',
        'Correo de envío:': 'Delivery email:',
        'Detalle de canje:': 'Redemption details:',
        'Detalle canje': 'Redemption details',
        'Detalle': 'Details',
        'Para revisar el detalle de tu canje puedes visitar la sección': 'To review your redemption details, visit the section',
        '"Puntos canjeados" en el módulo "Mis puntos"': '"Redeemed points" in the "My points" module',
        'El tiempo de envio de tu canje es de': 'The delivery time of your redemption is',

        // Goal (monthly, by transactions)
        'Eduardo, ¡Sigue acumulando!': 'Eduardo, keep going!',
        'Octubre': 'October',
        '➤ Transacciones realizadas este mes:': '➤ Transactions completed this month:',
        '➤ Sólo te faltan:': '➤ You only need:',
        'transacciones': 'transactions',
        'Tu meta del mes:': 'Your goal this month:',

        // Points
        'Puntos acumulados': 'Accumulated points',
        'Puntos canjeados': 'Redeemed points',
        'Puntos canjeados: 1000': 'Redeemed points: 1000',
        'Puntos disponibles: 260 000': 'Available points: 260 000',
        'Descargar estado de cuenta': 'Download account statement',
        'Acumulación de puntos': 'Points accumulation',
        'Por cada US$ 10 transferidos recibe 1 punto': 'For every US$ 10 transferred, earn 1 point',

        // Profile
        'Datos personales': 'Personal data',
        'Correos de envío': 'Delivery emails',
        'Mis datos:': 'My data:',
        'Mi contraseña:': 'My password:',
        'Código de cliente': 'Customer code',
        'Nombre de la empresa': 'Company name',
        'Nombre': 'First name',
        'Nombres': 'First names',
        'Apellidos': 'Last names',
        'Apellido paterno': 'Last name',
        'Apellido materno': 'Second last name',
        'Teléfono': 'Phone',
        'Teléfono fijo': 'Landline',
        'Celular': 'Mobile',
        'Cumpleaños': 'Birthday',
        'Asesor': 'Advisor',
        'Contraseña': 'Password',
        'Contraseña actual': 'Current password',
        'Nueva contraseña': 'New password',
        'Confirmar nueva contraseña': 'Confirm new password',
        'Guardar cambios': 'Save changes',
        'Nuevo correo': 'New email',
        'Nuevo correo de envío:': 'New delivery email:',
        '¿Estás seguro de eliminar este correo?': 'Are you sure you want to delete this email?',

        // Login / register
        'Inicia sesión': 'Log in',
        'Ingresar': 'Log in',
        'Usuario': 'User',
        'Olvidé mi contraseña': 'I forgot my password',
        'REGÍSTRATE AQUÍ': 'SIGN UP HERE',
        'Registrarme': 'Sign up',
        'Formulario de registro': 'Registration form',
        'Confirmación de registro': 'Registration confirmation',
        'Restablecer contraseña': 'Reset password',
        'Por favor ingresa tu correo electrónico para recuperar tu contraseña:': 'Please enter your email to recover your password:',
        'Se ha realizado el envío de un correo a su cuenta para proceder con el cambio de contraseña.': 'An email has been sent to your account to proceed with the password change.',
        'Enviar': 'Send',
        'Saltar': 'Skip',

        // Contact / FAQ
        'Consulta': 'Inquiry',
        'Introduce tu mensaje...': 'Enter your message...',
        '(Máximo 150 caracteres)': '(Maximum 150 characters)',
        'Enviar respuestas': 'Send answers',
        'Encuesta': 'Survey',
        '¿Cuánto tarda en llegar mi Gift Card?': 'How long does my Gift Card take to arrive?',
        '¿Cómo canjeo los Premios?': 'How do I redeem rewards?',
        '¿Mis puntos caducan? ¿Hasta cuándo tengo plazo para realizar mis canjes?': 'Do my points expire? How long do I have to redeem?',
        '¿Puedo canjear mis puntos en cualquier momento?': 'Can I redeem my points at any time?',
        '¿Si necesito mayor información a dónde puedo comunicarme?': 'Where can I get more information?',

        // Terms (digital delivery)
        'Todos los premios son Gift Cards digitales. Una vez enviado el código al correo electrónico indicado, no se aceptan cambios ni devoluciones.':
            'All rewards are digital Gift Cards. Once the code has been sent to the indicated email, no changes or returns are accepted.',
        'El participante es responsable de ingresar correctamente el correo electrónico de envío. No nos responsabilizamos por códigos enviados a una dirección errónea.':
            'The participant is responsible for entering the delivery email correctly. We are not responsible for codes sent to an incorrect address.',
        'Las imágenes y colores de las Gift Cards son referenciales.': 'Gift Card images and colors are for reference only.',
        'Cada Gift Card se rige bajo las reglas y condiciones de cada establecimiento. Los términos y condiciones podrán visualizarse al momento de recibir la Gift Card. Cada establecimiento tiene sus propios términos y condiciones.':
            'Each Gift Card is governed by the rules and conditions of each merchant. The terms and conditions can be viewed when you receive the Gift Card. Each merchant has its own terms and conditions.',
        'Restricciones de premios': 'Reward restrictions',
        'Validez de los puntos y del catálogo': 'Validity of points and catalog',

        // Misc
        'Ria Money Transfer': 'Ria Money Transfer',
        'Horarios: lunes a viernes de 9:00am a 6:00pm': 'Hours: Monday to Friday, 9:00am to 6:00pm',
        'Lunes a Viernes 8am a 5pm': 'Monday to Friday, 8am to 5pm',
        'Seleccionar...': 'Select...',
        'Scroll to Top': 'Scroll to Top'
    };

    var KEY = 'ria-usa-lang';
    var lang = 'es';
    try { lang = localStorage.getItem(KEY) || 'es'; } catch (e) {}
    if (lang !== 'en') lang = 'es';

    function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

    // Sentences that embed numbers or names (written by js/proto.js).
    var PATTERNS = [
        [/^Bienvenido\(a\) (.+)$/, 'Welcome $1'],
        [/^Valor: (.+)$/, 'Value: $1'],
        [/^Ajustamos el máximo a (\$\d+) para que no sea menor que el mínimo\.$/, 'We set the maximum to $1 so it is not lower than the minimum.'],
        [/^Ajustamos el mínimo a (\$\d+) para que no sea mayor que el máximo\.$/, 'We set the minimum to $1 so it is not higher than the maximum.'],
        [/^Bienvenido (?!@)(.+)$/, 'Welcome $1'],
        [/^Desde ([\d,]+) Puntos$/, 'From $1 Points'],
        [/^Después de este canje te quedarán ([\d,]+) puntos\.$/, 'After this redemption you will have $1 points left.'],
        [/^El monto de (\$[\d,.]+) se pagará en USD\.$/, 'The amount of $1 will be paid in USD.'],
        [/^Tus puntos no alcanzan \(te faltan ([\d,]+)\)\. El monto se pagará en USD\.$/, 'Your points are not enough (you are $1 short). The amount will be paid in USD.'],
        [/^No tienes puntos suficientes para este carrito\. Te faltan ([\d,]+) puntos; puedes pagar el monto en USD al canjear\.$/, 'You do not have enough points for this cart. You are $1 points short; you can pay the amount in USD when redeeming.'],
        [/^CANJE DE PUNTOS Nº (\d+)$/, 'POINTS REDEMPTION No. $1'],
        [/^Puntos disponibles: ([\d,]+)$/, 'Available points: $1'],
        [/^Puntos canjeados: ([\d,]+)$/, 'Redeemed points: $1'],
        [/^PUNTOS TRANSFERENCIAS (.+)$/, 'POINTS FROM TRANSFERS $1']
    ];
    var MONTHS = { 'ENERO-MARZO': 'JANUARY-MARCH', 'ABRIL': 'APRIL', 'MAYO': 'MAY', 'JUNIO': 'JUNE', 'JULIO': 'JULY', 'AGOSTO': 'AUGUST' };

    // Exact dictionary match, or amounts like "2 x 500 Puntos" / "1000 puntos".
    function lookup(key) {
        if (Object.prototype.hasOwnProperty.call(EN, key)) return EN[key];
        for (var i = 0; i < PATTERNS.length; i++) {
            if (PATTERNS[i][0].test(key)) {
                return key.replace(PATTERNS[i][0], PATTERNS[i][1])
                    .replace(/\b(ENERO-MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO)\b/, function (m) { return MONTHS[m]; });
            }
        }
        // Item counts: "Total (3 productos):" reuses the entry written for "(2 productos)".
        var cnt = key.match(/\((\d+) productos?\)/);
        if (cnt) {
            var base = key.replace(cnt[0], '(2 productos)');
            if (Object.prototype.hasOwnProperty.call(EN, base)) {
                return EN[base].replace('(2 items)', '(' + cnt[1] + (cnt[1] === '1' ? ' item)' : ' items)'));
            }
        }
        if (/^(?:[A-Za-z]+:\s*)?(?:\d+\s*x\s*)?[\d.,\s$-]+\s*[Pp]untos$/.test(key)) {
            return key.replace(/Puntos\b/g, 'Points').replace(/puntos\b/g, 'points');
        }
        return null;
    }

    var origText = new WeakMap();
    function translateTextNodes(root) {
        var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (n) {
                var p = n.parentNode && n.parentNode.nodeName;
                return (p === 'SCRIPT' || p === 'STYLE' || p === 'NOSCRIPT') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }
        });
        var n;
        while ((n = w.nextNode())) {
            if (!origText.has(n)) {
                var key = norm(n.nodeValue);
                if (!key || lookup(key) === null) continue;
                origText.set(n, n.nodeValue);
            }
            var orig = origText.get(n);
            if (orig === undefined) continue;
            if (lang === 'en') {
                var lead = orig.match(/^\s*/)[0], trail = orig.match(/\s*$/)[0];
                n.nodeValue = lead + lookup(norm(orig)) + trail;
            } else {
                n.nodeValue = orig;
            }
        }
    }

    var ATTRS = ['placeholder', 'title', 'alt', 'aria-label'];
    function translateAttrs() {
        var els = document.querySelectorAll('[placeholder],[title],[alt],[aria-label]');
        Array.prototype.forEach.call(els, function (el) {
            ATTRS.forEach(function (a) {
                if (!el.hasAttribute(a)) return;
                if (a === 'aria-label' && el.classList.contains('rh__burger')) return;   // set by proto.js
                var store = 'data-es-' + a;
                if (!el.hasAttribute(store)) {
                    var k = norm(el.getAttribute(a));
                    if (!Object.prototype.hasOwnProperty.call(EN, k)) return;
                    el.setAttribute(store, el.getAttribute(a));
                }
                el.setAttribute(a, lang === 'en' ? EN[norm(el.getAttribute(store))] : el.getAttribute(store));
            });
        });
    }

    function buildSwitcher() {
        var slots = document.querySelectorAll('[data-lang-slot]');
        if (slots.length) {
            // New header: the switcher is mounted in its desktop bar slot and in the mobile drawer.
            Array.prototype.forEach.call(slots, function (slot) {
                if (!slot.closest('.rh__drawer')) {
                    // Desktop bar: a compact dropdown ("ES v") saves horizontal space.
                    slot.innerHTML =
                        '<div class="lang-dd">' +
                        '<button type="button" class="lang-dd__btn" aria-haspopup="listbox" aria-expanded="false" aria-label="Idioma">' +
                        '<span class="lang-dd__cur">ES</span><span class="lang-dd__caret" aria-hidden="true"></span></button>' +
                        '<ul class="lang-dd__menu" role="listbox" aria-label="Idioma">' +
                        '<li role="presentation"><button type="button" role="option" class="lang-opt" data-lang="es">Español</button></li>' +
                        '<li role="presentation"><button type="button" role="option" class="lang-opt" data-lang="en">English</button></li>' +
                        '</ul></div>';
                    return;
                }
                slot.innerHTML =
                    '<div class="lang-switch">' +
                    '<button type="button" class="lang-btn" data-lang="es" aria-label="Español">ES</button>' +
                    '<span class="lang-sep">|</span>' +
                    '<button type="button" class="lang-btn" data-lang="en" aria-label="English">EN</button></div>';
            });
            return;
        }
        var hosts = document.querySelectorAll('.top-header');
        if (!hosts.length) {
            // Pages without the site header (login, register, survey...): floating switcher.
            Array.prototype.forEach.call(document.querySelectorAll('.language'), function (o) { o.parentNode.removeChild(o); });
            var fl = document.createElement('div');
            fl.className = 'lang-switch lang-floating';
            fl.innerHTML =
                '<button type="button" class="lang-btn" data-lang="es">ES</button>' +
                '<span class="lang-sep">|</span>' +
                '<button type="button" class="lang-btn" data-lang="en">EN</button>';
            document.body.appendChild(fl);
            return;
        }
        Array.prototype.forEach.call(hosts, function (host) {
            var old = host.querySelector('.language');
            if (old) old.parentNode.removeChild(old);
            var box = document.createElement('div');
            box.className = 'language lang-switch';
            box.innerHTML =
                '<button type="button" class="lang-btn" data-lang="es">ES</button>' +
                '<span class="lang-sep">|</span>' +
                '<button type="button" class="lang-btn" data-lang="en">EN</button>';
            host.appendChild(box);
        });
    }

    function paintSwitcher() {
        Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (b) {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });
        Array.prototype.forEach.call(document.querySelectorAll('.lang-opt'), function (o) {
            o.setAttribute('aria-selected', o.getAttribute('data-lang') === lang ? 'true' : 'false');
        });
        Array.prototype.forEach.call(document.querySelectorAll('.lang-dd__cur'), function (c) {
            c.textContent = lang.toUpperCase();
        });
    }

    function closeLangMenus(except) {
        Array.prototype.forEach.call(document.querySelectorAll('.lang-dd.is-open'), function (d) {
            if (d === except) return;
            d.classList.remove('is-open');
            d.querySelector('.lang-dd__btn').setAttribute('aria-expanded', 'false');
        });
    }

    function apply() {
        document.documentElement.lang = lang;
        translateTextNodes(document.body);
        translateAttrs();
        paintSwitcher();
        refreshChosen();
        document.dispatchEvent(new Event('ria-lang'));
    }

    // <select> elements are wrapped by the Chosen plugin, which copies the option
    // text into its own markup once; ask it to rebuild after every language change.
    function refreshChosen() {
        if (window.jQuery) window.jQuery('select').trigger('chosen:updated');
    }

    function setLang(l) {
        lang = (l === 'en') ? 'en' : 'es';
        try { localStorage.setItem(KEY, lang); } catch (e) {}
        apply();
    }

    function init() {
        var css = document.createElement('style');
        css.textContent =
            '.lang-switch{display:inline-flex;align-items:center;gap:6px;float:right;margin-left:15px}' +
            '.lang-btn{background:none;border:0;padding:2px 4px;font-weight:600;color:#888;cursor:pointer}' +
            '.lang-btn.active{color:#222;border-bottom:2px solid #FF5700}' +
            '.lang-sep{color:#ccc}' +
            '.lang-floating{position:absolute;top:12px;right:16px;float:none;margin:0;z-index:1000;background:#fff;padding:4px 8px;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.15)}';
        document.head.appendChild(css);
        buildSwitcher();
        document.addEventListener('click', function (e) {
            var t = e.target;
            var toggle = t.closest && t.closest('.lang-dd__btn');
            if (toggle) {
                var dd = toggle.parentNode, open = !dd.classList.contains('is-open');
                closeLangMenus(dd);
                dd.classList.toggle('is-open', open);
                toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                return;
            }
            var b = t.closest && t.closest('.lang-btn, .lang-opt');
            if (b) setLang(b.getAttribute('data-lang'));
            closeLangMenus();
        });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLangMenus(); });
        apply();
        // js/proto.js renders on the same DOMContentLoaded; reveal once all of it has run.
        setTimeout(reveal, 0);
    }

    // Pages are kept hidden (html.i18n-pending, set in <head>) until translated, so there is no flash of Spanish.
    function reveal() { document.documentElement.classList.remove('i18n-pending'); }

    // Chosen may be initialised after our first pass; refresh once everything has loaded.
    window.addEventListener('load', function () { refreshChosen(); reveal(); });

    window.RiaI18n = {
        setLang: setLang,
        dictionary: EN,
        refresh: apply,
        lang: function () { return lang; },
        sourceOf: function (node) { return origText.has(node) ? origText.get(node) : node.nodeValue; }
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();