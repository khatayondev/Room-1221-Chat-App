import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { UserCircle2, Lock } from "lucide-react";

interface LoginScreenProps {
  onLogin: (username: string) => void;
  onContinueAsGuest: () => void;
  selectedLanguage: string;
}

export function LoginScreen({ onLogin, onContinueAsGuest, selectedLanguage }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const content = {
    en: {
      title: "Welcome to Room 1221",
      subtitle: "Your safe space for health questions",
      usernameLabel: "Username",
      passwordLabel: "Password",
      loginButton: "Sign In",
      guestButton: "Continue as Guest",
      guestInfo: "No chat history saved • Completely anonymous",
      loginInfo: "Keep your chat history and continue conversations",
      usernamePlaceholder: "Enter your username",
      passwordPlaceholder: "Enter your password"
    },
    twi: {
      title: "Akwaaba wɔ Room 1221",
      subtitle: "Baabi a w'ahobammɔ wɔ hɔ ma wo akwahosan nsɛm",
      usernameLabel: "Wo din",
      passwordLabel: "Sɛnkyerɛnne",
      loginButton: "Kɔ mu",
      guestButton: "Kɔ so sɛ Ɔhɔhoɔ",
      guestInfo: "Wɔnkora nkɔmmɔbɔ • Wonnim wo koraa",
      loginInfo: "Kora wo nkɔmmɔbɔ na toaa so",
      usernamePlaceholder: "Kyerɛw wo din",
      passwordPlaceholder: "Kyerɛw wo sɛnkyerɛnne"
    },
    ewe: {
      title: "Woezɔ ɖe Room 1221",
      subtitle: "Teƒe si ŋutifafa le hena wò lãmesɛ biabia",
      usernameLabel: "Wò ŋkɔ",
      passwordLabel: "Dzesinya",
      loginButton: "Ge ɖe eme",
      guestButton: "Yi edzi abe amedzro ene",
      guestInfo: "Womedzraa nuƒoƒo o • Ɣaɣla blibo",
      loginInfo: "Dzra wò nuƒoƒowo ɖo eye nàyi edzi",
      usernamePlaceholder: "Ŋlɔ wò ŋkɔ",
      passwordPlaceholder: "Ŋlɔ wò dzesinya"
    }
  };

  const lang = content[selectedLanguage as keyof typeof content] || content.en;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f8f9fa' }}>
      <Card className="max-w-md w-full p-8 shadow-lg" style={{ backgroundColor: 'white' }}>
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#006d77' }}>
            <svg className="w-10 h-10" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="mb-2" style={{ color: '#006d77' }}>{lang.title}</h1>
          <p className="text-gray-600">{lang.subtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div>
            <Label htmlFor="username" className="text-gray-700">{lang.usernameLabel}</Label>
            <div className="relative mt-2">
              <UserCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={lang.usernamePlaceholder}
                className="pl-10 rounded-full"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-gray-700">{lang.passwordLabel}</Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={lang.passwordPlaceholder}
                className="pl-10 rounded-full"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full mt-6"
            style={{ backgroundColor: '#006d77', color: 'white' }}
            disabled={!username.trim() || !password.trim()}
          >
            {lang.loginButton}
          </Button>

          <p className="text-xs text-center text-gray-500 mt-2">
            {lang.loginInfo}
          </p>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        <Button
          onClick={onContinueAsGuest}
          variant="outline"
          className="w-full rounded-full"
          style={{ borderColor: '#006d77', color: '#006d77' }}
        >
          {lang.guestButton}
        </Button>

        <p className="text-xs text-center text-gray-500 mt-3">
          {lang.guestInfo}
        </p>
      </Card>
    </div>
  );
}
