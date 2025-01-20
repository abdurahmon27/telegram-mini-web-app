import { ADMIN_CHAT_ID, TELEGRAM_API_URL } from "../contants";

export const SendMessages = async (form, userData) => {
  const { name, email, message } = form;

  const { id, username, first_name, last_name, phone } = userData;

  // with icons

  const StyledForm = `
    🧑🏻‍🦱 Ism: ${name}\n
    📧 Email: ${email}\n
    📝 Xabar: ${message}\n\n
    Userni qo'shimcha ma'lumotlari: \n

    🆔 ID: ${id}\n
    👤 Username: ${username}\n
    📛 Ism: ${first_name}\n
    📛 Familiya: ${last_name}\n
    📞 Telefon: ${phone}\n

    `;

  const res = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text: StyledForm,
    }),
  });

  if (res.ok) {
    return true;
  } else {
    return false;
  }
};

export const SendMessageToCurrentUser = async (form, id) => {
  const { name, email, message } = form;

  // with icons

  const StyledForm = `
      Xabaringiz uchun rahmat! \n\n
    🧑🏻‍🦱 Ism: ${name}\n
    Sizning Xabaringiz: \n
    📧 Email: ${email}\n
    📝 Xabar: ${message}\n\n
  
      `;

  const res = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: id,
      text: StyledForm,
    }),
  });

  if (res.ok) {
    return true;
  } else {
    return false;
  }
};
