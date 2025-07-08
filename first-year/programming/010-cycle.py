i = 1
is_sep = False
while i < 11:
    if is_sep:
        print("-", end="")
    else:
        is_sep = True    
    print(i, end="")
    i += 1

# vypíše to čísla od 1 - 10 a udělá to mezi nima pomlčku
