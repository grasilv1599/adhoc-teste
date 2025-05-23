
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type Language = "PT" | "EN" | "ES";

interface LanguageOption {
  id: Language;
  name: string;
  flag: string;
}

interface LanguageSelectorProps {
  selectedLanguage: Language | null;
  onLanguageSelect: (language: Language) => void;
  isDisabled: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageSelect,
  isDisabled,
}) => {
  const languages: LanguageOption[] = [
    {
      id: "PT",
      name: "Brazilian Portuguese",
      flag: "🇧🇷",
    },
    {
      id: "EN",
      name: "English",
      flag: "🇬🇧",
    },
    {
      id: "ES",
      name: "Spanish",
      flag: "🇪🇸",
    },
  ];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Select Language</CardTitle>
        <CardDescription>
          Choose the language for processing your Excel file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedLanguage || undefined}
          onValueChange={(value) => onLanguageSelect(value as Language)}
          className="space-y-4"
          disabled={isDisabled}
        >
          {languages.map((language) => (
            <div
              key={language.id}
              className={`flex items-center space-x-3 rounded-md border p-4 ${
                selectedLanguage === language.id
                  ? "border-primary bg-accent"
                  : "border-border"
              } ${isDisabled ? "opacity-50" : ""}`}
            >
              <RadioGroupItem
                value={language.id}
                id={`language-${language.id}`}
                disabled={isDisabled}
              />
              <Label
                htmlFor={`language-${language.id}`}
                className="flex items-center cursor-pointer flex-1"
              >
                <span className="mr-2 text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default LanguageSelector;
