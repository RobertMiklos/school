numbers = [2, 3, 6, 8, 1]

print(numbers)
print(numbers[0]) # index 0 = první číslo
print(numbers[-1]) # index -1 = poslední ovoce
print(numbers[0:2]) # index 0:2 = první až druhé číslo, ale ne třetí číslo - index 2 se nepočítá
print(numbers[::2]) # index ::2 = každé druhé číslo
print(numbers[::-1]) # index ::-1 = každé číslo ale pozpátku

print("")

num = [1, 2, 3, 4, 5, 66, 14, 12]

num[0] = 10 # na potici [0] se zmení hodnota na 10
print(num)

num[2:4] = [20, 30] # na pozici [2:4] se změní hodnoty na [20, 30]
print(num)

print("")

my_list = ["apple", "banana", "cherry", "watermelon"]
print(my_list)

my_list.insert(1, "orange") # funkce .insert() = přidá "orange" na index 1 ale nenahradí ho 
print(my_list)

my_list.append("coconut") # funkce .append() = přidá "coconut" na konec listu
print(my_list)

tropical = ["mango", "pinapple", "papaya"]
tropical.extend(my_list) # funkce .extend() = připojí další list na konec listu 
print(tropical)

my_list.remove("banana") # funkce .remove = odstraní "banana" z listu ale pokud tam je 2x "banana" odstraní pouze první
print(my_list)

my_list.pop(3) # funkce .pop() = odstraní hodnotu na určitém indexu
print(my_list)

my_list.clear() # funkce .clear() = odstraní vnitřek listu ale list zůstane
print(my_list)