
import { Article, LegalResource } from './types';

export const EMERGENCY_SPEECH_TEXT = "Oficial, ejerzo mi derecho a no responder ninguna pregunta sin un abogado presente. No consiento ninguna inspección. Usted está legalmente obligado a identificarse. La prevención del delito no justifica esta detención.";

export const LEGAL_ARTICLES: Article[] = [
  {
    title: "Libertad de Tránsito",
    article: "Artículo 11 Constitucional",
    legalText: "Toda persona tiene derecho para entrar en la República, salir de ella, viajar por su territorio y mudar de residencia, sin necesidad de carta de seguridad, pasaporte, salvoconducto u otros requisitos semejantes.",
    explanation: "Puedes moverte libremente por todo el país. Nadie puede detenerte y pedirte papeles solo por caminar o conducir, a menos que hayas cometido una infracción o delito evidente.",
    category: 'Derechos Fundamentales',
  },
  {
    title: "Protección Contra Actos de Molestia",
    article: "Artículo 16 Constitucional",
    legalText: "Nadie puede ser molestado en su persona, familia, domicilio, papeles o posesiones, sino en virtud de mandamiento escrito de la autoridad competente, que funde y motive la causa legal del procedimiento.",
    explanation: "Un policía no puede detenerte, revisarte o entrar a tu casa sin una orden judicial o si no te sorprendió cometiendo un delito en ese preciso momento (flagrancia). Una 'sospecha' no es suficiente.",
    category: 'Detenciones',
  },
  {
    title: "Presunción de Inocencia",
    article: "Artículo 20 Constitucional, Apartado B, Fracción I",
    legalText: "A que se presuma su inocencia mientras no se declare su responsabilidad mediante sentencia emitida por el juez de la causa.",
    explanation: "Eres inocente hasta que un juez diga lo contrario. No tienes que demostrar tu inocencia, la autoridad debe demostrar tu culpabilidad.",
    category: 'Derechos Fundamentales',
  },
  {
    title: "Derecho a Guardar Silencio",
    article: "Artículo 20 Constitucional, Apartado B, Fracción II",
    legalText: "A declarar o a guardar silencio. Desde el momento de su detención se le harán saber los motivos de la misma y su derecho a guardar silencio, el cual no podrá ser utilizado en su perjuicio.",
    explanation: "No estás obligado a responder ninguna pregunta de la policía. Tienes derecho a permanecer en silencio y esto no puede usarse en tu contra.",
    category: 'Derechos Fundamentales',
  },
  {
    title: "Autoridad Competente para Detener",
    article: "Artículos 16 y 21 Constitucionales",
    legalText: "La investigación de los delitos corresponde al Ministerio Público y a las policías... Cualquier persona puede detener al indiciado en el momento en que esté cometiendo un delito o inmediatamente después de haberlo cometido...",
    explanation: "Solo la policía investigadora o cualquier policía en caso de flagrancia (delito en el acto) puede detenerte. La policía de tránsito solo por infracciones de tránsito, y la Guardia Nacional o el Ejército no tienen facultades para realizar detenciones ciudadanas de rutina.",
    category: 'Detenciones',
  },
  {
    title: "Obligación de Identificarse",
    article: "Artículo 132 CNPP, Fracción V",
    legalText: "El Policía actuará bajo el mando y conducción del Ministerio Público... y tendrá las siguientes obligaciones: ...V. Informar a la persona al momento de su detención sobre los derechos que en su favor establece la Constitución.",
    explanation: "El oficial que te detiene está obligado por ley a decirte quién es, por qué te detiene y cuáles son tus derechos, como el derecho a guardar silencio y a un abogado.",
    category: 'Obligaciones del Servidor Público',
  },
];

export const QUICK_LEGAL_FACTS = [
    {
        title: "🚔 Policía encapuchado = Ilegal",
        content: "Según el Art. 40 y 41 de la Ley General del Sistema Nacional de Seguridad Pública, los agentes deben portar su identificación visible. Un policía encapuchado o con el rostro cubierto no está autorizado legalmente para ejercer funciones públicas de esta manera.",
    },
    {
        title: "🛑 Retenes 'preventivos'",
        content: "Los retenes sin un motivo claro y sin orden judicial son inconstitucionales. La Suprema Corte ha determinado que las revisiones 'preventivas' basadas en sospechas son una violación al artículo 16.",
    },
    {
        title: "📱 ¿Pueden revisar mi celular?",
        content: "No. Revisar tu celular es una invasión a tu privacidad. Solo pueden hacerlo con una orden judicial específica. No estás obligado a desbloquearlo.",
    }
];

export const SIMULATOR_SCENARIOS = [
    "Oficial: Buenas tardes, ¿a dónde se dirige?",
    "Oficial: Joven, permítame una revisión de rutina.",
    "Oficial: ¿De dónde viene a estas horas?",
    "Oficial: Muéstreme lo que trae en la mochila.",
    "Oficial: Si no coopera, será peor para usted.",
];

export const LEGAL_LIBRARY_RESOURCES: LegalResource[] = [
    {
        title: "Jurisprudencia: Amparo en Revisión 538/2015",
        content: "La Primera Sala de la Suprema Corte de Justicia de la Nación determinó que los programas de seguridad pública que facultan a la policía a realizar revisiones a personas y vehículos sin una sospecha razonable objetiva o una orden judicial son inconstitucionales por violar el derecho a la no molestia.",
        type: "Jurisprudencia",
    },
    {
        title: "Caso: Detención arbitraria y siembra de pruebas",
        content: "En múltiples casos documentados por organizaciones de derechos humanos, se ha evidenciado un patrón de detenciones sin flagrancia donde posteriormente se 'encuentran' sustancias o objetos ilícitos. Es crucial no consentir inspecciones para evitar este riesgo.",
        type: "Caso Documentado",
    },
    {
        title: "Denuncia ante la CNDH",
        content: "Si consideras que tus derechos humanos fueron violados por una autoridad federal, puedes presentar una queja ante la Comisión Nacional de los Derechos Humanos (CNDH). Puedes hacerlo en línea, por teléfono o en sus oficinas. Reúne todos los datos posibles: nombre del oficial, patrulla, lugar, hora y testigos.",
        type: "Procedimiento de Denuncia",
    },
     {
        title: "Denuncia ante Asuntos Internos",
        content: "Cada corporación policial (municipal, estatal, federal) tiene una unidad de 'Asuntos Internos' o 'Control y Confianza'. Es el primer lugar para denunciar el abuso de un oficial específico. Solicita el número de queja para darle seguimiento.",
        type: "Procedimiento de Denuncia",
    }
]
