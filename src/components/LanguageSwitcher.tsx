import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-capsule-text hover:bg-accent"
        >
          <Globe size={20} className="text-black" />
          <span className="sr-only">{t("language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => changeLanguage("en")}
          className={language === "en" ? "bg-muted" : ""}
        >
          🇬🇧 {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("tr")}
          className={language === "tr" ? "bg-muted" : ""}
        >
          🇹🇷 {t("turkish")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
