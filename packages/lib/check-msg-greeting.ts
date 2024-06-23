const isGreetingMessage = (message: string): boolean => {
  const normalizedMessage = message
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z]/gi, '')
      .toLowerCase();

  const greetings = [
    "hi", "salut", "hola", "hallo", "ciao", "oi", "hoi", "hej", "hei", "czesc", "ahoj", "szia", "bok", "zdravo", "pershendetje", "salve","hello", "bonjour", "ola", 
    "goodmorning", "bonjour", "buenosdias", "gutenmorgen", "buongiorno", "bomdia", "goedemorgen", "godmorgon", "godmorgen", "bunadimineata", "dziendobry", "dobrerano", "joreggelt", "bondia", "bosdias", "dobrojutro", "miremengjes", "godandaginn", "bonummane",
    "goodafternoon", "bonapresmidi", "buenastardes", "gutentag", "buonpomeriggio", "boatarde", "goedemiddag", "godettermiddag", "bunaziua", "dobreodpoledne", "dobrepopoludnie", "jonapot", "bonatarda", "bonavesprada", "dobraevecer", "dobardan", "doberdan", "miredita", "bonumpomeridium",
    "goodnight", "goodevening", "bonnenuit", "buenasnoches", "gutenacht", "buonanotte", "boanoite", "goedenacht", "godnatt", "godnat", "noaptebuna", "dobranoc", "dobrounoc", "dobrunoc", "joejszakat", "bonanit", "lakunoc", "lahkonoc", "natenemire", "godanott", "bonamnoctem",
    "thankyou", "merci", "gracias", "danke", "grazie", "obrigado", "dankje", "tack", "takk", "multumesc", "dziekuje", "dekuji", "dakujem", "koszonom", "gracies", "grazas", "hvala", "faleminderit", "gratiastibi",
    "seeyoulater", "aplustard", "hastaluego", "bisspater", "adopo", "atema", "totziens", "vises", "pecurand", "dozobaczenia", "uvidimese", "uvidimesa", "viszontlatasra", "finsara", "atalogo", "finsdespres", "vidimose", "sevidimo", "shihemimevone", "sjaumstsidar", "vale",
    "goodbye", "bye", "aurevoir", "adios", "aufwiedersehen", "arrivederci", "tchau", "dag", "hejda", "hadet", "farvel", "larevedere", "dowidzenia", "sbohem", "zbohom", "viszlat", "adeu", "adeus", "zbogom", "nasvidenje", "mirupafshim", "bless", "vale",
    "attendant", "employe", "empleado", "angestellter", "addetto", "atendente", "medewerker", "anstalld", "ansatt", "angajat", "pracownik", "zamestnanec", "alkalmazott", "empleat", "empregado", "zaposlenik", "zaposleni", "punonjes", "starfsmadur", "minister",
    "whoamispeakingwith", "avecquijeparle", "conquienestoyhablando", "mitwemsprecheich", "conchistoparlando", "comquemeufalo", "metwiespreekik", "vempratarjagmed", "hvemsnakkerjegmed", "hvemtalerjegmed", "cucinevorbesc", "zkimrozmawiam", "skymluvim", "skyhovorim", "kivelbeszelek", "ambquiparlo", "conquenfalo", "ambquiparle", "skimrazgovaram", "skomgovorim", "mekujtpoflas", "vidhverjaeradttala", "cumquemloquor",
    "whoisspeaking", "quiparle", "quienhabla", "werspricht", "chiparla", "quemfala", "wiespreekt", "vemtalar", "hvemsnakker", "hvemtaler", "cinevorbeste", "ktomowi", "kdomluvi", "ktohovori", "kibeszel", "quiparla", "quenfala", "tkogovori", "kogovori", "kdogovori", "kushflet", "hvertalar", "quisloquitur",
    "hellohowareyou", "bonjourcava", "holacomoestas", "hallowiegehtesdir", "ciaocomestai", "olatudobem", "hallohoegaathet", "hejhurmarduhur", "heihvordangaardet", "hejhvordanhardudet", "salutcefaci", "czescjaksiemasz", "ahojjaksemas", "ahojakosamas", "sziahogyvagy", "bokkakosi", "zdravokakosi", "zivjokakosi", "pershendetjesije", "hallohvernighaefurthu", "salvequidagis",

  ];

  return greetings.includes(normalizedMessage);
};

export default isGreetingMessage;
