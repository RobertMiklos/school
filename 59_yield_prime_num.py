first = int(input(""))
second = int(input(""))

def isPrime(x):
    if x < 2:
        return False
    elif x == 2:
        return True  
    for n in range(2, x):
        if x % n ==0:
            return False
    return True

def primeGenerator(a, b,):
    for x in range(a, b):
        if isPrime(x) == True:
            yield x
    
print(list(primeGenerator(first, second)))