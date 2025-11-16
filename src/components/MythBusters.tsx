import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X, Check, Share2, Copy } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface MythBustersProps {
  selectedLanguage: string;
}

interface MythFact {
  id: number;
  category: string;
  myth: string;
  fact: string;
  source: string;
}

export function MythBusters({ selectedLanguage }: MythBustersProps) {
  const [selectedMyth, setSelectedMyth] = useState<number | null>(null);

  const content = {
    en: {
      title: "Myth Busters",
      subtitle: "Separating fact from fiction",
      mythLabel: "MYTH",
      factLabel: "FACT",
      shareButton: "Share",
      copyButton: "Copy",
      copiedToast: "Copied to clipboard!",
      myths: [
        {
          id: 1,
          category: "Contraception",
          myth: "You can't get pregnant the first time you have sex",
          fact: "Pregnancy can occur any time you have unprotected sex, including the first time. Using contraception is important from the very first time.",
          source: "WHO"
        },
        {
          id: 2,
          category: "STIs",
          myth: "You can tell if someone has an STI just by looking at them",
          fact: "Many STIs have no visible symptoms. The only way to know is through testing. Regular testing is important for sexual health.",
          source: "CDC"
        },
        {
          id: 3,
          category: "Menstruation",
          myth: "You can't get pregnant during your period",
          fact: "While less likely, pregnancy can occur during menstruation, especially if you have irregular cycles. Sperm can survive up to 5 days.",
          source: "NHS"
        },
        {
          id: 4,
          category: "Contraception",
          myth: "Birth control pills make you gain weight",
          fact: "Modern birth control pills do not cause significant weight gain. Any changes are usually temporary and related to water retention.",
          source: "WHO"
        },
        {
          id: 5,
          category: "General",
          myth: "Douching is necessary for vaginal hygiene",
          fact: "Douching is not recommended and can actually disrupt healthy vaginal bacteria, leading to infections. The vagina is self-cleaning.",
          source: "ACOG"
        },
        {
          id: 6,
          category: "STIs",
          myth: "Oral sex is completely safe from STIs",
          fact: "STIs can be transmitted through oral sex. Using protection like dental dams or condoms reduces risk.",
          source: "CDC"
        },
        {
          id: 7,
          category: "Contraception",
          myth: "Withdrawal method is an effective form of contraception",
          fact: "The withdrawal method has a high failure rate (around 20%). Pre-ejaculate fluid can contain sperm, and perfect timing is difficult to maintain consistently.",
          source: "WHO"
        },
        {
          id: 8,
          category: "Menstruation",
          myth: "You should avoid exercise during your period",
          fact: "Exercise during menstruation is safe and can actually help reduce cramps and improve mood through endorphin release.",
          source: "NHS"
        },
        {
          id: 9,
          category: "General",
          myth: "Urinating after sex prevents pregnancy",
          fact: "Urinating after sex does not prevent pregnancy as urine exits through a different opening. However, it can help prevent urinary tract infections.",
          source: "ACOG"
        },
        {
          id: 10,
          category: "STIs",
          myth: "You can't get the same STI twice",
          fact: "You can get the same STI multiple times. Having an STI once does not make you immune to future infections. Proper treatment and prevention are essential.",
          source: "CDC"
        }
      ]
    },
    twi: {
      title: "Nsɛm a wɔdi ho dawurubɔ",
      subtitle: "Nokware ne nea ɛnyɛ nokware",
      mythLabel: "DAWURU",
      factLabel: "NOKWARE",
      shareButton: "Kyɛ",
      copyButton: "Fa kɔ",
      copiedToast: "Wɔafa kɔ!",
      myths: [
        {
          id: 1,
          category: "Awo si ano",
          myth: "Wuntumi nyin bere a ɛto nna da a edi kan no",
          fact: "Wubetumi anyin bere biara a woto nna a wɔmfa biribi nsi ano, mpo da a edi kan no. Ɛho hia sɛ wode biribi si ano.",
          source: "WHO"
        },
        {
          id: 2,
          category: "Yadeɛ",
          myth: "Wubetumi ahu sɛ obi wɔ yadeɛ sɛ wohwɛ no",
          fact: "Yadeɛ pii nni nsɛnkyerɛnne a wohu. Ɔkwan a wubehu ara ne sɛ wokɔyɛ nhwehwɛmu. Nhwehwɛmu yɛ na ho hia.",
          source: "CDC"
        },
        {
          id: 3,
          category: "Nsuo ba",
          myth: "Wuntumi nyin wɔ bere a nsuo reba no mu",
          fact: "Ɛbɛyɛ kakra deɛ, nanso wubetumi anyin wɔ nsuo ba mu. Ahunmu betumi atena nkwa mu nnafua enum.",
          source: "NHS"
        },
        {
          id: 4,
          category: "Awo si ano",
          myth: "Aduro a wɔde si awo ano ma wo mu duru",
          fact: "Aduro a wɔde si awo ano mma wo mu nduru. Nsakraeɛ biara yɛ bere tiawa bi na ɛfa nsuo a ɛwɔ wo mu no ho.",
          source: "WHO"
        },
        {
          id: 5,
          category: "Nyinaa",
          myth: "Ɛho hia sɛ wohohoro mu ma ho tew",
          fact: "Wɔnkamfo sɛ wobɛhohoro mu na ebetumi asɛe bacteria pa. Twɛ no ara hohoro ne ho.",
          source: "ACOG"
        },
        {
          id: 6,
          category: "Yadeɛ",
          myth: "Nna a wɔde ano to no ho tew koraa",
          fact: "Wobetumi anya yadeɛ denam nna a wɔde ano to so. Fa condom anaa dental dam di dwuma.",
          source: "CDC"
        },
        {
          id: 7,
          category: "Awo si ano",
          myth: "Sɛ woyi mu a, ɛyɛ awo si ano kwan pa",
          fact: "Sɛ woyi mu a, ɛnni dwuma yiye (bɛyɛ 20% na ɛnni dwuma). Ahunmu betumi aba ansa na woayi mu.",
          source: "WHO"
        },
        {
          id: 8,
          category: "Nsuo ba",
          myth: "Ɛnsɛ sɛ woyɛ apɔmuden wɔ nsuo ba bere mu",
          fact: "Apɔmuden wɔ nsuo ba bere mu yɛ papa. Ebetumi atew yaw a ɛba no ano na ama wo ani agye.",
          source: "NHS"
        },
        {
          id: 9,
          category: "Nyinaa",
          myth: "Sɛ wodwonsɔ wɔ nna akyi a, ɛsi awo ano",
          fact: "Dwonsɔ nsi awo ano efisɛ dwonsɔ fi baabi foforo. Nanso ebetumi asi dwonsɔkwan mu yadeɛ ano.",
          source: "ACOG"
        },
        {
          id: 10,
          category: "Yadeɛ",
          myth: "Wuntumi nnya yadeɛ biara mprenu",
          fact: "Wobetumi anya yadeɛ biara mprenu. Sɛ wonya yadeɛ pɛnkoro a, ɛmma wo ho ban. Ayaresa ne ahobammɔ ho hia.",
          source: "CDC"
        }
      ]
    },
    ewe: {
      title: "Aʋatsonyawo ŋuɖoɖo",
      subtitle: "Nyateƒe kple alakpa tɔtɔ dome",
      mythLabel: "AƲATSONYA",
      factLabel: "NYATEƑE",
      shareButton: "Ðɔ ɖe ame",
      copyButton: "Ŋlɔ ɖe agbalẽ me",
      copiedToast: "Woŋlɔe ɖe agbalẽ me!",
      myths: [
        {
          id: 1,
          category: "Fuvɔvɔ",
          myth: "Màte ŋu afɔ fu zi gbãtɔ si nèwɔ nu o",
          fact: "Àte ŋu afɔ fu ɣesiaɣi si nèwɔ nu si ŋu womeɖo nu o, zi gbãtɔ gɔ̃ hã. Ele be nàzã fuvɔvɔ nu tso gɔmedzedzea me.",
          source: "WHO"
        },
        {
          id: 2,
          category: "Dɔlélewo",
          myth: "Àte ŋu akpɔ ame si ŋu dɔléle le ɖa kple ŋku kpɔkpɔ",
          fact: "Dɔléle geɖewo ƒe dzesiwo medzena o. Dodokpɔ koe ate ŋu aɖe eme. Dodokpɔ edziedzi hia.",
          source: "CDC"
        },
        {
          id: 3,
          category: "Ɣletovɔsa",
          myth: "Màte ŋu afɔ fu le wò ɣletovɔsa me o",
          fact: "Togbɔ be mesɔ gbɔ o hã la, àte ŋu afɔ fu le ɣletovɔsa me, vevietɔ ne wò ɣletovɔsawo meɖoa ɖoɖo nu o. Ŋutsu tɔ ate ŋu anɔ agbe ŋkeke atɔ̃.",
          source: "NHS"
        },
        {
          id: 4,
          category: "Fuvɔvɔ",
          myth: "Fuléle amuwo na wò ŋutilã kpea ɖe edzi",
          fact: "Fuléle amuwo yeye mena wò ŋutilã kpena ɖe edzi o. Tɔtrɔ ɖesiaɖe nye ɣeyiɣi kpui aɖe ko eye wòku ɖe tsi si le ŋutilã me la ŋuti.",
          source: "WHO"
        },
        {
          id: 5,
          category: "Bliboa",
          myth: "Ele be nàklɔ wò lãme na dzadzɛwo",
          fact: "Womeka ɖe edzi be nàklɔ lãme o eye ate ŋu agblẽ bacteria nyuiwo. Nyɔnuƒome klɔa eɖokui.",
          source: "ACOG"
        },
        {
          id: 6,
          category: "Dɔlélewo",
          myth: "Nu wɔwɔ kple nu li ŋu le dedie keŋkeŋ",
          fact: "Àte ŋu aɖe dɔléle to nu wɔwɔ kple nu me. Zã tanudzɔnuwo abe dental dams alo condoms ene ɖea ŋui.",
          source: "CDC"
        },
        {
          id: 7,
          category: "Fuvɔvɔ",
          myth: "Ɖeɖe le eme nye fuvɔvɔ mɔnu nyuitɔ",
          fact: "Ɖeɖe le eme mewɔa dɔ nyuie o (abe 20% ene). Ŋutsu tɔ ate ŋu anɔ tsi si do ŋgɔ la me hafi woaɖe le eme.",
          source: "WHO"
        },
        {
          id: 8,
          category: "Ɣletovɔsa",
          myth: "Mele be nàwɔ lãmedɔ le wò ɣletovɔsa me o",
          fact: "Lãmedɔ wɔwɔ le ɣletovɔsa me li ŋu le dedie eye ate ŋu aɖe vevesese dzi akpɔtɔ na wò.",
          source: "NHS"
        },
        {
          id: 9,
          category: "Bliboa",
          myth: "Ne èto nyinyi le nuwɔwɔ megbe la, màfɔ fu o",
          fact: "Nyinyi toto le nuwɔwɔ megbe meɖea fu o elabena nyinyi doa go to teƒe bubu. Gake ate ŋu aɖe nyinyi mɔ me dɔlélewo.",
          source: "ACOG"
        },
        {
          id: 10,
          category: "Dɔlélewo",
          myth: "Màte ŋu akpɔ dɔléle ɖeka zi evea o",
          fact: "Àte ŋu akpɔ dɔléle ɖeka zi geɖe. Ne èkpɔ dɔléle zi ɖeka la, mewɔa wò dedie o. Atikewɔwɔ kple tanudzɔdzɔ hiã.",
          source: "CDC"
        }
      ]
    }
  };

  const lang = content[selectedLanguage as keyof typeof content] || content.en;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(lang.copiedToast);
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFE 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="mb-2" style={{ color: '#0048ff' }}>{lang.title}</h1>
          <p className="text-gray-600">{lang.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lang.myths.map((item) => (
            <Card 
              key={item.id} 
              className="p-6 cursor-pointer transition-all hover:shadow-lg"
              onClick={() => setSelectedMyth(selectedMyth === item.id ? null : item.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <Badge 
                  variant="outline" 
                  className="rounded-full"
                  style={{ borderColor: '#0048ff', color: '#0048ff' }}
                >
                  {item.category}
                </Badge>
                {selectedMyth === item.id ? (
                  <Check className="w-5 h-5" style={{ color: '#0048ff' }} />
                ) : (
                  <div className="w-5 h-5" />
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#FF4444' }} />
                  <div>
                    <p className="text-xs mb-1" style={{ color: '#FF4444' }}>{lang.mythLabel}</p>
                    <p className="text-gray-700">{item.myth}</p>
                  </div>
                </div>
              </div>

              {selectedMyth === item.id && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2 p-4 rounded-lg" style={{ backgroundColor: '#E8ECFF' }}>
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0048ff' }} />
                    <div>
                      <p className="text-xs mb-1" style={{ color: '#0048ff' }}>{lang.factLabel}</p>
                      <p style={{ color: '#1A1A1A' }}>{item.fact}</p>
                      <p className="text-xs text-gray-500 mt-2">Source: {item.source}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(`${lang.mythLabel}: ${item.myth}\n\n${lang.factLabel}: ${item.fact}`);
                      }}
                      style={{ borderColor: '#0048ff', color: '#0048ff' }}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {lang.copyButton}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full"
                      onClick={(e) => e.stopPropagation()}
                      style={{ borderColor: '#0048ff', color: '#0048ff' }}
                      disabled
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {lang.shareButton}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
