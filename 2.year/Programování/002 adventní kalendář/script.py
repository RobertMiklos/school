import json
from datetime import datetime

# Funkce pro načtení dat z JSON souboru
def load_data():
    with open('advent_data.json', 'r', encoding='utf-8') as file:
        return json.load(file)

# Funkce pro zjištění aktuálního dne
def get_today():
    return datetime.now().day

# Funkce pro zjištění, zda je dnešní den v adventním období
def is_in_advent_period(day):
    return 1 <= day <= 24

# Funkce pro zobrazení dnešní otázky
def show_question(day, answered_correctly):
    if not is_in_advent_period(day):
        return "Dnešní den není v adventním kalendáři."

    # Načteme otázky, správné odpovědi a dárky
    data = load_data()

    if str(day) not in data:
        return "Otázka pro tento den není k dispozici."

    # Získáme otázku pro dnešní den
    question = data[str(day)]["question"]
    correct_answer = data[str(day)]["correct_answer"]
    gift = data[str(day)]["gift"]

    # Pokud uživatel již odpověděl správně
    if answered_correctly:
        return f"Dnes si již dárek dostal: {gift}"

    return question

# Funkce pro zpracování odpovědi uživatele
def process_answer(day, user_answer):
    data = load_data()

    if str(day) not in data:
        return "Otázka pro tento den není k dispozici."

    correct_answer = data[str(day)]["correct_answer"]
    gift = data[str(day)]["gift"]

    if user_answer == correct_answer:
        # Uživatel odpověděl správně
        return f"Za tvou šikovnost tu máš ode mě {gift}."
    else:
        # Uživatel odpověděl špatně
        return "To se nepovedlo, ale nevadí, můžeš to zkusit znovu."

# Hlavní funkce
def main():
    # Zjištění aktuálního dne
    today = get_today()

    # Simulace stavu, zda uživatel odpověděl správně
    # Tento stav by měl být v praxi uložen v nějakém souboru (např. v databázi nebo souboru)
    # Zde je pouze pro ilustraci, že je již správná odpověď uložena
    answered_correctly = False  # Změnit na True, pokud uživatel odpověděl správně

    # Zobrazení otázky
    print(show_question(today, answered_correctly))

    # Pokud uživatel ještě neodpověděl správně, požádáme o odpověď
    if not answered_correctly:
        user_answer = input("Jaká je tvoje odpověď? ")
        print(process_answer(today, user_answer))

if __name__ == "__main__":
    main()
