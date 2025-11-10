# Vstupy
n = int(input("Zadejte číslo: "))

# Funkce na ověření zda je to prvočíslo
def isPrimeNum(x, result):
    if x < 0:
        return(f"{x} není prvočíslo.")
    for i in range(2, x):
        # Ověření zda je to číslo dělitelné pouze sebou nebo i něčím jiným 
        if x % i == 0:
            result["prvocisla"] += 1
            return(f"{x} není prvočíslo.")
    return(f"{x} je prvočíslo.")

# Promněnný
result = {"suda": 0,
          "licha": 0,
          "prvocisla": 0}

# Main script
for i in range(1, n):
    if i % 2 == 0:
        result["suda"] += 1
        print("číslo je sudé")
    else:
        result["licha"] += 1
        print("číslo je liché")
    print(isPrimeNum(i, result))

# Výpis statistik
print(f"Sudých čísel je {result["suda"]}",
      f"Lichích čísel je {result["licha"]}",
      f"Prvočísel je {result["prvocisla"]}")