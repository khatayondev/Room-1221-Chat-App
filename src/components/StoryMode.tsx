import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, X, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StoryModeProps {
  selectedLanguage: string;
  onNavigateToMyths?: () => void;
}

interface Story {
  id: number;
  title: string;
  scenario: string;
  choices: string[];
  correctAnswer: number; // Index of the correct answer
  feedback: string[];
  wrongFeedback: string; // Feedback for wrong answers
}

export function StoryMode({ selectedLanguage, onNavigateToMyths }: StoryModeProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showMythBustersPrompt, setShowMythBustersPrompt] = useState(false);

  const stories = {
    en: [
      {
        id: 1,
        title: "The Party",
        scenario: "Sarah's friend invites her to a party where there will be alcohol. She's worried about peer pressure. What should Sarah do?",
        choices: [
          "Go to the party but stay close to trusted friends",
          "Just go and do what everyone else is doing",
          "Go but have an exit plan if uncomfortable",
          "Talk to a trusted adult first"
        ],
        correctAnswer: 3, // Talk to a trusted adult first
        feedback: [
          "Good choice! Having trusted friends around can help you make safer decisions.",
          "Not the best choice. Making your own informed decisions is important for your safety.",
          "Excellent! Having an exit strategy shows you're thinking ahead about your safety.",
          "Wonderful! Talking to someone you trust can provide valuable guidance."
        ],
        wrongFeedback: "That's not the safest choice. Consider seeking guidance from a trusted adult to make informed decisions about situations involving peer pressure."
      },
      {
        id: 2,
        title: "The Question",
        scenario: "Kwame wants to learn about contraception but feels embarrassed to ask anyone. What's the best approach?",
        choices: [
          "Use a confidential service like Room 1221",
          "Ask friends for advice",
          "Research from reliable health websites",
          "All reliable sources (Room 1221, healthcare providers, verified websites)"
        ],
        correctAnswer: 3, // All reliable sources
        feedback: [
          "Perfect! Anonymous services are designed for exactly this situation.",
          "Friends may not have accurate information. It's better to consult reliable sources.",
          "Good! Make sure to use reliable sources like WHO or NHS websites.",
          "Excellent! Using multiple reliable sources gives you the most complete information."
        ],
        wrongFeedback: "While friends may mean well, they might not have accurate information. It's best to use multiple reliable sources like healthcare providers, verified websites, or confidential services."
      },
      {
        id: 3,
        title: "The Pressure",
        scenario: "Ama's partner is pressuring her to become sexually active before she feels ready. How should she respond?",
        choices: [
          "Clearly communicate she's not ready",
          "Just go along with it to keep the relationship",
          "Talk to someone she trusts about the situation",
          "All healthy approaches (communicate boundaries, take time, seek support)"
        ],
        correctAnswer: 3, // All healthy approaches
        feedback: [
          "Excellent! Clear communication about boundaries is essential in any relationship.",
          "This is not healthy. Your feelings and boundaries matter. A respectful partner will wait until you're ready.",
          "Great! Getting support from trusted people can help you navigate difficult situations.",
          "Perfect! Combining all these approaches shows strength and self-awareness."
        ],
        wrongFeedback: "Your feelings and boundaries are important. Never feel pressured to do something you're not ready for. A respectful partner will always wait until you're comfortable."
      }
    ],
    twi: [
      {
        id: 1,
        title: "Apontɔ",
        scenario: "Sarah yɔnko frɛ no kɔ apontɔ bi a nsa wɔ hɔ. Ɔresuro sɛ wɔbɛhyɛ no so. Dɛn na Sarah bɛyɛ?",
        choices: [
          "Kɔ apontɔ no mu na ne nnamfonom a wogye wɔn di ben",
          "Kɔ na yɛ nea obiara yɛ",
          "Kɔ nanso fa ɔkwan bi a ɔbɛfa akɔ",
          "Kasa kyerɛ opanyin bi a ɔgye ne di"
        ],
        correctAnswer: 3,
        feedback: [
          "Ɛyɛ! Sɛ wo nnamfonom a wogye wɔn di wɔ hɔ a, wobetumi ayɛ nneɛma yiye.",
          "Ɛnyɛ paw pa. Ɛho hia sɛ woyɛ wo ankasa gyinae.",
          "Ɛyɛ papa! Sɛ wofa ɔkwan bi a wobetumi afa akɔ a, ɛkyerɛ sɛ wodwene wo ho ban ho.",
          "Ɛyɛ! Sɛ wokasa kyerɛ obi a wogye ne di a, ebetumi aboa wo."
        ],
        wrongFeedback: "Ɛnyɛ paw a ɛho tew. Dwene sɛ wobɛkɔ opanyin bi a wogye ne di hɔ akɔbisa akwankyerɛ."
      },
      {
        id: 2,
        title: "Nsɛm bi",
        scenario: "Kwame pɛ sɛ ohu nea wɔyɛ de si awo ano nanso ɔfɛre sɛ ɔbɛbisa. Ɔkwan bɛn so na ɛbɛyɛ yiye?",
        choices: [
          "Fa Room 1221 te sɛ kokoam dwumadie",
          "Bisa nnamfonom",
          "Hwehwɛ wɔ akwahosan ho wɛbsaet a wogye di mu",
          "Fa baabi ahorow pii a wogye di (Room 1221, akwahosan ho adwumayɛfo)"
        ],
        correctAnswer: 3,
        feedback: [
          "Ɛyɛ! Kokoam dwumadie no yɛ ma saa nsɛm yi pɛ.",
          "Nnamfonom betumi nni nsɛm pa. Ɛyɛ sɛ wobisa wɔ baabi a wogye di.",
          "Ɛyɛ! Hwɛ hu sɛ wode WHO anaa NHS wɛbsaet bedi dwuma.",
          "Ɛyɛ papa! Sɛ wufa baabi ahorow pii a, wubenya nsɛm pa."
        ],
        wrongFeedback: "Ɛwom sɛ nnamfonom pɛ sɛ wɔboa de, nanso ebia wonni nsɛm pa. Ɛyɛ sɛ wofa baabi ahorow pii a wogye di."
      },
      {
        id: 3,
        title: "Nhyɛso",
        scenario: "Ama hokafo rehyɛ no so sɛ ɔnto nna nanso ɔmpɛ sɛ ɔyɛ saa seesei. Ɔbɛyɛ dɛn?",
        choices: [
          "Ɔnka ntene sɛ ɔmpɛ",
          "Ɔnye atom na ɔnkora abusuabɔ no so",
          "Ɔnkasa kyerɛ obi a ɔgye ne di",
          "Ɔnyɛ akwan ahorow a ɛyɛ (ka ntene, fa bere, kɔ mmoa)"
        ],
        correctAnswer: 3,
        feedback: [
          "Ɛyɛ papa! Ɛho hia sɛ woka nea wopɛ ntene.",
          "Ɛnyɛ paw pa. Wo nneɛma ne wo ahye ho hia. Hokafo a ɔbu wo ani no bɛtwɛn.",
          "Ɛyɛ papa! Sɛ wonya mmoa fi nnamfonom hɔ a, ɛboa.",
          "Ɛyɛ papa! Sɛ woyɛ eyi nyinaa a, ɛkyerɛ sɛ woyɛ den."
        ],
        wrongFeedback: "Wo nneɛma ne wo ahye ho hia. Mma obiara nhyɛ wo so sɛ yɛ biribi a wonsiesiee. Hokafo a ɔbu wo ani bɛtwɛn."
      }
    ],
    ewe: [
      {
        id: 1,
        title: "Takpekpe",
        scenario: "Sarah xɔlɔ̃ yɔe be wòava takpekpe aɖe si aha le. Etsia vɔ̃ be woabia be wòano nu. Nuka Sarah awɔ?",
        choices: [
          "Yi ɖe takpekpea gake nɔ xɔ̃ siwo dzi wòka ɖo gbɔ",
          "Yi eye nawɔ nu si ame bubuwo le wɔm",
          "Yi gake lé ɖoɖo ɖe asi be yeado go",
          "Ƒo nu kple ame si dzi wòka ɖo gbɔ"
        ],
        correctAnswer: 3,
        feedback: [
          "Enyo! Xɔ̃wo le mia gbɔ ate ŋu akpe ɖe mia ŋu.",
          "Menye tiatia nyuitɔ wònye o. Ele be nàwɔ wò ŋutɔ wò tiatiawo.",
          "Enyo ŋutɔ! Ɖoɖo si nàwɔ be yeado go fia be èle nu bum.",
          "Enyo! Nuƒoƒo kple ame si dzi nèka ɖo ate ŋu akpe ɖe ŋuwò."
        ],
        wrongFeedback: "Menye tiatia si me dedienɔnɔ le o. Bu be yeabia ame si dzi nèka ɖo gbɔ aɖaŋu."
      },
      {
        id: 2,
        title: "Nyabiase",
        scenario: "Kwame di be yeanya nu tso fu vɔvɔ ŋuti gake ŋukpe le eme. Aleke wòawɔ?",
        choices: [
          "Zã dɔwɔna ɣaɣla abe Room 1221 ene",
          "Bia xɔ̃wo",
          "Di nuwo le mɔ̃ɖaŋununya nyui teƒewo",
          "Zã teƒe geɖe siwo ŋu kakaɖedzi le (Room 1221, lãmeseseƒolawo)"
        ],
        correctAnswer: 3,
        feedback: [
          "Enyo kabakaba! Dɔwɔna ɣaɣlawo le afima na nu sia tɔgbi.",
          "Xɔ̃wo ate ŋu manye nyatakaka nyuiwo o. Enyo be nàbia teƒe siwo ŋu kakaɖedzi le.",
          "Enyo! Kpɔ egbɔ be èzã teƒe nyuiwo abe WHO alo NHS ene.",
          "Enyo kabakaba! Ne èzã teƒe geɖe siwo dzi wòka ɖo la, ànya nu geɖe."
        ],
        wrongFeedback: "Togbɔ be xɔ̃wo di be yeakpe ɖe ŋuwò hã la, woate ŋu manye nyatakaka nyuiwo o. Enyo wu be nàzã teƒe siwo ŋu kakaɖedzi le."
      },
      {
        id: 3,
        title: "Teteɖeanyi",
        scenario: "Ama srɔ̃a le bia dzi ɖem be wòade asi ŋutsu kple nyɔnu wɔwɔ me gake medi be yeawɔe fifia o. Aleke wòawɔ?",
        choices: [
          "Negblɔ kɔtɛe be yemedi o",
          "Newɔ nu si srɔ̃a di be yeawɔ be woakpɔ ɖokuiwo",
          "Neƒo nu kple ame si dzi wòka ɖo tso nya la ŋuti",
          "Akpa siwo katã le nyui (gblɔ nu si wòdi, xɔ ɣeyiɣi, di kpekpeɖeŋu)"
        ],
        correctAnswer: 3,
        feedback: [
          "Enyo kabakaba! Ele veviee be nàgblɔ nu si nèdi nyuie.",
          "Menye nu nyui wònye o. Wò seselelãme kple liƒowo le vevie. Srɔ̃ si bua ŋu na wò alala va se ɖe esime nèdzra ɖo.",
          "Enyo kabakaba! Kpekpeɖeŋu tso ame siwo dzi nèka ɖo gbɔ ate ŋu akpe ɖe ŋuwò.",
          "Enyo kabakaba! Ne èwɔ nu siawo katã la, efia ŋusẽ kple gɔmesese."
        ],
        wrongFeedback: "Wò seselelãme kple liƒowo le vevie. Mègana ame aɖeke nabi dzi ɖe wò be nawɔ nu si menèdzra ɖo na o. Srɔ̃ si bua ŋu na wò alala."
      }
    ]
  };

  const langStories = stories[selectedLanguage as keyof typeof stories] || stories.en;
  const currentStory = langStories[currentStoryIndex];

  const headers = {
    en: { title: "Story Mode", subtitle: "Learn through interactive scenarios" },
    twi: { title: "Nsɛm nna", subtitle: "Sua denam nsɛm bi mu" },
    ewe: { title: "Nya ɖiɖi ɖoɖo", subtitle: "Srɔ̃ nu to nya ɖiɖi me" }
  };

  const header = headers[selectedLanguage as keyof typeof headers] || headers.en;

  const nextStory = () => {
    setSelectedChoice(null);
    setShowMythBustersPrompt(false);
    setCurrentStoryIndex((prev) => (prev + 1) % langStories.length);
  };

  const prevStory = () => {
    setSelectedChoice(null);
    setShowMythBustersPrompt(false);
    setCurrentStoryIndex((prev) => (prev - 1 + langStories.length) % langStories.length);
  };

  const handleChoiceSelect = (index: number) => {
    setSelectedChoice(index);
    if (index !== currentStory.correctAnswer) {
      setShowMythBustersPrompt(true);
    } else {
      setShowMythBustersPrompt(false);
    }
  };

  const buttonLabels = {
    en: {
      learnMore: "Learn More in Myth Busters",
      continueReading: "Continue Reading"
    },
    twi: {
      learnMore: "Sua Pii wɔ Nsɛm a Ɛnyɛ Nokware mu",
      continueReading: "Kɔ so kenkan"
    },
    ewe: {
      learnMore: "Srɔ̃ nu geɖe le Alakpatɔwo me",
      continueReading: "Yi ŋgɔ nàxle nu"
    }
  };

  const labels = buttonLabels[selectedLanguage as keyof typeof buttonLabels] || buttonLabels.en;

  return (
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFE 100%)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="mb-2" style={{ color: '#0048ff' }}>{header.title}</h1>
          <p className="text-gray-600">{header.subtitle}</p>
        </div>

        <Card className="p-6 mb-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={prevStory}
              variant="outline"
              size="icon"
              className="rounded-full"
              style={{ borderColor: '#0048ff' }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: '#0048ff' }} />
            </Button>
            
            <h2 className="text-center" style={{ color: '#0048ff' }}>{currentStory.title}</h2>
            
            <Button
              onClick={nextStory}
              variant="outline"
              size="icon"
              className="rounded-full"
              style={{ borderColor: '#0048ff' }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: '#0048ff' }} />
            </Button>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {currentStory.scenario}
          </p>

          <div className="space-y-3">
            {currentStory.choices.map((choice, index) => {
              const isSelected = selectedChoice === index;
              const isCorrect = index === currentStory.correctAnswer;
              const isWrong = isSelected && !isCorrect;
              
              return (
                <div key={index}>
                  <button
                    onClick={() => handleChoiceSelect(index)}
                    disabled={selectedChoice !== null}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'shadow-md'
                        : selectedChoice === null ? 'hover:shadow-sm' : 'opacity-60'
                    }`}
                    style={{
                      backgroundColor: isSelected 
                        ? (isCorrect ? '#0048ff' : '#FF4444')
                        : 'white',
                      color: isSelected ? 'white' : '#333',
                      border: `2px solid ${
                        isSelected 
                          ? (isCorrect ? '#0048ff' : '#FF4444')
                          : '#e5e7eb'
                      }`,
                      cursor: selectedChoice !== null ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          backgroundColor: isSelected ? 'white' : '#0048ff',
                          color: isSelected ? (isCorrect ? '#0048ff' : '#FF4444') : 'white'
                        }}
                      >
                        {isSelected ? (
                          isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="flex-1">{choice}</span>
                    </div>
                  </button>
                  
                  {isSelected && (
                    <div 
                      className="mt-3 p-4 rounded-lg" 
                      style={{ 
                        backgroundColor: isCorrect ? '#E8ECFF' : '#FFE8E8'
                      }}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0048ff' }} />
                        ) : (
                          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#FF4444' }} />
                        )}
                        <p style={{ color: isCorrect ? '#0048ff' : '#FF4444' }}>
                          {currentStory.feedback[index]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Myth Busters Prompt for Wrong Answers */}
          {showMythBustersPrompt && onNavigateToMyths && (
            <div className="mt-6 p-4 rounded-xl border-2" style={{ 
              backgroundColor: '#FFF4E6',
              borderColor: '#FFA500'
            }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#FFA500' }} />
                <div className="flex-1">
                  <p className="text-sm mb-3" style={{ color: '#1A1A1A' }}>
                    {selectedChoice !== null && currentStory.wrongFeedback}
                  </p>
                  <Button
                    onClick={onNavigateToMyths}
                    className="w-full rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)',
                      color: 'white'
                    }}
                  >
                    {labels.learnMore}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Story {currentStoryIndex + 1} of {langStories.length}
          </div>
        </Card>
      </div>
    </div>
  );
}
