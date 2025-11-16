import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useState } from "react";

interface ReferralSectionProps {
  selectedLanguage: string;
}

interface Clinic {
  id: number;
  name: string;
  type: string;
  location: string;
  phone: string;
  hours: string;
  services: string[];
  distance: string;
}

export function ReferralSection({ selectedLanguage }: ReferralSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const content = {
    en: {
      title: "Find Help Near You",
      searchPlaceholder: "Search by location...",
      filterAll: "All",
      filterClinic: "Clinics",
      filterPharmacy: "Pharmacies",
      viewDetails: "View Details",
      callNow: "Call Now",
      getDirections: "Get Directions",
      services: "Services:",
      clinics: [
        {
          id: 1,
          name: "Planned Parenthood Ghana - Accra",
          type: "Clinic",
          location: "East Legon, Accra",
          phone: "+233 30 251 2345",
          hours: "Mon-Fri: 8am-5pm, Sat: 9am-2pm",
          services: ["Contraception", "STI Testing", "Counseling", "Family Planning"],
          distance: "2.3 km"
        },
        {
          id: 2,
          name: "DKT Ghana Youth Center",
          type: "Clinic",
          location: "Osu, Accra",
          phone: "+233 30 276 5432",
          hours: "Mon-Sat: 9am-6pm",
          services: ["Youth-Friendly Services", "Free Contraception", "HIV Testing"],
          distance: "3.7 km"
        },
        {
          id: 3,
          name: "Ridge Hospital Family Planning",
          type: "Clinic",
          location: "Ridge, Accra",
          phone: "+233 30 222 1234",
          hours: "Mon-Fri: 7am-4pm",
          services: ["Family Planning", "Maternal Health", "STI Treatment"],
          distance: "5.1 km"
        },
        {
          id: 4,
          name: "LifeCare Pharmacy",
          type: "Pharmacy",
          location: "Osu Oxford Street, Accra",
          phone: "+233 30 278 9876",
          hours: "Daily: 8am-10pm",
          services: ["Emergency Contraception", "Condoms", "Pregnancy Tests"],
          distance: "1.8 km"
        },
        {
          id: 5,
          name: "Medipharm",
          type: "Pharmacy",
          location: "East Legon, Accra",
          phone: "+233 30 251 6789",
          hours: "Daily: 8am-9pm",
          services: ["Contraceptives", "STI Medications", "Health Consultation"],
          distance: "2.5 km"
        }
      ]
    },
    twi: {
      title: "Hwehwɛ Mmoa Wɔ Wo Mpɔtam",
      searchPlaceholder: "Hwehwɛ beae...",
      filterAll: "Nyinaa",
      filterClinic: "Ayaresabea",
      filterPharmacy: "Adurutoɔ",
      viewDetails: "Hwɛ nsɛm",
      callNow: "Frɛ seesei",
      getDirections: "Nya ɔkwan",
      services: "Dwumadie:",
      clinics: [
        {
          id: 1,
          name: "Planned Parenthood Ghana - Accra",
          type: "Ayaresabea",
          location: "East Legon, Accra",
          phone: "+233 30 251 2345",
          hours: "Dwoada-Fiada: 8am-5pm, Memeneda: 9am-2pm",
          services: ["Awo si ano", "Yadeɛ hwehwɛmu", "Afotusoɔ", "Abusua nhyehyɛe"],
          distance: "2.3 km"
        },
        {
          id: 2,
          name: "DKT Ghana Mmabunu Beae",
          type: "Ayaresabea",
          location: "Osu, Accra",
          phone: "+233 30 276 5432",
          hours: "Dwoada-Memeneda: 9am-6pm",
          services: ["Mmabunu dwumadie", "Awo si ano kwa", "HIV hwehwɛmu"],
          distance: "3.7 km"
        },
        {
          id: 3,
          name: "Ridge Hospital Abusua Nhyehyɛe",
          type: "Ayaresabea",
          location: "Ridge, Accra",
          phone: "+233 30 222 1234",
          hours: "Dwoada-Fiada: 7am-4pm",
          services: ["Abusua nhyehyɛe", "Ɛnanom akwahosan", "Yadeɛ ayaresa"],
          distance: "5.1 km"
        },
        {
          id: 4,
          name: "LifeCare Adurutoɔ",
          type: "Adurutoɔ",
          location: "Osu Oxford Street, Accra",
          phone: "+233 30 278 9876",
          hours: "Daa: 8am-10pm",
          services: ["Awo si ano ntɛm", "Condom", "Nyinsɛn hwehwɛmu"],
          distance: "1.8 km"
        },
        {
          id: 5,
          name: "Medipharm",
          type: "Adurutoɔ",
          location: "East Legon, Accra",
          phone: "+233 30 251 6789",
          hours: "Daa: 8am-9pm",
          services: ["Awo si ano aduro", "Yadeɛ aduro", "Akwahosan afotusoɔ"],
          distance: "2.5 km"
        }
      ]
    },
    ewe: {
      title: "Di Kpekpeɖeŋu Le Wò Nɔƒe",
      searchPlaceholder: "Di le teƒe nu...",
      filterAll: "Ɖesiaɖe",
      filterClinic: "Kɔdaƒewo",
      filterPharmacy: "Atikewɔƒewo",
      viewDetails: "Kpɔ nuɖeɖe",
      callNow: "Yɔ fifia",
      getDirections: "Xɔ mɔfiame",
      services: "Dɔwɔnawo:",
      clinics: [
        {
          id: 1,
          name: "Planned Parenthood Ghana - Accra",
          type: "Kɔdaƒe",
          location: "East Legon, Accra",
          phone: "+233 30 251 2345",
          hours: "Dzo-Fiɖa: 8am-5pm, Memleɖa: 9am-2pm",
          services: ["Fuvɔvɔ", "Dɔléle dodokpɔ", "Aɖaŋuɖoɖo", "Ƒome ɖoɖo"],
          distance: "2.3 km"
        },
        {
          id: 2,
          name: "DKT Ghana Sɔhɛwo ƒe Teƒe",
          type: "Kɔdaƒe",
          location: "Osu, Accra",
          phone: "+233 30 276 5432",
          hours: "Dzo-Memleɖa: 9am-6pm",
          services: ["Sɔhɛwo dɔwɔnawo", "Fuvɔvɔ femaxexe", "HIV dodokpɔ"],
          distance: "3.7 km"
        },
        {
          id: 3,
          name: "Ridge Kɔdaƒe Ƒome Ðoɖo",
          type: "Kɔdaƒe",
          location: "Ridge, Accra",
          phone: "+233 30 222 1234",
          hours: "Dzo-Fiɖa: 7am-4pm",
          services: ["Ƒome ɖoɖo", "Funɔwo ƒe lãmesɛ", "Dɔléle kpɔkplɔ"],
          distance: "5.1 km"
        },
        {
          id: 4,
          name: "LifeCare Atikewɔƒe",
          type: "Atikewɔƒe",
          location: "Osu Oxford Street, Accra",
          phone: "+233 30 278 9876",
          hours: "Gbesiagbe: 8am-10pm",
          services: ["Fuvɔvɔ kaba", "Condom", "Funɔ dodokpɔ"],
          distance: "1.8 km"
        },
        {
          id: 5,
          name: "Medipharm",
          type: "Atikewɔƒe",
          location: "East Legon, Accra",
          phone: "+233 30 251 6789",
          hours: "Gbesiagbe: 8am-9pm",
          services: ["Fuvɔvɔwo", "Dɔléle atikewo", "Lãmesɛ aɖaŋuɖoɖo"],
          distance: "2.5 km"
        }
      ]
    }
  };

  const lang = content[selectedLanguage as keyof typeof content] || content.en;

  const filteredClinics = lang.clinics.filter(clinic => {
    const matchesType = selectedType === "all" || 
      clinic.type === (selectedType === "clinic" ? (selectedLanguage === "en" ? "Clinic" : selectedLanguage === "twi" ? "Ayaresabea" : "Kɔdaƒe") : (selectedLanguage === "en" ? "Pharmacy" : selectedLanguage === "twi" ? "Adurutoɔ" : "Atikewɔƒe"));
    const matchesSearch = searchQuery === "" || 
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="rounded-full"
          style={{ borderColor: '#006d77', color: '#006d77' }}
        >
          <MapPin className="w-4 h-4 mr-2" />
          {lang.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle style={{ color: '#006d77' }}>{lang.title}</DialogTitle>
          <DialogDescription>
            Search and filter healthcare facilities near you that provide SRHR services.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input
            placeholder={lang.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full"
          />

          <div className="flex gap-2">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedType("all")}
              style={selectedType === "all" ? { backgroundColor: '#006d77' } : { borderColor: '#006d77', color: '#006d77' }}
            >
              {lang.filterAll}
            </Button>
            <Button
              variant={selectedType === "clinic" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedType("clinic")}
              style={selectedType === "clinic" ? { backgroundColor: '#006d77' } : { borderColor: '#006d77', color: '#006d77' }}
            >
              {lang.filterClinic}
            </Button>
            <Button
              variant={selectedType === "pharmacy" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedType("pharmacy")}
              style={selectedType === "pharmacy" ? { backgroundColor: '#006d77' } : { borderColor: '#006d77', color: '#006d77' }}
            >
              {lang.filterPharmacy}
            </Button>
          </div>

          <div className="space-y-3">
            {filteredClinics.map((clinic) => (
              <Card key={clinic.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="mb-1" style={{ color: '#006d77' }}>{clinic.name}</h3>
                    <Badge 
                      variant="outline" 
                      className="rounded-full"
                      style={{ borderColor: '#ff7b6e', color: '#ff7b6e' }}
                    >
                      {clinic.type}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">{clinic.distance}</span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{clinic.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{clinic.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{clinic.hours}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm mb-2" style={{ color: '#006d77' }}>{lang.services}</p>
                  <div className="flex flex-wrap gap-2">
                    {clinic.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-full"
                    style={{ borderColor: '#006d77', color: '#006d77' }}
                    disabled
                  >
                    {lang.viewDetails}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
