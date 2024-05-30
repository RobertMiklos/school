import random

def generate_random_number():
    number = random.randint(0, 10)
    return(number)

correct_num = generate_random_number()
guess = int(input("zadejte číslo:\n"))
atemps = 0

while True: 
    if guess == correct_num:
        atemps += 1
        print("hurá!")
        print("uhádl jsi to na " f"{atemps}" " pokusů")
        break
    else:
        atemps += 1
        guess = int(input("zadejte číslo:\n"))


# hra kde kde jse hádá správné číslo