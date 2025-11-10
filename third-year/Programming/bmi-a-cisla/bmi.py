# Vstupy
height = float(input("Zadejte výsku v metrech: "))
weight = int(input("Zadejte váhu v kilogramech: "))

# Funkce na výpočet bmi
def bmi(h, w):
    return w / (h ** 2)

# Funcke na kategorizování bmi
def categoryBmi(num):
    if num <= 18.4:
        print("podváha")
    elif num >= 18.5 and num <= 24.9:
        print("normální váha")
    elif num >= 25 and num <= 29.9:
        print("nadváha")
    else:
        print("obezita")

print(categoryBmi(bmi(height, weight)))