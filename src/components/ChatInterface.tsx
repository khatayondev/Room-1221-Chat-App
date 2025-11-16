import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Mic } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  options?: string[];
}

interface ChatInterfaceProps {
  selectedLanguage: string;
  onRequestFollowUpId: () => void;
  isGuest?: boolean;
  username?: string;
  botName?: string;
}

export function ChatInterface({ selectedLanguage, onRequestFollowUpId, isGuest = true, username, botName = "Room 1221" }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const content = {
    en: {
      placeholder: "Type your question...",
      send: "Send",
      voiceSoon: "Voice Coming Soon",
      statusGuest: "Anonymous chat",
      statusLoggedIn: "Logged in as",
      initialMessage: "Hi! I'm here to help you with any questions about sexual and reproductive health. Everything we discuss is private and confidential. What would you like to know?",
      quickReplies: [
        "Tell me about contraception",
        "What are STIs?",
        "Period questions"
      ]
    },
    twi: {
      placeholder: "Kyerɛw wo nsɛm ha...",
      send: "Soma",
      voiceSoon: "Nne bɛba",
      statusGuest: "Woreka nkɔmmɔ a wonnim wo",
      statusLoggedIn: "Wokɔ mu sɛ",
      initialMessage: "Akwaaba! Mewɔ ha sɛ meboa wo wɔ nsɛm a ɛfa akwahosan ne awoɔ ho. Biribiara a yɛbɛka no yɛ kokoam. Dɛn na wopɛ sɛ wuhu?",
      quickReplies: [
        "Ka awo si ano ho",
        "Dɛn ne yadeɛ?",
        "Nsuo ba nsɛm"
      ]
    },
    ewe: {
      placeholder: "Ŋlɔ wò nyabiase ɖe afisia...",
      send: "Dɔ",
      voiceSoon: "Gbe ava",
      statusGuest: "Èle nuƒoƒo me ɣaɣlalãtɔe",
      statusLoggedIn: "Ège ɖe eme abe",
      initialMessage: "Alo! Meli afii be makpe ɖe ŋuwò le nyabiase ɖesiaɖe si ku ɖe atsu kple agbenɔnɔ lãmesɛ ŋuti. Nu sia nu si míaƒo nu tso eŋu nye ɣaɣla. Nuka nèdi be yeanya?",
      quickReplies: [
        "Gblɔ fuvɔvɔ ŋuti nam",
        "Nuka nye dɔlélewo?",
        "Ɣletovɔsa nyabiawo"
      ]
    }
  };

  const lang = content[selectedLanguage as keyof typeof content] || content.en;

  useEffect(() => {
    // Initial bot message
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        text: lang.initialMessage,
        sender: 'bot',
        timestamp: new Date(),
        options: lang.quickReplies
      }]);
    }

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Set language based on selected language
      const langCodes: { [key: string]: string } = {
        'en': 'en-US',
        'twi': 'tw-GH',
        'ewe': 'ee-GH'
      };
      recognitionRef.current.lang = langCodes[selectedLanguage] || 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [selectedLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response with typing indicator
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue, selectedLanguage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Updated placeholder Q&A by AI Agent - Context-aware SRHR bot responses
  const getBotResponse = (userInput: string, lang: string): string => {
    const input = userInput.toLowerCase();
    
    // Keyword-based contextual responses for better user experience
    const contextualResponses: { [key: string]: { [key: string]: string[] } } = {
      contraception: {
        en: [
          "Contraception refers to methods used to prevent pregnancy. These include options like condoms, birth control pills, injections, implants, intrauterine devices (IUDs), and natural methods. The right choice depends on your health, lifestyle, and whether you want short-term or long-term protection. It's best to consult a healthcare provider to find what works best for you.",
          "There are many contraception options available including pills, condoms, IUDs, implants, and injections. Each has different effectiveness rates and side effects. Would you like to know more about a specific method?",
          "Contraception helps prevent pregnancy. The most effective methods include IUDs and implants (99% effective), followed by pills and injections when used correctly. Condoms also protect against STIs.",
          "It's great that you're asking about contraception! Different methods work for different people. Factors to consider include effectiveness, side effects, cost, and whether you also want STI protection."
        ],
        twi: [
          "Akwan pii wɔ hɔ a wɔfa so si awo ano te sɛ aduro, condom, IUD, ne injection. Ɛbiara wɔ ne ho ban ne ne nsunsuansoɔ. Wopɛ sɛ wuhu nea ɛfa bi bi ho?",
          "Awo si ano boa ma wonyin. Akwan a etu mpɔn paa ne IUD ne implants (99% tu mpɔn). Aduro ne injection nso yɛ adwuma sɛ wode di dwuma yiye.",
          "Ɛyɛ papa sɛ worebisa awo si ano ho! Akwan ahodoɔ fata nnipa ahodoɔ. Dwene ho sɛ ɛyɛ adwuma anaa, nsunsuansoɔ, ne boɔ."
        ],
        ewe: [
          "Mɔ̃ geɖe li siwo dzi woato atsyɔ̃ fuvɔvɔ abe amuwo, condoms, IUDs, implants, kple atikewo ene. Ɖesiaɖe ƒe nyonyome kple eƒe mɔ̃ vovovowo le vovo. Èdi be yeagblɔ ɖeka tɔxɛa ƒe nya wu?",
          "Fuvɔvɔ kpena ɖe ame ŋu be megafɔ fu o. Mɔ̃ siwo wɔa dɔ nyuie wu la woe nye IUD kple implants (99%). Amu kple atikewo hã wɔa dɔ nyuie.",
          "Enyo be èle fuvɔvɔ ŋuti nyabiase biam! Mɔ̃ vovovowo doa ame vovovowo ŋu. Bu nu tso woƒe dɔwɔwɔ, xexeme, kple ga si wòxɔna ŋuti."
        ]
      },
      sti: {
        en: [
          "STIs, or sexually transmitted infections, are infections passed from one person to another through sexual contact. Examples include HIV, gonorrhea, chlamydia, and syphilis. Some STIs can also spread through blood or from mother to baby during birth. Using condoms, getting tested regularly, and maintaining safe sexual practices help prevent them.",
          "STIs (Sexually Transmitted Infections) include HIV, chlamydia, gonorrhea, syphilis, and HPV. Many have no symptoms, so regular testing is important. Using condoms greatly reduces STI risk.",
          "It's smart to learn about STIs. Prevention includes using condoms consistently, getting tested regularly, and limiting partners. Many STIs are treatable if caught early.",
          "STI testing is confidential and available at health clinics. Common symptoms include unusual discharge, sores, or pain, but many STIs show no symptoms. When in doubt, get tested!"
        ],
        twi: [
          "Yadeɛ bi wɔ hɔ te sɛ HIV, chlamydia, gonorrhea, ne syphilis. Pii nni nsɛnkyerɛnne, enti ɛho hia sɛ wokɔyɛ nhwehwɛmu daa. Condom si yadeɛ ano.",
          "Ɛyɛ nyansa sɛ wubesua yadeɛ ho nsɛm. Fa condom di dwuma bere nyinaa, kɔyɛ nhwehwɛmu, na tew wo ho. Yadeɛ pii wɔ ano aduro.",
          "Yadeɛ nhwehwɛmu yɛ kokoam na wotumi kɔyɛ wɔ ayaresabea. Nsɛnkyerɛnne bi ne nsuo, akuro, anaa ɛyaw. Sɛ wunnim a, kɔyɛ nhwehwɛmu!"
        ],
        ewe: [
          "Dɔlélewo dometɔ aɖewoe nye HIV, chlamydia, gonorrhea, kple syphilis. Geɖewo ƒe dzesiwo medzena o, eyata dodokpɔ hia. Condom zãzã ɖea dɔléle ƒe afɔkuwo dzi kpɔtɔna.",
          "Anyo be nàsrɔ̃ nu tso dɔlélewo ŋuti. Woɖea wo ɖa to condom zãzã, dodokpɔ edziedzi, kple hatiwo dzi kpɔkpɔ me. Woate ŋu ada dɔléle geɖewo.",
          "Dɔléle dodokpɔ nye ɣaɣla eye wokpɔa wo le kliniko. Dzesi siwo dzena la woe nye tsi tsotsotso, abiwo, alo vevewo, gake geɖewo ƒe dzesiwo medzena o. Ne èʋuʋu la, yi dodokpɔ!"
        ]
      },
      period: {
        en: [
          "Your period, or menstruation, is the monthly shedding of the uterine lining when pregnancy doesn't occur. It usually lasts 3–7 days and happens every 21–35 days. It's normal for flow, color, or cramps to vary from person to person. If your period is irregular or very painful, it's a good idea to talk to a healthcare professional.",
          "Periods are a normal part of reproductive health. Average cycles are 21-35 days. Irregular periods can be caused by stress, diet, exercise, or medical conditions. Track your cycle to understand your pattern.",
          "Period pain is common but severe pain isn't normal. Relief options include heat, exercise, ibuprofen, and hormonal birth control. See a doctor if pain is debilitating.",
          "Menstruation typically starts between ages 9-16. Each period lasts 2-7 days. You can use pads, tampons, or menstrual cups - whatever feels most comfortable for you."
        ],
        twi: [
          "Nsuo ba yɛ ade a ɛteɛ wɔ awoɔ akwahosan mu. Nna ahorow yɛ nnafua 21-35. Nsɛm bi te sɛ adwenehaw, aduane, ne apɔmuden tumi ma nsuo ba nkɔ so pɛpɛɛpɛ. Di wo nsuo ba akyi.",
          "Nsuo ba yaw yɛ ade a ɛtaa ba nanso ɛnsɛ sɛ ɛyɛ den dodo. Wubetumi de ɔhyew, apɔmuden, ne aduro aboa. Sɛ ɛyɛ den dodo a, kɔhwɛ ɔdɔkota.",
          "Nsuo ba fi ase wɔ mfeɛ 9-16 ntam. Nsuo ba biara kɔ so nnafua 2-7. Wubetumi de pad, tampon anaa cup - nea ɛyɛ wo dɛ."
        ],
        ewe: [
          "Ɣletovɔsa nye nusi dzɔna ɖaa le agbenɔnɔ lãmesɛ me. Ɣletovɔsa ƒe ɣeyiɣi dzɔdzɔe nye ŋkeke 21-35. Nusiwo ate ŋu ana wò tɔ natɔ trɔ la woe nye tɔtɔ, nuɖuɖu, kple dɔwɔwɔ. Kpɔ wò ɣletovɔsa ɖe ŋku.",
          "Ɣletovɔsa ƒe vevewo dzɔna ɖaa gake mele be wòasẽ boo o. Nu siwo kpena ɖe ame ŋu la woe nye dzoxɔxɔ, dɔwɔwɔ, kple atike. Kpɔ dokita ne vevea sẽ akpa.",
          "Ɣletovɔsa dzɔa tso ƒe 9-16 me. Ɣletovɔsa ɖesiaɖe nɔa anyi ŋkeke 2-7. Àte ŋu azã pad, tampon alo cup - esi nèlɔ̃ wu."
        ]
      },
      pregnancy: {
        en: [
          "Pregnancy occurs when sperm fertilizes an egg. Early signs include missed period, nausea, and breast tenderness. Home pregnancy tests are accurate 1-2 weeks after a missed period.",
          "If you think you might be pregnant, take a pregnancy test and see a healthcare provider. You have options including continuing the pregnancy, adoption, or abortion where legal.",
          "Emergency contraception (Plan B) can prevent pregnancy up to 5 days after unprotected sex, but it's most effective within 72 hours. It's available at pharmacies without prescription."
        ],
        twi: [
          "Wunya nyinsɛn bere a ahunmu ne nkosua hyia. Nsɛnkyerɛnne bi ne nsuo ba a ɛnba, ayamtim, ne nufu mu yaw. Pregnancy test yɛ nokware nnawɔtwe 1-2 akyi.",
          "Sɛ wususuw sɛ woanyinsɛn a, yɛ pregnancy test na kɔhwɛ ɔdɔkota. Wowɔ nneɛma pii a wubetumi ayɛ te sɛ awo, fa ma obi, anaa yi gu.",
          "Emergency contraception (Plan B) tumi si nyinsɛn ano nna enum akyi, nanso ɛyɛ adwuma pa wɔ nnɔnhwerew 72 mu. Wubetumi tɔ wɔ aduruyɛfuo a wonhia nwoma."
        ],
        ewe: [
          "Fufɔfɔ dzɔna ne ŋutsu tɔ kple nyɔnu tɔ kpe. Dzesi gbãtɔwo dometɔ aɖewoe nye ɣletovɔsa metso o, dɔléle sesẽ, kple ayi me veve. Dodokpɔ le nyateƒe le kɔsiɖa 1-2 megbe.",
          "Ne èsusua be èfɔ fu la, wɔ dodokpɔ eye nàyi kliniko. Tiatia geɖe le asinawò abe be nàfɔ fu, nàtsɔe na ame bubu, alo nàɖe fu ɖa.",
          "Fuvɔvɔ si doa kabakaba (Plan B) ate ŋu aɖe fufɔfɔ o le ŋkeke atɔ̃ me gake ewɔa dɔ nyuie wu le gaƒoƒo 72 me. Wokpɔnɛ le atikewɔƒewo."
        ]
      }
    };

    // Check for keywords and return contextual response
    if (input.includes('contracept') || input.includes('birth control') || input.includes('prevent pregnan') || 
        input.includes('condom') || input.includes('pill') || input.includes('iud') || 
        input.includes('awo si ano') || input.includes('fuvɔvɔ')) {
      const responses = contextualResponses.contraception[lang as keyof typeof contextualResponses.contraception] || 
                       contextualResponses.contraception.en;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (input.includes('sti') || input.includes('std') || input.includes('hiv') || input.includes('aids') ||
        input.includes('infection') || input.includes('chlamydia') || input.includes('gonorrhea') ||
        input.includes('yadeɛ') || input.includes('dɔléle')) {
      const responses = contextualResponses.sti[lang as keyof typeof contextualResponses.sti] || 
                       contextualResponses.sti.en;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (input.includes('period') || input.includes('menstruat') || input.includes('cramp') ||
        input.includes('cycle') || input.includes('nsuo ba') || input.includes('ɣletovɔsa')) {
      const responses = contextualResponses.period[lang as keyof typeof contextualResponses.period] || 
                       contextualResponses.period.en;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (input.includes('pregnan') || input.includes('plan b') || input.includes('emergency') ||
        input.includes('nyinsɛn') || input.includes('fufɔfɔ')) {
      const responses = contextualResponses.pregnancy[lang as keyof typeof contextualResponses.pregnancy] || 
                       contextualResponses.pregnancy.en;
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default generic responses for other questions
    const responses = {
      en: [
        "That's a great question about sexual and reproductive health. Let me help you with that information. Can you be more specific about what you'd like to know?",
        "I understand your concern. Sexual and reproductive health is important. Could you tell me more about what specific aspect you're interested in?",
        "Thanks for asking. It's important to have accurate information about SRHR. What specific topic would you like to explore - contraception, STIs, periods, or pregnancy?",
        "I'm here to support you with any questions about sexual and reproductive health. Would you like to know about contraception methods, STI prevention, menstrual health, or pregnancy information?"
      ],
      twi: [
        "Ɛyɛ nsɛm pa bi a ɛfa akwahosan ne awoɔ ho. Momma menkyerɛ wo. Wubetumi akyerɛkyerɛ mu pii?",
        "Mete w'asɛm ase. Akwahosan ne awoɔ ho nsɛm ho hia. Wubetumi aka w'adwene mu nsɛm bi akyerɛ me?",
        "Medaase sɛ wobisae. Ɛho hia sɛ wunya nsɛm a ɛyɛ nokware. Asɛmtitiriw bɛn na wopɛ - awo si ano, yadeɛ, nsuo ba, anaa nyinsɛn?",
        "Mewɔ ha sɛ meboa wo wɔ nsɛm a ɛfa akwahosan ne awoɔ ho. Wopɛ sɛ wuhu awo si ano akwan, yadeɛ si ano, nsuo ba, anaa nyinsɛn?"
      ],
      ewe: [
        "Nyabiase nyui aɖee nye ema tso atsu kple agbenɔnɔ lãmesɛ ŋuti. Na makpe ɖe ŋuwò. Àte ŋu agblɔe kɔ̃e wua?",
        "Mese wò tamesusu gɔme. Atsu kple agbenɔnɔ lãmesɛ ƒe nyatakakawo le vevie. Àte ŋu agblɔ nu si nèdi wu?",
        "Akpe na nyabiase. Ele veviee be nyatakaka nyuitɔwo nanɔ mía si. Nyagblɔgblɔ ka nèdi - fuvɔvɔ, dɔlélewo, ɣletovɔsa, alo fufɔfɔa?",
        "Mele afii be makpe ɖe ŋuwò le atsu kple agbenɔnɔ lãmesɛ ƒe nyabiawo ŋuti. Èdi be yeagblɔ fuvɔvɔ mɔ̃wo, dɔléle ɖeɖa, ɣletovɔsa lãmesɛ, alo fufɔfɔ ŋuti nyaa?"
      ]
    };

    const langResponses = responses[lang as keyof typeof responses] || responses.en;
    return langResponses[Math.floor(Math.random() * langResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFE 100%)' }}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] sm:max-w-[75%] ${message.sender === 'bot' ? 'space-y-3' : ''}`}>
                  {/* Bot Avatar */}
                  {message.sender === 'bot' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, #0048ff 0%, #0066ff 100%)',
                          boxShadow: '0 2px 8px rgba(0, 72, 255, 0.2)'
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm" style={{ color: '#6B7280' }}>{botName} AI</span>
                    </div>
                  )}
                  
                  <div
                    className={`rounded-3xl px-5 py-3.5 ${
                      message.sender === 'user' ? 'rounded-br-md' : 'rounded-tl-md'
                    }`}
                    style={{
                      backgroundColor: message.sender === 'user' ? '#0048ff' : 'white',
                      color: message.sender === 'user' ? 'white' : '#1A1A1A',
                      boxShadow: message.sender === 'bot' 
                        ? '0 2px 12px rgba(0, 0, 0, 0.06)' 
                        : '0 4px 16px rgba(0, 72, 255, 0.2)'
                    }}
                  >
                    <p className="whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {/* Quick Reply Options */}
                  {message.options && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-10">
                      {message.options.map((option, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleQuickReply(option)}
                          className="px-4 py-2.5 rounded-full text-sm transition-all hover:scale-105 active:scale-95"
                          style={{ 
                            backgroundColor: 'white',
                            color: '#0048ff',
                            border: '1.5px solid #E8ECFF',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                          }}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #0048ff 0%, #0066ff 100%)',
                    boxShadow: '0 2px 8px rgba(0, 72, 255, 0.2)'
                  }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-3xl rounded-tl-md px-5 py-4" style={{ boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0048ff', animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0048ff', animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0048ff', animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t" style={{ borderColor: '#E8ECFF' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={lang.placeholder}
                className="rounded-full h-12 pr-12 border-2 transition-all focus:shadow-lg"
                style={{ 
                  borderColor: '#E8ECFF',
                  backgroundColor: '#F8FAFE'
                }}
              />
              <button
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                  isListening 
                    ? 'animate-pulse' 
                    : 'hover:bg-blue-50'
                }`}
                onClick={handleVoiceInput}
                type="button"
                title="Voice input"
                style={{
                  backgroundColor: isListening ? '#E8ECFF' : 'transparent'
                }}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'text-[#0048ff]' : 'text-gray-400'}`} />
              </button>
            </div>
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-full h-12 w-12 flex-shrink-0 transition-all hover:scale-105 active:scale-95"
              style={{ 
                background: inputValue.trim() 
                  ? 'linear-gradient(135deg, #0048ff 0%, #0066ff 100%)' 
                  : '#E8ECFF',
                boxShadow: inputValue.trim() 
                  ? '0 4px 16px rgba(0, 72, 255, 0.3)' 
                  : 'none'
              }}
              disabled={!inputValue.trim()}
            >
              <Send className={`w-5 h-5 ${inputValue.trim() ? 'text-white' : 'text-gray-400'}`} />
            </Button>
          </div>
          
          {messages.length > 4 && !isGuest && (
            <button
              onClick={onRequestFollowUpId}
              className="mt-3 text-sm transition-all hover:underline"
              style={{ color: '#0048ff' }}
            >
              Get Follow-up ID
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
