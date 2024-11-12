import json
from datetime import datetime

# Načteme soubor s otázkami, odpověďmi a dárky
def load_questions():
    with open("D:\development\school\school\2.year\Programování\002 adventní kalendár\advent_calendar.json", "r") as file:
        return json.load(file)

# Získáme dnešní datum
def get_today_date():
    today = datetime.today()
    # Zkontrolujeme, zda je dnešní datum mezi 1. a 24. prosincem 2024
    return today.month == 11 and 1 <= today.day <= 24

# Hlavní funkce pro zobrazení otázky a vyhodnocení odpovědi
def main():
    if get_today_date():
        today = datetime.today().day
        questions = load_questions()

        # Zkontrolujeme, zda existuje otázka pro dnešní den
        if str(today) in questions:
            question_data = questions[str(today)]
            print(question_data["question"])
            user_answer = input("Tvoje odpověď: ")

            if user_answer.strip() == question_data["answer"]:
                print(f"Za tvou šikovnost tu máš ode mě {question_data['gift']}.")
            else:
                print("To se nepovedlo, ale nevadí, můžeš to zkusit znovu.")
        else:
            print("Dnešní den není v adventním kalendáři.")
    else:
        print("Dnešní den není v adventním kalendáři.")

if __name__ == "__main__":
    main()

