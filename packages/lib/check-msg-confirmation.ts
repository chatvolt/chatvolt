const isConfirmationMessage = (message: string): boolean => {
  const normalizedMessage = message
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z]/gi, '')
      .toLowerCase();

  const confirmations = [
    "yes", "oui", "si", "ja", "sim", "da", "tak", "ano", "igen", "po", "ita",
    "no", "non", "nein", "nao", "nee", "nej", "nei", "nu", "nie", "ne", "nem", "jo",
  ];

  return confirmations.includes(normalizedMessage);
};

export default isConfirmationMessage;
